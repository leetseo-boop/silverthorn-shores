## Goal
Remove the flower/plant box from Thorn's "houseboat" mood illustration, leaving everything else identical, and keep it saved as the `houseboat` Thorn mood.

## Steps
1. Take the current `houseboat` mood image (`src/assets/thorn/houseboat.webp.asset.json` → CDN URL) as the edit source, so the result matches the existing art exactly.
2. Run an AI image edit with the instruction: remove the hanging flower/planter box on the houseboat's side wall, replace with the plain white hull/wall surface. No other changes — same dog pose, boat, life ring, railing, transparent background.
3. Upload the edited PNG/WebP via `lovable-assets create` and overwrite `src/assets/thorn/houseboat.webp.asset.json` with the new pointer.
4. Visually verify the result (plants gone, nothing else altered, background still transparent). Re-run the edit if artifacts appear.

## Notes
No code changes needed — `thorn-moods.ts` and `ThornChat.tsx` read the pointer file, so the new image flows through automatically to both the chat panel and the corner launcher.
