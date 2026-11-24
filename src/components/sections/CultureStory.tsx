"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CowrieMark } from "@/components/brand/CowrieMark";
import { Reveal } from "@/components/motion/Reveal";

/** A full-image section with a short serif text block (reference 9). */
export function CultureStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} id="story" aria-labelledby="story-title" className="relative flex h-[720px] scroll-mt-20 items-end overflow-hidden sm:h-[800px]">
      <motion.img
        src="/images/placeholder/queen.jpg"
        alt="A bronze statue of a Benin queen mother wearing coral bead necklaces, cuffs and headdress"
        style={{ y }}
        className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover object-[50%_22%] [filter:sepia(0.35)_saturate(0.85)_brightness(0.72)]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night/90 to-transparent to-60%" />
      <div className="relative mx-auto flex w-full max-w-[1296px] flex-wrap items-end justify-between gap-8 px-5 pb-16 sm:px-[4vw]">
        <Reveal className="flex max-w-[640px] flex-col gap-5">
          <h2 id="story-title" className="m-0 font-display soft text-[clamp(36px,4.4vw,64px)] leading-none font-semibold tracking-[-0.02em]">
            The story of Edo coral
          </h2>
          <p className="m-0 font-formal text-[22px] leading-snug text-cream">
            Coral beads have been part of royal and ceremonial dress in Benin for centuries, worn by kings, chiefs and
            brides. Each Taoué set carries that story, strung by hand at Oba Market.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="hidden text-[#d9be93] opacity-90 sm:block">
          <CowrieMark variant="line" size={88} />
        </Reveal>
      </div>
    </section>
  );
}
