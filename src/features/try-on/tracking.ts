/**
 * Face tracking for the try-on, with MediaPipe Face Landmarker. Everything runs on the device:
 * the camera picture and any uploaded photo never leave the browser.
 */

import { FaceLandmarker, FilesetResolver, type NormalizedLandmark } from "@mediapipe/tasks-vision";
import { CROWN, NECK } from "./sprites";

/** The runtime files for this exact package version, and the face model served from the site. */
const WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm";
const MODEL_URL = "/models/face_landmarker.task";

export type Mode = "VIDEO" | "IMAGE";

export async function createLandmarker(mode: Mode): Promise<FaceLandmarker> {
  const files = await FilesetResolver.forVisionTasks(WASM_URL);
  const make = (delegate: "GPU" | "CPU") =>
    FaceLandmarker.createFromOptions(files, {
      baseOptions: { modelAssetPath: MODEL_URL, delegate },
      runningMode: mode,
      numFaces: 1,
      minFaceDetectionConfidence: 0.35,
      minFacePresenceConfidence: 0.35,
      minTrackingConfidence: 0.4,
    });
  try {
    return await make("GPU");
  } catch {
    return make("CPU");
  }
}

/**
 * Find a face in a still photo. The face model works best when the face fills the picture, so
 * when a full-length photo finds nothing, look again in the upper part of the picture, enlarged.
 */
export function findFaceInPhoto(lm: FaceLandmarker, src: HTMLCanvasElement): NormalizedLandmark[] | null {
  const W = src.width;
  const H = src.height;
  const crops = [
    [0, 0, 1, 1],
    [0.15, 0, 0.7, 0.55],
    [0.25, 0, 0.5, 0.35],
    [0, 0, 0.6, 0.45],
    [0.4, 0, 0.6, 0.45],
  ];
  for (const [x, y, w, h] of crops) {
    const cw = w * W;
    const ch = h * H;
    const k = Math.min(3, 1024 / Math.max(cw, ch));
    const c = document.createElement("canvas");
    c.width = Math.round(cw * k);
    c.height = Math.round(ch * k);
    c.getContext("2d")!.drawImage(src, x * W, y * H, cw, ch, 0, 0, c.width, c.height);
    const face = lm.detect(c).faceLandmarks[0];
    if (face) return face.map((p) => ({ ...p, x: x + p.x * w, y: y + p.y * h }));
  }
  return null;
}

/** Where the set sits on a face, in canvas pixels. */
export type Pose = {
  /** Centre of the neck, where the necklace hangs from. */
  nx: number;
  ny: number;
  /** Centre of the crown's base, on the hairline. */
  cx: number;
  cy: number;
  /** Face width, which sets the size of everything. */
  w: number;
  /** Head tilt, in radians. */
  a: number;
  /** 0 to 1, fades the set out when the face is lost. */
  o: number;
};

// Landmark numbers on the MediaPipe face mesh.
const CHIN = 152;
const FOREHEAD = 10;
const CHEEK_R = 234;
const CHEEK_L = 454;
const EYE_R = 33;
const EYE_L = 263;

/** Tune these to move the set: fractions of the face height. */
const NECK_DROP = 0.36;
const CROWN_LIFT = 0.1;

export function measure(lm: NormalizedLandmark[], W: number, H: number): Pose {
  const p = (i: number) => ({ x: lm[i].x * W, y: lm[i].y * H });
  const chin = p(CHIN);
  const top = p(FOREHEAD);
  const h = Math.hypot(top.x - chin.x, top.y - chin.y);
  // The cheek-to-cheek width shrinks when the head turns, so the face height keeps a floor under it.
  const w = Math.max(Math.hypot(p(CHEEK_L).x - p(CHEEK_R).x, p(CHEEK_L).y - p(CHEEK_R).y), h * 0.82);
  const er = p(EYE_R);
  const el = p(EYE_L);
  const a = Math.atan2(el.y - er.y, el.x - er.x);
  const down = { x: -Math.sin(a), y: Math.cos(a) };
  return {
    nx: chin.x + down.x * h * NECK_DROP,
    ny: chin.y + down.y * h * NECK_DROP,
    cx: top.x - down.x * h * CROWN_LIFT,
    cy: top.y - down.y * h * CROWN_LIFT,
    w,
    a,
    o: 1,
  };
}

/**
 * Smooths the pose from frame to frame: still faces stay rock steady, quick moves follow fast.
 * When the face is lost for a moment, the last pose fades out instead of blinking.
 */
export class Smoother {
  private pose: Pose | null = null;
  private missed = 0;

  reset() {
    this.pose = null;
    this.missed = 0;
  }

  push(next: Pose | null): Pose | null {
    if (!next) {
      if (!this.pose) return null;
      this.missed++;
      if (this.missed > 12) {
        this.pose = null;
        return null;
      }
      return { ...this.pose, o: Math.max(0, 1 - this.missed / 12) };
    }
    this.missed = 0;
    if (!this.pose) {
      this.pose = next;
      return next;
    }
    const prev = this.pose;
    const move = Math.hypot(next.nx - prev.nx, next.ny - prev.ny) / Math.max(prev.w, 1);
    const k = Math.min(0.85, 0.22 + move * 6);
    const lerp = (a: number, b: number) => a + (b - a) * k;
    this.pose = {
      nx: lerp(prev.nx, next.nx),
      ny: lerp(prev.ny, next.ny),
      cx: lerp(prev.cx, next.cx),
      cy: lerp(prev.cy, next.cy),
      w: prev.w + (next.w - prev.w) * Math.min(0.6, k),
      a: lerp(prev.a, next.a),
      o: 1,
    };
    return this.pose;
  }
}

/** Draws the necklace and crown on a face. Call inside the same transform as the picture. */
export function drawSet(ctx: CanvasRenderingContext2D, pose: Pose, necklace: HTMLCanvasElement | null, crown: HTMLCanvasElement | null) {
  const place = (sprite: HTMLCanvasElement, x: number, y: number, spec: typeof NECK | typeof CROWN) => {
    const s = (pose.w * spec.faces) / spec.w;
    ctx.save();
    ctx.globalAlpha = pose.o;
    ctx.translate(x, y);
    ctx.rotate(pose.a);
    ctx.scale(s, s);
    ctx.drawImage(sprite, -spec.ax, -spec.ay);
    ctx.restore();
  };
  if (necklace) place(necklace, pose.nx, pose.ny, NECK);
  if (crown) place(crown, pose.cx, pose.cy, CROWN);
}
