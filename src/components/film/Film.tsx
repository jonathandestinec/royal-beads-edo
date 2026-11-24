"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

/** Small caption shown on AI-generated images, so they are never mistaken for real customers or work. */
export function ConceptLabel({ className = "" }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute z-20 rounded-full bg-night/60 px-2.5 py-1 text-[11px] font-medium tracking-wide text-sand/90 backdrop-blur-[2px] ${className}`}
    >
      Concept image
    </span>
  );
}

type Slate = { tl?: string; tr?: string; bl?: string; br?: string };

/** Tiny film-slate captions in the four corners of a scene. */
export function Slates({ tl, tr, bl, br }: Slate) {
  const base = "pointer-events-none absolute z-20 text-[11px] uppercase tracking-[0.22em] text-cream/70 sm:text-xs";
  return (
    <>
      {tl && <span className={`${base} top-20 left-5 sm:top-24 sm:left-[4vw]`}>{tl}</span>}
      {tr && <span className={`${base} top-20 right-5 hidden text-right sm:top-24 sm:right-[4vw] sm:block`}>{tr}</span>}
      {bl && <span className={`${base} bottom-5 left-5 sm:bottom-7 sm:left-[4vw]`}>{bl}</span>}
      {br && <span className={`${base} right-5 bottom-5 hidden text-right sm:right-[4vw] sm:bottom-7 sm:block`}>{br}</span>}
    </>
  );
}

type BackdropProps = {
  /** Image path, or a video path ending in .mp4. */
  src: string;
  poster?: string;
  alt?: string;
  focus?: string;
  /** CSS filter for the documentary grade. */
  grade?: string;
  progress: MotionValue<number>;
  concept?: boolean;
};

/** A full-bleed photo or video that slowly pushes in and drifts as its scene scrolls past (Ken Burns). */
export function Backdrop({
  src,
  poster,
  alt = "",
  focus = "50% 50%",
  grade = "sepia(0.25) saturate(0.9) brightness(0.62)",
  progress,
  concept,
}: BackdropProps) {
  const reduce = useReducedMotion();
  const scale = useTransform(progress, [0, 1], reduce ? [1.05, 1.05] : [1.18, 1.04]);
  const y = useTransform(progress, [0, 1], reduce ? ["0%", "0%"] : ["-4%", "4%"]);
  const isVideo = src.endsWith(".mp4");

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        {isVideo ? (
          <video
            className="h-full w-full object-cover"
            style={{ objectPosition: focus, filter: grade }}
            src={src}
            poster={poster}
            autoPlay={!reduce}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            style={{ objectPosition: focus, filter: grade }}
            loading="lazy"
          />
        )}
      </motion.div>
      <div className="vignette absolute inset-0" />
      {concept && <ConceptLabel className="right-5 bottom-14 sm:right-[4vw] sm:bottom-16" />}
    </div>
  );
}

/** Track a section's journey through the viewport: 0 as it enters, 1 as it leaves. */
export function useSceneProgress() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return { ref, progress: scrollYProgress };
}

const EASE = [0.2, 0.7, 0.2, 1] as const;

/** Lines of text that write on one after another as they enter the screen. */
export function WriteOn({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  // The visible wrapper watches the viewport; each line slides up out of its own mask.
  return (
    <motion.span
      className={`block ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.5 }}
    >
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            variants={{ hidden: { y: "105%", opacity: 0 }, shown: { y: "0%", opacity: 1 } }}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.14 }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
