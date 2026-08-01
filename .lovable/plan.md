## Goal
Make Thorn clearly visible in the hero section of `/thorn`.

## Current issue
The marina hero photo is cropped with `object-cover` centered, so Thorn — lying in the sandy foreground/bottom of the image — is hidden below the visible area and behind the dark gradient overlay.

## Proposed fix
1. **Adjust focal point** in `src/routes/thorn.tsx`
   - Change the hero `<img>` from default `object-cover` center crop to `object-cover object-bottom` (or a custom `object-[center_70%]`) so the bottom of the image where Thorn sits is pulled into view.
   - Keep `object-cover` and responsive height so the layout doesn’t break on mobile/desktop.

2. **Lighten the overlay**
   - Reduce the bottom/lower gradient opacity so Thorn is not silhouetted by the dark navy wash.
   - Keep enough contrast for the white hero text to remain readable.

3. **Verify**
   - Check the preview at `/thorn` on desktop and mobile to confirm Thorn is visible and text remains legible.

## Files to edit
- `src/routes/thorn.tsx` (hero image + overlay only)

## Out of scope
- No copy changes, no new assets, no footer/header edits.