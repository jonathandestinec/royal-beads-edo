"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { IMG, PHOTO_CREDIT, slate } from "@/data/content";
import { ConceptLabel, PhotoCredit, Slates } from "@/components/film/Film";

type Frame = {
  src: string;
  alt: string;
  focus: string;
  line: [string, string];
  caption: string;
  concept?: boolean;
  credit?: string;
};

const frames: Frame[] = [
  {
    src: IMG.cowries,
    alt: "Cowrie shells once used as money",
    focus: "50% 60%",
    line: ["For centuries,", "the cowrie was money."],
    caption: "Cowrie shells",
    credit: PHOTO_CREDIT[IMG.cowries],
  },
  {
    src: IMG.queen,
    alt: "A bronze statue of a Benin queen mother wearing coral bead necklaces and cuffs",
    focus: "50% 20%",
    line: ["Coral became the dress", "of the court."],
    caption: "Queen Mother statue, Benin City",
    credit: PHOTO_CREDIT[IMG.queen],
  },
  {
    src: IMG.poster,
    alt: "A poster of a woman in a coral bead crown and layered coral collar",
    focus: "50% 40%",
    line: ["Today it crowns", "every Edo wedding."],
    caption: "Taoué poster",
    concept: true,
  },
];

/**
 * The court: a pinned scene. As the visitor scrolls, three frames cross-fade and drift, each with
 * its own line, while a hand-drawn sun glyph turns over them (after the glyph film reference).
 */
export function Court() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section ref={ref} id="court" aria-labelledby="court-title" className="relative h-[300vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {frames.map((f, i) => (
          <CourtFrame key={f.src} frame={f} index={i} progress={scrollYProgress} />
        ))}
        <div className="vignette absolute inset-0" />
        <Glyph progress={scrollYProgress} />
        <Slates tl={slate("court")} />
        <h2 id="court-title" className="sr-only">
          Cowrie and coral in the history of Benin
        </h2>
        {frames.map((f, i) => (
          <CourtLine key={f.src} frame={f} index={i} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

/** Scroll offsets must stay between 0 and 1 and never go backwards, or the browser rejects them. */
const clamp = (xs: number[]) => {
  let prev = 0;
  return xs.map((x) => (prev = Math.max(prev, Math.min(1, Math.max(0, x)))));
};

function windowFor(i: number) {
  const step = 1 / frames.length;
  return clamp([i * step - 0.08, i * step + 0.04, (i + 1) * step - 0.04, (i + 1) * step + 0.08]);
}

function CourtFrame({ frame, index, progress }: { frame: Frame; index: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const [a, b, c, d] = windowFor(index);
  const first = index === 0;
  const last = index === frames.length - 1;
  const opacity = useTransform(progress, [a, b, c, d], [first ? 1 : 0, 1, 1, last ? 1 : 0]);
  const scale = useTransform(progress, [a, d], reduce ? [1.05, 1.05] : [1.2, 1.04]);
  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.img
        src={frame.src}
        alt={frame.alt}
        style={{ scale, objectPosition: frame.focus, filter: "sepia(0.35) saturate(0.85) brightness(0.55)" }}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      {frame.concept && <ConceptLabel className="right-5 bottom-14 sm:right-[4vw] sm:bottom-16" />}
      {frame.credit && <PhotoCredit credit={frame.credit} className="right-5 bottom-14 sm:right-[4vw] sm:bottom-16" />}
      <span className="absolute bottom-5 left-5 z-20 text-[11px] uppercase tracking-[0.22em] text-cream/70 sm:bottom-7 sm:left-[4vw] sm:text-xs">
        {frame.caption}
      </span>
    </motion.div>
  );
}

function CourtLine({ frame, index, progress }: { frame: Frame; index: number; progress: MotionValue<number> }) {
  const [a, b, c, d] = windowFor(index);
  const first = index === 0;
  const last = index === frames.length - 1;
  const opacity = useTransform(progress, clamp([a + 0.04, b + 0.02, c - 0.02, d - 0.04]), [first ? 1 : 0, 1, 1, last ? 1 : 0]);
  const y = useTransform(progress, [a, d], [40, -40]);
  return (
    <motion.p
      style={{ opacity, y }}
      className="absolute inset-x-5 top-1/2 z-10 m-0 -translate-y-1/2 text-center font-display soft text-[clamp(30px,5.6vw,84px)] leading-[0.98] font-semibold tracking-[-0.02em]"
    >
      {frame.line[0]}
      <br />
      {frame.line[1]}
    </motion.p>
  );
}

/** A hand-drawn sun glyph that slowly turns with the scroll, boiling like an animated drawing. */
function Glyph({ progress }: { progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const rotate = useTransform(progress, [0, 1], reduce ? [0, 0] : [0, 140]);
  const rays = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    const r1 = 62;
    const r2 = i % 2 ? 92 : 112;
    return `M${100 + r1 * Math.cos(a)} ${100 + r1 * Math.sin(a)} L${100 + r2 * Math.cos(a)} ${100 + r2 * Math.sin(a)}`;
  }).join(" ");
  return (
    <motion.svg
      viewBox="0 0 200 200"
      style={{ rotate }}
      className="pointer-events-none absolute top-1/2 left-1/2 h-[min(80vw,560px)] w-[min(80vw,560px)] -translate-x-1/2 -translate-y-1/2 opacity-40"
      aria-hidden="true"
    >
      <defs>
        <filter id="glyph-boil">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={2} seed={2} result="n">
            {!reduce && <animate attributeName="seed" values="2;7;4;9" dur="0.5s" calcMode="discrete" repeatCount="indefinite" />}
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="n" scale={2.5} />
        </filter>
      </defs>
      <g filter="url(#glyph-boil)" fill="none" stroke="#fff8ee" strokeWidth={1.4} strokeLinecap="round">
        <circle cx="100" cy="100" r="56" />
        <circle cx="100" cy="100" r="20" />
        <path d={rays} />
      </g>
    </motion.svg>
  );
}
