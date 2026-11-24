"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { site } from "@/config/site";
import { storyBeats } from "@/data/content";
import { EnquireButton, pill, pillStyles } from "@/components/ui/EnquireButton";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { Scribble } from "./Scribble";

const EASE = [0.2, 0.7, 0.2, 1] as const;

/** Story beats change in step with the scribble: cowrie, then coral, then today. */
function StoryBeats() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % storyBeats.length), 3600);
    return () => clearInterval(t);
  }, [reduce]);

  const text = reduce ? storyBeats[storyBeats.length - 1] : storyBeats[i];

  return (
    <p className="relative m-0 h-[2.5em] text-center font-display soft-text text-lg leading-tight italic sm:text-[26px] lg:h-[2.6em]" aria-live="off">
      <AnimatePresence mode="wait">
        <motion.span
          key={text}
          className="absolute inset-x-0"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[760px] items-end overflow-hidden sm:min-h-[100svh] sm:max-h-[1000px]"
    >
      <motion.img
        src="/images/placeholder/bride.jpg"
        alt="A bride in a coral bead crown, layered coral necklaces and coral cuffs"
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 h-full w-full object-cover object-[50%_24%] [filter:sepia(0.35)_saturate(0.85)_brightness(0.6)]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/15 to-night/50" />

      <div className="pointer-events-none absolute top-[90px] left-1/2 w-[min(64vw,300px)] -translate-x-1/2 lg:top-[12%] lg:right-[6vw] lg:left-auto lg:w-[min(30vw,400px)] lg:translate-x-0">
        <Scribble className="h-auto w-full" />
        <div className="mt-3 hidden lg:block">
          <StoryBeats />
        </div>
      </div>

      <motion.div
        style={{ y: copyY }}
        className="relative z-10 mx-auto flex w-full max-w-[1296px] flex-col gap-6 px-5 pb-12 sm:px-[4vw] lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="flex max-w-[640px] flex-col gap-4">
          <div className="lg:hidden">
            <StoryBeats />
          </div>
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            className="m-0 font-display soft text-[clamp(40px,5.4vw,76px)] leading-none font-semibold tracking-[-0.02em]"
          >
            Coral beads and traditional attire from Benin City
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.4 }}
            className="m-0 text-lg leading-relaxed text-sand"
          >
            {site.brand} by {site.name}, {site.location.area}. Wedding, chieftaincy and festival sets, shipped to the UK,
            US and beyond.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.55 }}
            className="mt-1 flex flex-wrap gap-3"
          >
            <EnquireButton message="Hello, I'd like to ask about a coral set.">Enquire about a set</EnquireButton>
            <a href="#try-on" className={`${pill} ${pillStyles.cream}`}>
              Try it on
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <MusicToggle />
        </motion.div>
      </motion.div>
    </section>
  );
}
