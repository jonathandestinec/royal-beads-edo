"use client";

import { motion, type Variants } from "framer-motion";

const EASE = [0.2, 0.7, 0.2, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Distance in px the element rises from. */
  y?: number;
};

/** Fades and lifts its content into place once, when it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const group: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.09 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

/** A container whose RevealItem children arrive one after another. */
export function RevealGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={group}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
