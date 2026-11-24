/**
 * Site copy and content. Scenes stay presentational; edit the words here.
 *
 * Images:
 * - /images/concept: AI concept images (prompts in docs/ai-image-prompts). Always shown with a "Concept image" label.
 * - /images/photos: licensed photos from Wikimedia Commons (credits in docs/image-credits.md).
 *   Always shown with an on-image credit tag (PHOTO_CREDIT below), never as the shop's own sets.
 * - /video: stock footage from Pexels, graded for the site (credits in docs/image-credits.md).
 */

export const IMG = {
  heroPortrait: "/images/concept/1-hero-coral-necklace-portrait.jpg",
  poster: "/images/concept/2-brand-poster-coral-crown.jpg",
  wedding: "/images/concept/3-service-wedding-sets.jpg",
  bracelets: "/images/concept/4-service-coral-bracelets.jpg",
  workshop: "/images/concept/5-service-custom-workshop.jpg",
  bride: "/images/photos/bride.jpg",
  couple: "/images/photos/couple.jpg",
  queen: "/images/photos/queen.jpg",
  cowries: "/images/photos/cowries.jpg",
} as const;

/** Author and licence of each licensed photo, shown as a small tag on the image itself. */
export const PHOTO_CREDIT: Record<string, string> = {
  [IMG.bride]: "Sasu Photography Studio, CC BY-SA 4.0",
  [IMG.couple]: "Sasu Photography Studio, CC BY-SA 4.0",
  [IMG.queen]: "Alvy Bih, CC BY 4.0",
  [IMG.cowries]: "Gary Todd, CC0",
};

/** The chapters of the story, in scroll order. Used by the side rail and the scene slates. */
export const chapters = [
  { id: "top", label: "Taoué" },
  { id: "opening", label: "The coral" },
  { id: "sea", label: "The sea" },
  { id: "court", label: "The court" },
  { id: "hands", label: "The hands" },
  { id: "occasions", label: "Occasions" },
  { id: "try-on", label: "Try it on" },
  { id: "care", label: "Real coral" },
  { id: "gallery", label: "Gallery" },
  { id: "enquire", label: "Your day" },
] as const;

export type ChapterId = (typeof chapters)[number]["id"];

/** The slate caption for a chapter, numbered from its place in the story, e.g. "03 · The sea". */
export function slate(id: ChapterId): string {
  const i = chapters.findIndex((c) => c.id === id);
  return `${String(i + 1).padStart(2, "0")} · ${chapters[i].label}`;
}

export type Occasion = {
  title: string;
  line: string;
  image: string;
  alt: string;
  focus: string;
  concept?: boolean;
  /** Author and licence, for licensed photos. */
  credit?: string;
  /** Price range shown on the card. Ranges only: the final price is agreed per set. */
  price: string;
};

export const occasions: Occasion[] = [
  {
    title: "Weddings",
    line: "Bride and groom regalia, our most requested sets",
    price: "Buy from ₦450,000 · rent from ₦80,000",
    image: IMG.wedding,
    alt: "A bride in a coral crown and layered coral collar with her groom in a coral cap and necklace",
    focus: "50% 30%",
    concept: true,
  },
  {
    title: "Chieftaincy",
    line: "Beads for titles and ceremonies",
    price: "From ₦300,000",
    image: IMG.queen,
    alt: "A bronze statue wearing layered coral necklaces and cuffs",
    credit: PHOTO_CREDIT[IMG.queen],
    focus: "50% 15%",
  },
  {
    title: "Festivals",
    line: "Igue and other cultural days",
    price: "From ₦60,000",
    image: IMG.bride,
    alt: "A woman in a coral bead crown and coral necklaces",
    credit: PHOTO_CREDIT[IMG.bride],
    focus: "50% 8%",
  },
  {
    title: "Celebrations",
    line: "Birthdays, naming days and family occasions",
    price: "From ₦40,000",
    image: IMG.bracelets,
    alt: "A hand wearing three stacked coral bead bracelets",
    focus: "40% 40%",
    concept: true,
  },
];

/** How a custom order works. Never show or promise a ready date: only the workshop confirms it. */
export const steps = [
  { title: "Tell us your day", body: "The occasion, the date, the look." },
  { title: "Choose your set", body: "By occasion, to buy or to rent." },
  { title: "Try it on", body: "See your coral on you before you decide." },
  { title: "We make it by hand", body: "Custom sets usually take 2 to 3 weeks." },
  { title: "The workshop confirms your ready date", body: "Only our workshop sets the date." },
];

/** The gallery: every AI concept image, each shown with its "Concept image" tag. */
export const gallery = [
  {
    src: IMG.heroPortrait,
    title: "The coral collar",
    alt: "A woman with closed eyes and braided hair wearing a chunky two-strand necklace of red-orange coral beads",
    focus: "50% 40%",
  },
  {
    src: IMG.poster,
    title: "The crown",
    alt: "A poster of a woman in a tall coral bead crown and layered coral collar, the coral kept in red against black and white",
    focus: "50% 35%",
  },
  {
    src: IMG.wedding,
    title: "Wedding sets",
    alt: "A bride in a coral crown and layered coral collar with her groom in a coral cap and necklace",
    focus: "50% 30%",
  },
  {
    src: IMG.bracelets,
    title: "Bracelets",
    alt: "A hand resting on cream cloth wearing three stacked coral bead bracelets with small gold spacers",
    focus: "45% 45%",
  },
  {
    src: IMG.workshop,
    title: "At the worktable",
    alt: "An artisan's hands stringing red-orange coral beads at a wooden worktable beside a bowl of loose beads",
    focus: "55% 45%",
  },
];

export const coralChecks = [
  { title: "Look closely", body: "Real coral has fine lines and gentle shifts of colour. Plastic looks perfectly even." },
  { title: "Feel the weight", body: "Coral feels cool and heavy in the hand." },
  { title: "Check the holes", body: "Darker colour inside the drill holes means dye." },
  { title: "Skip home tests", body: "Acid and flame damage real coral. Ask a gemologist, or ask us." },
];

/** The opening scene's line, after the hero. */
export const openingLine = "Every set begins with a single coral bead.";
