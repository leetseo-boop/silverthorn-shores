## New page: Silverthorn Moorage

Create a new route `/moorage` (labeled "Silverthorn Moorage") that mirrors the content from houseboats.com/silverthorn-boat-slips, styled to match the rest of the site.

### Files
- `src/routes/moorage.tsx` — route with full `head()` SEO metadata (title, description, canonical, og:title/description/type, twitter:card).
- `src/components/MoorageePage.tsx` — page component.

### Sections (top → bottom)
1. **Hero** — "Silverthorn Resort Boat Slips & Marina Storage" + Pit River Arm subheading + intro paragraph + CTAs: "Book Your Slip Online" (https://book.getmolo.com/silverthorn-resort), "Call 1-800-332-3044", "Email silverthornmoorage@houseboats.com".
2. **2026 Marina Pricing** — Two responsive tables (mobile → stacked cards, desktop → table), using site's card/table styling:
   - Annual Moorage Slips (3 rows: Houseboat 15'×56', Ski Boat 10'×24', Patio 12')
   - Seasonal Small Boat Slips May 1–Oct 31 (2 rows)
   - Below: buttons for "2026 Fee Schedule & Amenities" PDF and "2026 Moorage Agreement" PDF (external links, new tab).
3. **Marina Services** — Small table: Shop Labor $150/hr, Houseboat Pump-Out $65/tank, Launch & Park $20/day.
4. **Slip Holder Specials** — 4-icon card grid: Free Parking (2 tags), Free Small Boat Launch, Locked Dock Access (24/7), 10% Rental Discount.
5. **Marina Amenities** — 4-icon card grid: Marina Store, Security, Fuel Dock, Year-Round Access.
6. **Long-form intro** — The three paragraphs describing the marina, slip sizes, and Pit River Arm perks.
7. **Related links** — Internal links to `/` (Silverthorn hub), `/small-boats` (rental fleet), and a placeholder for the shasta marina options page (skip external houseboats.com link).
8. **Contact CTA** — Phone + email buttons.

### Navigation
Add "Moorage" (or "Boat Slips") as a top-level nav link in `NAV_LINKS` in `src/components/SilverthornHomePage.tsx`. Confirm placement below.

### Technical notes
- Use existing Tailwind design tokens (primary color, cards, borders) — no hardcoded colors.
- Icons from lucide-react (Anchor, ShieldCheck, Fuel, Store, ParkingCircle, Waves, Percent, Lock, Calendar).
- Prices formatted with `$` and commas.
- All external links (Molo booking, PDFs) open in new tab with `rel="noopener noreferrer"`.
- Book tracking via existing `data-booking-cta` attributes on the Molo booking button.
- Route registers automatically via TanStack file-based routing.

### Questions
1. Where in the top nav should "Moorage" go? Options: (a) new top-level item between Small Boats and Shasta Lake, (b) under "About", (c) under "Shasta Lake" submenu.
2. The two PDF links (fee schedule + moorage agreement) currently point to houseboats.com. Keep those external URLs, or do you want to upload local copies to the Silverthorn site later?
