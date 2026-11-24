import { useId } from "react";
import { COWRIE_SMALL_PATH } from "./CowrieMark";

type CowriePatternProps = {
  /** Background colour of the field. */
  bg: string;
  /** Colour of the tiled cowries (a tone just off the background). */
  fg: string;
  /** Width of one tile in px. */
  tile?: number;
  className?: string;
};

/** A field of small cowries, like the patterned grounds in the Sasa and Siloha references. */
export function CowriePattern({ bg, fg, tile = 64, className = "" }: CowriePatternProps) {
  const id = useId();
  const h = Math.round(tile * 1.18);
  const s = tile / 310;
  return (
    <svg aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <pattern id={id} width={tile} height={h} patternUnits="userSpaceOnUse">
          <rect width={tile} height={h} fill={bg} />
          <path transform={`translate(${tile * 0.1} ${h * 0.06}) scale(${s})`} fillRule="evenodd" fill={fg} d={COWRIE_SMALL_PATH} />
          <path transform={`translate(${tile * 0.9} ${h * 0.94}) rotate(180) scale(${s})`} fillRule="evenodd" fill={fg} d={COWRIE_SMALL_PATH} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
