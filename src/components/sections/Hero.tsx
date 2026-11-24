"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { site } from "@/config/site";
import { storyBeats } from "@/data/content";
import { EnquireButton, pill, pillStyles } from "@/components/ui/EnquireButton";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { Scribble } from "./Scribble";

const EASE = [0.2, 0.7, 0.2, 1] as const;

/** How long the loading intro plays before the hero is revealed, in seconds. */
export const INTRO_SECONDS = 5.6;

/**
 * The hero. On load, a dark veil covers the page while the scribble draws the cowrie and coral
 * story in the centre, with three story lines beneath it. The veil then lifts, the drawing
 * settles into place above the headline, and the rest of the hero rises in.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const [introOn, setIntro] = useState(true);
  const intro = introOn && !reduce;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  useEffect(() => {
    if (reduce) return;
    document.documentElement.dataset.intro = "on";
    const t = setTimeout(() => {
      setIntro(false);
      delete document.documentElement.dataset.intro;
    }, INTRO_SECONDS * 1000);
    return () => {
      clearTimeout(t);
      delete document.documentElement.dataset.intro;
    };
  }, [reduce]);

  const later = reduce ? 0 : INTRO_SECONDS + 0.4;

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[760px] flex-col items-center overflow-hidden px-5 pt-[104px] pb-14 sm:min-h-[100svh] sm:px-[4vw]"
    >
      <motion.img
        src="/images/placeholder/bride.jpg"
        alt="A bride in a coral bead crown, layered coral necklaces and coral cuffs"
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 h-full w-full object-cover object-[50%_24%] [filter:sepia(0.35)_saturate(0.85)_brightness(0.5)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_45%,rgba(28,20,17,0.55)_0%,rgba(28,20,17,0.2)_70%),linear-gradient(to_top,rgba(28,20,17,0.9)_0%,rgba(28,20,17,0.1)_45%,rgba(28,20,17,0.5)_100%)]" />

      {/* Loading veil: covers the whole screen while the story draws, then lifts. */}
      <AnimatePresence>
        {intro && (
          <motion.div
            key="veil"
            className="fixed inset-0 z-[60] flex items-end justify-center bg-night pb-[18vh]"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.6, 0, 0.2, 1] }}
          >
            <IntroBeats />
            <button
              type="button"
              onClick={() => {
                setIntro(false);
                delete document.documentElement.dataset.intro;
              }}
              className="absolute right-5 bottom-5 rounded-full px-4 py-2 text-sm text-sand/80 transition hover:text-cream sm:right-8 sm:bottom-8"
            >
              Skip intro
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The scribble sits above the veil, centred, and settles into the hero when the veil lifts. */}
      <motion.div
        className="relative z-[70] w-[clamp(170px,17vw,250px)] origin-[50%_40%]"
        initial={reduce ? false : { y: 90, scale: 1.2 }}
        animate={{ y: intro ? 90 : 0, scale: intro ? 1.2 : 1 }}
        transition={{ duration: 1.3, ease: EASE }}
      >
        <Scribble className="h-auto w-full overflow-visible" />
      </motion.div>

      <motion.div style={{ y: copyY }} className="relative z-10 mt-10 flex w-full max-w-[880px] flex-col items-center gap-4 text-center">
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: later }}
          className="m-0 font-display soft text-[clamp(36px,4.4vw,64px)] leading-none font-semibold tracking-[-0.02em]"
        >
          Coral beads and traditional attire from Benin City
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: later + 0.15 }}
          className="m-0 max-w-[620px] text-lg leading-relaxed text-sand"
        >
          {site.brand} by {site.name}, {site.location.area}. Wedding, chieftaincy and festival sets, shipped to the UK,
          US and beyond.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: later + 0.3 }}
          className="mt-1 flex flex-wrap justify-center gap-3"
        >
          <EnquireButton message="Hello, I'd like to ask about a coral set.">Enquire about a set</EnquireButton>
          <a href="#try-on" className={`${pill} ${pillStyles.cream}`}>
            Try it on
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: later + 0.6 }}
        className="relative z-10 mt-8 sm:absolute sm:right-[4vw] sm:bottom-10 sm:mt-0"
      >
        <MusicToggle />
      </motion.div>
    </section>
  );
}

/** The three story lines shown under the drawing while the intro plays. */
function IntroBeats() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => Math.min(n + 1, storyBeats.length - 1)), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <p className="relative m-0 h-[2.5em] w-full max-w-[680px] px-5 text-center font-display soft-text text-xl leading-tight text-cream italic sm:text-[28px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          className="absolute inset-x-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {storyBeats[i]}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}
