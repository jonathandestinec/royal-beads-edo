"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Backdrop, Slates, WriteOn, useSceneProgress } from "@/components/film/Film";
import { CowrieMark } from "@/components/brand/CowrieMark";

const EASE = [0.45, 0.05, 0.3, 1] as const;

/** Chapter 2: the coral begins in the sea. A full-screen film clip with one line of text. */
export function Sea() {
  const { ref, progress } = useSceneProgress();
  const reduce = useReducedMotion();

  return (
    <section
      ref={ref}
      id="sea"
      aria-labelledby="sea-title"
      className="relative flex min-h-[100svh] scroll-mt-0 items-center justify-center overflow-hidden px-5 text-center"
    >
      <Backdrop src="/video/sea.mp4" poster="/video/sea-poster.jpg" progress={progress} grade="brightness(0.72) contrast(1.05)" />
      <Slates tl="02 · The sea" />

      {/* A hand-drawn wave that writes itself across the screen, with the constant wobble. */}
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-[62%] h-20 w-full" aria-hidden="true">
        <defs>
          <filter id="sea-boil">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={3} result="n">
              {!reduce && <animate attributeName="seed" values="3;6;1;8" dur="0.55s" calcMode="discrete" repeatCount="indefinite" />}
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="n" scale={3} />
          </filter>
        </defs>
        <motion.path
          d="M0 60 C 100 20, 200 100, 300 60 S 500 20, 600 60 S 800 100, 900 60 S 1100 20, 1200 60"
          fill="none"
          stroke="#fff8ee"
          strokeWidth={2}
          strokeLinecap="round"
          filter="url(#sea-boil)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 2.6, ease: EASE }}
        />
      </svg>

      <div className="relative z-10 flex max-w-[900px] flex-col items-center gap-7">
        <CowrieMark variant="small" size={30} color="#f5ede3" />
        <h2 id="sea-title" className="m-0 font-display soft text-[clamp(40px,6vw,88px)] leading-[0.98] font-semibold tracking-[-0.02em]">
          <WriteOn lines={["It begins in the sea,", "as living coral."]} />
        </h2>
      </div>
    </section>
  );
}
