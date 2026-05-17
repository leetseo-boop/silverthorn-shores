## Directions section — Silverthorn Resort

Add a dedicated, shareable directions page that guests can use to plan arrival, plus link it from the existing About nav dropdown and footer.

### Files

**New:** `src/routes/directions.tsx` — route at `/directions` with full SEO `head()` (title "Directions to Silverthorn Resort | Shasta Lake, CA", meta description, canonical, og + twitter image reusing the existing marina hero, JSON-LD `Place` + `BreadcrumbList`).

**New:** `src/components/DirectionsPage.tsx` — page component.

**Edit:** `src/components/SilverthornHomePage.tsx` — add `{ label: "Directions", href: "/directions" }` to the existing About nav dropdown and to the footer "About" column. No other changes.

### Page sections (top → bottom)

1. **Hero strip** — short banner with eyebrow "Visit Us", H1 "Getting to Silverthorn Resort", one-line subhead about Pit River Arm location, two primary CTAs side-by-side:
   - **Call 1-800-332-3044** (`tel:`) — primary button with phone icon
   - **Open in Google Maps** — outline button → `https://maps.app.goo.gl/acS8aohrh1m4xFz8A`

2. **Map + info two-column** (stacks on mobile):
   - **Left (≈60%)**: embedded Google Maps `<iframe>` of the resort address, `aspect-[4/3]` on mobile / `aspect-[16/10]` on desktop, rounded-2xl, `loading="lazy"`, `referrerPolicy="no-referrer-when-downgrade"`, `allowFullScreen`, accessible title. URL: `https://www.google.com/maps?q=16250+Silverthorn+Road,+Redding,+CA+96003&output=embed`.
   - **Right card**: address block, phone, reservations email, marina hours, all wrapped in shadcn `Card`. Each line uses a lucide icon (`MapPin`, `Phone`, `Mail`, `Clock`). Includes secondary "Get Directions" link to the Google Maps deep link.

3. **Drive times grid** — 3-up card grid: From Redding (~15 min), From Sacramento (~2.5 hr), From Bay Area (~3.5 hr). Each card has a clock icon, route name, drive time, and one-line tip.

4. **Turn-by-turn directions** — two-column responsive layout with two cards:
   - **From the North** (verbatim from silverthornresort.com/contact)
   - **From the South** (verbatim from same page)
   Each card has a compass/arrow icon header.

5. **Nearby airports** — small text block: Redding Municipal (RDD) nearest; Sacramento (SMF) and San Francisco (SFO) for more flights.

6. **Final CTA band** — "Questions about your arrival?" with Call + Email buttons, matching the home page's CTA band styling.

### Design system

- Existing semantic tokens only (`bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, `bg-primary`, etc.) — no hex colors.
- Playfair Display for H1/H2 (already loaded), DM Sans body.
- `rounded-2xl`, generous whitespace, container `max-w-6xl mx-auto px-4`, section padding `py-16 md:py-24`.
- shadcn primitives: `Button`, `Card`. lucide icons: `MapPin`, `Phone`, `Mail`, `Clock`, `Navigation`, `Plane`.
- Map iframe: no API key required (Google Maps `?output=embed` is free, public, no key). Fully responsive, sandboxed by browser default.
- Map iframe `title="Map showing Silverthorn Resort, 16250 Silverthorn Road, Redding CA"` for accessibility.

### SEO / structured data

- `<title>` "Directions to Silverthorn Resort | Shasta Lake, Redding CA"
- meta description: how to get to Silverthorn Resort on Shasta Lake's Pit River Arm, with drive times and turn-by-turn directions.
- canonical `/directions`
- og:image: `/images/queen-houseboat-exterior-lifestyle-anchored-silverthorn-resort.jpg`
- JSON-LD `LodgingBusiness` with address (16250 Silverthorn Road, Redding, CA 96003), telephone `+1-800-332-3044`, geo coords (from Google Maps), and `BreadcrumbList` (Home → Directions).

### Out of scope

No new images, no API keys, no contact form, no changes to other pages beyond the two nav/footer additions.
