"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The hero's hand-drawn story (after the INNA reference): a woven cloth frame, the cowrie,
 * then a strand of coral beads. Each line draws itself on, and an SVG turbulence filter keeps
 * every stroke gently "boiling" afterwards, like a pencil line in an animated film.
 */

const EASE = [0.45, 0.05, 0.3, 1] as const;

const fringeTop = Array.from({ length: 11 }, (_, i) => `M${50 + i * 30} 40 c-4 -14 4 -18 0 -30`).join(" ");
const fringeBottom = Array.from({ length: 11 }, (_, i) => `M${50 + i * 30} 470 c-4 14 4 18 0 30`).join(" ");
const zig = (x: number, dir: 1 | -1) =>
  `M${x} 80 ` + Array.from({ length: 20 }, (_, i) => `l${(i % 2 === 0 ? 22 : -22) * dir} 18`).join(" ");

const lines: { d: string; delay: number; duration: number }[] = [
  { d: "M40 40 L360 40 L360 470 L40 470 Z", delay: 0.2, duration: 2 },
  { d: `${fringeTop} ${fringeBottom}`, delay: 0.8, duration: 1.6 },
  { d: `${zig(80, 1)} ${zig(320, -1)}`, delay: 1.2, duration: 2.2 },
  {
    d: "M200 90 C232 90 252 126 252 170 C252 210 232 234 200 234 C168 234 148 210 148 170 C148 126 168 90 200 90 Z M199 94 C192 126 188 170 196 194 C198 206 202 214 206 220 M192 126 l6 2 M190 142 l7 2 M189 158 l7 2 M189 174 l8 2 M191 190 l8 2",
    delay: 1.6,
    duration: 2,
  },
  { d: "M120 270 C140 338 170 368 200 368 C230 368 260 338 280 270", delay: 3.6, duration: 1.4 },
  { d: "M200 390 L200 440 M170 420 C180 406 192 400 200 400 C208 400 220 406 230 420 M156 452 L244 452", delay: 7.2, duration: 1.4 },
];

const beads: [number, number, number][] = [
  [130, 300, 9],
  [146, 328, 9],
  [168, 350, 9],
  [200, 360, 10],
  [232, 350, 9],
  [254, 328, 9],
  [270, 300, 9],
];

export function Scribble({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 400 520" className={className} aria-hidden="true" fill="none">
      <defs>
        <filter id="tw-boil" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={1} result="noise">
            {!reduce && (
              <animate attributeName="seed" values="1;5;9;3;7" dur="0.55s" calcMode="discrete" repeatCount="indefinite" />
            )}
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={reduce ? 0 : 3.2} />
        </filter>
      </defs>
      <g filter="url(#tw-boil)" stroke="#fff8ee" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        {lines.map((l, i) => (
          <motion.path
            key={i}
            d={l.d}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: l.duration, delay: l.delay, ease: EASE },
              opacity: { duration: 0.2, delay: l.delay },
            }}
          />
        ))}
        {beads.map(([cx, cy, r], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 0.45, delay: 4 + i * 0.15, ease: EASE },
              opacity: { duration: 0.15, delay: 4 + i * 0.15 },
            }}
          />
        ))}
      </g>
    </svg>
  );
}
