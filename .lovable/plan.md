# Add kayaks and paddle boards to the End of Summer Sale

Kayaks and stand-up paddle boards join the 20% off sale. Jet skis stay the only excluded rental.

## What changes

- Kayak and SUP cards on the Small Boats page get the 20% badge and the struck-through / discounted daily price, exactly like the other boats.
- The kayak and paddle board detail pages get the same promo banner and discounted daily/weekly pricing as the rest of the fleet.
- Wording everywhere that says "jet skis and paddle toys excluded" becomes "jet skis excluded" — small boats page banner, page description and SEO copy.
- Thorn learns the updated scope: kayaks and paddle boards are 20% off with code LABOR26; only jet skis are excluded. His sale FAQ answers are reworded to match.

Everything still turns itself off automatically after Sept 30, 11:59 PM Pacific.

## Technical notes

- `src/lib/promo.ts`: `excludedBoatSlugs` becomes `["jet-ski"]`; comment updated.
- `src/routes/small-boats.tsx`: banner text and promo-aware SEO description drop the "paddle toys" wording. Card badge/pricing logic already keys off `isBoatIncluded`, so kayak and SUP pick it up automatically.
- `src/components/SilverthornBoatDetail.tsx`: no logic change needed — the banner and `PromoPrice` are already gated on `isBoatIncluded(boat.slug)`.
- `src/routes/index.tsx` SaleEvent schema description: "jet skis excluded".
- `src/lib/thorn/kb-site.ts` `PROMO_ENTRIES`: summary, highlights and FAQ answers updated to include kayaks and paddle boards and exclude only jet skis.
- Banner image alt text already reads "except jet skis" — unchanged.
- Verify with a build and by checking the kayak, SUP and jet ski pages render (or omit) the promo correctly.
