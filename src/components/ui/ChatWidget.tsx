"use client";

import Script from "next/script";
import { useState } from "react";
import { CHAT_CONFIG_SRC, CHAT_INJECT_SRC } from "@/config/site";

/** Brand styling merged into the Botpress config, so the bubble matches the site. */
const brandStyle = {
  color: "#d2503b",
  variant: "solid",
  themeMode: "dark",
  radius: 1.5,
};

type Botpress = {
  on: (event: string, cb: () => void) => void;
  config: (opts: { configuration: Record<string, unknown> }) => void;
  configuration?: Record<string, unknown>;
};

/**
 * The Taoué Assistant (Botpress webchat). The bot's answers and settings live in Botpress;
 * this only loads it, in order: inject.js first, then the bot's config script.
 * Once the bot starts, the brand colours are applied on top of its settings.
 */
export function ChatWidget() {
  const [ready, setReady] = useState(false);
  if (!CHAT_INJECT_SRC || !CHAT_CONFIG_SRC) return null;

  return (
    <>
      <Script
        src={CHAT_INJECT_SRC}
        strategy="afterInteractive"
        onReady={() => {
          const bp = (window as unknown as { botpress?: Botpress }).botpress;
          // init() is read-only, so restyle once the bot has started.
          bp?.on("webchat:initialized", () =>
            bp.config({ configuration: { ...bp.configuration, ...brandStyle } }),
          );
          setReady(true);
        }}
      />
      {ready && <Script src={CHAT_CONFIG_SRC} strategy="afterInteractive" />}
    </>
  );
}
