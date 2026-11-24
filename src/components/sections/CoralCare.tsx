"use client";

import { motion } from "framer-motion";
import { careTips, coralChecks } from "@/data/content";
import { CowrieMark } from "@/components/brand/CowrieMark";
import { CowriePattern } from "@/components/brand/CowriePattern";
import { Slates } from "@/components/film/Film";

const tilts = [-3, 2, -1.5, 2.5];

/**
 * Chapter 7: real coral, cared for. The four authenticity checks are dealt onto a rust cowrie
 * cloth like letters (after the Siloha note cards); care tips sit underneath.
 */
export function CoralCare() {
  return (
    <section id="care" aria-labelledby="care-title" className="relative overflow-hidden bg-rust py-24 sm:py-32">
      <CowriePattern bg="#a5502f" fg="#994729" tile={72} />
      <Slates tl="Chapter 07 · Real coral" tr="A buyer's guide" />
      <div className="relative mx-auto flex max-w-[1296px] flex-col gap-12 px-5 sm:px-[4vw]">
        <div className="grid items-end gap-6 text-paper md:grid-cols-2 md:gap-12">
          <h2 id="care-title" className="m-0 font-display soft text-[clamp(36px,4.6vw,68px)] leading-none font-semibold tracking-[-0.02em]">
            Is it real coral?
          </h2>
          <p className="m-0 text-lg leading-relaxed">
            It is the question we hear most. Four checks that never harm a bead, and how to keep yours beautiful for
            years.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coralChecks.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 80, rotate: tilts[i] * 4 }}
              whileInView={{ opacity: 1, y: 0, rotate: tilts[i] }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1], delay: i * 0.12 }}
              whileHover={{ rotate: 0, y: -6 }}
              className="flex min-h-[300px] flex-col gap-4 bg-paper p-7 text-rust shadow-[0_18px_40px_rgba(40,12,8,0.3)]"
            >
              <span className="font-formal text-4xl leading-none">{i + 1}</span>
              <h3 className="m-0 font-display soft text-[28px] leading-tight font-semibold">{c.title}</h3>
              <p className="m-0 text-[15px] leading-relaxed text-saoky">{c.body}</p>
            </motion.article>
          ))}
        </div>

        <div className="notch grid gap-6 bg-envelope p-8 text-cream md:grid-cols-[auto_1fr_1fr_1fr] md:items-center">
          <CowrieMark variant="line" size={44} color="#d8b977" />
          {careTips.map((t) => (
            <div key={t.title} className="flex flex-col gap-1">
              <span className="font-display soft text-xl font-semibold">{t.title}</span>
              <span className="text-[15px] leading-relaxed text-sand">{t.body}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
