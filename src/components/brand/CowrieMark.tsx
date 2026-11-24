import { useId } from "react";

/**
 * The Taoué cowrie mark, drawn from the underside of the shell.
 *
 * Variants (use each where it fits):
 * - "pattern": the Koris-style patterned edition. Large brand moments: hero, footer, big lockups.
 * - "full":    the solid mark with teeth. Medium sizes from about 40 px up.
 * - "small":   the solid mark without teeth. Nav, favicon and anything under 40 px.
 * - "line":    an outline, for engraving, foil and quiet watermarks.
 */
export type CowrieVariant = "pattern" | "full" | "small" | "line";

const SHELL = "M50 4C76 4 92 28 92 62C92 94 75.2 116 50 116C24.8 116 8 94 8 62C8 28 24 4 50 4Z";

const MOUTH_FULL =
  "M48 4L48 4.7L48 5.3L48 6L48 6.6L48 7.3L47.9 7.9L47.9 8.6L47.8 9.2L47.8 9.9L47.7 10.5L47.6 11.2L47.5 11.8L47.3 12.5L47.2 13.1L47.1 13.8L46.9 14.5L46.7 15.1L46.5 15.8L46.3 16.4L46.1 17.1L45.9 17.7L46 18.4L46 19L46 19.7L45.9 20.3L45.8 21L45.7 21.6L45.6 22.3L45.5 22.9L45.3 23.6L45 24.3L44.6 24.9L44.1 25.6L43.7 26.2L44.1 26.9L44.3 27.5L44.3 28.2L44.4 28.8L44.4 29.5L44.2 30.1L44 30.8L43.7 31.4L43.3 32.1L42.8 32.7L42.1 33.4L41 34.1L41.8 34.7L42 35.4L42.1 36L42 36.7L42 37.3L41.8 38L41.6 38.6L41.3 39.3L40.9 39.9L40.4 40.6L39.8 41.2L38.8 41.9L39.3 42.5L39.6 43.2L39.7 43.9L39.7 44.5L39.7 45.2L39.6 45.8L39.4 46.5L39.1 47.1L38.8 47.8L38.4 48.4L37.9 49.1L37 49.7L37 50.4L37.5 51L37.7 51.7L37.8 52.3L37.7 53L37.7 53.7L37.5 54.3L37.3 55L37.1 55.6L36.7 56.3L36.2 56.9L35.6 57.6L35.2 58.2L35.7 58.9L36 59.5L36.2 60.2L36.2 60.8L36.2 61.5L36.1 62.1L36 62.8L35.8 63.5L35.5 64.1L35.1 64.8L34.5 65.4L33.6 66.1L34.5 66.7L34.9 67.4L35.1 68L35.2 68.7L35.2 69.3L35.2 70L35.2 70.6L35 71.3L34.8 71.9L34.5 72.6L34.1 73.3L33.2 73.9L33.9 74.6L34.4 75.2L34.7 75.9L34.9 76.5L35 77.2L35.1 77.8L35.1 78.5L35.1 79.1L35 79.8L34.8 80.4L34.5 81.1L33.9 81.7L34.1 82.4L34.8 83.1L35.3 83.7L35.6 84.4L35.9 85L36.1 85.7L36.2 86.3L36.3 87L36.4 87.6L36.3 88.3L36.2 88.9L35.8 89.6L35.8 90.2L36.8 90.9L37.5 91.5L38 92.2L38.5 92.9L38.9 93.5L39.3 94.2L39.7 94.8L40.1 95.5L40.4 96.1L40.6 96.8L40.7 97.4L40.6 98.1L42.2 98.7L43.5 99.4L44.8 100L46.1 100.7L47.7 101.3L49.2 102L49.2 102L52 101.3L53.3 100.7L54.2 100L54.9 99.4L55.6 98.7L56.3 98.1L56.4 97.4L56.6 96.8L56.8 96.1L56.9 95.5L57 94.8L57.1 94.2L57.2 93.5L57.3 92.9L57.4 92.2L57.6 91.5L57.7 90.9L57.9 90.2L57.8 89.6L57.6 88.9L57.4 88.3L57.3 87.6L57.2 87L57.1 86.3L57 85.7L56.9 85L56.9 84.4L56.8 83.7L56.8 83.1L56.9 82.4L56.8 81.7L56.4 81.1L56.2 80.4L56 79.8L55.8 79.1L55.6 78.5L55.5 77.8L55.3 77.2L55.2 76.5L55.1 75.9L55 75.2L55 74.6L55.1 73.9L54.7 73.3L54.4 72.6L54.1 71.9L53.9 71.3L53.7 70.6L53.5 70L53.4 69.3L53.3 68.7L53.2 68L53.1 67.4L53.1 66.7L53.2 66.1L52.8 65.4L52.5 64.8L52.3 64.1L52.1 63.5L51.9 62.8L51.7 62.1L51.6 61.5L51.5 60.8L51.4 60.2L51.3 59.5L51.3 58.9L51.4 58.2L51.2 57.6L50.9 56.9L50.7 56.3L50.5 55.6L50.3 55L50.2 54.3L50.1 53.7L50 53L50 52.3L49.9 51.7L50 51L50 50.4L50 49.7L49.7 49.1L49.5 48.4L49.4 47.8L49.3 47.1L49.2 46.5L49.1 45.8L49 45.2L49 44.5L49 43.9L49.1 43.2L49.2 42.5L49.3 41.9L49 41.2L48.9 40.6L48.8 39.9L48.7 39.3L48.6 38.6L48.6 38L48.6 37.3L48.6 36.7L48.6 36L48.7 35.4L48.8 34.7L49.1 34.1L48.9 33.4L48.7 32.7L48.6 32.1L48.6 31.4L48.6 30.8L48.6 30.1L48.6 29.5L48.7 28.8L48.8 28.2L48.9 27.5L49.1 26.9L49.3 26.2L49.3 25.6L49.3 24.9L49.3 24.3L49.3 23.6L49.4 22.9L49.5 22.3L49.5 21.6L49.6 21L49.8 20.3L49.9 19.7L50 19L50.2 18.4L50.4 17.7L50.5 17.1L50.6 16.4L50.7 15.8L50.8 15.1L50.9 14.5L51.1 13.8L51.2 13.1L51.4 12.5L51.6 11.8L51.8 11.2L52 10.5L52.3 9.9L52.5 9.2L52.8 8.6L53.1 7.9L53.4 7.3L53.7 6.6L54 6L54.3 5.3L54.7 4.7L55 4Z";

