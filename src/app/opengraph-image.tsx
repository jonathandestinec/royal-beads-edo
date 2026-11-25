import { ImageResponse } from "next/og";
import { MOUTH_FULL, SHELL } from "@/components/brand/CowrieMark";
import { site } from "@/config/site";

/**
 * The share image for every page (Open Graph and X/Twitter), drawn at build time.
 * Brand moment, so it uses the patterned cowrie, the soft Fraunces wordmark with its coral bead,
 * and the dark Saoky browns with cream text.
 */

export const alt = `${site.brand} by ${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// The site is a static export, so the image is drawn once, at build time.
export const dynamic = "force-static";

/** Loads one font file from Google Fonts as TrueType. Returns null if the network is down, so the build never fails on it. */
async function font(query: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${query}`)).text();
    const url = css.match(/src: url\((https:[^)]+\.ttf)\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

/** The patterned cowrie mark as an SVG data URL (same drawing as CowrieMark variant="pattern"). */
function cowrie(color: string, pattern: string): string {
  const zig = (y: number) => Array.from({ length: 10 }, (_, i) => `${58 + i * 4},${i % 2 ? y - 6 : y}`).join(" ");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120">
<defs><clipPath id="c"><path d="${SHELL}"/></clipPath></defs>
<path fill-rule="evenodd" fill="${color}" d="${SHELL + MOUTH_FULL}"/>
<g clip-path="url(#c)"><rect x="58" y="46" width="40" height="74" fill="${pattern}"/>
<g fill="none" stroke="${color}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round">
<line x1="58" y1="52" x2="96" y2="52"/><polyline points="${zig(62)}"/><line x1="58" y1="66" x2="96" y2="66"/>
<polyline points="${zig(76)}"/><line x1="58" y1="80" x2="96" y2="80"/><circle cx="74" cy="89" r="4.2"/>
<circle cx="74" cy="89" r="1.4"/><line x1="58" y1="97" x2="96" y2="97"/><polyline points="${zig(107)}"/></g></g></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export default async function Image() {
  const [fraunces, gloock, outfit] = await Promise.all([
    font("Fraunces:SOFT,opsz,wght@100,144,600"),
    font("Gloock"),
    font("Outfit:wght@400"),
  ]);
  const fonts = [
    fraunces && { name: "Fraunces", data: fraunces, weight: 600 as const, style: "normal" as const },
    gloock && { name: "Gloock", data: gloock, weight: 400 as const, style: "normal" as const },
    outfit && { name: "Outfit", data: outfit, weight: 400 as const, style: "normal" as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 72,
          padding: "0 88px",
          background: "radial-gradient(ellipse 70% 80% at 30% 45%, #4a3022 0%, #2e211c 45%, #1c1411 100%)",
          color: "#f5ede3",
          fontFamily: "Outfit",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cowrie("#e8d9c0", "#6a2c24")} width={280} height={336} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontFamily: "Fraunces", fontSize: 168, lineHeight: 1, letterSpacing: "-0.025em" }}>
            <span>Taou</span>
            <div style={{ display: "flex", position: "relative" }}>
              e
              {/* The accent on the é is a single tilted coral bead. */}
              <div
              style={{
                position: "absolute",
                left: "36%",
                top: -2,
                width: 22,
                height: 44,
                borderRadius: 12,
                background: "#e8755f",
                transform: "rotate(34deg)",
              }}
            />
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 18, fontFamily: "Gloock", fontSize: 30, letterSpacing: "0.14em", color: "#e8d9c0" }}>
            BY ROYAL BEADS EDO
          </div>
          <div style={{ display: "flex", marginTop: 34, width: 96, height: 3, background: "#d2503b" }} />
          <div style={{ display: "flex", marginTop: 30, maxWidth: 640, fontSize: 34, lineHeight: 1.3, color: "#f5ede3" }}>
            {site.tagline}
          </div>
          <div style={{ display: "flex", marginTop: 16, fontSize: 24, color: "#cdb79a" }}>
            {`${site.location.area}, ${site.location.city} · Buy or rent · Try it on`}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
