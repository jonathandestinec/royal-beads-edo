"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CROWN, NECK } from "@/features/try-on/sprites";
import { WRIST, artUrl } from "./art";
import { piece, type Look, type Who } from "./pieces";

/**
 * One figure in the preview, drawn in a 400 × 600 box: a faceless, illustrated silhouette that
 * wears the chosen pieces. The beads are the site's concept designs; the figure is a drawing.
 */

const FACE = 104;
const NECK_AT = { x: 200, y: 232 };
const HAIRLINE = { x: 200, y: 112 };
const WRISTS = [
  { x: 83, y: 505 },
  { x: 317, y: 505 },
];
const WRIST_W = 46;

const ease = [0.2, 0.7, 0.2, 1] as const;

export function Figure({ who, look, x = 0, idPrefix }: { who: Who; look: Look; x?: number; idPrefix: string }) {
  const head = piece(who, "head", look.head);
  const neck = piece(who, "neck", look.neck);
  const wrist = piece(who, "wrist", look.wrist);
  const attire = piece(who, "attire", look.attire);
  const groom = who === "groom";
  const fabric = attire.art.startsWith("#") ? attire.art : "";
  const skin = `url(#${idPrefix}-skin)`;

  // The figure is drawn with broad shoulders, so the strands are spread a little wider than on a face.
  const ns = (FACE * 2.9) / NECK.w;
  const cs = (FACE * CROWN.faces) / CROWN.w;
  const ws = WRIST_W / WRIST.w;

  return (
    <g transform={`translate(${x} 0)`}>
      <defs>
        <linearGradient id={`${idPrefix}-skin`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a573b" />
          <stop offset="0.55" stopColor="#64391f" />
          <stop offset="1" stopColor="#40230f" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-fabric`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.32" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.38" />
        </linearGradient>
      </defs>

      {/* Hair, under any crown */}
      {groom ? (
        <path d="M150 132 C150 92 172 82 200 82 C228 82 250 92 250 132 C242 112 222 104 200 104 C178 104 158 112 150 132 Z" fill="#1a100c" />
      ) : (
        <ellipse cx="200" cy="96" rx="54" ry="34" fill="#1a100c" />
      )}

      {/* Body */}
      <g fill={skin}>
        <path d="M180 196 L178 240 L222 240 L220 196 Z" />
        <path d="M178 232 C164 250 118 256 92 270 C74 282 66 306 66 340 L334 340 C334 306 326 282 308 270 C282 256 236 250 222 232 Z" />
        <path d="M150 262 C120 270 112 300 110 340 L106 600 L294 600 L290 340 C288 300 280 270 250 262 Z" />
        <path d="M66 330 C62 400 64 460 70 520 C72 540 96 540 96 520 C98 460 104 400 112 340 Z" />
        <path d="M334 330 C338 400 336 460 330 520 C328 540 304 540 304 520 C302 460 296 400 288 340 Z" />
        <ellipse cx="83" cy="545" rx="13" ry="19" />
        <ellipse cx="317" cy="545" rx="13" ry="19" />
        <path d="M200 86 C234 86 252 112 252 146 C252 184 230 214 200 214 C170 214 148 184 148 146 C148 112 166 86 200 86 Z" />
      </g>
      {/* Soft light on the face and shoulders */}
      <ellipse cx="184" cy="140" rx="26" ry="36" fill="#fff" opacity="0.06" />

      {/* Attire */}
      <AnimatePresence initial={false}>
        <motion.g key={`${who}-${attire.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease }}>
          {groom ? (
            <GroomAttire fabric={fabric} skin={skin} shade={`url(#${idPrefix}-fabric)`} />
          ) : (
            <BrideAttire fabric={fabric} shade={`url(#${idPrefix}-fabric)`} />
          )}
        </motion.g>
      </AnimatePresence>

      {/* Neck piece */}
      <Sprite
        id={`${who}-n-${neck.art}`}
        art={neck.art}
        x={NECK_AT.x - NECK.ax * ns}
        y={NECK_AT.y - NECK.ay * ns}
        w={NECK.w * ns}
        h={NECK.h * ns}
      />
      {/* Crown or cap */}
      <Sprite
        id={`${who}-h-${head.art}`}
        art={head.art}
        x={HAIRLINE.x - CROWN.ax * cs}
        y={HAIRLINE.y - CROWN.ay * cs}
        w={CROWN.w * cs}
        h={CROWN.h * cs}
      />
      {/* Wrists */}
      {WRISTS.map((p, i) => (
        <Sprite
          key={i}
          id={`${who}-w${i}-${wrist.art}`}
          art={wrist.art}
          x={p.x - WRIST.ax * ws}
          y={p.y - WRIST.ay * ws}
          w={WRIST.w * ws}
          h={WRIST.h * ws}
        />
      ))}
    </g>
  );
}

