# Add Houseboat Rental Policy page

## New route
`src/routes/rental-policy.tsx` → `/rental-policy`

Uses TanStack `createFileRoute` with full `head()` metadata (title, description, og:title, og:description, og:image, canonical, JSON-LD `WebPage` + `BreadcrumbList`).

## Hero image
Generate a mobile-friendly hero image to `src/assets/rental-policy-hero.webp` (1600×900, `imagegen` standard quality):

> A warm, modern home office scene: a small desk with an open laptop, a printer beside it, a steaming cup of coffee, and a single sheet of paper in focus that reads "Rental Policy — Silverthorn Resort". Soft natural light, family-home atmosphere, subtle Shasta Lake decor details (a small framed lake photo, a tiny wooden houseboat figurine, a paddle on the wall, pine branches). Cozy, inviting, editorial photo style, shallow depth of field. Composition centered so it crops cleanly on mobile (safe center).

## Page structure (modern, easy to read)

Reuses the site's existing palette (NAVY `#1B2B3A`, ORANGE `#E8640A`, SAND `#F4EFE6`) and fonts (Playfair Display headings, DM Sans body) — consistent with `SilverthornHomePage` and other routes.

1. **Hero** — full-width image with dark navy gradient overlay. H1 "Houseboat Rental Policy", subtitle "Everything you need to know before your Silverthorn Resort vacation.", two CTA buttons: `Call 800-332-3044`, `Email reserve1@houseboats.com`. Breadcrumb (Home / Rental Policy) in a sand strip below.

2. **Quick-reference card row** (3 cards, stacks on mobile): Check-in window, Check-out window, Minimum age 21. Icon + bold value + small label.

3. **Sticky in-page table of contents** (desktop sidebar, collapsible chip list on mobile) linking to every section below with smooth-scroll hash anchors. Sections are still part of one page (acceptable per route-architecture rules — this is a single legal document, not separate marketable pages).

4. **Policy sections** — each rendered as a card with orange icon, H2, and clean prose. Lists used where the source has enumerations (deposit amounts, parking permits, cancellation tiers). Sections:
   - Rental Policy & Deposits
   - Security / Damage Deposit (deposit amounts as a clean 2-col table; holiday surcharge highlighted in an orange callout)
   - Cancellation (cancellation tiers as a visual timeline / stepped list)
   - Travel Insurance Coverage (with outbound link to InsureMyTrip.com + disclaimer in muted small text)
   - Form of Payment (payment-method chips: Visa, MC, Amex, Discover, Cash)
   - Repair & Refund Policy
   - Fuel
   - Check-In & Boarding (seasonal hours shown as two pill cards)
   - Check-Out
   - Important Notice — "NO REFUNDS…" rendered as a prominent orange/navy callout banner
   - Parking Permits (permit allocation table by boat)
   - Pet-Friendly Resort (paw icon, friendly tone, fee details)

5. **Contact CTA strip** at the bottom (orange band, matches existing pattern in `SilverthornBoatDetail`): "Questions about our policy? Give us a call." with Call + Email buttons.

## Navigation wiring
Add a "Rental Policy" link to:
- Main `Nav` in `src/components/SilverthornHomePage.tsx` (and/or under an existing "Info" group if one exists)
- `Footer` in the same file
- FAQ page bottom (small "See full Rental Policy →" link)

## Files touched
- **new** `src/routes/rental-policy.tsx`
- **new** `src/assets/rental-policy-hero.webp` (generated)
- **edit** `src/components/SilverthornHomePage.tsx` (add nav + footer link)
- **edit** `src/routes/faq.tsx` (small footer link to policy)

No dependencies added, no backend changes, no routing infra changes (TanStack Router auto-picks up the new route file).
