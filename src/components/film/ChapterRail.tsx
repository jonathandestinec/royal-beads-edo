"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { chapters } from "@/data/content";

/** A thin progress line down the right edge, with the current chapter's number and name. */
export function ChapterRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = chapters.findIndex((c) => c.id === e.target.id);
            if (i >= 0) setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Chapters" className="pointer-events-none fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 items-center gap-3 lg:flex">
      <div className="text-right text-[11px] uppercase tracking-[0.22em] text-cream/70">
        <span className="font-formal text-base text-cream">{String(active + 1).padStart(2, "0")}</span>
        <span className="block">{chapters[active].label}</span>
      </div>
      <div className="pointer-events-auto relative h-48 w-px bg-cream/20">
        <motion.div style={{ scaleY }} className="absolute inset-0 origin-top bg-coral" />
        {chapters.map((c, i) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            aria-label={`Chapter ${i + 1}: ${c.label}`}
            className={`absolute -left-[3px] size-[7px] rounded-full transition-colors ${i <= active ? "bg-coral" : "bg-cream/40"}`}
            style={{ top: `calc(${(i / (chapters.length - 1)) * 100}% - 3px)` }}
          />
        ))}
      </div>
    </nav>
  );
}
