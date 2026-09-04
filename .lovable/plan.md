# Add 20% Promo to Homepage Lake Cabins & Small Boat Cards

Add the active End of Summer Sale 20% OFF treatment to the two homepage showcase cards (Lake Cabins and Small Boat Rentals) so they match the houseboat fleet cards.

## What will change

- On the homepage `Cabins + Small Boats` image-led showcase cards, conditionally render a `PromoBadge` when `isPromoActive()` is true.
- Add a short promo line below each card tagline (e.g., "20% off with code LABOR26 · new reservations only") when the promo is active.
- Keep the existing card layout, hover behavior, and CTA buttons unchanged.
- No price slashing on these cards (cabins are booked off-site; small-boat pricing lives on `/small-boats`).

## Files to edit

- `src/components/SilverthornHomePage.tsx` — update the cabins + small boats showcase card block.

## Verification

- Build passes.
- Homepage shows 20% OFF badge and promo copy on both cards while the sale is active.
- Promo elements disappear automatically after the sale cutoff.
