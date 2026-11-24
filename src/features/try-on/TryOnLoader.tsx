"use client";

import dynamic from "next/dynamic";

/** The try-on only runs in the browser: the camera and face tracking never run during the build. */
export const TryOnLoader = dynamic(() => import("./TryOn"), {
  ssr: false,
  loading: () => <div className="min-h-[100dvh] bg-night" />,
});
