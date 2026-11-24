# Virtual try-on

The page at `/try-on`. In-browser coral necklace and crown try-on, built on `@mediapipe/tasks-vision` (Face Landmarker).

- Runs entirely on the device (rule S3). The camera picture and any chosen photo never leave the browser. The face model is served from `public/models/face_landmarker.task`; the MediaPipe runtime files come from jsDelivr, pinned to the installed version.
- `sprites.ts` draws the bead art once, in the browser, onto transparent canvases. They are concept designs and are labelled as such on the page and on every saved photo (rule R10).
- `tracking.ts` places the necklace under the chin and the crown on the hairline, sized by the face width and turned with head tilt, smoothed from frame to frame. Tune `NECK_DROP` and `CROWN_LIFT` there, and the sizes (`faces`) in `sprites.ts`.
- `sets.ts` lists the sets in the picker and writes the Enquire message. No prices or dates (rules C1, C3).
- Style picker, "Take photo" (shares on phones, downloads elsewhere), photo upload when there's no camera.
- "Love this look? Enquire" opens the group n8n form with `Business=Royal Beads Edo` and the chosen set in `Message`, via `buildEnquireUrl()` in `src/config/site.ts` (rule R3).

To use real bead photos later, replace a sprite with a transparent PNG drawn at the same size and anchor (`NECK` and `CROWN` in `sprites.ts`).

The feature loads client-side only (`TryOnLoader.tsx`, a dynamic import with `ssr: false`), so MediaPipe never runs during the static build.
