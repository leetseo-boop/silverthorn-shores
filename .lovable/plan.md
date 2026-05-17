# Silverthorn Resort — Homepage Build Plan

A single-page marketing site for a Shasta Lake houseboat rental company, built with React + Tailwind, using the specified brand system.

## Design system

- **Fonts**: Playfair Display (headings), DM Sans (body) — loaded via Google Fonts in `index.html`.
- **Colors** (added as semantic tokens in `index.css` + `tailwind.config.ts`):
  - `--primary` `#E8640A` (orange CTA)
  - `--navy` `#1B2B3A` (background / nav)
  - `--lake` `#1A6FA8` (accent blue)
  - Plus neutral foreground/muted tokens for contrast.
- All `Book Now` CTAs → `https://rentals.silverthornresort.com` with `target="_blank"` `rel="noopener noreferrer"`.
- Hero and section imagery generated via `imagegen` (houseboats on Shasta Lake, cabins, marina) and stored in `src/assets/`.

## Page structure (`src/pages/Index.tsx`)

Component composition, each section as its own file under `src/components/`:

1. **Navbar** — sticky, navy background, logo wordmark left, anchor links (Fleet, About, Testimonials, Contact), orange `Book Now` CTA right. Subtle border-bottom on scroll.
2. **Hero** — full-viewport height, dark photo of houseboat on Shasta Lake with navy gradient overlay. Playfair H1 ("Your Shasta Lake Escape Starts Here"), supporting line, primary `Book Now` + secondary `View Fleet` button.
3. **Fleet Grid** — section heading + responsive grid:
   - 4 houseboat cards (e.g., Sierra 56, Cascade 59, Summit 70, Majestic 75) with image, length/sleeps/highlights, Book button.
   - Cabins card + Small Boats (ski/fishing/patio) card as 2 wider tiles below.
4. **Stats Bar** — lake-blue band with 4 stats (Years on Shasta, Boats in Fleet, Miles of Shoreline, Happy Guests).
5. **About** — two-column: image left, copy right. Story of the resort, family-owned, location on Shasta Lake.
6. **Testimonials** — 3-card grid with quote, name, trip type; subtle navy cards on light bg.
7. **Sister Marina Cross-Sell** — full-width feature card promoting sister marina with image + outbound CTA.
8. **Footer** — navy, multi-column: brand + tagline, quick links, contact (address, phone, email), social. Bottom row with copyright and final `Book Now`.

## Technical details

- `index.css`: define HSL tokens for `primary`, `navy`, `lake`, `foreground`, `background`, `muted`; set body font to DM Sans and `.font-display` to Playfair.
- `tailwind.config.ts`: extend `colors` (primary/navy/lake), `fontFamily.display` = Playfair, default `sans` = DM Sans.
- `index.html`: preconnect + Google Fonts link; update `<title>` and meta description for SEO ("Silverthorn Resort — Shasta Lake Houseboat Rentals"); single H1 in hero; alt text on all images.
- Reusable `<BookNowButton />` to keep the outbound link consistent.
- Smooth-scroll anchors for nav links.
- Mobile-first responsive: grid collapses to 1–2 cols, nav becomes hamburger (Sheet) on small screens.

## Files to create/modify

- `index.html` — fonts, meta
- `tailwind.config.ts` — tokens, fonts
- `src/index.css` — CSS variables, base typography
- `src/pages/Index.tsx` — section composition
- `src/components/site/Navbar.tsx`
- `src/components/site/Hero.tsx`
- `src/components/site/Fleet.tsx`
- `src/components/site/Stats.tsx`
- `src/components/site/About.tsx`
- `src/components/site/Testimonials.tsx`
- `src/components/site/SisterMarina.tsx`
- `src/components/site/Footer.tsx`
- `src/components/site/BookNowButton.tsx`
- `src/assets/*` — generated hero, fleet, about, marina images

## Out of scope

No real booking flow (CTAs hand off to rentals subdomain), no CMS, no backend.
