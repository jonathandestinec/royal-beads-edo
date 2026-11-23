# Virtual try-on (planned)

In-browser coral necklace and crown try-on, built on `@mediapipe/tasks-vision` (Face Landmarker).

- Runs entirely on the device. No images leave the browser, no server.
- Canvas overlay of transparent bead PNGs from `public/images/try-on/`: necklace anchored under the chin and jaw, crown on the forehead and temples, scaled by landmark distance and rotated with head tilt.
- Landmark smoothing across frames to stop jitter.
- Style picker, "Take photo", selfie-upload fallback when there's no camera.
- "Love this look? Enquire" pre-fills the Enquire form via `buildEnquireUrl()` in `src/config/site.ts`.
- All bead PNGs are AI-generated concept designs and are labelled as such.

Load this feature client-side only (`"use client"` plus a dynamic import) so MediaPipe never runs during the static build.
