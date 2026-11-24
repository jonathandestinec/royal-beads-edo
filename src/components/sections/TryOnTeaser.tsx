"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { IMG } from "@/data/content";
import { COWRIE_SMALL_PATH } from "@/components/brand/CowrieMark";
import { Slates } from "@/components/film/Film";
import { EnquireButton, pill, pillStyles } from "@/components/ui/EnquireButton";

/**
 * Chapter 6: see it on you. The client's real problem was a set that looked different in person
 * than in a photo; this scene introduces the virtual try-on. The photo reveals itself through
 * a cowrie-shaped window that opens as you scroll.
 */
/** The cowrie shape as a CSS mask, so the photo shows through the shell. */
const COWRIE_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 120'><path fill-rule='evenodd' d='${COWRIE_SMALL_PATH}'/></svg>`,
)}")`;

export function TryOnTeaser() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const maskScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.55, 1]);
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.25, 1]);

  return (
    <section ref={ref} id="try-on" aria-labelledby="try-title" className="relative overflow-hidden bg-night py-24 sm:py-32">
      <Slates tl="Chapter 06 · Try it on" tr="Coming soon" />
      <div className="mx-auto grid max-w-[1296px] items-center gap-12 px-5 sm:px-[4vw] md:grid-cols-2">
        <motion.div
          style={{ scale: maskScale, WebkitMaskImage: COWRIE_MASK, maskImage: COWRIE_MASK, WebkitMaskSize: "100% 100%", maskSize: "100% 100%" }}
          className="relative mx-auto aspect-[100/120] w-full max-w-[460px] overflow-hidden"
        >
          <div className="absolute inset-0">
            <motion.img
              src={IMG.bride}
              alt="A woman wearing layered coral necklaces and a coral crown"
              style={{ scale: imgScale }}
              className="h-full w-full object-cover object-[50%_35%] [filter:sepia(0.2)_saturate(0.9)_brightness(0.92)]"
              loading="lazy"
            />
          </div>
        </motion.div>
        <motion.div
          className="flex flex-col items-start gap-5"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <h2 id="try-title" className="m-0 font-display soft text-[clamp(36px,4.6vw,68px)] leading-none font-semibold tracking-[-0.02em]">
            See it on you before you buy
          </h2>
          <p className="m-0 max-w-[30em] text-lg leading-relaxed text-sand">
            A photo can only show so much. Turn on your camera and the virtual try-on places coral crowns and necklaces on
            you. Swap styles, match them to your attire, then send the look straight into your enquiry. It runs on your
            phone, and no photo leaves it.
          </p>
          <div className="flex flex-wrap gap-3">
            <EnquireButton variant="cream" message="Hello, I'd like to try on a coral set.">
              Try it on
            </EnquireButton>
            <a href="#enquire" className={`${pill} ${pillStyles.ghost}`}>
              Upload a selfie instead
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
