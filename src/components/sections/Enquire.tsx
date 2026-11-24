"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/config/site";
import { steps } from "@/data/content";
import { Backdrop, Slates, WriteOn, useSceneProgress } from "@/components/film/Film";
import { CowrieMark } from "@/components/brand/CowrieMark";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { EnquireButton } from "@/components/ui/EnquireButton";

const EASE = [0.45, 0.05, 0.3, 1] as const;

/**
 * Chapter 8: your day. The end of the story, where the visitor enquires. A full-screen wedding
 * frame, the three steps of a custom order, visit details, and the main Enquire button with the
 * scribble drawing a closing line under it.
 */
export function Enquire() {
  const { ref, progress } = useSceneProgress();
  const reduce = useReducedMotion();
  const { area, city } = site.location;

  return (
    <section
      ref={ref}
      id="enquire"
      aria-labelledby="enquire-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden py-28"
    >
      <Backdrop
        src="/video/yourday.mp4"
        poster="/video/yourday-poster.jpg"
        focus="50% 40%"
        progress={progress}
        grade="brightness(0.5)"
      />
      <Slates tl="08 · Your day" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col items-center gap-10 px-5 text-center sm:px-[4vw]">
        <CowrieMark variant="pattern" size={64} color="#e6d2b0" patternColor="#5a3826" />
        <h2 id="enquire-title" className="m-0 font-display soft text-[clamp(44px,6.6vw,100px)] leading-[0.96] font-semibold tracking-[-0.02em]">
          <WriteOn lines={["Tell us about", "your day."]} />
        </h2>

        <RevealGroup className="grid w-full gap-3 text-left md:grid-cols-3">
          {steps.map((s, i) => (
            <RevealItem key={s.title} className="notch flex flex-col gap-2 bg-night/70 p-6 backdrop-blur-sm">
              <span className="font-formal text-3xl leading-none text-gold-soft">{i + 1}</span>
              <h3 className="m-0 font-display soft text-xl font-semibold">{s.title}</h3>
              <p className="m-0 text-[15px] leading-relaxed text-sand">{s.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="flex flex-col items-center gap-2">
          <EnquireButton className="!h-14 !px-9 text-[17px]" message="Hello, I'd like to enquire about a set for my event.">
            Enquire about a set
          </EnquireButton>
          <svg viewBox="0 0 300 30" className="h-6 w-[260px]" aria-hidden="true">
            <defs>
              <filter id="end-boil">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves={2} seed={5} result="n">
                  {!reduce && <animate attributeName="seed" values="5;1;8;3" dur="0.55s" calcMode="discrete" repeatCount="indefinite" />}
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="n" scale={2.5} />
              </filter>
            </defs>
            <motion.path
              d="M10 15 C 60 4, 110 26, 150 15 S 240 4, 290 15"
              fill="none"
              stroke="#fff8ee"
              strokeWidth={2}
              strokeLinecap="round"
              filter="url(#end-boil)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: EASE, delay: 0.6 }}
            />
          </svg>
        </div>

        <p className="m-0 text-sm tracking-wide text-sand">
          {area}, {city} · {site.hours}
        </p>
      </div>
    </section>
  );
}
