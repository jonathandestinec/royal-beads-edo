"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { FaceLandmarker } from "@mediapipe/tasks-vision";
import { CowrieMark } from "@/components/brand/CowrieMark";
import { EnquireButton, pill, pillStyles } from "@/components/ui/EnquireButton";
import { CROWNS, NECKLACES, findCrown, findNecklace, lookMessage } from "./sets";
import { crownSprite, necklaceSprite, thumb } from "./sprites";
import type { Mode, Pose, Smoother as SmootherType } from "./tracking";

type Tracking = typeof import("./tracking");
type View = "start" | "loading" | "camera" | "photo" | "error";

/**
 * The virtual try-on. The visitor's camera (or a photo they pick) is drawn on a canvas with a
 * coral necklace and crown placed on the face. Nothing is uploaded: tracking runs on the device.
 */
export default function TryOn() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const trackingRef = useRef<Tracking | null>(null);
  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  const modeRef = useRef<Mode>("VIDEO");
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(-1);
  const smootherRef = useRef<SmootherType | null>(null);
  const poseRef = useRef<Pose | null>(null);
  const photoRef = useRef<HTMLCanvasElement | null>(null);
  // A look can arrive from the regalia builder as ?necklace=…&crown=…
  const [initial] = useState(() => {
    const q = new URLSearchParams(window.location.search);
    return { necklace: findNecklace(q.get("necklace") ?? "").id, crown: findCrown(q.get("crown") ?? "").id };
  });
  const selRef = useRef(initial);
  const faceRef = useRef(false);

  const [view, setView] = useState<View>("start");
  const [error, setError] = useState("");
  const [necklace, setNecklace] = useState(initial.necklace);
  const [crown, setCrown] = useState(initial.crown);
  const [face, setFace] = useState(false);
  const [flash, setFlash] = useState(false);
  const [thumbs] = useState(() => ({
    necklace: Object.fromEntries(NECKLACES.map((n) => [n.id, n.id === "none" ? "" : thumb(necklaceSprite(n.id))])),
    crown: Object.fromEntries(CROWNS.map((c) => [c.id, c.id === "none" ? "" : thumb(crownSprite(c.id))])),
  }));

  const sawFace = useCallback((found: boolean) => {
    if (faceRef.current !== found) {
      faceRef.current = found;
      setFace(found);
    }
  }, []);

  /** Draw one frame: the picture, then the set on top. The camera is mirrored, like a mirror. */
  const render = useCallback((source: CanvasImageSource, mirror: boolean) => {
    const c = canvasRef.current;
    const t = trackingRef.current;
    if (!c || !t) return;
    const ctx = c.getContext("2d")!;
    ctx.setTransform(mirror ? -1 : 1, 0, 0, 1, mirror ? c.width : 0, 0);
    ctx.drawImage(source, 0, 0, c.width, c.height);
    const pose = poseRef.current;
    if (pose) {
      const n = selRef.current.necklace === "none" ? null : necklaceSprite(selRef.current.necklace);
      const cr = selRef.current.crown === "none" ? null : crownSprite(selRef.current.crown);
      t.drawSet(ctx, pose, n, cr);
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }, []);

  const ensureLandmarker = useCallback(async (mode: Mode) => {
    if (!trackingRef.current) trackingRef.current = await import("./tracking");
    const t = trackingRef.current;
    if (!smootherRef.current) smootherRef.current = new t.Smoother();
    if (!landmarkerRef.current) {
      landmarkerRef.current = await t.createLandmarker(mode);
      modeRef.current = mode;
    } else if (modeRef.current !== mode) {
      await landmarkerRef.current.setOptions({ runningMode: mode });
      modeRef.current = mode;
    }
    return landmarkerRef.current;
  }, []);

  const stopCamera = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((tr) => tr.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  /** Track and draw every camera frame until the camera stops. */
  const loop = useCallback(() => {
    const tick = () => {
      const v = videoRef.current;
      const c = canvasRef.current;
      const lm = landmarkerRef.current;
      const t = trackingRef.current;
      if (!v || !c || !lm || !t || !streamRef.current) return;
      if (v.readyState >= 2 && v.videoWidth) {
        if (c.width !== v.videoWidth || c.height !== v.videoHeight) {
          c.width = v.videoWidth;
          c.height = v.videoHeight;
        }
        if (v.currentTime !== lastTimeRef.current) {
          lastTimeRef.current = v.currentTime;
          const res = lm.detectForVideo(v, performance.now());
          const raw = res.faceLandmarks[0] ? t.measure(res.faceLandmarks[0], c.width, c.height) : null;
          poseRef.current = smootherRef.current!.push(raw);
          sawFace(Boolean(raw));
        }
        render(v, true);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();
  }, [render, sawFace]);

  const startCamera = useCallback(async () => {
    setError("");
    setView("loading");
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("no-camera");
      const [stream] = await Promise.all([
        navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        }),
        ensureLandmarker("VIDEO"),
      ]);
      // Tracking is warmed up; switch it to video if a photo was used before.
      await ensureLandmarker("VIDEO");
      streamRef.current = stream;
      const v = videoRef.current!;
      v.srcObject = stream;
      await v.play();
      smootherRef.current?.reset();
      poseRef.current = null;
      setView("camera");
      loop();
    } catch (e) {
      stopCamera();
      const denied = e instanceof DOMException && (e.name === "NotAllowedError" || e.name === "SecurityError");
      setError(
        denied
          ? "Your camera is blocked for this site. Allow camera access in your browser settings, or try the look on a photo instead."
          : "We couldn't open a camera on this device. You can try the look on a photo instead.",
      );
      setView("error");
    }
  }, [ensureLandmarker, loop, stopCamera]);

  const openPhoto = useCallback(
    async (file: File) => {
      stopCamera();
      setError("");
      setView("loading");
      const url = URL.createObjectURL(file);
      try {
        const img = new Image();
        img.src = url;
        await img.decode();
        const scale = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight));
        const src = document.createElement("canvas");
        src.width = Math.round(img.naturalWidth * scale);
        src.height = Math.round(img.naturalHeight * scale);
        src.getContext("2d")!.drawImage(img, 0, 0, src.width, src.height);
        const lm = await ensureLandmarker("IMAGE");
        const t = trackingRef.current!;
        const found = t.findFaceInPhoto(lm, src);
        poseRef.current = found ? t.measure(found, src.width, src.height) : null;
        sawFace(Boolean(poseRef.current));
        photoRef.current = src;
        const c = canvasRef.current!;
        c.width = src.width;
        c.height = src.height;
        render(src, false);
        setView("photo");
      } catch {
        setError("We couldn't read that photo. Try another one, ideally a clear, front-facing picture.");
        setView("error");
      } finally {
        URL.revokeObjectURL(url);
      }
    },
    [ensureLandmarker, render, sawFace, stopCamera],
  );

  // Keep the drawing loop's choice in step with the picker; redraw a still photo straight away.
  useEffect(() => {
    selRef.current = { necklace, crown };
    if (view === "photo" && photoRef.current) render(photoRef.current, false);
  }, [necklace, crown, view, render]);

  // Let go of the camera and the tracker when leaving the page.
  useEffect(
    () => () => {
      stopCamera();
      landmarkerRef.current?.close();
    },
    [stopCamera],
  );

  const takePhoto = useCallback(() => {
    const c = canvasRef.current;
    if (!c || !c.width) return;
    setFlash(true);
    window.setTimeout(() => setFlash(false), 220);
    const out = document.createElement("canvas");
    out.width = c.width;
    out.height = c.height;
    const ctx = out.getContext("2d")!;
    ctx.drawImage(c, 0, 0);
    // A small credit on the saved picture, so the beads are never taken for a real set.
    const fs = Math.max(14, Math.round(out.width * 0.022));
    ctx.font = `500 ${fs}px system-ui, sans-serif`;
    const label = "Taoué by Royal Beads Edo · concept designs";
    const pad = fs * 0.7;
    const tw = ctx.measureText(label).width;
    ctx.fillStyle = "rgba(28,20,17,0.6)";
    ctx.beginPath();
    ctx.roundRect(pad, out.height - pad - fs * 1.9, tw + fs * 1.4, fs * 1.9, fs);
    ctx.fill();
    ctx.fillStyle = "#e8d9c0";
    ctx.fillText(label, pad + fs * 0.7, out.height - pad - fs * 0.6);
    out.toBlob(
      async (blob) => {
        if (!blob) return;
        const file = new File([blob], "taoue-try-on.jpg", { type: "image/jpeg" });
        if (navigator.canShare?.({ files: [file] })) {
          try {
            await navigator.share({ files: [file], title: "My Taoué look" });
            return;
          } catch (e) {
            if (e instanceof DOMException && e.name === "AbortError") return;
          }
        }
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = file.name;
        a.click();
        window.setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      },
      "image/jpeg",
      0.92,
    );
  }, []);

  const live = view === "camera" || view === "photo";

  return (
    <div className="flex min-h-[100dvh] flex-col bg-night text-cream md:h-[100dvh] md:flex-row">
      {/* The picture */}
      <div className="relative h-[62dvh] shrink-0 overflow-hidden bg-espresso md:h-auto md:flex-1">
        <video ref={videoRef} playsInline muted className="hidden" />
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full ${view === "photo" ? "object-contain" : "object-cover"} ${live ? "" : "invisible"}`}
          aria-label="Your picture with the chosen coral set"
          role="img"
        />
        <div className={`pointer-events-none absolute inset-0 bg-cream transition-opacity duration-200 ${flash ? "opacity-60" : "opacity-0"}`} />

        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 bg-gradient-to-b from-night/80 to-transparent px-5 pt-4 pb-10">
          <Link href="/#try-on" className="inline-flex h-11 items-center gap-2 text-cream no-underline" aria-label="Back to Taoué">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
            <CowrieMark variant="small" size={22} />
            <span className="font-display soft text-xl font-semibold">Taoué</span>
          </Link>
          <span className="rounded-full bg-night/60 px-2.5 py-1 text-[11px] font-medium tracking-wide text-sand/90 backdrop-blur-[2px]">
            Concept designs
          </span>
        </div>

        {live && !face && (
          <p className="absolute inset-x-0 bottom-4 z-10 mx-auto w-fit max-w-[90%] rounded-full bg-night/70 px-4 py-2 text-center text-sm text-sand backdrop-blur-[2px]">
            {view === "camera" ? "Face the camera in good light" : "We couldn't find a face. Try a clear, front-facing photo."}
          </p>
        )}

        {!live && (
          <div className="vignette absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 pt-14 text-center">
            {view === "loading" ? (
              <>
                <span className="size-10 animate-spin rounded-full border-2 border-sand/30 border-t-coral-soft" aria-hidden="true" />
                <p className="m-0 text-sand" role="status">
                  Getting the try-on ready…
                </p>
              </>
            ) : (
              <>
                <h1 className="m-0 font-display soft text-[clamp(32px,8vw,56px)] leading-none font-semibold tracking-[-0.02em]">
                  See the coral on you
                </h1>
                <p className="m-0 max-w-[26em] text-base leading-relaxed text-sand">
                  {view === "error"
                    ? error
                    : "Try a crown and necklace with your camera. It all happens on your phone: no picture is sent anywhere."}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={startCamera} className={`${pill} ${pillStyles.coral}`}>
                    {view === "error" ? "Try the camera again" : "Start camera"}
                  </button>
                  <button type="button" onClick={() => fileRef.current?.click()} className={`${pill} ${pillStyles.ghost}`}>
                    Use a photo
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* The picker and actions */}
      <div className="flex flex-1 flex-col gap-5 bg-espresso px-5 pt-5 pb-[calc(8px+env(safe-area-inset-bottom))] md:w-[400px] md:flex-none md:overflow-y-auto md:px-7 md:pt-8">
        <Picker
          label="Necklace"
          items={NECKLACES}
          value={necklace}
          onChange={setNecklace}
          thumbs={thumbs.necklace}
        />
        <Picker label="Crown" items={CROWNS} value={crown} onChange={setCrown} thumbs={thumbs.crown} />

        <div className="flex flex-col gap-2">
          <p className="m-0 text-sm text-sand">Love this look?</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={takePhoto}
              disabled={!live}
              className={`${pill} ${pillStyles.cream} !px-4 disabled:pointer-events-none disabled:opacity-40`}
            >
              Take photo
            </button>
            <EnquireButton message={lookMessage(necklace, crown)} className="!px-4">
              Enquire
            </EnquireButton>
          </div>
        </div>

        <Link
          href="/regalia"
          className="group flex items-center justify-between gap-3 rounded-2xl border-[1.5px] border-saoky bg-night/40 px-4 py-3 text-cream no-underline transition-colors hover:border-taupe"
        >
          <span className="flex flex-col">
            <span className="font-display soft text-lg leading-tight font-semibold">Build your full wedding set</span>
            <span className="text-[13px] text-sand">Crown, neck piece, wrists and attire, for the bride, the groom or both</span>
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-coral-soft transition-transform group-hover:translate-x-0.5" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>

        {/* The last row leaves room on the right for the chat bubble. */}
        <div className="mt-auto flex min-h-[76px] items-center pr-[84px]">
          {live ? (
            <button
              type="button"
              onClick={view === "camera" ? () => fileRef.current?.click() : startCamera}
              className="h-11 text-left text-sm font-medium text-sand underline underline-offset-4"
            >
              {view === "camera" ? "Use a photo instead" : "Use the camera instead"}
            </button>
          ) : (
            <p className="m-0 text-xs leading-relaxed text-muted">
              The beads here are concept designs that show the look. Every real set is made by hand in our workshop.
            </p>
          )}
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          if (f) openPhoto(f);
        }}
      />
    </div>
  );
}

function Picker({
  label,
  items,
  value,
  onChange,
  thumbs,
}: {
  label: string;
  items: { id: string; name: string }[];
  value: string;
  onChange: (id: string) => void;
  thumbs: Record<string, string>;
}) {
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="mb-2 p-0 text-sm font-semibold tracking-wide text-sand">{label}</legend>
      <div className="swipe-x -mx-5 flex gap-2.5 px-5 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
        {items.map((it) => {
          const on = it.id === value;
          return (
            <button
              key={it.id}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(it.id)}
              className={`flex shrink-0 snap-start items-center gap-2 rounded-2xl border-[1.5px] py-1.5 pr-3.5 pl-1.5 text-sm transition-colors ${
                on ? "border-coral-soft bg-saoky text-cream" : "border-saoky bg-night/40 text-sand hover:border-taupe"
              }`}
            >
              <span className="flex h-10 w-[60px] items-center justify-center rounded-xl bg-night/60">
                {thumbs[it.id] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={thumbs[it.id]} alt="" className="h-9 w-[54px] object-contain" />
                ) : (
                  <span className="text-lg text-muted" aria-hidden="true">
                    –
                  </span>
                )}
              </span>
              {it.name}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
