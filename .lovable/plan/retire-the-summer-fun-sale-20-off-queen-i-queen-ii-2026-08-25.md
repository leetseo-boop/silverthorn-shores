# Retire the Summer Fun Sale (20% off Queen I & Queen II)

Yes — this is doable. Two stages: everything switches off by itself tonight at 11:59pm Pacific, then you ping me tomorrow and I delete the leftover code and the compare page for good.

## Stage 1 — Auto-expire tonight (deploy today)

One shared "is the promo still running?" check drives every promo surface. After 11:59:59pm PT tonight, all of these stop rendering with no further action:

- Home page: the promo banner image and the animated "20% OFF" pill in the hero
- Houseboat cards (home, fleet page, anywhere else): the 20% OFF badge and the glowing sunset frame
- Queen I and Queen II detail pages: the full summer promo section
- Compare page: the promo badges, banner and 20%-off copy
- SEO: the promo Offer schema on the home page, and promo wording in the home/compare titles and descriptions revert to clean non-promo text
- Thorn: promo facts removed from his knowledge so he stops mentioning the sale or the code

The compare page stays reachable tonight (it's linked from the banner until the cutoff), just without promo styling once expired.

## Stage 2 — Full cleanup (tomorrow, on your go-ahead)

- Delete the compare page and its route, plus the promo components, promo config, promo CSS animations and the promo banner image
- Add a permanent 301 redirect from `/compare/queens` to `/houseboats` so old links and any indexed URL land on the fleet page
- Remove `/compare/queens` from the sitemap and from `llms.txt`
- Strip the now-unused promo props from the houseboat cards and detail pages

## Technical notes

- `src/lib/promo.ts` gains `isPromoActive()`, comparing current time against `2026-08-26T06:59:59Z` (11:59pm PDT, UTC-7). `PromoBadge`, `PromoCardFrame`, `HouseboatPromoSection` and `SummerPromoBanner` return null when inactive; head metadata in `src/routes/index.tsx` and `src/routes/compare.queens.tsx` drops the promo Offer JSON-LD and promo copy.
- Because head/meta is evaluated per request on the server, expiry applies to crawlers too without a redeploy.
- Thorn: promo entries removed from `src/lib/thorn-knowledge.ts`, `src/lib/thorn/kb-site.ts`, `src/lib/thorn-sources.ts` and the chat system prompt.
- Stage 2 redirect goes in the existing `LEGACY_REDIRECTS` map in `src/server.ts`.
