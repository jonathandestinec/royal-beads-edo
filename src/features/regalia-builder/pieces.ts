/**
 * The pieces in the regalia builder.
 *
 * Client rules (docs/RULES.md):
 * - C1: never show or promise a ready date. Only the workshop confirms ready dates.
 * - C3: no prices on the site. Every set is price on request: the team sends the quote.
 *
 * `art` names the drawing used in the preview: the necklace and crown ids are the try-on's
 * concept designs (src/features/try-on/sets.ts), so both features show the same beads.
 */

export type Who = "bride" | "groom";
export type Party = Who | "couple";
export type Plan = "buy" | "rent";
export type Slot = "head" | "neck" | "wrist" | "attire";

export type Piece = {
  id: string;
  name: string;
  /** One short line on the piece. */
  line?: string;
  /** Beads can be rented for the day; attire is made to measure, to keep. */
  rentable?: boolean;
  art: string;
};

export const SLOTS: { id: Slot; label: string }[] = [
  { id: "head", label: "Crown" },
  { id: "neck", label: "Neck piece" },
  { id: "wrist", label: "Wrists" },
  { id: "attire", label: "Attire" },
];

export const PIECES: Record<Who, Record<Slot, Piece[]>> = {
  bride: {
    head: [
      { id: "bridal-crown", name: "Bridal crown", line: "A full crown of coral, gold beads at the base", rentable: true, art: "bridal-crown" },
      { id: "headband", name: "Coral headband", line: "Two rows of coral with a raised centre", rentable: true, art: "headband" },
      { id: "none", name: "No crown", art: "none" },
    ],
    neck: [
      { id: "bridal-collar", name: "Bridal collar", line: "Five strands, worn from neck to chest", rentable: true, art: "bridal-collar" },
      { id: "three-strand", name: "Three-strand coral", line: "Three graduated strands with gold spacers", rentable: true, art: "three-strand" },
      { id: "coral-gold", name: "Coral and gold", line: "One strand with a large centre bead", rentable: true, art: "coral-gold" },
      { id: "none", name: "No neck piece", art: "none" },
    ],
    wrist: [
      { id: "cuffs", name: "Coral cuffs", line: "A matching cuff on each wrist", rentable: true, art: "cuff" },
      { id: "bracelets", name: "Stacked bracelets", line: "Three strands on each wrist", rentable: true, art: "bracelets" },
      { id: "none", name: "No wrist beads", art: "none" },
    ],
    attire: [
      { id: "wrapper-coral", name: "Wrapper set, coral red", line: "Made to measure", art: "#a8352a" },
      { id: "wrapper-ivory", name: "Wrapper set, ivory", line: "Made to measure", art: "#e9dcc4" },
      { id: "wrapper-gold", name: "Wrapper set, gold", line: "Made to measure", art: "#c49a52" },
      { id: "none", name: "My own attire", line: "Beads only", art: "none" },
    ],
  },
  groom: {
    head: [
      { id: "coral-cap", name: "Coral cap", line: "A close cap of coral beads", rentable: true, art: "cap" },
      { id: "none", name: "No cap", art: "none" },
    ],
    neck: [
      { id: "layered", name: "Layered coral collar", line: "Three strands with gold spacers", rentable: true, art: "three-strand" },
      { id: "coral-gold", name: "Coral and gold strand", line: "One strand with a large centre bead", rentable: true, art: "coral-gold" },
      { id: "none", name: "No neck piece", art: "none" },
    ],
    wrist: [
      { id: "cuff", name: "Coral cuff", line: "A cuff on each wrist", rentable: true, art: "cuff" },
      { id: "bracelets", name: "Coral bracelets", line: "Two strands on each wrist", rentable: true, art: "bracelets" },
      { id: "none", name: "No wrist beads", art: "none" },
    ],
    attire: [
      { id: "wrapper-ivory", name: "Wrapper and shirt, ivory", line: "Made to measure", art: "#e9dcc4" },
      { id: "wrapper-coral", name: "Wrapper and shirt, coral red", line: "Made to measure", art: "#a8352a" },
      { id: "none", name: "My own attire", line: "Beads only", art: "none" },
    ],
  },
};

export type Look = Record<Slot, string>;

export const DEFAULT_LOOK: Record<Who, Look> = {
  bride: { head: "bridal-crown", neck: "bridal-collar", wrist: "cuffs", attire: "wrapper-coral" },
  groom: { head: "coral-cap", neck: "layered", wrist: "cuff", attire: "wrapper-ivory" },
};

export function piece(who: Who, slot: Slot, id: string): Piece {
  const list = PIECES[who][slot];
  return list.find((p) => p.id === id) ?? list[0];
}

export { PRICE_ON_REQUEST } from "@/data/content";

function describe(who: Who, look: Look): string {
  const names = SLOTS.map((s) => piece(who, s.id, look[s.id]))
    .filter((p) => p.id !== "none")
    .map((p) => p.name.toLowerCase());
  return names.length ? names.join(", ") : "beads to be chosen with you";
}

/**
 * The Enquire message, in the customer's words. It names the pieces and asks for a quote,
 * and leaves the event date for the customer to add: only the workshop confirms ready dates.
 */
export function enquiryMessage(party: Party, looks: Record<Who, Look>, plan: Plan): string {
  const whos: Who[] = party === "couple" ? ["bride", "groom"] : [party];
  const sets = whos.map((w) => `${w === "bride" ? "Bride" : "Groom"}: ${describe(w, looks[w])}.`).join(" ");
  const what = party === "couple" ? "a bride and groom set" : `a ${party} set`;
  const how = plan === "rent" ? "to rent (any attire made to measure, to keep)" : "to buy";
  return `Hello, I built ${what} in the regalia builder, ${how}. ${sets} Please send me a quote for this set. Our event date is: `;
}
