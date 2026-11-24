"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { site } from "@/config/site";
import { IMG, slate } from "@/data/content";
import { ConceptLabel, Slates } from "@/components/film/Film";
import { EnquireButton, pill, pillStyles } from "@/components/ui/EnquireButton";
import { MusicToggle } from "@/components/ui/MusicToggle";

/**
 * The hero: the first thing on the page. AI image 1 fills the screen and slowly pushes in
 * (Ken Burns); the headline, the business line and both buttons sit on it from the first paint.
 * On phones the copy sits at the bottom, under her face; on wide screens the image moves right
 * and the copy takes the dark left side.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "12%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-20%"]);
  const fade = useTransform(scrollYProgress, [0.55, 1], [1, 0.35]);

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-night px-5 pt-[104px] pb-12 sm:px-[4vw] lg:justify-center lg:pb-16"
    >
      {/* AI image 1, full bleed, with a slow push-in. */}
      <motion.div style={{ y: imgY, opacity: fade }} className="absolute inset-0 lg:left-[34%]">
        <div className="hero-kenburns absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG.heroPortrait}
            alt="A woman with closed eyes and braided hair wearing a chunky necklace of red-orange coral beads"
            fetchPriority="high"
            className="h-full w-full object-cover object-[56%_22%] [filter:sepia(0.12)_saturate(0.95)_brightness(0.92)] lg:object-[50%_30%]"
          />
        </div>
      </motion.div>

      {/* Warm dark grade: heavier at the bottom on phones, on the left on wide screens. */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(28,20,17,0.96)_0%,rgba(28,20,17,0.82)_30%,rgba(28,20,17,0.15)_58%,rgba(28,20,17,0.45)_100%)] lg:bg-[linear-gradient(to_right,#1c1411_0%,#1c1411_32%,rgba(28,20,17,0.55)_46%,rgba(28,20,17,0)_62%),linear-gradient(to_top,rgba(28,20,17,0.85)_0%,rgba(28,20,17,0)_35%,rgba(28,20,17,0)_80%,rgba(28,20,17,0.5)_100%)]" />
      <div className="vignette pointer-events-none absolute inset-0 opacity-70" />

      <Slates tl={slate("top")} />
      <ConceptLabel className="top-[76px] right-5 sm:top-[92px] sm:right-[4vw]" />

      <motion.div
        style={{ y: copyY }}
        className="hero-rise relative z-10 mx-auto flex w-full max-w-[1296px] flex-col items-start gap-4 text-left"
      >
        <h1
          id="hero-title"
          className="m-0 max-w-[13ch] font-display soft text-[clamp(40px,5vw,76px)] leading-[0.98] font-semibold tracking-[-0.02em] [text-shadow:0_2px_24px_rgba(28,20,17,0.6)]"
        >
          Coral beads and traditional attire from Benin City
        </h1>
        <p className="m-0 max-w-[34em] text-lg leading-relaxed text-sand">
          {site.brand} by {site.name} · {site.location.area}
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <EnquireButton message="Hello, I'd like to ask about a coral set.">Enquire about a set</EnquireButton>
          <a href="#opening" className={`${pill} ${pillStyles.ghost} bg-night/30 backdrop-blur-[2px]`}>
            Begin the story
          </a>
        </div>
      </motion.div>

      {/* A quiet scroll cue: a short line that keeps drawing downwards. */}
      <a
        href="#opening"
        aria-label="Scroll to the story"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-cream/70 [@media(min-height:900px)]:flex"
      >
        Scroll
        <span className="relative block h-10 w-px overflow-hidden bg-cream/20">
          <motion.span
            className="absolute inset-x-0 top-0 block h-1/2 bg-cream"
            animate={reduce ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </a>

      <div className="absolute right-[4vw] bottom-8 z-10 hidden sm:block">
        <MusicToggle />
      </div>
    </section>
  );
}
