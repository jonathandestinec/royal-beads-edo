"use client";

import { motion, useTransform } from "framer-motion";
import { openingLine, slate } from "@/data/content";
import { Backdrop, Slates, WriteOn, useSceneProgress } from "@/components/film/Film";
import { Scribble } from "./Scribble";

/**
 * The opening scene, straight after the hero: the coral film clip, sepia-graded, with the
 * hand-drawn brand mark and the first line of the story. It fades up out of the
 * hero's dark edge so the two read as one film.
 */
export function Opening() {
  const { ref, progress } = useSceneProgress();
  const reveal = useTransform(progress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={ref}
      id="opening"
      aria-labelledby="opening-title"
      className="relative flex min-h-[100svh] flex-col items-center justify-center gap-10 overflow-hidden bg-night px-5 py-28 text-center"
    >
      <motion.div style={{ opacity: reveal }} className="absolute inset-0">
        <Backdrop
          src="/video/opening.mp4"
          poster="/video/opening-poster.jpg"
          focus="50% 30%"
          progress={progress}
          grade="sepia(0.45) saturate(0.85) brightness(0.5)"
        />
      </motion.div>
      {/* Soft seams top and bottom, so the scene cross-fades out of the hero. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-night/80 to-transparent" />
      <Slates tl={slate("opening")} />

      <div className="relative z-10 w-[clamp(150px,16vw,230px)]">
        <Scribble className="h-auto w-full overflow-visible" />
      </div>
      <h2
        id="opening-title"
        className="relative z-10 m-0 max-w-[16ch] font-display soft-text text-[clamp(32px,4.6vw,64px)] leading-[1.02] text-cream italic"
      >
        <WriteOn lines={[openingLine]} />
      </h2>
    </section>
  );
}
