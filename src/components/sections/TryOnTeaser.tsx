"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { EnquireButton, pill, pillStyles } from "@/components/ui/EnquireButton";

/**
 * The client's main problem: a customer received a set that didn't match what the photo
 * suggested. This section introduces the virtual try-on that answers it.
 */
export function TryOnTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="try-on" aria-labelledby="try-title" className="scroll-mt-20 pb-24 sm:pb-32">
      <div className="mx-auto grid max-w-[1296px] items-center gap-12 px-5 sm:px-[4vw] md:grid-cols-2">
        <Reveal>
          <div ref={ref} className="relative h-[460px] overflow-hidden rounded-t-[300px] rounded-b-3xl bg-espresso sm:h-[640px]">
            <motion.img
              src="/images/placeholder/bride.jpg"
              alt="A woman wearing layered coral necklaces and a coral crown"
              style={{ y }}
              className="warm absolute inset-0 h-[116%] w-full -top-[8%] object-cover object-[50%_58%]"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col items-start gap-5">
          <span className="inline-flex rounded-full bg-saoky px-3.5 py-2 text-sm font-medium text-sand">Coming soon</span>
          <h2 id="try-title" className="m-0 font-display soft text-[clamp(36px,4.4vw,64px)] leading-none font-semibold tracking-[-0.02em]">
            See it on you before you buy
          </h2>
          <p className="m-0 max-w-[30em] text-lg leading-relaxed text-sand">
            Turn on your camera and the virtual try-on places coral crowns and necklaces on you. Swap styles, match them
            to your attire, then send the look straight into your enquiry. It runs on your phone, and no photo leaves it.
          </p>
          <div className="flex flex-wrap gap-3">
            <EnquireButton variant="cream" message="Hello, I'd like to try on a coral set.">
              Try it on
            </EnquireButton>
            <a href="#enquire" className={`${pill} ${pillStyles.ghost}`}>
              Upload a selfie instead
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
