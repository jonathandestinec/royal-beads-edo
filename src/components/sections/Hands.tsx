"use client";

import { motion } from "framer-motion";
import { IMG, PHOTO_CREDIT, slate } from "@/data/content";
import { Backdrop, ConceptLabel, PhotoCredit, Slates, WriteOn, useSceneProgress } from "@/components/film/Film";
import { CowrieMark } from "@/components/brand/CowrieMark";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/**
 * The hands. A full-screen frame of the workshop, then a bento of close-ups in
 * notched tiles (after the Saoky board), mixing photographs and solid brand colour.
 */
export function Hands() {
  const { ref, progress } = useSceneProgress();

  return (
    <section id="hands" aria-labelledby="hands-title" className="relative scroll-mt-0 bg-night">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="relative flex min-h-[100svh] items-end overflow-hidden">
        <Backdrop
          src={IMG.workshop}
          alt="An artisan's hands stringing red-orange coral beads at a wooden worktable"
          focus="60% 45%"
          progress={progress}
          grade="sepia(0.15) saturate(0.95) brightness(0.62)"
          concept
        />
        <Slates tl={slate("hands")} />
        <div className="relative z-10 mx-auto w-full max-w-[1296px] px-5 pb-20 sm:px-[4vw]">
          <h2 id="hands-title" className="m-0 max-w-[16ch] font-display soft text-[clamp(40px,6vw,88px)] leading-[0.98] font-semibold tracking-[-0.02em]">
            <WriteOn lines={["Every set is strung", "by hand."]} />
          </h2>
          <motion.p
            className="mt-6 mb-0 max-w-[28em] text-lg leading-relaxed text-sand"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Chosen, matched and strung to order at Oba Market.
          </motion.p>
        </div>
      </div>

      <div className="mx-auto max-w-[1296px] px-5 py-24 sm:px-[4vw] sm:py-32">
        <RevealGroup className="grid auto-rows-[260px] gap-3 sm:grid-cols-3 lg:auto-rows-[420px]">
          <RevealItem className="notch relative overflow-hidden bg-espresso">
            <Tile src={IMG.bracelets} alt="A hand wearing three stacked coral bead bracelets" focus="40% 40%" concept />
          </RevealItem>
          <RevealItem className="notch flex flex-col items-center justify-center gap-6 bg-cream p-8 text-center text-saoky">
            <CowrieMark variant="pattern" size={72} color="#4a3022" patternColor="#d2503b" />
            <p className="m-0 font-display soft text-[30px] leading-tight font-semibold">Polished, matched, strung.</p>
          </RevealItem>
          <RevealItem className="notch relative overflow-hidden bg-espresso">
            <Tile src={IMG.couple} alt="A bride and groom in coral bead regalia" focus="50% 15%" credit={PHOTO_CREDIT[IMG.couple]} />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}

function Tile({ src, alt, focus, concept, credit }: { src: string; alt: string; focus: string; concept?: boolean; credit?: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="warm h-full w-full object-cover transition-transform duration-[1400ms] ease-silk hover:scale-105"
        style={{ objectPosition: focus }}
      />
      {concept && <ConceptLabel className="bottom-3 left-3" />}
      {credit && <PhotoCredit credit={credit} className="bottom-3 left-3" />}
    </>
  );
}
