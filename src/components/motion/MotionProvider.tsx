"use client";

import { MotionConfig } from "framer-motion";

/** Every animation on the site respects the visitor's reduced-motion setting. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
