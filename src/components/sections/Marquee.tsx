"use client";

import { motion, useReducedMotion } from "framer-motion";
import { marquee } from "@/data/content";

/** A slow ribbon of what the shop makes, between the hero and the occasions. */
export function Marquee() {
  const reduce = useReducedMotion();
  const row = [...marquee, ...marquee];
  return (
    <section aria-label="What we make" className="overflow-hidden bg-espresso py-7">
      <motion.div
        className="flex w-max gap-14 font-display soft-text text-[26px] whitespace-nowrap text-sand italic sm:text-[30px]"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 38, ease: "linear", repeat: Infinity }}
      >
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-14">
            {w}
            <span className="text-coral not-italic" aria-hidden="true">
              •
            </span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
