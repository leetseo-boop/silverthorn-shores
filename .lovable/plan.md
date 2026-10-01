# Replace End of Summer Sale with Shasta Lake Fall Sale 2026

Replace the expired campaign everywhere with the October promotion, using the supplied Fall 2026 banner and a balanced autumn look.

## Promotion rules

- Run **October 1–31, 2026**, from 12:00 AM October 1 through 11:59 PM Pacific on October 31.
- Offer **20% off** with code **`fall26`**, for new reservations only and subject to stated restrictions.
- Eligible rentals only:
  - Queen houseboat
  - Sun Tracker Pontoon
  - Patio Boat
  - Party Cruiser I
  - Aluminum Fishing Boat
  - Kayak
  - All cabins
- Exclude Queen I, Queen II, Senator, jet skis, wakeboard boats, deck boats, Centurion T-5, stand-up paddle boards, and every other unlisted rental.
- Automatically remove all Fall Sale visuals, pricing, metadata, schema, and Thorn promotion answers after the October 31 cutoff.

## Homepage and visual treatment

- Replace the End of Summer banner below the homepage hero with the supplied `Fall_Lake_Getaway_20_Off.png`, stored through the project’s optimized asset delivery.
- Update the top hero sale strip to the Shasta Lake Fall Sale, dates, 20% discount, and `fall26` code.
- Show a Fall Sale badge and 20%-off low-season price only on the Queen card; all other houseboat cards retain normal prices and no promotion treatment.
- Keep the Cabin and Small Boat homepage cards promotional, with accurate eligible-rental wording so the Small Boat card does not imply every vessel qualifies.
- Introduce a restrained sitewide fall mood through semantic autumn colors and small leaf/acorn-style accents, concentrated on promotional banners and eligible rental cards. Preserve readability, existing page structure, and mobile spacing; avoid clutter or excessive animation.

## Fleet, detail pages, and pricing

- Replace the shared summer promotion components with Fall Sale styling, wording, icons, dates, and eligibility checks.
- Houseboat fleet and Queen detail page:
  - Promote Queen only.
  - Label the original amount as the low-season rate, strike it through, and show the exact 20%-off amount.
  - Add a Fall Sale banner with code, dates, eligibility, and new-reservations restriction.
- Small-boat listing and eligible individual pages:
  - Add Fall badges and banners only to Sun Tracker, Patio Boat, Party Cruiser I, Aluminum Fishing Boat, and Kayak.
  - Strike the existing daily and weekly rates and show exact 20%-off prices with decimals preserved.
  - Leave every excluded vessel unchanged and free of promotion language or schema.
- Cabins page:
  - Add a prominent Fall Sale banner and booking call-to-action.
  - Do not invent or display cabin prices; direct visitors to live availability.

## Remove the expired campaign

- Remove every visible reference to “End of Summer Sale,” `LABOR26`, September dates, summer icons, old eligibility rules, and the previous banner.
- Remove the old banner asset after confirming it has no remaining references.
- Replace comments, accessibility labels, page descriptions, structured data, and assistant knowledge that still name the expired campaign.

## Search, AI, and Thorn

- Update titles, descriptions, social metadata, and SaleEvent/Offer structured data on the homepage, Queen, houseboat fleet, cabins, small-boats listing, and eligible small-boat detail pages.
- Use “Shasta Lake Fall Sale 2026” and specific Silverthorn Resort rental terms naturally, without creating a separate promotion page.
- Keep the existing sitemap and ensure all eligible existing pages remain included; remove any stale promotion URL if one is found. No new sitemap page will be added.
- Teach Thorn the exact October dates, code, eligible rentals, exclusions, restrictions, and automatic expiration behavior. After expiration, Thorn must say the Fall Sale has ended and must not offer the code as active.

## Technical details

- Update the central promotion configuration and eligibility helper so every banner, badge, price, schema block, and Thorn answer uses one source of truth.
- Use Pacific-time-safe UTC boundaries: October 1 at 12:00 AM PDT through October 31 at 11:59 PM PDT.
- Ensure structured offers use the same 20% calculation and exact eligibility as the visible pages.
- Preserve existing booking links and normal post-sale pricing.

## Verification

- Search the full project for all expired campaign terms, code, dates, and old asset references; none should remain in active site content.
- Check homepage, fleet, Queen, cabins, small-boats listing, every eligible vessel page, and representative excluded pages on desktop and mobile.
- Confirm no overlap, horizontal scrolling, layout shift, weak contrast, or distracting animation.
- Confirm Queen low-season and eligible small-boat prices calculate to exactly 80% of the stored rates, preserving decimals where applicable.
- Confirm promotion content is active during October and absent after the cutoff.
- Confirm page metadata and structured data match what visitors see, the sitemap responds correctly, and the project preview is error-free.
