/**
 * Site copy and content. Scenes stay presentational; edit the words here.
 *
 * Images:
 * - /images/concept: AI concept images (prompts in docs/ai-image-prompts). Always shown with a "Concept image" label.
 * - /images/placeholder: licensed photos from Wikimedia Commons (credits in docs/image-credits.md).
 * - /video: stock footage from Pexels, graded for the site (credits in docs/image-credits.md).
 */

export const IMG = {
  heroPortrait: "/images/concept/1-hero-coral-necklace-portrait.jpg",
  poster: "/images/concept/2-brand-poster-coral-crown.jpg",
  wedding: "/images/concept/3-service-wedding-sets.jpg",
  bracelets: "/images/concept/4-service-coral-bracelets.jpg",
  workshop: "/images/concept/5-service-custom-workshop.jpg",
  bride: "/images/placeholder/bride.jpg",
  couple: "/images/placeholder/couple.jpg",
  queen: "/images/placeholder/queen.jpg",
  cowries: "/images/placeholder/cowries.jpg",
} as const;

/** The chapters of the story, in scroll order. Used by the side rail. */
export const chapters = [
  { id: "top", label: "Taoué" },
  { id: "sea", label: "The sea" },
  { id: "court", label: "The court" },
  { id: "hands", label: "The hands" },
  { id: "occasions", label: "Occasions" },
  { id: "try-on", label: "Try it on" },
  { id: "care", label: "Real coral" },
  { id: "enquire", label: "Your day" },
] as const;

export type Occasion = {
  title: string;
  line: string;
  image: string;
  alt: string;
  focus: string;
  concept?: boolean;
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
    focus: "50% 15%",
  },
  {
    title: "Festivals",
    line: "Igue and other cultural days",
    price: "From ₦60,000",
    image: IMG.bride,
    alt: "A woman in a coral bead crown and coral necklaces",
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

export const steps = [
  {
    title: "Tell us the occasion",
    body: "Share the event, your date and the look you want through the Enquire form.",
  },
  {
    title: "Choose and try on",
    body: "Pick your coral, see it on you, and agree the set and price range with us.",
  },
  {
    title: "The workshop confirms",
    body: "Sets usually take 2 to 3 weeks. Our workshop confirms your ready date, and a person reviews any event less than 3 weeks away.",
  },
];

export const coralChecks = [
  {
    title: "Look closely",
    body: "Natural coral shows fine growth lines, tiny pits and gentle changes of colour from bead to bead. Plastic and glass look perfectly even.",
  },
  {
    title: "Feel the weight",
    body: "Coral is dense, so it feels cool and heavier in the hand than plastic beads of the same size.",
  },
  {
    title: "Check the holes",
    body: "If the colour is darker inside the drill holes or in small cracks, the bead has likely been dyed.",
  },
  {
    title: "Skip the home tests",
    body: "Acid, flame and scratch tests damage real coral. For a valuable set, ask a gemologist, or ask us: every Taoué set comes with a note on what it is made from.",
  },
];

export const careTips = [
  { title: "Store it soft", body: "Wrap each strand in cloth, apart from harder jewellery." },
  { title: "Last on, first off", body: "Put coral on after perfume and lotion; take it off before washing." },
  { title: "We ship abroad", body: "Sets travel to the UK, US and beyond, packed in cloth, boxed and tracked." },
];

export const storyBeats = [
  "Long before coins, there was the cowrie.",
  "Then coral, worn at court and at every wedding.",
  "Today, Benin City still strings it by hand.",
];
