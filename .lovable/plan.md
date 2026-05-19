## New page: Exploring Shasta Lake

Create `/exploring-shasta-lake` — a modern, mobile-friendly long-form guide to the four arms of Shasta Lake, matching the styling of the existing `ShastaLakePage.tsx` (Playfair Display headings, `#FBF8F3` background, `#0D2030` navy sections, `#E8640A` orange accents).

### Images (copy uploads into `src/assets/exploring-shasta-lake/`)

| Upload | New file | Used as |
|---|---|---|
| `450056090_10227499342082923_3558422030650961919_n.jpg` | `shasta-lake-sunset-hero.jpg` | **HERO** (last image) |
| `11a3b911-a7e4-4baf-8859-4e95c8d765b4.jpg` | `shasta-lake-rainbow-marina.jpg` | Intro / Sacramento Arm visual |
| `449381248_1196051051373559_9017616582013258490_n.jpg` | `shasta-lake-boating-houseboats.jpg` | McCloud / Squaw Arm visual |
| `shasta_camping_map.png` | `shasta-lake-camping-map.png` | "Map of the lake" figure |
| `300-1.webp` | `kennett-historic-town-1900s.webp` | Kennett, CA history block |
| `225.webp` | `baird-fish-hatchery-historic.webp` | Baird Fish Hatchery history block |

All `alt` text will be SEO-rich and descriptive (location, subject, context).

### Page structure (`src/components/ExploringShastaLakePage.tsx`)

1. **Hero** — sunset image full-bleed, eyebrow "Northern California", H1 "Exploring Shasta Lake", intro sentence, on-page anchor chips (Sacramento · McCloud · Squaw · Pit).
2. **Intro + Lake Map** — short overview paragraph + the camping map figure with caption.
3. **Sacramento Arm** (navy section header) — Overview, Kennett CA (with historic photo, side-by-side), Slaughterhouse Island, Basalt & Goosenecks, Gooseneck Cove Boat-In Campground (info card), Lakehead / Gregory House history, Fishing tips card.
4. **McCloud Arm** — Overview, Baird Fish Hatchery (with historic photo), Grey Rocks, Shasta Caverns, hiking trails (Bailey Cove, Greens Creek, Hirz Bay), Samwel Cave legend (pull-quote), Ellery Creek + Ski Island campgrounds (cards), Fishing tips.
5. **Squaw Creek Arm** — Overview (with boating photo), Bully Hill Mine history, Fishing tips.
6. **Pit River Arm** — Overview, Clikapudi Trail, Arbuckle Flat Boat-In Campground, WWII uncleared trees + waterfalls (Bear Creek, Potem), Fishing tips.
7. **CTA** — navy block "Plan your Shasta Lake adventure" → Browse Houseboats / Contact Us buttons.

Reusable card patterns: trail card (name, distance, difficulty), campground card (sites, amenities, fee), fishing tip card. Use `lucide-react` icons (`Mountain`, `Fish`, `Tent`, `Waves`, `MapPin`).

### Route + SEO (`src/routes/exploring-shasta-lake.tsx`)

- `head()` with:
  - `title`: "Exploring Shasta Lake — Sacramento, McCloud, Squaw & Pit River Arms | Silverthorn Resort" (<60 over but trim)
  - `description`: 155-char summary covering all 4 arms, history, fishing, hikes, caverns
  - Full OG + Twitter card tags using the sunset hero
  - `<link rel="canonical">` to `/exploring-shasta-lake`
  - Preload hero image
  - JSON-LD: `TouristAttraction` + `BreadcrumbList` (Home → About Shasta Lake → Exploring Shasta Lake)
- Semantic HTML: single `<h1>`, `<h2>` per arm, `<h3>` for sub-topics, `<article>`, `<figure>`/`<figcaption>`, `<section aria-labelledby>`.
- All images: `loading="lazy"` except hero (`fetchPriority="high"`), `decoding="async"`, explicit `width`/`height`.

### Technical notes

- New component file + new route file; no changes to existing routes.
- `routeTree.gen.ts` regenerates automatically.
- No new dependencies (Playfair Display already loaded by sibling page, lucide-react already used).
- Mobile-first responsive grid (`grid md:grid-cols-2`, `grid md:grid-cols-3`), sticky in-page nav chips on desktop.
