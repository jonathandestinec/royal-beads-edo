"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { CowrieMark } from "@/components/brand/CowrieMark";
import { Wordmark } from "@/components/brand/Wordmark";
import { EnquireButton } from "@/components/ui/EnquireButton";

const links = [
  { href: "#sea", label: "Our story" },
  { href: "#occasions", label: "Occasions" },
  { href: "#try-on", label: "Try on" },
  { href: "#care", label: "Real coral" },
  { href: "#enquire", label: "Custom orders" },
];

/** Transparent over the hero, then a solid brown bar once the visitor scrolls. */
export function Header() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 80));

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid || open ? "bg-espresso/95 shadow-[0_8px_30px_rgba(0,0,0,0.25)]" : "bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-[1296px] items-center justify-between gap-5 px-5 py-4 sm:px-[4vw]">
        <a href="#top" className="flex items-center gap-2.5 text-cream no-underline" aria-label="Taoué by Royal Beads Edo, back to top">
          <CowrieMark variant="small" size={26} />
          <Wordmark size={30} bead="#e8755f" />
        </a>
        <nav aria-label="Site" className="hidden gap-7 text-base lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-cream no-underline transition-colors hover:text-sand">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <EnquireButton variant="cream" className="!h-11 !px-5">
            Enquire
          </EnquireButton>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-cream lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Site" className="flex flex-col gap-1 px-5 pb-5 lg:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-2 py-3 text-lg text-cream no-underline hover:bg-saoky">
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </motion.header>
  );
}
