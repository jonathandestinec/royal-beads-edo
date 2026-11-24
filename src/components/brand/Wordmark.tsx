type WordmarkProps = {
  /** Font size of the name: px, or any CSS length such as "clamp(72px, 10vw, 150px)". */
  size?: number | string;
  /** "soft" is the main wordmark; "caps" is the formal Gloock version for tags and labels. */
  variant?: "soft" | "caps";
  /** Show "by Royal Beads Edo" under the name. */
  by?: boolean;
  /** Colour of the coral-bead accent on the é. */
  bead?: string;
  align?: "start" | "center";
  className?: string;
  /** Heading level when the wordmark is the page title. */
  as?: "span" | "h1" | "p";
};

/**
 * "Taoué" where the acute accent is a single tilted coral bead.
 * The real text is in the accessible name, so screen readers read "Taoué".
 */
export function Wordmark({
  size = 40,
  variant = "soft",
  by = false,
  bead = "#d2503b",
  align = "start",
  className = "",
  as: Tag = "span",
}: WordmarkProps) {
  const soft = variant === "soft";
  const letters = soft ? "Taou" : "TAOU";
  const e = soft ? "e" : "E";
  const fontSize = typeof size === "number" ? `${size}px` : size;

  return (
    <span
      className={`inline-flex flex-col ${align === "center" ? "items-center" : "items-start"} ${className}`}
      style={{ gap: `calc(${fontSize} * 0.08)` }}
    >
      <Tag
        aria-label="Taoué"
        className={`m-0 whitespace-nowrap leading-none ${soft ? "font-display soft font-semibold tracking-[-0.025em]" : "font-formal tracking-[0.06em]"}`}
        style={{ fontSize, paddingTop: soft ? 0 : "0.18em" }}
      >
        <span aria-hidden="true">
          {letters}
          <span className="relative inline-block">
            {e}
            <span
              className="absolute rounded-[0.07em]"
              style={{
                left: soft ? "50%" : "46%",
                top: soft ? "-0.08em" : "-0.2em",
                width: soft ? "0.13em" : "0.11em",
                height: soft ? "0.26em" : "0.22em",
                background: bead,
                transform: "rotate(34deg)",
              }}
            />
          </span>
        </span>
      </Tag>
      {by && (
        <span
          className="font-display soft-text italic leading-tight whitespace-nowrap"
          style={{ fontSize: `max(12px, calc(${fontSize} * 0.24))` }}
        >
          by Royal Beads Edo
        </span>
      )}
    </span>
  );
}
