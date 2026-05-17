## Silverthorn Resort Houseboats — Fleet Page (`/houseboats`)

The "Our Fleet" nav item currently points to `/houseboats`, but no route exists. Create a modern fleet overview page modeled on the houseboats.com reference, using existing project data (`src/data/houseboats.ts`) and assets — no new image generation needed.

### Files

**New:** `src/routes/houseboats.index.tsx` — route at `/houseboats` with full SEO `head()` (title "Silverthorn Resort Houseboats | Shasta Lake Fleet", description, og + twitter tags using Queen hero image, canonical, JSON-LD `ItemList` of the 4 boats + `BreadcrumbList` + `FAQPage`).

**New:** `src/components/HouseboatsFleetPage.tsx` — the page component.

No edits to nav, data files, or existing routes. Pure additive.

### Page sections (top → bottom)

1. **Hero** — full-bleed Queen exterior image, dark gradient overlay. Eyebrow "Pit River Arm • Shasta Lake • Northern California", H1 "Silverthorn Resort Houseboat Rentals on Shasta Lake", subhead about Mt. Shasta views + 4 premium boats, two CTAs (Check Availability → `https://rentals.silverthornresort.com/`, phone `tel:1-800-332-3044`), trust row (4.9★ / 400+ groups).

2. **Why Choose Silverthorn** — 4-up icon grid: Mt. Shasta Views, Direct Lake Access, Full-Service Marina, Secluded Coves.

3. **Fleet intro** — H2 "Our Premium Houseboat Fleet" + short paragraph.

4. **Boat overviews** (one large card per boat, alternating image/text layout for visual rhythm). For each of Queen, Queen I, Queen II, Senator iterate `houseboats` array from `src/data/houseboats.ts`:
   - Hero image (`boat.heroImages[0]`), `boat.badge` chip, name, tagline.
   - Spec strip: length, sleeps, staterooms, bathrooms (drawn from data).
   - Description (`boat.description`).
   - "Best for" line + bulleted `boat.highlights` (first ~8).
   - Two CTAs: `<Link to="/houseboats/$slug">Explore the {name}</Link>` and external "Book Now" → `boat.bookingUrl`.

5. **Amenities & Onboard Features** — 6-up grid (Hot Tubs & Waterslides, Gourmet Kitchens, Entertainment Systems, Private Staterooms, Multi-Deck Living, Safety & Comfort) with lucide icons.

6. **Guest Reviews** — 3 testimonial cards (Patel Family / Queen, Lisa & David K. / Queen I, Martinez Group / Queen II) using the reference quotes.

7. **FAQ** — shadcn `Accordion` with the 8 questions from the reference. Concise answers written from existing data (pricing range, largest boat = Queen, 3 of 4 have hot tubs, location, cancellation, what's included, best time = May–Sept, book 6–12 months ahead).

8. **Final CTA band** — "Book Your Shasta Lake Houseboat", availability + phone CTAs, hours line.

9. **Getting to Silverthorn** — short directions block (Redding / Sacramento / Bay Area) + "Get Directions" link to the Google Maps URL.

### Design system

- Use existing semantic tokens (`bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, `bg-card`, `border-border`) and existing fonts (DM Sans + Playfair Display already loaded in `__root.tsx`). Headings in Playfair, body in DM Sans, matching the home page.
- shadcn primitives: `Button`, `Card`, `Badge`, `Accordion`, `Separator`. lucide-react icons (`Mountain`, `Waves`, `Anchor`, `TreePine`, `Flame`, `ChefHat`, `Tv`, `BedDouble`, `Layers`, `ShieldCheck`, `Star`, `Phone`, `MapPin`).
- Generous whitespace, large rounded corners (`rounded-2xl`), subtle shadows, container `max-w-6xl mx-auto px-4`, section padding `py-20 md:py-28`.
- Alternating layout for boat cards (`md:flex-row` / `md:flex-row-reverse`) — image `aspect-[4/3]`, text side with badge, H2, specs, description, highlights, CTAs.
- All `<img>` use `loading="lazy"` (except hero `fetchpriority="high"`) and descriptive alt text from `boat.heroAltTexts[0]`.
- Fully responsive: single column < md, two-column boat cards ≥ md, 2/3/4-column feature grids.

### SEO / structured data

`head()` returns:
- `<title>` "Silverthorn Resort Houseboats — Shasta Lake Fleet | Queen, Queen I, Queen II & Senator"
- meta description ≈ 155 chars
- canonical `/houseboats`
- og + twitter image: `/images/queen-houseboat-exterior-lifestyle-anchored-silverthorn-resort.jpg`
- JSON-LD: `ItemList` of 4 `Product` entries (name + url + image + aggregateRating from data), `BreadcrumbList` (Home → Houseboats), `FAQPage` mirroring on-page FAQ.

### Out of scope

No nav changes, no new images, no new data, no edits to existing boat detail routes or home page. Routes `/houseboats/policy` and `/houseboats/guest-info` (linked in Nav submenu) remain TODO — not part of this plan.
