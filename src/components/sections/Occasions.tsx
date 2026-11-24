"use client";

import { motion } from "framer-motion";
import { occasions } from "@/data/content";
import { buildEnquireUrl } from "@/config/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

/** Cards with a large photo behind and a cream panel in front (reference 11). */
export function Occasions() {
  return (
    <section id="occasions" aria-labelledby="occasions-title" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto flex max-w-[1296px] flex-col gap-11 px-5 sm:px-[4vw]">
        <Reveal className="grid items-end gap-6 md:grid-cols-2 md:gap-12">
          <h2 id="occasions-title" className="m-0 font-display soft text-[clamp(36px,4.4vw,64px)] leading-none font-semibold tracking-[-0.02em]">
            Sets for every occasion
          </h2>
          <p className="m-0 text-lg leading-relaxed text-sand">
            Choose the day you are dressing for. Every set can be bought or rented, and made to order in two to three
            weeks. Prices are ranges in naira; we quote each set after hearing what you need, and quote in pounds or
            dollars for orders abroad.
          </p>
        </Reveal>
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {occasions.map((o) => (
            <RevealItem key={o.title}>
              <motion.a
                href={buildEnquireUrl(`Hello, I'd like to ask about ${o.title.toLowerCase()} sets.`)}
                whileHover="hover"
                className="group relative flex h-[440px] flex-col justify-end overflow-hidden rounded-3xl bg-espresso p-3 no-underline sm:h-[520px]"
              >
                <motion.img
                  src={o.image}
                  alt={o.alt}
                  variants={{ hover: { scale: 1.07 } }}
                  transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
                  className="warm absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: o.focus }}
                />
                <motion.div
                  variants={{ hover: { y: -6 } }}
                  transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                  className="relative flex items-end justify-between gap-3 rounded-[18px] bg-cream px-5 py-4 text-espresso"
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
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
