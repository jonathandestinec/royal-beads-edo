/**
 * Bead art for the regalia builder preview, drawn once in the browser. The crowns and necklaces
 * are the try-on's own concept designs; the groom's cap and the wrist beads are drawn here with
 * the same polished-coral bead, so the whole site shows one style.
 */

import { CORAL, CROWN, bead, crownSprite, necklaceSprite, thumb } from "@/features/try-on/sprites";

/** Wrist sprite: the anchor is the centre of the wrist. */
export const WRIST = { w: 320, h: 260, ax: 160, ay: 130 };

function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
}

/** The groom's cap: a low dome of coral rows, the same size and anchor as the try-on crowns. */
function drawCap(): HTMLCanvasElement {
  const c = canvas(CROWN.w, CROWN.h);
  const ctx = c.getContext("2d")!;
  ctx.translate(CROWN.ax, CROWN.ay);
  const rand = rng(23);
  const r = 22;
  const H = 300;
  const rows: number[] = [];
  for (let h = r * 0.9; h < H - r * 0.5; h += r * 1.72) rows.push(h);
  rows.reverse().forEach((h, i) => {
    const hw = 470 * Math.sqrt(Math.max(0, 1 - (h / H) ** 2));
    if (hw < r * 1.2) return;
    const n = Math.max(1, Math.floor((Math.PI * hw) / (r * 1.98)));
    const items: { x: number; y: number; s: number }[] = [];
    for (let j = 0; j < n; j++) {
      const u = -Math.PI / 2 + ((j + 0.5 + (i % 2 ? 0.5 : 0)) * Math.PI) / n;
      if (u > Math.PI / 2) continue;
      items.push({ x: hw * Math.sin(u), y: -h + 10 * Math.cos(u), s: Math.abs(Math.sin(u)) });
    }
    items
      .sort((a, b) => b.s - a.s)
      .forEach((it) => bead(ctx, it.x, it.y, r * (1 - it.s * it.s * 0.22), { shade: 0.55 * it.s ** 2.5, color: CORAL[Math.floor(rand() * CORAL.length)] }));
  });
  bead(ctx, 0, -H + r * 0.2, r * 1.1, { color: CORAL[1] });
  return c;
}

/**
 * Wrist beads: rings of beads seen from the front. The back of each ring is drawn first and
 * darker, so the front beads sit over it as on a real wrist.
 */
function drawWrist(kind: "cuff" | "bracelets"): HTMLCanvasElement {
  const c = canvas(WRIST.w, WRIST.h);
  const ctx = c.getContext("2d")!;
  ctx.translate(WRIST.ax, WRIST.ay);
  const rand = rng(kind === "cuff" ? 5 : 9);
  const rows =
    kind === "cuff"
      ? [
          { y: -44, r: 15 },
          { y: -18, r: 10, gold: true },
          { y: 6, r: 15 },
          { y: 32, r: 10, gold: true },
          { y: 58, r: 15 },
        ]
      : [
          { y: -40, r: 14 },
          { y: 6, r: 14, goldEvery: 5 },
          { y: 52, r: 14 },
        ];
  const rx = 118;
  const ry = 30;
  for (const back of [true, false]) {
    rows.forEach((row) => {
      const n = Math.floor((Math.PI * 2 * rx * 0.82) / (row.r * 1.9));
      const items: { x: number; y: number; s: number; i: number }[] = [];
      for (let i = 0; i < n; i++) {
        const t = (i / n) * Math.PI * 2;
        const isBack = Math.sin(t) < 0;
        if (isBack !== back) continue;
        items.push({ x: rx * Math.cos(t), y: row.y + ry * Math.sin(t), s: Math.abs(Math.cos(t)), i });
      }
      items
        .sort((a, b) => b.s - a.s)
        .forEach((it) => {
          const gold = ("gold" in row && row.gold) || ("goldEvery" in row && row.goldEvery ? it.i % row.goldEvery === 0 : false);
          bead(ctx, it.x, it.y, row.r * (gold && !("gold" in row) ? 0.7 : 1), {
            gold: Boolean(gold),
            shade: back ? 0.75 : 0.45 * it.s ** 2,
            color: CORAL[Math.floor(rand() * CORAL.length)],
          });
        });
    });
  }
  return c;
}

const cache = new Map<string, HTMLCanvasElement>();

/** The sprite for an art id, or null for "none" and for attire colours. */
export function artSprite(art: string): HTMLCanvasElement | null {
  if (art === "none" || art.startsWith("#")) return null;
  if (!cache.has(art)) {
    const s =
      art === "cap"
        ? drawCap()
        : art === "cuff" || art === "bracelets"
          ? drawWrist(art)
          : ["bridal-crown", "headband"].includes(art)
            ? crownSprite(art)
            : necklaceSprite(art);
    cache.set(art, s);
  }
  return cache.get(art)!;
}

const urls = new Map<string, string>();

/** A data URL of the sprite, for the SVG preview. */
export function artUrl(art: string): string {
  const s = artSprite(art);
  if (!s) return "";
  if (!urls.has(art)) urls.set(art, s.toDataURL("image/png"));
  return urls.get(art)!;
}

/** A small picture of the piece for the picker. */
export function artThumb(art: string): string {
  const s = artSprite(art);
  return s ? thumb(s, 120, 80) : "";
}
