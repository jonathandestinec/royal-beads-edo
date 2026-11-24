"use client";

import { useEffect, useRef, useState } from "react";
import { MUSIC_SRC } from "@/config/site";

/**
 * Opt-in Afro-jazz. Browsers block sound that starts on its own, and it is kinder to visitors,
 * so music only plays after a press. The button hides itself if no track is installed.
 */
export function MusicToggle({ className = "" }: { className?: string }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!MUSIC_SRC) return;
    fetch(MUSIC_SRC, { method: "HEAD" })
      .then((r) => {
        if (!cancelled && r.ok) setAvailable(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      audio.current?.pause();
    };
  }, []);

  if (!available) return null;

  const toggle = async () => {
    if (!audio.current) {
      audio.current = new Audio(MUSIC_SRC);
      audio.current.loop = true;
      audio.current.volume = 0.5;
    }
    if (playing) {
      audio.current.pause();
      setPlaying(false);
    } else {
      try {
        await audio.current.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      className={`inline-flex h-12 items-center gap-2.5 rounded-full border-[1.5px] border-cream/50 bg-night/50 pr-[18px] pl-2 text-[15px] font-medium text-cream transition hover:bg-night/70 ${className}`}
    >
      <span className="inline-flex size-8 items-center justify-center rounded-full bg-coral">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff5ec" aria-hidden="true">
          <path d={playing ? "M6 4h4v16H6zM14 4h4v16h-4z" : "M7 4l13 8-13 8z"} />
        </svg>
      </span>
      {playing ? "Pause Afro-jazz" : "Play Afro-jazz"}
    </button>
  );
}
