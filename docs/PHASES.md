# Phases

Where the project is, what's done and what's next. Update this file in the same PR as the work. Every item is checked against [RULES.md](RULES.md) before it is built.

Deadlines: Wed 25 Nov (images, website, chatbot) · Fri 27 Nov (publish, test, demo day).

**Current phase: 4. Enquiry automation and demo** (Phases 2 and 3 done and live 24 Nov; the group n8n project was cancelled 25 Nov)

## Phase 1. Scored basics (done 24 Nov)

- [x] Client brief written and approved by Ella (WhatsApp, 23 Nov, 3:14 PM)
- [x] 5 AI images made, prompts saved in the hand-in folder
- [x] Story site live at royal-beads-edo.vercel.app (`main` is the live branch)
- [x] Every Enquire button opens the n8n Enquire form
- [x] Botpress chatbot embedded; 5 tests run and screenshotted (1 refusal)
- [x] n8n workflow on n8n Cloud, "Enquiry form" node published

## Phase 2. Fix the audit gaps (done 24 Nov)

Audit of 24 Nov against the Student Brief.

- [x] Client brief fits on one page (R16)
- [x] "Chatbot FAQ and details" doc in the hand-in folder, with the Botpress note (R12, R13)
- [x] Screenshot of node 1 working, from a production run (R15)
- [x] AI image 1 becomes the full-screen hero with a slow push-in; the opening video moves to the next section (R7)
- [x] Real Wikimedia photos on the occasion cards get an on-image credit tag, or are swapped for concept images (R11)
- [x] "How custom orders work" shows 5 steps, as the brief says (R2)
- [x] A Gallery section of the concept images (R2)
- [x] Phone check of the whole site at 375 px (R5)
- [x] On phones, a vertical swipe over the gallery strip or the occasion cards scrolls the page; sideways swipes still move the strip (R5)

## Phase 3. Virtual try-on (done 24 Nov, live)

Answers the client's main problem: customers can't see a set on themselves before buying.

- [x] Camera try-on with MediaPipe Face Landmarker, fully in the browser (S3)
- [x] Necklace under the chin, crown on the forehead; scale and tilt with the face; smoothing
- [x] Style picker; take a photo to save
- [x] Selfie upload when there's no camera
- [x] "Love this look? Enquire" prefills the form with the set name (R3)
- [x] Bead PNGs labelled as concept designs (R10)
- [x] Wire the "Try it on" button to it
- [x] Camera tested on a real phone (24 Nov)

## Phase 4. Enquiry automation and demo (Fri 27 Nov)

- [x] Workflow published, so the site's form is live (24 Nov)
- [x] Workflow made Royal Beads Edo only (25 Nov): own form path `royal-beads-edo-enquiry`, no Business dropdown, AI sort and emails about the shop only, never rule in the sort and the emails
- [x] Telegram alerts for HOT and CHECK (24 Nov)
- [ ] Tests of the new form (HOT and CHECK; n8n free plan has few runs left)
- [ ] Whole-workflow screenshot for the hand-in
- [x] Enquiries dashboard at /dashboard: live counts by label, searchable list, checks the sheet every 20 s
- [x] Dashboard link: Enquiries tab published as CSV, live at /dashboard
- [x] Tutor's Botpress approval screenshot in the hand-in folder (24 Nov)
- [x] Sheet screenshot with the HOT row in the hand-in folder (25 Nov)
- [ ] Demo rehearsal and a backup screen recording of the try-on
- [ ] Turn the workflow off after demo day (S4)

## Phase 5. Extras (built 25 Nov, live)

- [x] Bridal regalia builder at /regalia: bride, groom or both; crown, neck piece, wrists, attire; live preview of the concept designs; price range per piece and for the set (C3); buy or rent; no ready dates (C1); "Enquire about this set" prefills the form with the set (R3); "Try this crown and necklace on" opens the try-on with that look; linked from Occasions and Your day

## Later (only if time allows)

- Occasion guide with "shop this look" links
