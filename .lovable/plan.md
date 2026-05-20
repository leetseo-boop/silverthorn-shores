
## Overview
Create a new "Planning Your Vacation" page at `/planning` (replacing the current placeholder link in the nav). Modern, mobile-first design with hero image, sectioned content, supporting imagery, icon-driven contact cards, and full SEO.

## Files to create

### 1. Image assets (`src/assets/planning/`)
Copy uploaded photos + generate two supporting images:
- `planning-family-packing-hero.jpg` — from `user-uploads://readyup.png` (HERO, family loading car for the lake)
- `silverthorn-resort-welcome-sign.jpg` — from `user-uploads://svr1.jfif` (resort/marina view)
- `silverthorn-marina-market-interior.jpg` — from `user-uploads://702325026_1488389326115359_9190088650875223485_n.jpg` (apparel & market)
- `lake-shasta-caverns-tour.jpg` — from `user-uploads://558386283_1390669466396285_5531037713286785222_n.jpg` (caverns)
- `houseboat-fishing-shasta-lake.jpg` — from `user-uploads://623292611_1654089545569705_5882729233595578742_n.jpg` (fishing from houseboat)
- `sundial-bridge-redding-mount-shasta.jpg` — from `user-uploads://636254771_1338295311665831_7129317990693836902_n.jpg` (Sundial Bridge)
- `waterworks-park-redding.webp` — from `user-uploads://301-2.webp`
- Generated: `shasta-dam-aerial.jpg` (Shasta Dam exterior with reservoir) — `imagegen` standard
- Generated: `potem-falls-shasta-waterfall.jpg` (Potem Falls 45-ft waterfall) — `imagegen` standard

All `alt` text SEO-tuned (descriptive keywords: Shasta Lake, Silverthorn Resort, Redding CA, activity).

### 2. `src/components/PlanningVacationPage.tsx`
React component with these sections, in order:

1. **Hero** — full-bleed `planning-family-packing-hero.jpg`, gradient overlay, H1 "Planning Your Vacation at Shasta Lake", sub "Everything you need to know before your trip to Silverthorn Resort", two CTAs (Book a Houseboat / Contact Us). `loading="eager"`, preload.
2. **Quick Intro** — short paragraph + breadcrumb (Home › Shasta Lake › Planning Guide).
3. **Small Boat Rentals** — 2-col (image right: marina sign); 4 boat cards (Ski Boat, Patio Boat, Deluxe Patio, Fishing Boat) with lucide icons (`Anchor`, `Sailboat`, `Sun`, `Fish`) + extras line (kayaks/SUP/tubes/wakeboards). Link to `/small-boats`.
4. **Apparel Shop & Marina Market** — image left, hours card right with `Clock` icon, brand chips (Reef, Cielo Rosso, Von Zipper), essentials list.
5. **Things to Do** — section header, 6 feature cards (Boating, Fishing, Tour Shasta Dam, Lake Shasta Caverns, Potem Falls Waterfall, Bird Watching). Each card: image, icon, title, copy, phone (when applicable) with `tel:` link.
6. **Redding Attractions** — 2 cards: Sundial Bridge / Turtle Bay (image), Waterworks Park (image), with phones.
7. **Information & Services** — grouped contact cards using lucide icons & `tel:` links:
   - Information Centers (`Info` icon) — Chamber, Visitors Bureau, Shasta Lake Chamber, Info Center
   - Travel (`Plane`/`Car`/`Taxi` icons) — Airport, Enterprise, Hertz, ABC Taxi, Yellow Cab
   - Hospitals (`Cross`/`Hospital` icon) — Mercy, Shasta Regional
   Each phone number is a tappable card with icon + label + number.
8. **Final CTA band** — "Ready to plan your trip?" → houseboats / contact.

Design: uses existing tokens (`bg-navy`, `bg-sand`, `text-primary`, `font-display`). Cards use `Card` from ui. Generous spacing, rounded-2xl, soft shadows, hover lift. Mobile: stacked, larger tap targets (min-h-14 on phone cards). All images `loading="lazy"` except hero, with width/height attrs.

### 3. `src/routes/planning.tsx`
TanStack route with full head meta:
- `title`: "Planning Your Shasta Lake Vacation — Silverthorn Resort Guide"
- `description`: ~155 chars covering boat rentals, marina, things to do, Redding attractions, info numbers
- og:title/description/type=article, og:url, og:image (absolute hero URL)
- twitter:card=summary_large_image
- canonical → `https://silver-shasta-dreams.lovable.app/planning`
- Preload hero image
- JSON-LD: `TouristTrip` + `BreadcrumbList` (Home → Shasta Lake → Planning Guide) + `FAQPage` is overkill — skip. Add `LocalBusiness`/`TouristAttraction` referencing Silverthorn.

### 4. Sitemap
If `src/routes/sitemap[.]xml.ts` exists, add `/planning` entry. (Will check during build; otherwise skip.)

## Nav
No nav change — `/planning` already exists as a submenu item under Shasta Lake.

## SEO/A11y checklist
- Single H1, hierarchical H2/H3
- Descriptive alt on every image (keywords: Shasta Lake, Silverthorn, activity)
- Semantic `<section>`, `<nav>` for breadcrumb, `<address>` for contact cards
- All phones as `<a href="tel:+1...">` with `aria-label`
- Color contrast via existing tokens
- Mobile: 44px+ tap targets, responsive grid (1 / 2 / 3 cols), `h-dvh` not used (hero is fixed-height)
- Preloaded hero, lazy-loaded rest, explicit width/height to avoid CLS
