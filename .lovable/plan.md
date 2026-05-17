## Cabin Rental Policy Page

Create a new route `src/routes/cabins.policy.tsx` that mirrors the layout, typography, colors (NAVY/ORANGE/SAND), hero pattern, sectioned cards, deposit table, cancellation timeline, "Important Notice" gradient block, related-pages strip, and CTA from `src/routes/houseboats.policy.tsx` — but with cabin-specific content.

### Sections (icons + cards, in order)

1. **Rental Policy & Payment** (CreditCard) — 21+ Captain/Co-Captain, valid driver's license, full payment 75 days prior, accepted payment methods, no cash refunds.
2. **Deposits** (Wallet) — Deposit table with columns *Rental / Booking Deposit*, linked rows:
   - Queen, Queen I, Queen II — $1,000 → `/houseboats`
   - Presidential, Senator, Executive — $500 → `/houseboats`
   - Wakeboard Boats — $500 → `/small-boats`
   - Tahoe Boats — $500 → `/small-boats`
   - Patio & Fishing Boats — $200 → `/small-boats`
   - **Cabin — $100** → `/cabins` (highlighted)
3. **Security / Damage Deposit** (ShieldCheck) — Refundable on clean/undamaged return, accepted forms, cash refunded by mailed check, no personal checks. Callout: holiday/May weekends increase deposits to $5,000 (Queen tier) / $3,000 (Presidential tier), cash only.
4. **Cancellation** (CalendarX) — 4-tier timeline matching houseboat tones (good/ok/warn/bad): within 5 days of booking, 75+ days before arrival (50%), 46–74 days (full deposit forfeit), within 45 days (full rental forfeit).
5. **Form of Payment** (Wallet) — Same payment-method chips as houseboat page.
6. **Taxes & Fees** (CreditCard) — Nightly rates exclude sales tax; additional fees at booking.
7. **Repair & Refund Policy** (Wrench) — Notify resort immediately; no refunds for weather, outages, appliance/AC/plumbing failures.
8. **Availability** (AlertTriangle) — Specific cabin not guaranteed; may be moved to comparable cabin.
9. **Check-In** (LogIn) — Two cards: May–Sept 3–6 PM, Oct–April 1–4 PM.
10. **Check-Out** (LogOut) — Cleaned and out by 11:00 AM; check-out procedures.
11. **Important Notice** (AlertTriangle) — Gradient navy block: no refunds for late arrival/early departure, equipment failure, weather, illness, accidents, plan changes.
12. **Parking Permits** (Car) — Set number of passes per cabin type.
13. **Pet-Friendly Resort** (Dog) — 1 pet free, $35 each additional, $25/hr excessive cleaning.
14. **Wildlife** (a Trees/PawPrint icon) — Shasta-Trinity National Forest wildlife disclaimer.
15. **Cabin Furnishings, Decor & Equipment** (Home icon) — Privately owned; no moving furniture or electronics; bring special equipment; decor varies; subject to change.
16. **Damage to Cabin / Decor / Furnishings** (ShieldCheck) — Renter responsible for damage by any party member (authorized or not).
17. **No Smoking** (Ban icon) — Non-smoking cabins; half of $200 deposit forfeited; outdoor deck OK; no butts on property.
18. **Keys** (Key icon) — Guest pays re-keying cost for lost/unreturned keys.
19. **Personal Property** (Briefcase icon) — Resort not liable for lost/damaged personal property.
20. **Compliance with Laws** (Scale/Gavel icon) — Comply with US/CA/local law; resort may cancel for violations with forfeiture.
21. **Responsibility** (UserCheck) — Renter fully responsible for cabin and equipment; not an agent of Silverthorn; no repairs/liens without written permission.

### Hero

Same pattern as houseboat policy: full-bleed background image with navy gradient, orange pill "Cabins · Policy", H1 "Cabin **Rental Policy**" (orange accent on "Rental Policy"), subhead, Call + Email buttons. Reuse `@/assets/rental-policy-hero.jpg` (already in project) for now to avoid generating new asset.

### Related-pages strip + CTA

Same 3-card grid as houseboat policy linking to Lake Cabins (`/cabins`), Luxury Houseboats (`/houseboats`), and Patio & Wakeboard Boats (`/small-boats`), then the standard contact CTA.

### Routing / SEO

- Create `src/routes/cabins.policy.tsx` (TanStack flat-dot routing → `/cabins/policy`).
- `head()` with unique title "Cabin Rental Policy — Silverthorn Resort", meta description, og:title/description/image/url, twitter card, canonical, and JSON-LD (`WebPage` + `BreadcrumbList`: Home → Cabins → Rental Policy).
- Add a "Cabin Policy" link to the Cabins submenu in `src/components/SilverthornHomePage.tsx` (header nav + footer "Stay" column) pointing to `/cabins/policy`, matching the existing "Cabin Policy" / "Lake Cabins" structure.

### Files

- **Create**: `src/routes/cabins.policy.tsx`
- **Edit**: `src/components/SilverthornHomePage.tsx` (add "Cabin Policy" submenu entry in 2 places)
