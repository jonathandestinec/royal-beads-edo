"use client";

import dynamic from "next/dynamic";

/** The builder draws its bead art on canvases, so it only runs in the browser. */
export const BuilderLoader = dynamic(() => import("./Builder"), {
  ssr: false,
  loading: () => <div className="min-h-[100dvh] bg-night" />,
});
