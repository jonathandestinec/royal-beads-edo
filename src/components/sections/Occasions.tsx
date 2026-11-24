"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { occasions, type Occasion } from "@/data/content";
import { buildEnquireUrl } from "@/config/site";
import { ConceptLabel, Slates } from "@/components/film/Film";

/**
 * Chapter 5: sets for every occasion. On wide screens the scene pins and the cards slide across
 * as you scroll; on phones it is a swipeable row. Each card opens the enquiry for that occasion.
 */
export function Occasions() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], reduce ? ["0%", "0%"] : ["0%", "-52%"]);

  return (
    <section ref={ref} id="occasions" aria-labelledby="occasions-title" className="relative bg-espresso lg:h-[260vh]">
      <div className="relative flex flex-col justify-center overflow-hidden py-24 lg:sticky lg:top-0 lg:h-[100svh] lg:py-0">
        <Slates tl="Chapter 05 · Occasions" tr="Buy or rent" />
        <div className="mx-auto mb-10 grid w-full max-w-[1296px] items-end gap-6 px-5 sm:px-[4vw] md:grid-cols-2 md:gap-12">
          <h2 id="occasions-title" className="m-0 font-display soft text-[clamp(36px,4.6vw,68px)] leading-none font-semibold tracking-[-0.02em]">
            Sets for every occasion
          </h2>
          <p className="m-0 text-lg leading-relaxed text-sand">
            Every set can be bought or rented, and made to order in two to three weeks. Prices are ranges in naira; we
            quote each set after hearing what you need, and quote in pounds or dollars for orders abroad.
          </p>
        </div>

        {/* Phones and tablets: swipe. */}
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-[4vw] lg:hidden">
          {occasions.map((o) => (
            <Card key={o.title} o={o} className="w-[78vw] max-w-[360px] shrink-0 snap-start" />
          ))}
        </div>

        {/* Wide screens: the row slides as the page scrolls. */}
        <motion.div style={{ x }} className="hidden gap-6 pl-[4vw] lg:flex">
          {occasions.map((o) => (
            <Card key={o.title} o={o} className="w-[30vw] max-w-[440px] shrink-0" />
          ))}
          <div className="flex w-[30vw] max-w-[440px] shrink-0 flex-col justify-center gap-4 pr-[4vw]">
            <p className="m-0 font-display soft text-[40px] leading-tight font-semibold">Not sure which set?</p>
            <p className="m-0 text-lg text-sand">Tell us the day and we will suggest the right one.</p>
            <a href={buildEnquireUrl("Hello, which set would suit my occasion?")} className="self-start text-lg font-semibold text-coral-soft underline underline-offset-4">
              Ask us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Card({ o, className }: { o: Occasion; className: string }) {
  return (
    <motion.a
      href={buildEnquireUrl(`Hello, I'd like to ask about ${o.title.toLowerCase()} sets.`)}
      whileHover="hover"
      className={`notch group relative flex h-[min(62svh,560px)] flex-col justify-end overflow-hidden bg-night p-3 no-underline ${className}`}
    >
      <motion.img
        src={o.image}
        alt={o.alt}
        variants={{ hover: { scale: 1.07 } }}
        transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
        className="absolute inset-0 h-full w-full object-cover [filter:sepia(0.2)_saturate(0.9)_brightness(0.85)]"
        style={{ objectPosition: o.focus }}
        loading="lazy"
      />
      {o.concept && <ConceptLabel className="top-3 left-3" />}
      <motion.div
        variants={{ hover: { y: -6 } }}
        transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
        className="notch relative flex items-end justify-between gap-3 bg-cream px-5 py-4 text-espresso"
      >
        <span className="flex flex-col gap-1">
          <span className="font-display soft text-[26px] leading-none font-semibold">{o.title}</span>
          <span className="text-[15px] leading-snug text-saoky">{o.line}</span>
          <span className="mt-1 font-formal text-[15px] text-rust">{o.price}</span>
        </span>
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-coral text-[#fff5ec] transition-transform duration-500 group-hover:rotate-45" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M8 7h9v9" />
          </svg>
        </span>
      </motion.div>
    </motion.a>
  );
}
