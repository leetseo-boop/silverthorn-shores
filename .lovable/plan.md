## Goal
Remove the illustrated background behind the location info card on `/directions` and `/contact`, leaving only the centered front card with the resort name, address, feature chips, and "Open in Google Maps" button.

## What I’ll change
- Edit `src/components/ResortMap.tsx`:
  - Remove the gradient wash, bottom band, and all decorative circle/wave shapes.
  - Keep the outer container minimal (plain `bg-background` or `bg-muted` as a subtle frame).
  - Keep the centered info card, icon, address, two feature chips, and CTA button unchanged.
  - Preserve responsive padding and accessibility attributes.

## Scope
- This single component is used on both `/directions` and `/contact`, so the change applies to both pages automatically.
- No navigation, copy, or button behavior changes.

## Verification
- Check the preview on `/directions` and `/contact` at desktop and mobile widths to confirm the background is gone and the card remains centered and readable.