function Sprite({ id, art, x, y, w, h }: { id: string; art: string; x: number; y: number; w: number; h: number }) {
  const href = artUrl(art);
  return (
    <AnimatePresence initial={false}>
      {href && (
        <motion.g key={id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }}>
          <image href={href} x={x} y={y} width={w} height={h} />
        </motion.g>
      )}
    </AnimatePresence>
  );
}

/** A wrapper tied above the chest, with soft folds and a knot at one side. */
function BrideAttire({ fabric, shade }: { fabric: string; shade: string }) {
  const own = !fabric;
  const fill = fabric || "#3a2a22";
  return (
    <g opacity={own ? 0.85 : 1}>
      <path d="M102 352 C150 338 250 338 298 352 L304 600 L96 600 Z" fill={fill} />
      <path d="M102 352 C150 338 250 338 298 352 L304 600 L96 600 Z" fill={shade} />
      {!own && (
        <g fill="none" stroke="#000" strokeOpacity="0.18" strokeWidth="2">
          <path d="M150 360 C146 430 152 520 146 600" />
          <path d="M214 358 C220 440 210 520 218 600" />
          <path d="M262 362 C258 440 268 520 262 600" />
        </g>
      )}
      {!own && <path d="M252 350 C266 344 282 352 278 366 C272 380 254 372 252 360 Z" fill={fill} stroke="#000" strokeOpacity="0.22" strokeWidth="2" />}
      <path d="M102 352 C150 338 250 338 298 352" fill="none" stroke="#fff" strokeOpacity={own ? 0.08 : 0.22} strokeWidth="2" />
    </g>
  );
}

/** A shirt with short sleeves and a wrapper tied at the waist. */
function GroomAttire({ fabric, skin, shade }: { fabric: string; skin: string; shade: string }) {
  const own = !fabric;
  const shirt = own ? "#3a2a22" : fabric === "#e9dcc4" ? "#efe6d6" : "#e9dcc4";
  const wrapper = fabric || "#2f221c";
  return (
    <g opacity={own ? 0.85 : 1}>
      <g fill={shirt}>
        <path d="M178 236 C160 252 110 254 86 274 C70 288 64 312 64 340 L62 420 L106 420 C108 392 110 362 112 342 L110 600 L290 600 L288 342 C290 362 292 392 294 420 L338 420 L336 340 C336 312 330 288 314 274 C290 254 240 252 222 236 Z" />
      </g>
      <path d="M184 238 L200 276 L216 238 Z" fill={skin} />
      <path d="M110 470 L290 470 L296 600 L104 600 Z" fill={wrapper} />
      <path d="M110 470 L290 470 L296 600 L104 600 Z" fill={shade} />
      {!own && <path d="M290 470 C250 500 220 540 204 600" fill="none" stroke="#000" strokeOpacity="0.22" strokeWidth="2" />}
      <path d="M110 470 L290 470" fill="none" stroke="#fff" strokeOpacity={own ? 0.08 : 0.25} strokeWidth="2" />
    </g>
  );
}
