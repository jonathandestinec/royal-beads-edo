"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CowrieMark } from "@/components/brand/CowrieMark";
import { EnquireButton } from "@/components/ui/EnquireButton";
import { site } from "@/config/site";
import { CROWNS, NECKLACES } from "@/features/try-on/sets";
import { artThumb } from "./art";
import { Figure } from "./Figure";
import {
  DEFAULT_LOOK,
  PIECES,
  SLOTS,
  enquiryMessage,
  partyRange,
  piece,
  pieceRange,
  rangeText,
  type Look,
  type Party,
  type Plan,
  type Slot,
  type Who,
} from "./pieces";

const PARTIES: { id: Party; label: string }[] = [
  { id: "bride", label: "Bride" },
  { id: "groom", label: "Groom" },
  { id: "couple", label: "Both" },
];

const ease = [0.2, 0.7, 0.2, 1] as const;

/**
 * The bridal regalia builder. The customer builds a bride, groom or couple look piece by piece,
 * sees it on an illustrated figure, and gets a price range for each piece and for the set.
 * "Enquire about this set" opens the Royal Beads Edo n8n form with the set written into the message.
 * Price ranges only, and never a ready date (docs/RULES.md, C1 and C3).
 */
export default function Builder() {
  const [party, setParty] = useState<Party>("bride");
  const [editing, setEditing] = useState<Who>("bride");
  const [plan, setPlan] = useState<Plan>("buy");
  const [looks, setLooks] = useState<Record<Who, Look>>(DEFAULT_LOOK);
  const [thumbs] = useState(() => {
    const t: Record<string, string> = {};
    (["bride", "groom"] as Who[]).forEach((w) =>
      SLOTS.forEach((s) => PIECES[w][s.id].forEach((p) => (t[p.art] ??= p.art.startsWith("#") ? "" : artThumb(p.art)))),
    );
    return t;
  });

  const who: Who = party === "couple" ? editing : party;
  const total = partyRange(party, looks, plan);
  const whos: Who[] = party === "couple" ? ["bride", "groom"] : [party];

  const choose = (slot: Slot, id: string) => setLooks((l) => ({ ...l, [who]: { ...l[who], [slot]: id } }));
  const pickParty = (p: Party) => {
    setParty(p);
    if (p !== "couple") setEditing(p);
  };

  // The bride's crown and necklace are the try-on's designs, so she can try this look on.
  const tryOn =
    who === "bride" &&
    CROWNS.some((c) => c.id === piece("bride", "head", looks.bride.head).art) &&
    NECKLACES.some((n) => n.id === piece("bride", "neck", looks.bride.neck).art)
      ? `/try-on?crown=${piece("bride", "head", looks.bride.head).art}&necklace=${piece("bride", "neck", looks.bride.neck).art}`
      : "";

  return (
    <div className="min-h-[100dvh] bg-night text-cream lg:grid lg:grid-cols-[minmax(0,1fr)_480px]">
      {/* The preview: sticky on phones so every choice shows at once. */}
      <div className="sticky top-0 z-20 h-[44svh] overflow-hidden bg-espresso lg:h-[100dvh]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_42%,rgba(210,120,60,0.22),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-night/90 to-transparent" />

        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 bg-gradient-to-b from-night/80 to-transparent px-5 pt-4 pb-8">
          <Link href="/#occasions" className="inline-flex h-11 items-center gap-2 text-cream no-underline" aria-label="Back to Taoué">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
            <CowrieMark variant="small" size={22} />
            <span className="font-display soft text-xl font-semibold">Taoué</span>
          </Link>
          <span className="rounded-full bg-night/60 px-2.5 py-1 text-[11px] font-medium tracking-wide text-sand/90 backdrop-blur-[2px]">
            Concept designs
          </span>
        </div>

        <svg
          viewBox={party === "couple" ? "0 0 760 600" : "0 0 400 600"}
          preserveAspectRatio="xMidYMax meet"
          className="absolute inset-x-0 bottom-0 mx-auto h-[88%] w-full"
          role="img"
          aria-label={`Illustration of the ${party === "couple" ? "bride and groom" : party} set you are building`}
        >
          {whos.map((w, i) => (
            <Figure key={w} who={w} look={looks[w]} x={party === "couple" ? i * 360 : 0} idPrefix={`fig-${w}`} />
          ))}
        </svg>

        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 px-5 pb-3 lg:px-8 lg:pb-8">
          <div aria-live="polite" className="rounded-2xl bg-night/75 px-4 py-2.5 backdrop-blur-sm">
            <p className="m-0 text-[11px] uppercase tracking-[0.2em] text-sand/80">{plan === "rent" ? "To rent" : "To buy"}</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={`${total[0]}-${total[1]}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease }}
                className="m-0 font-formal text-[clamp(18px,4.6vw,28px)] leading-tight text-cream"
              >
                {rangeText(total)}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* The builder */}
      <div className="relative px-5 pt-8 pb-[calc(96px+env(safe-area-inset-bottom))] sm:px-8 lg:h-[100dvh] lg:overflow-y-auto lg:pt-12">
        <p className="m-0 text-[11px] uppercase tracking-[0.22em] text-cream/70 sm:text-xs">Regalia builder</p>
        <h1 className="mt-3 mb-0 font-display soft text-[clamp(34px,8vw,52px)] leading-none font-semibold tracking-[-0.02em]">
          Build your wedding set
        </h1>
        <p className="mt-4 mb-0 text-base leading-relaxed text-sand">
          Choose each piece for the bride, the groom or both, and see the price range as you go. Buy your set to keep, or rent the beads for your day.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Toggle label="Who is it for?" items={PARTIES} value={party} onChange={pickParty} />
          <Toggle
            label="Buy or rent"
            items={[
              { id: "buy", label: "Buy" },
              { id: "rent", label: "Rent" },
            ]}
            value={plan}
            onChange={(p) => setPlan(p as Plan)}
          />
        </div>

        {party === "couple" && (
          <div className="mt-6">
            <Toggle
              label="Choosing pieces for"
              items={[
                { id: "bride", label: "The bride" },
                { id: "groom", label: "The groom" },
              ]}
              value={editing}
              onChange={(w) => setEditing(w as Who)}
            />
          </div>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={who}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
            className="mt-8 flex flex-col gap-8"
          >
            {SLOTS.map((s, i) => (
              <fieldset key={s.id} className="m-0 min-w-0 border-0 p-0">
                <legend className="mb-3 flex w-full items-baseline gap-3 p-0">
                  <span className="font-formal text-sm text-coral-soft">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display soft text-[22px] font-semibold">{who === "groom" && s.id === "head" ? "Cap" : s.label}</span>
                </legend>
                <div className="flex flex-col gap-2">
                  {PIECES[who][s.id].map((p) => {
                    const on = looks[who][s.id] === p.id;
                    const r = pieceRange(p, plan);
                    const keep = plan === "rent" && p.buy && !p.rent;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => choose(s.id, p.id)}
                        className={`flex w-full items-center gap-3 rounded-2xl border-[1.5px] p-2 pr-4 text-left transition-colors ${
                          on ? "border-coral-soft bg-saoky" : "border-saoky bg-espresso/60 hover:border-taupe"
                        }`}
                      >
                        <span className="flex h-12 w-[68px] shrink-0 items-center justify-center rounded-xl bg-night/60">
                          {p.art.startsWith("#") ? (
                            <span className="size-8 rounded-full border border-cream/20" style={{ background: p.art }} />
                          ) : thumbs[p.art] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={thumbs[p.art]} alt="" className="h-11 w-[62px] object-contain" />
                          ) : (
                            <span className="text-lg text-muted" aria-hidden="true">
                              –
                            </span>
                          )}
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className={`text-[15px] font-semibold ${on ? "text-cream" : "text-sand"}`}>{p.name}</span>
                          {p.line && <span className="text-[13px] leading-snug text-muted">{p.line}</span>}
                        </span>
                        <span className="shrink-0 text-right font-formal text-[13px] leading-tight text-gold-soft">
                          {r ? (
                            <>
                              {rangeText(r).split(" to ").map((v, j) => (
                                <span key={j} className="block">
                                  {j ? `to ${v}` : v}
                                </span>
                              ))}
                              {keep && <span className="block font-sans text-[11px] text-muted">to keep</span>}
                            </>
                          ) : null}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* The set, its price range and the enquiry */}
        <section aria-labelledby="your-set" className="notch mt-10 bg-cream p-6 text-espresso">
          <h2 id="your-set" className="m-0 font-display soft text-[26px] leading-none font-semibold">
            Your set
          </h2>
          {whos.map((w) => (
            <div key={w} className="mt-5">
              {party === "couple" && <p className="m-0 mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-rust">{w === "bride" ? "Bride" : "Groom"}</p>}
              <ul className="m-0 list-none p-0">
                {SLOTS.map((s) => {
                  const p = piece(w, s.id, looks[w][s.id]);
                  if (p.id === "none") return null;
                  const r = pieceRange(p, plan);
                  return (
                    <li key={s.id} className="flex items-baseline justify-between gap-4 border-b border-sand py-2 text-[15px]">
                      <span>{p.name}</span>
                      <span className="shrink-0 text-right font-formal text-[14px] text-saoky">{r ? rangeText(r) : ""}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-sm font-semibold">{plan === "rent" ? "Price range to rent" : "Price range to buy"}</span>
            <span className="font-formal text-[22px] text-rust">{rangeText(total)}</span>
          </div>
          {plan === "rent" && (
            <p className="mt-2 mb-0 text-[13px] leading-relaxed text-saoky">Beads are rented for your day. Attire is made to measure, so it is yours to keep.</p>
          )}
          <p className="mt-4 mb-0 text-[13px] leading-relaxed text-saoky">
            These are price ranges. Your final price is agreed with our team. Every set is made to order: custom sets usually take {site.customSetLeadTime}, and only our workshop confirms your ready date.
          </p>
          <EnquireButton message={enquiryMessage(party, looks, plan)} className="mt-6 w-full">
            Enquire about this set
          </EnquireButton>
          {tryOn && (
            <Link href={tryOn} className="mt-3 flex h-11 items-center justify-center text-[15px] font-semibold text-rust underline underline-offset-4">
              Try this crown and necklace on
            </Link>
          )}
        </section>

        <p className="mt-6 mb-0 pr-[76px] text-xs leading-relaxed text-muted">
          The pieces shown are concept designs drawn to show the look. Every real set is matched and strung by hand at our workshop in the {site.location.area}, {site.location.city}.
        </p>
      </div>
    </div>
  );
}

function Toggle<T extends string>({ label, items, value, onChange }: { label: string; items: { id: T; label: string }[]; value: T; onChange: (id: T) => void }) {
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="mb-2 p-0 text-sm font-semibold tracking-wide text-sand">{label}</legend>
      <div className="flex rounded-full bg-espresso p-1">
        {items.map((it) => {
          const on = it.id === value;
          return (
            <button
              key={it.id}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(it.id)}
              className={`relative h-11 flex-1 rounded-full text-[15px] font-semibold transition-colors ${on ? "text-espresso" : "text-sand hover:text-cream"}`}
            >
              {on && <motion.span layoutId={`toggle-${label}`} className="absolute inset-0 rounded-full bg-cream" transition={{ duration: 0.35, ease }} />}
              <span className="relative">{it.label}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
