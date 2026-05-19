## Homepage CTA consolidation + FAQ section

### 1. Merge dual buttons into one orange CTA per card

**FleetCard (`SilverthornHomePage.tsx` lines 510–523)** — houseboat cards on home:
- Remove the `Check Availability` (booking URL) + `Learn more →` pair.
- Replace with one full-width orange button linking to the boat's detail page (`boat.slug`, e.g. `/houseboats/queen`):
  - Label: **"Explore the {boat.name} →"**
  - Style: `bg-#E8640A`, white text, rounded-lg, full width, hover darken to `#C4520A`.

**Cabins + Small Boats showcase (lines 581–652)** — the two large cards below the houseboats:
- Remove the booking-URL CTA + secondary "Learn more" link.
- Replace with one full-width orange button per card:
  - Cabins → `/cabins`, label **"See Our Lake Cabins →"**
  - Small Boats → `/small-boats`, label **"Browse Boat Rentals →"**
- Same orange style as houseboat cards for visual consistency.

Net effect: every fleet card on the homepage funnels guests to the relevant detail/landing page first (not directly to the external booking system), matching the user's request.

> Note: the hero section's `Book Season 2026` button (line 415) and the `View Our Fleet` button stay as-is — they're page-level CTAs, not per-fleet-item.

### 2. New FAQ section after "What Our Guests Say"

Insert a new `<HomeFAQ />` component in the page composition, placed **immediately after `<Testimonials />`** and before `<SisterMarina />`.

**Design:**
- Background `#fff`, max-w-3xl, centered.
- Eyebrow "Common questions" in orange `#E8640A`, headline "Plan Your Shasta Lake Stay" in Playfair Display `#1B2B3A`.
- Use existing shadcn `Accordion` (`src/components/ui/accordion.tsx`) for collapsible Q&A — already in the project.
- 6 questions covering the three product lines:
  1. *Which houseboat is right for my group?* → mentions Queen / Queen I (sleeps 20), Queen II (16, penthouse), Senator (16, value); inline link to `/houseboats`.
  2. *What's included with a lake cabin?* → kitchen, BBQ, DirecTV, one boat slip; link to `/cabins`.
  3. *Can I rent a small boat for the day?* → pontoons, jet skis, wakeboard, fishing boats from ~$78/day; link to `/small-boats`.
  4. *When should I book for 2026?* → high-demand summer weeks fill 6–9 months out; encourages early booking.
  5. *Where exactly is Silverthorn Resort?* → Pit River Arm, ~15 min north of Redding off I-5; link to `/directions`.
  6. *Do I need a boating license or experience?* → no license required, full orientation provided.
- Bottom helper line: *"Still deciding? Call {PHONE} or visit our [full FAQ](/faq)."*

**SEO:** add a `FAQPage` JSON-LD `<script>` to `src/routes/index.tsx`'s existing `head().scripts` array mirroring the 6 Q&As, so the homepage gets rich-result eligibility for these questions.

### Files touched

- `src/components/SilverthornHomePage.tsx` — edit `FleetCard` button block, edit cabins/small-boats card button block, add `HomeFAQ` component + render it between `Testimonials` and `SisterMarina`.
- `src/routes/index.tsx` — add `scripts: [{ type: "application/ld+json", children: ... FAQPage ... }]` to `head()`.

### Out of scope

- No new images, no route changes, no booking-flow changes.
- Hero buttons unchanged.
- `/faq` page unchanged (homepage FAQ is a curated subset that links to it).
