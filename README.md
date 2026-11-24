# Royal Beads Edo

Website for **Royal Beads Edo**, a coral beads and traditional attire business in the Oba Market area of Benin City, Edo State, Nigeria.

Built as a Tech4Youth (AG Southern AI Class) capstone project and intended as a portfolio piece.

## What it does

- Presents coral bead sets **by occasion** (weddings, chieftaincy, festivals, celebrations)
- Explains how **custom orders** work (2 to 3 weeks, with ready dates confirmed only by the workshop)
- Tells the **story and meaning of Edo coral**, plus a **coral care and authenticity** guide
- Sends every enquiry to the group's shared **n8n Enquire form**
- Includes a **Chatbase** assistant that answers common questions
- Planned: a **bridal regalia builder** and an in-browser **virtual try-on** (MediaPipe Face Landmarker)

All AI-generated imagery is labelled as concept images. See [`docs/ai-image-prompts`](docs/ai-image-prompts).

## Tech stack

- [Next.js](https://nextjs.org) (App Router) with TypeScript
- Tailwind CSS
- Framer Motion
- `@mediapipe/tasks-vision` (planned, for try-on)
- Static export (`output: "export"`), deployed on Vercel. No backend and no secrets.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # static site in out/
```

## Project structure

```
src/
  app/                 layout and the single-page home
  components/
    brand/             CowrieMark (pattern, full, small, line), Wordmark, CowriePattern
    motion/            Framer Motion reveals and the reduced-motion provider
    sections/          Header, Hero (animated scribble story), Marquee, Occasions, TryOnTeaser,
                       CustomOrder, CultureStory, CoralCare, Enquire, Footer
    ui/                EnquireButton, MusicToggle (opt-in Afro-jazz)
  config/site.ts       business details and the Enquire form URL (one place to change it)
  data/                typed content: collections, FAQ, care tips
  features/
    regalia-builder/   bridal set builder (planned)
    try-on/            virtual try-on (planned)
public/images/
  concept/             AI concept images
  try-on/              transparent bead overlays
docs/
  client-brief.md      the approved client brief
  ai-image-prompts/    every AI image prompt used
```

## Configuration

Set the group's n8n form link in `src/config/site.ts`:

```ts
export const ENQUIRE_FORM_URL = "https://…";
```

If it is ever emptied, Enquire buttons fall back to the on-page Enquire section. Every link pre-fills the Business field and, where it can, the Message.

## The never rule

The site, chatbot and every feature must **never confirm a custom-set ready date**. Only the workshop confirms ready dates.
