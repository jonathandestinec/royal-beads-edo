/**
 * The pieces in the regalia builder, with their price ranges.
 *
 * Client rules (docs/RULES.md):
 * - C1: never show or promise a ready date. Only the workshop confirms ready dates.
 * - C3: price ranges only. The final price is agreed with the team.
 *
 * Ranges follow docs/prices-and-coral-checks.md: the lightest full bride set (bridal crown,
 * bridal collar, coral cuffs) adds up to the site's "buy from ₦450,000, rent from ₦80,000".
 *
 * `art` names the drawing used in the preview: the necklace and crown ids are the try-on's
 * concept designs (src/features/try-on/sets.ts), so both features show the same beads.
 */

export type Who = "bride" | "groom";
export type Party = Who | "couple";
export type Plan = "buy" | "rent";
export type Slot = "head" | "neck" | "wrist" | "attire";

/** [low, high] in naira. */
export type Range = [number, number];

export type Piece = {
  id: string;
  name: string;
  /** One short line on the piece. */
  line?: string;
  buy?: Range;
  /** Unset: not offered for rent (attire is made to measure, to keep). */
  rent?: Range;
  art: string;
};

export const SLOTS: { id: Slot; label: string }[] = [
  { id: "head", label: "Crown" },
  { id: "neck", label: "Neck piece" },
  { id: "wrist", label: "Wrists" },
  { id: "attire", label: "Attire" },
];

const k = (n: number) => n * 1000;

export const PIECES: Record<Who, Record<Slot, Piece[]>> = {
  bride: {
    head: [
      { id: "bridal-crown", name: "Bridal crown", line: "A full crown of coral, gold beads at the base", buy: [k(180), k(350)], rent: [k(35), k(60)], art: "bridal-crown" },
      { id: "headband", name: "Coral headband", line: "Two rows of coral with a raised centre", buy: [k(60), k(120)], rent: [k(15), k(25)], art: "headband" },
      { id: "none", name: "No crown", art: "none" },
    ],
    neck: [
      { id: "bridal-collar", name: "Bridal collar", line: "Five strands, worn from neck to chest", buy: [k(200), k(400)], rent: [k(35), k(60)], art: "bridal-collar" },
      { id: "three-strand", name: "Three-strand coral", line: "Three graduated strands with gold spacers", buy: [k(90), k(180)], rent: [k(20), k(35)], art: "three-strand" },
      { id: "coral-gold", name: "Coral and gold", line: "One strand with a large centre bead", buy: [k(50), k(100)], rent: [k(12), k(20)], art: "coral-gold" },
      { id: "none", name: "No neck piece", art: "none" },
    ],
    wrist: [
      { id: "cuffs", name: "Coral cuffs", line: "A matching cuff on each wrist", buy: [k(70), k(130)], rent: [k(10), k(20)], art: "cuff" },
      { id: "bracelets", name: "Stacked bracelets", line: "Three strands on each wrist", buy: [k(30), k(60)], rent: [k(6), k(12)], art: "bracelets" },
      { id: "none", name: "No wrist beads", art: "none" },
    ],
    attire: [
      { id: "wrapper-coral", name: "Wrapper set, coral red", line: "Made to measure", buy: [k(120), k(250)], art: "#a8352a" },
      { id: "wrapper-ivory", name: "Wrapper set, ivory", line: "Made to measure", buy: [k(120), k(250)], art: "#e9dcc4" },
      { id: "wrapper-gold", name: "Wrapper set, gold", line: "Made to measure", buy: [k(140), k(280)], art: "#c49a52" },
      { id: "none", name: "My own attire", line: "Beads only", art: "none" },
    ],
  },
  groom: {
    head: [
      { id: "coral-cap", name: "Coral cap", line: "A close cap of coral beads", buy: [k(90), k(180)], rent: [k(15), k(30)], art: "cap" },
      { id: "none", name: "No cap", art: "none" },
    ],
    neck: [
      { id: "layered", name: "Layered coral collar", line: "Three strands with gold spacers", buy: [k(120), k(240)], rent: [k(20), k(40)], art: "three-strand" },
      { id: "coral-gold", name: "Coral and gold strand", line: "One strand with a large centre bead", buy: [k(50), k(100)], rent: [k(12), k(20)], art: "coral-gold" },
      { id: "none", name: "No neck piece", art: "none" },
    ],
    wrist: [
      { id: "cuff", name: "Coral cuff", line: "A cuff on each wrist", buy: [k(40), k(80)], rent: [k(8), k(15)], art: "cuff" },
      { id: "bracelets", name: "Coral bracelets", line: "Two strands on each wrist", buy: [k(25), k(50)], rent: [k(5), k(10)], art: "bracelets" },
      { id: "none", name: "No wrist beads", art: "none" },
    ],
    attire: [
      { id: "wrapper-ivory", name: "Wrapper and shirt, ivory", line: "Made to measure", buy: [k(100), k(200)], art: "#e9dcc4" },
      { id: "wrapper-coral", name: "Wrapper and shirt, coral red", line: "Made to measure", buy: [k(100), k(200)], art: "#a8352a" },
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

/** The price of a piece on the chosen plan. Attire has no rent price: it is made to keep. */
export function pieceRange(p: Piece, plan: Plan): Range | null {
  if (plan === "rent" && p.rent) return p.rent;
  return p.buy ?? null;
}

export function lookRange(who: Who, look: Look, plan: Plan): Range {
  return SLOTS.reduce<Range>(
    (sum, s) => {
      const r = pieceRange(piece(who, s.id, look[s.id]), plan);
      return r ? [sum[0] + r[0], sum[1] + r[1]] : sum;
    },
    [0, 0],
  );
}

export function partyRange(party: Party, looks: Record<Who, Look>, plan: Plan): Range {
  const whos: Who[] = party === "couple" ? ["bride", "groom"] : [party];
  return whos.reduce<Range>(
    (sum, w) => {
      const r = lookRange(w, looks[w], plan);
      return [sum[0] + r[0], sum[1] + r[1]];
    },
    [0, 0],
  );
}

const naira = new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 });
export const money = (n: number) => `₦${naira.format(n)}`;
export const rangeText = (r: Range) => (r[1] ? `${money(r[0])} to ${money(r[1])}` : "Included");

/** Does this look include a piece that can be rented? */
export function hasRentPiece(who: Who, look: Look): boolean {
  return SLOTS.some((s) => Boolean(piece(who, s.id, look[s.id]).rent));
}

function describe(who: Who, look: Look): string {
  const names = SLOTS.map((s) => piece(who, s.id, look[s.id]))
    .filter((p) => p.id !== "none")
    .map((p) => p.name.toLowerCase());
  return names.length ? names.join(", ") : "beads to be chosen with you";
}

/**
 * The Enquire message, in the customer's words. It names the pieces and the price range shown,
 * and leaves the event date for the customer to add: only the workshop confirms ready dates.
 */
export function enquiryMessage(party: Party, looks: Record<Who, Look>, plan: Plan): string {
  const whos: Who[] = party === "couple" ? ["bride", "groom"] : [party];
  const sets = whos.map((w) => `${w === "bride" ? "Bride" : "Groom"}: ${describe(w, looks[w])}.`).join(" ");
  const what = party === "couple" ? "a bride and groom set" : `a ${party} set`;
  const how = plan === "rent" ? "to rent (any attire made to measure, to keep)" : "to buy";
  return `Hello, I built ${what} in the regalia builder, ${how}. ${sets} The price range shown was ${rangeText(
    partyRange(party, looks, plan),
  )}. I'd like to ask about this set. Our event date is: `;
}
