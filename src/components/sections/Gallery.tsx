"use client";

import { motion } from "framer-motion";
import { gallery, slate } from "@/data/content";
import { ConceptLabel, Slates } from "@/components/film/Film";

const EASE = [0.2, 0.7, 0.2, 1] as const;

/** A row of sprocket holes along the edge of the film strip. */
function Sprockets() {
  return (
    <div
      aria-hidden="true"
      className="h-3 w-full [background-image:repeating-linear-gradient(to_right,transparent_0,transparent_10px,rgba(245,237,227,0.16)_10px,rgba(245,237,227,0.16)_22px,transparent_22px,transparent_32px)] [mask-image:linear-gradient(to_bottom,transparent_0,black_2px,black_calc(100%-2px),transparent_100%)]"
    />
  );
}

/**
 * The gallery: the five AI concept images on a strip of film. On phones the strip swipes and
 * snaps frame by frame; on wide screens all five frames sit side by side. Every frame carries
 * its "Concept image" tag.
 */
export function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative overflow-hidden bg-espresso pt-32 pb-24 sm:py-32">
      <Slates tl={slate("gallery")} />
      <div className="mx-auto mb-10 grid w-full max-w-[1296px] items-end gap-6 px-5 sm:px-[4vw] md:grid-cols-2 md:gap-12">
        <h2 id="gallery-title" className="m-0 font-display soft text-[clamp(36px,4.6vw,68px)] leading-none font-semibold tracking-[-0.02em]">
          Gallery
        </h2>
        <p className="m-0 text-lg leading-relaxed text-sand">
          Concept images of our coral: collars, crowns, wedding sets, bracelets and the worktable.
        </p>
      </div>

      <div className="bg-night py-3">
        <Sprockets />
        <ul
          className="m-0 flex list-none snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 py-3 [scrollbar-width:none] sm:scroll-px-[4vw] sm:px-[4vw] lg:mx-auto lg:grid lg:max-w-[1296px] lg:grid-cols-5 lg:overflow-visible"
          aria-label="Concept images"
        >
          {gallery.map((g, i) => (
            <motion.li
              key={g.src}
              className="w-[72vw] max-w-[320px] shrink-0 snap-start lg:w-auto lg:max-w-none"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
            >
              <figure className="group m-0 flex flex-col gap-3">
                <div className="relative aspect-[4/5] overflow-hidden bg-espresso">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-silk [filter:sepia(0.12)_saturate(0.95)] group-hover:scale-105"
                    style={{ objectPosition: g.focus }}
                  />
                  <ConceptLabel className="bottom-3 left-3" />
                </div>
                <figcaption className="flex items-baseline gap-3 text-sand">
                  <span className="font-formal text-base text-gold-soft">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[15px]">{g.title}</span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
        <Sprockets />
      </div>
    </section>
  );
}
