# Phases

Where the project is, what's done and what's next. Update this file in the same PR as the work. Every item is checked against [RULES.md](RULES.md) before it is built.

Deadlines: Wed 25 Nov (images, website, chatbot) · Fri 27 Nov (publish, test, demo day).

**Current phase: 3. Virtual try-on** (Phase 2 done and live 24 Nov)

## Phase 1. Scored basics (done 24 Nov)

- [x] Client brief written and approved by Ella (WhatsApp, 23 Nov, 3:14 PM)
- [x] 5 AI images made, prompts saved in the hand-in folder
- [x] Story site live at royal-beads-edo.vercel.app (`main` is the live branch)
- [x] Every Enquire button opens the group n8n form with Business prefilled
- [x] Botpress chatbot embedded; 5 tests run and screenshotted (1 refusal)
- [x] Group n8n workflow on n8n Cloud, node 1 "Enquiry form (Destine)" published

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

## Phase 3. Virtual try-on (built 24 Nov, on the preview for a phone test)

Answers the client's main problem: customers can't see a set on themselves before buying.

- [x] Camera try-on with MediaPipe Face Landmarker, fully in the browser (S3)
- [x] Necklace under the chin, crown on the forehead; scale and tilt with the face; smoothing
- [x] Style picker; take a photo to save
- [x] Selfie upload when there's no camera
- [x] "Love this look? Enquire" prefills the form with the set name (R3)
- [x] Bead PNGs labelled as concept designs (R10)
- [x] Wire the "Try it on" button to it

## Phase 4. Group work and demo (Fri 27 Nov)

- [ ] Business dropdown filled with every group business
- [ ] Telegram chat ID set; HOT and CHECK alerts arrive
- [ ] 3 tests (HOT, WARM, CHECK) from 3 different websites, plus "hello"
- [ ] Whole-workflow screenshot, every node renamed by its builder; list of who built what
- [x] Group dashboard built at /dashboard: live counts by label and business, filterable list, checks the sheet every 20 s
- [x] Dashboard link: Enquiries tab published as CSV, live at /dashboard
- [ ] Demo rehearsal and a backup screen recording of the try-on
- [ ] Turn the workflow off after demo day (S4)

## Phase 5. Extras (built 25 Nov, on the preview)

- [x] Prices removed from the whole site; every set is price on request (C3, decided 24 Nov)
- [x] Bridal regalia builder at /regalia: bride, groom or both; crown, neck piece, wrists, attire; live preview of the concept designs; no prices, "Price on request · Enquire for a quote" (C3); buy or rent; no ready dates (C1); "Enquire about this set" prefills the form with the set (R3); "Try this crown and necklace on" opens the try-on with that look; linked from Occasions and Your day

## Later (only if time allows)

- Occasion guide with "shop this look" links
