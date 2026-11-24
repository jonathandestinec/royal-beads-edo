/**
 * Site copy and content. Sections stay presentational; edit the words here.
 * Photos in /images/placeholder are licensed stand-ins (credits in docs/image-credits.md)
 * until the shop's own photos and the labelled AI concept images arrive.
 */

export type Occasion = {
  title: string;
  line: string;
  image: string;
  alt: string;
  focus: string;
};

export const occasions: Occasion[] = [
  {
    title: "Weddings",
    line: "Bride and groom regalia, our most requested sets",
    image: "/images/placeholder/couple.jpg",
    alt: "A bride and groom in coral bead crowns and necklaces",
    focus: "50% 15%",
  },
  {
    title: "Chieftaincy",
    line: "Beads for titles and ceremonies",
    image: "/images/placeholder/queen.jpg",
    alt: "A statue wearing layered coral necklaces and cuffs",
    focus: "50% 15%",
  },
  {
    title: "Festivals",
    line: "Igue and other cultural days",
    image: "/images/placeholder/bride.jpg",
    alt: "A coral bead crown up close",
    focus: "50% 4%",
  },
  {
    title: "Celebrations",
    line: "Birthdays, naming days and family occasions",
    image: "/images/placeholder/bride.jpg",
    alt: "Layered coral necklaces and cuffs",
    focus: "50% 72%",
  },
];

export const marquee = [
  "Bridal crowns",
  "Groom sets",
  "Chieftaincy beads",
  "Festival wear",
  "Coral cuffs",
  "Traditional attire",
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

export const careTips = [
  {
    title: "Store it soft",
    body: "Wrap each strand in a soft cloth and keep it apart from harder jewellery that can scratch it.",
  },
  {
    title: "Last on, first off",
    body: "Coral is porous. Put it on after perfume, lotion and hairspray, and take it off before washing or swimming.",
  },
  {
    title: "We ship abroad",
    body: "Many of our customers are in the UK and US. Sets travel packed in cloth and boxed, with tracking.",
  },
];

export const storyBeats = [
  "Long before coins, there was the cowrie.",
  "Then coral, worn at court and at every wedding.",
  "Today, Benin City still strings it by hand.",
];
