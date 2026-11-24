/**
 * The sets in the virtual try-on. These are concept designs drawn in the browser to show the
 * look; every real set is made by hand in the workshop. No prices or dates here: the Enquire
 * form and the team handle those.
 *
 * Sizes are in sprite pixels. A strand is an arc of beads that hangs from the neck:
 * `ax` is its half-width, `by` its drop, `r` the bead radius.
 */

export type Strand = {
  ax: number;
  by: number;
  r: number;
  /** Put a small gold bead at every nth place (0 or unset: coral only). */
  goldEvery?: number;
  /** A larger coral bead at the centre of the strand. */
  centre?: number;
};

export type NecklaceSet = { id: string; name: string; strands: Strand[] };
export type CrownSet = { id: string; name: string; kind: "dome" | "band" | "none" };

export const NECKLACES: NecklaceSet[] = [
  {
    id: "bridal-collar",
    name: "Bridal collar",
    strands: [
      { ax: 300, by: 240, r: 25 },
      { ax: 345, by: 292, r: 25, goldEvery: 9 },
      { ax: 390, by: 344, r: 26 },
      { ax: 435, by: 396, r: 26, goldEvery: 9 },
      { ax: 480, by: 450, r: 27 },
    ],
  },
  {
    id: "three-strand",
    name: "Three-strand coral",
    strands: [
      { ax: 310, by: 280, r: 20, goldEvery: 7 },
      { ax: 370, by: 375, r: 22, goldEvery: 7 },
      { ax: 430, by: 470, r: 24, goldEvery: 7 },
    ],
  },
  {
    id: "coral-gold",
    name: "Coral and gold",
    strands: [{ ax: 340, by: 360, r: 28, goldEvery: 3, centre: 44 }],
  },
  { id: "none", name: "No necklace", strands: [] },
];

export const CROWNS: CrownSet[] = [
  { id: "bridal-crown", name: "Bridal crown", kind: "dome" },
  { id: "headband", name: "Coral headband", kind: "band" },
  { id: "none", name: "No crown", kind: "none" },
];

export function findNecklace(id: string): NecklaceSet {
  return NECKLACES.find((n) => n.id === id) ?? NECKLACES[0];
}

export function findCrown(id: string): CrownSet {
  return CROWNS.find((c) => c.id === id) ?? CROWNS[0];
}

/** The Enquire message for a look, in the customer's words. No date, no price. */
export function lookMessage(necklaceId: string, crownId: string): string {
  const n = findNecklace(necklaceId);
  const c = findCrown(crownId);
  const parts = [n.id !== "none" ? `the ${n.name.toLowerCase()}` : "", c.id !== "none" ? `the ${c.name.toLowerCase()}` : ""].filter(Boolean);
  const look = parts.length ? parts.join(" with ") : "a coral set";
  return `Hello, I tried on ${look} in the virtual try-on and I love this look. I'd like to ask about it.`;
}