const MOUTH_SMALL =
  "M48 4L48 6L47.9 7.9L47.8 9.9L47.5 11.8L47.1 13.8L46.5 15.8L45.9 17.7L45.3 19.7L44.6 21.6L44 23.6L43.3 25.6L42.7 27.5L42.1 29.5L41.4 31.4L40.8 33.4L40.2 35.4L39.6 37.3L39 39.3L38.4 41.2L37.9 43.2L37.3 45.2L36.8 47.1L36.3 49.1L35.9 51L35.4 53L35 55L34.6 56.9L34.2 58.9L33.9 60.8L33.6 62.8L33.3 64.8L33.1 66.7L32.9 68.7L32.8 70.6L32.7 72.6L32.6 74.6L32.7 76.5L32.7 78.5L32.9 80.4L33.1 82.4L33.4 84.4L33.8 86.3L34.4 88.3L35 90.2L35.9 92.2L37 94.2L38.3 96.1L40.1 98.1L42.7 100L49.2 102L49.2 102L54.8 100L56.5 98.1L57.4 96.1L57.9 94.2L58.1 92.2L58.1 90.2L58 88.3L57.8 86.3L57.5 84.4L57.2 82.4L56.8 80.4L56.3 78.5L55.9 76.5L55.4 74.6L54.9 72.6L54.4 70.6L53.9 68.7L53.5 66.7L53 64.8L52.6 62.8L52.2 60.8L51.8 58.9L51.4 56.9L51 55L50.7 53L50.4 51L50.2 49.1L49.9 47.1L49.8 45.2L49.6 43.2L49.5 41.2L49.4 39.3L49.3 37.3L49.2 35.4L49.2 33.4L49.3 31.4L49.3 29.5L49.4 27.5L49.5 25.6L49.7 23.6L49.9 21.6L50.1 19.7L50.4 17.7L50.7 15.8L51.1 13.8L51.6 11.8L52.3 9.9L53.1 7.9L54 6L55 4Z";

