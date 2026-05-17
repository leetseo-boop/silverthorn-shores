## Queen Houseboat page — template for all 4 boats

Create `/houseboats/queen` as the canonical boat detail page. Reuse the homepage's nav + footer by extracting them from `SilverthornHomePage.tsx` into shared components so all 4 boat pages (and the homepage) share one source of truth.

### Files

1. **`src/components/site/Navbar.tsx`** — extracted from `SilverthornHomePage.tsx` (nav + mobile menu logic). Logo/brand links to `/`, anchor links keep working from any page (`/#fleet`, `/#about`, etc.).
2. **`src/components/site/Footer.tsx`** — extracted from `SilverthornHomePage.tsx`.
3. **`src/components/SilverthornHomePage.tsx`** — replace inline nav/footer with the new shared components. No other content changes.
4. **`src/routes/houseboats.queen.tsx`** — new route at `/houseboats/queen` with its own `head()` (SEO title, description, og:image=`/images/queen-hero.jpg`).
5. **`src/components/site/BoatGalleryLightbox.tsx`** — small client-side lightbox component (click thumbnail → fullscreen overlay, ESC/click-outside to close, prev/next arrows). Reused by future boat pages.

### Page sections (in order)

1. **Hero** — full-width `/images/queen-hero.jpg` (object-cover, ~70vh), dark gradient overlay, Playfair "Queen: Elite of the Fleet" headline, orange (`#E8640A`) Book Now button → `https://rentals.silverthornresort.com/details/18` (`target="_blank" rel="noopener noreferrer"`).
2. **Gallery row** — 4-column grid (2-col on mobile) of `queen-gallery-1..4.jpg`, descriptive alts (e.g. "Queen houseboat upper deck hot tub"), click opens lightbox.
3. **Specs grid** — navy `#1B2B3A` bg, white text, orange icon accents. 3×3 grid of: Sleeps 20, 4.5 Bathrooms, 3 Decks, Hot Tub, Waterslide, Full Kitchen, FireTV, Fireplace, BBQ Grill. Lucide icons (Users, Bath, Layers, Waves, etc.).
4. **Description** — centered max-w prose block with the provided copy.
5. **Pricing table** — 3 cards: Low Season (Jan–Apr & Aug–Nov) $4,247, Shoulder (May & Sept) $4,793, High Season (Jun–Aug) $6,322. Each "3 nights" subtitle, each card is a link → details/18. Footnote: "Holiday rates apply; contact us for details."
6. **Orange CTA banner** — full-width `#E8640A`, white Playfair headline "Ready to Book the Queen?", white outline/solid Book Now button → details/18.
7. **Explore the Fleet** — 3-card row linking to `/houseboats/queen-i`, `/houseboats/queen-ii`, `/houseboats/senator` (placeholder thumbnails `/images/queen-i-thumb.jpg` etc.; routes will 404 until built — noted below).

### Technical notes

- Route file uses TanStack `createFileRoute("/houseboats/queen")` + `head()`. Flat dot-naming: `houseboats.queen.tsx`.
- Nav extraction: move the `<header>` JSX and `mobileMenuOpen` state from `SilverthornHomePage.tsx` into `Navbar.tsx` unchanged. Same for `<footer>` → `Footer.tsx`. Homepage imports both. No visual change to `/`.
- Anchor nav from a non-home page: links become `/#fleet`, `/#about` so they navigate home then scroll. Smooth-scroll already enabled in `styles.css`.
- All 9 image paths (`/images/queen-hero.jpg`, `queen-gallery-1..4.jpg`, plus 3 fleet thumbnails) are expected in `public/images/`. **The user must upload them** — until then, broken images will show. I'll add `loading="lazy"` and width/height hints; lightbox handles missing gracefully.
- Lightbox: pure React + portal-less fixed overlay, no new deps.
- Colors use existing tokens: `bg-primary` (#E8640A) and `bg-secondary`/`#1B2B3A`. Fonts already loaded (Playfair Display + DM Sans).
- The other 3 boat pages will be cloned from this file with content swapped — not built in this task.

### Out of scope (next steps after approval)

- Queen I, Queen II, Senator pages (same template).
- Uploading the 9 referenced images.
