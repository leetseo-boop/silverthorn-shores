## Queen I houseboat page

Create `/houseboats/queen-i` by cloning `src/routes/houseboats.queen.tsx` with Queen I content swapped in.

### File

**`src/routes/houseboats.queen-i.tsx`** — new route, reuses shared `Nav` + `Footer` exported from `SilverthornHomePage.tsx`, and an inline `Lightbox` (same as Queen page).

### Section content

1. **Hero** — `/images/queen-i-hero.jpg`, headline "Queen I: The Ultimate Adventure", subheadline "The most popular boat in our fleet for large groups and reunions.", orange "Check Availability" → `https://rentals.silverthornresort.com/details/19` (new tab), plus phone `800-332-3044` displayed under the CTA as a `tel:` link.
2. **Gallery** — horizontal scrolling row (`flex overflow-x-auto snap-x`) of `queen-i-gallery-1..4.jpg`. Click opens lightbox (same component as Queen page).
3. **Specs** — navy bg, 2×4 grid on desktop, orange icon tiles: Sleeps 20, 4 Staterooms + Bonus Room, 2.5 Bathrooms, Hot Tub, Waterslide, 2 BBQ Areas, Full Kitchen, Fireplace + Wet Bar (Lucide icons: Users, BedDouble, Bath, Droplets, Waves, Flame, ChefHat, Sparkles).
4. **Description** — centered prose block with provided copy.
5. **Pricing table** — proper `<table>` with 3 season columns × 3 nights rows (3 / 4 / 7). Holiday rates rendered in red (`text-red-600`) next to base price. Each cell links to details/19. Footnote: "High Season: June 11–August 19, 2026. All mandatory fees included. Red = Holiday rate."
6. **Orange CTA banner** — "Ready to Book the Queen I?", white "Check Availability" button → details/19, secondary "Call 800-332-3044" as `tel:` link below.
7. **Explore the Fleet** — 3 cards: Queen (`/houseboats/queen`, "Elite of the Fleet"), Queen II (`/houseboats/queen-ii`, "Luxury on the Lake"), Senator (`/houseboats/senator`, "Destination Vacation"). Each shows thumbnail (`/images/queen-thumb.jpg`, `queen-ii-thumb.jpg`, `senator-thumb.jpg`), name, tagline, "View" button.

### SEO

`head()` with title "Queen I Houseboat — The Ultimate Adventure | Silverthorn Resort", description matching subheadline + capacity, og:image = `/images/queen-i-hero.jpg`, canonical `/houseboats/queen-i`.

### Notes

- Reuses existing exported `Nav` and `Footer` from `SilverthornHomePage.tsx` — no other files modified.
- 5 new image paths expected in `public/images/`: `queen-i-hero.jpg`, `queen-i-gallery-1..4.jpg`. Fleet thumbnails (`queen-thumb.jpg`, `queen-ii-thumb.jpg`, `senator-thumb.jpg`) also expected — user uploads when ready.
- routeTree.gen.ts regenerates automatically.
- Out of scope: building Queen II and Senator pages (same template, future task).