const MOUTH_LINE =
  "M48 4L47.5 11.8L46.5 15.8L45.9 17.7L45.6 22.3L43.7 26.2L44.4 29.5L41 34.1L42 37.3L38.8 41.9L39.7 45.2L37 49.7L37.7 53.7L35.2 58.2L36.2 61.5L33.6 66.1L35.2 70L33.2 73.9L35 77.2L33.9 81.7L36.2 86.3L35.8 90.2L38.9 93.5L40.6 98.1L44.8 100L49.2 102L54.2 100L56.3 98.1L57.2 93.5L57.9 90.2L57 85.7L56.9 82.4L55.5 77.8L55.1 73.9L53.4 69.3L53.2 66.1L51.6 61.5L51.4 58.2L50.1 53.7L50 49.7L49 45.2L49.3 41.9L48.6 37.3L49.1 34.1L48.6 29.5L49.3 26.2L49.5 22.3L50.4 17.7L51.1 13.8L52.5 9.2L55 4";

/** The small mark as one compound path, for patterns and the favicon. */
export const COWRIE_SMALL_PATH = SHELL + MOUTH_SMALL;

type CowrieMarkProps = {
  variant?: CowrieVariant;
  /** Width in px; height follows the 100:120 shape. */
  size?: number;
  /** Shell colour. Defaults to the current text colour. */
  color?: string;
  /** Colour of the patterned band on the "pattern" variant. */
  patternColor?: string;
  className?: string;
  /** Accessible name. Leave empty when the mark sits beside the written name. */
  title?: string;
};

export function CowrieMark({
  variant = "full",
  size = 48,
  color = "currentColor",
  patternColor = "#5a3826",
  className,
  title,
}: CowrieMarkProps) {
  const clipId = useId();
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true };

  return (
    <svg
      viewBox="0 0 100 120"
      width={size}
      height={Math.round(size * 1.2)}
      className={className}
      style={{ color: color === "currentColor" ? undefined : color }}
      {...a11y}
    >
      {variant === "line" ? (
        <g fill="none" stroke="currentColor" strokeWidth={3.2} strokeLinejoin="round">
          <path d={SHELL} />
          <path d={MOUTH_LINE} />
        </g>
      ) : (
        <path
          fillRule="evenodd"
          fill="currentColor"
          d={SHELL + (variant === "small" ? MOUTH_SMALL : MOUTH_FULL)}
        />
      )}

      {variant === "pattern" && (
        <>
          <defs>
            <clipPath id={clipId}>
              <path d={SHELL} />
            </clipPath>
          </defs>
          <g clipPath={`url(#${clipId})`}>
            <rect x={58} y={46} width={40} height={74} fill={patternColor} />
            <g fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round">
              <line x1={58} y1={52} x2={96} y2={52} />
              <polyline points="58,62 62,56 66,62 70,56 74,62 78,56 82,62 86,56 90,62 94,56" />
              <line x1={58} y1={66} x2={96} y2={66} />
              <polyline points="58,76 62,70 66,76 70,70 74,76 78,70 82,76 86,70 90,76 94,70" />
              <line x1={58} y1={80} x2={96} y2={80} />
              <circle cx={74} cy={89} r={4.2} />
              <circle cx={74} cy={89} r={1.4} />
              <line x1={58} y1={97} x2={96} y2={97} />
              <polyline points="58,107 62,101 66,107 70,101 74,107 78,101 82,107 86,101 90,107 94,101" />
            </g>
          </g>
        </>
      )}
    </svg>
  );
}
