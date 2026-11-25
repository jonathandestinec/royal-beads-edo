/**
 * Draws the try-on bead art once, in the browser, onto transparent canvases ("sprites").
 * Each bead is shaded like polished coral: a warm highlight, a deep rim, a soft contact shadow,
 * and a slight change of colour from bead to bead, as real coral has.
 *
 * To use real bead photos instead, swap a sprite for a transparent PNG drawn at the same size
 * and anchor (see NECK and CROWN below).
 */

import { findCrown, findNecklace, type CrownSet, type NecklaceSet } from "./sets";

const TAU = Math.PI * 2;

/** Necklace sprite: the anchor is the centre of the neck, where the strands start. */
export const NECK = { w: 1200, h: 620, ax: 600, ay: 40, /** sprite width in face widths */ faces: 2.3 };
/** Crown sprite: the anchor is the centre of the crown's base, on the hairline. */
export const CROWN = { w: 1000, h: 820, ax: 500, ay: 790, faces: 1.18 };

export const CORAL = ["#c63f2b", "#d4553c", "#b8382a", "#d9603f", "#c94b35", "#cf4a2f"];

type RGB = [number, number, number];
const hex = (h: string): RGB => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB;
const mix = (a: RGB, b: RGB, t: number): RGB => a.map((v, i) => Math.round(v + (b[i] - v) * t)) as RGB;
const css = (c: RGB, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

/** A small seeded random, so the art is the same on every visit. */
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type BeadOpts = { gold?: boolean; shade?: number; alpha?: number; color?: string };

export function bead(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, o: BeadOpts = {}) {
  const shade = o.shade ?? 0;
  const base = o.gold ? hex("#cfa75a") : hex(o.color ?? CORAL[0]);
  const light = o.gold ? hex("#fbeab4") : mix(base, hex("#ffd9c4"), 0.55);
  const dark = mix(o.gold ? hex("#6b4a1c") : hex("#4a140c"), [0, 0, 0], shade * 0.4);
  const body = mix(base, dark, shade);

  ctx.save();
  ctx.globalAlpha = o.alpha ?? 1;
  // Soft contact shadow on the skin.
  ctx.shadowColor = "rgba(24,8,4,0.5)";
  ctx.shadowBlur = r * 0.7;
  ctx.shadowOffsetY = r * 0.3;
  const g = ctx.createRadialGradient(x - r * 0.38, y - r * 0.42, r * 0.05, x, y, r * 1.02);
  g.addColorStop(0, css(mix(light, body, shade * 0.6)));
  g.addColorStop(0.28, css(mix(base, light, 0.25 * (1 - shade))));
  g.addColorStop(0.72, css(body));
  g.addColorStop(1, css(dark));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
  ctx.fill();
  ctx.shadowColor = "transparent";
  // Polished highlight and a faint bounce light along the bottom.
  ctx.fillStyle = `rgba(255,246,236,${0.6 * (1 - shade * 0.7)})`;
  ctx.beginPath();
  ctx.ellipse(x - r * 0.36, y - r * 0.42, r * 0.26, r * 0.16, -0.5, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = css(light, 0.18);
  ctx.lineWidth = r * 0.12;
  ctx.beginPath();
  ctx.arc(x, y, r * 0.8, 0.35 * Math.PI, 0.7 * Math.PI);
  ctx.stroke();
  ctx.restore();
}

function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

function drawNecklace(set: NecklaceSet): HTMLCanvasElement {
  const c = canvas(NECK.w, NECK.h);
  const ctx = c.getContext("2d")!;
  ctx.translate(NECK.ax, NECK.ay);
  const rand = rng(7);
  const neckHalf = 210;

  // Outer strands first, so the shorter ones lie on top of them.
  [...set.strands].reverse().forEach((s) => {
    const start = Math.acos(Math.min(0.98, neckHalf / s.ax));
    const pts: { x: number; y: number; len: number }[] = [];
    let len = 0;
    const N = 1500;
    for (let i = 0; i <= N; i++) {
      const p = start + ((Math.PI - 2 * start) * i) / N;
      const x = s.ax * Math.cos(p);
      const y = (s.by * (Math.sin(p) - Math.sin(start))) / (1 - Math.sin(start)) + 10;
      if (pts.length) len += Math.hypot(x - pts[pts.length - 1].x, y - pts[pts.length - 1].y);
      pts.push({ x, y, len });
    }
    // The thread, seen between beads.
    ctx.strokeStyle = "rgba(60,30,20,0.6)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.stroke();

    const n = Math.max(1, Math.floor(len / (s.r * 1.96)));
    const step = len / n;
    const mid = (n - 1) / 2;
    let k = 0;
    const beads: { x: number; y: number; r: number; o: BeadOpts }[] = [];
    for (let i = 0; i < n; i++) {
      const target = (i + 0.5) * step;
      while (k < pts.length - 1 && pts[k].len < target) k++;
      const { x, y } = pts[k];
      const t = Math.abs(x) / s.ax;
      const fromEnd = Math.min(i, n - 1 - i);
      const alpha = fromEnd === 0 ? 0.35 : fromEnd === 1 ? 0.75 : 1;
      const gold = Boolean(s.goldEvery) && Math.abs(i - mid) % s.goldEvery! === Math.floor(s.goldEvery! / 2);
      const isCentre = Boolean(s.centre) && Math.abs(i - mid) < 0.6;
      const r = isCentre ? s.centre! : gold ? s.r * 0.62 : s.r * (1 - t * t * 0.12);
      beads.push({ x, y: isCentre ? y + (s.centre! - s.r) * 0.6 : y, r, o: { gold, shade: 0.5 * t ** 3, alpha, color: CORAL[Math.floor(rand() * CORAL.length)] } });
    }
    // Centre beads drawn last so they sit in front.
    beads.sort((a, b) => Math.abs(b.x) - Math.abs(a.x)).forEach((b) => bead(ctx, b.x, b.y, b.r, b.o));
  });
  return c;
}

function drawCrown(set: CrownSet): HTMLCanvasElement {
  const c = canvas(CROWN.w, CROWN.h);
  if (set.kind === "none") return c;
  const ctx = c.getContext("2d")!;
  ctx.translate(CROWN.ax, CROWN.ay);
  const rand = rng(11);

  /** A row of beads around a curved surface: beads bunch towards the sides, as on a real head. */
  const row = (hw: number, y: number, r: number, opts: { gold?: boolean; offset?: number; bow?: number } = {}) => {
    const n = Math.max(1, Math.floor((Math.PI * hw) / (r * 1.98)));
    const items: { x: number; y: number; s: number }[] = [];
    for (let j = 0; j < n; j++) {
      const u = -Math.PI / 2 + ((j + 0.5 + (opts.offset ?? 0)) * Math.PI) / n;
      if (u > Math.PI / 2) continue;
      items.push({ x: hw * Math.sin(u), y: y + (opts.bow ?? 0) * Math.cos(u), s: Math.abs(Math.sin(u)) });
    }
    items
      .sort((a, b) => b.s - a.s)
      .forEach((it) =>
        bead(ctx, it.x, it.y, r * (1 - it.s * it.s * 0.22), { gold: opts.gold, shade: 0.55 * it.s ** 2.5, color: CORAL[Math.floor(rand() * CORAL.length)] }),
      );
  };

  if (set.kind === "dome") {
    const r = 22;
    const H = 640;
    const rowStep = r * 1.72;
    const rows: number[] = [];
    for (let h = r * 1.6; h < H - r; h += rowStep) rows.push(h);
    // Top rows first, so each lower row sits in front of the one above.
    rows.reverse().forEach((h, i) => {
      const hw = 430 * Math.sqrt(Math.max(0, 1 - (h / H) ** 2.4));
      if (hw > r * 1.2) row(hw, -h, r, { offset: i % 2 ? 0.5 : 0, bow: 8 });
    });
    // Finial on top.
    bead(ctx, 0, -H + r * 0.6, r * 1.55, { color: CORAL[1] });
    bead(ctx, 0, -H - r * 1.4, r * 0.7, { gold: true });
    // Gold band at the base.
    row(440, -r * 0.55, r * 0.62, { gold: true, bow: 10 });
  } else {
    const r = 21;
    row(445, -r * 2.9, r, { offset: 0.5, bow: 14 });
    row(450, -r * 1.05, r, { bow: 14 });
    // A small peak of larger beads at the centre.
    bead(ctx, -44, -r * 4.4, r * 1.15, { color: CORAL[2] });
    bead(ctx, 44, -r * 4.4, r * 1.15, { color: CORAL[4] });
    bead(ctx, 0, -r * 6.1, r * 1.45, { color: CORAL[1] });
    bead(ctx, 0, -r * 8.1, r * 0.6, { gold: true });
    bead(ctx, 0, -r * 3.6, r * 0.7, { gold: true });
  }
  return c;
}

const cache = new Map<string, HTMLCanvasElement>();

export function necklaceSprite(id: string): HTMLCanvasElement {
  const key = `n:${id}`;
  if (!cache.has(key)) cache.set(key, drawNecklace(findNecklace(id)));
  return cache.get(key)!;
}

export function crownSprite(id: string): HTMLCanvasElement {
  const key = `c:${id}`;
  if (!cache.has(key)) cache.set(key, drawCrown(findCrown(id)));
  return cache.get(key)!;
}

/** A small picture of a sprite for the style picker. */
export function thumb(sprite: HTMLCanvasElement, w = 120, h = 80): string {
  const c = canvas(w, h);
  const ctx = c.getContext("2d")!;
  const s = Math.min(w / sprite.width, h / sprite.height) * 0.94;
  ctx.drawImage(sprite, (w - sprite.width * s) / 2, (h - sprite.height * s) / 2, sprite.width * s, sprite.height * s);
  return c.toDataURL("image/png");
}
