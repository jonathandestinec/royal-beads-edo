# Feature rules

Every new feature, section, image, video or copy change is checked against this list **before it is built** and again **before it is merged**. The source is the Capstone Student Brief (AG Southern AI Class), pages 3 to 9. If a change breaks a rule, it is changed or dropped, however good it looks.

## How to use this file

1. Before building: copy the checklist at the bottom into the PR description or the thread, and tick each line.
2. If a line can't be ticked, stop and decide with Destine first.
3. Before merging to `main` (the live branch): tick the list again against the preview link, on a phone.

## Scored rules

### Website: live, clear, works on a phone (20 pts)
- R1. The **top of the page says what the business does, in one line**. Nothing (intro, video, overlay) may hide or delay that line.
- R2. The site has **the sections promised in the client brief, section 6**: hero, sets by occasion, virtual try-on, meaning of the beads, how custom orders work (5 steps), real coral guide, gallery, location and opening hours, Enquire on every set. If a section is renamed, removed or changed, update the brief or keep the section.
- R3. **Every Enquire/Book button opens the Royal Beads Edo n8n form**: `https://deestnee.app.n8n.cloud/form/royal-beads-edo-enquiry`. Where a set is chosen, it is prefilled in `Message`. No other order route.
- R4. Uses the **client's real name, area and services**: Royal Beads Edo, Oba Market area, Benin City, coral beads and traditional attire. No lorem ipsum, no "placeholder", "demo" or "assumption" text.
- R5. **Looks good on a phone.** Check at 375 px wide: no sideways scroll, text readable, buttons tappable, chat bubble not covering buttons.
- R6. **Live on a link** (royal-beads-edo.vercel.app). Never leave `main` broken.

### AI images (10 pts)
- R7. **One big top image and three service images**, all AI-made, in one consistent style and colour (warm photoreal, deep browns and cream, coral accent). The **AI hero image is the first thing on the page**. Video may come after it, never in place of it.
- R8. **Nigerian people and places** where it fits.
- R9. **Every prompt is saved** in the "Image Prompts" doc in the hand-in folder, numbered to the file.
- R10. **Never present AI images as the client's real customers or real work.** Each AI image carries the small "Concept image" tag; the footer explains it.
- R11. Real photos from other people (Wikimedia, stock) are **never shown as the client's own sets**. Each one carries a small credit tag on the image itself, and the licence is credited in the footer.

### Chatbot (10 pts)
- R12. The chat bubble is on every page. (Botpress replaces Chatbase; the class allowed it.)
- R13. The bot uses the FAQ from the brief, a friendly tone, the business name, and **the never rule**. It sends people to the Enquire form.
- R14. Any feature that talks about dates, prices or orders must follow the same rules as the bot (see Client rules below).

### n8n enquiry automation (extra feature)
- R15. The group n8n project was cancelled; the workflow is now the shop's own extra feature and is not scored. The "Enquiry form" node stays published with 4 fields: Name, Email, Phone (optional), Message. The `Message` label must not change, because the site prefills it. Emails and Telegram alerts follow C1.

### Client brief (10 pts)
- R16. The brief stays **one page**, shows "approved", and names the problem and the never rule. Content changes need Ella's approval again.

## Client rules (from the interview)

- C1. **Never confirm, promise or guess a custom-set ready date.** Only the workshop confirms ready dates. No feature, copy, email or bot answer may show a date.
- C2. Custom requests for an event **less than 3 weeks away** go to a person (CHECK).
- C3. **Price ranges only.** Final prices are agreed with the team.
- C4. Cultural claims stay short and general. Don't invent meanings; avoid styles reserved for the Oba and royalty.

## Safety rules (from the brief)

- S1. Test data only.
- S2. No passwords, API keys or bot tokens in the code or the repo. The site stays static, with no backend.
- S3. Camera and selfie features run fully in the browser. Nothing is uploaded.
- S4. Turn the n8n workflow off after demo day.

## Checklist to copy

```
Rubric check for: <feature>
[ ] R1 top line still visible first
[ ] R2 brief sections intact (or brief updated)
[ ] R3 Enquire goes to the Royal Beads Edo n8n form
[ ] R4 real name, area, services; no placeholder/demo text
[ ] R5 checked at 375 px on a phone
[ ] R7 AI hero is still the first thing on the page
[ ] R10/R11 every image labelled (Concept image or photo credit)
[ ] C1 no ready dates anywhere
[ ] C3 prices as ranges only
[ ] S2 no keys or tokens; S3 nothing uploaded
```
