# Legal pages + basic cookie consent

Wire up the four footer links that currently 404, add an HTML sitemap page, and ship a small non-intrusive cookie banner that actually controls Google Analytics.

## New routes

All under `src/routes/`, each with proper `head()` metadata (title, description, canonical, og tags) and matching entries added to `src/routes/sitemap[.]xml.ts`.

1. `privacy.tsx` — **Privacy Policy**
   - Who we are (Silverthorn Resort, Shasta Lake CA), contact email
   - Info we collect: booking inquiries via contact form, reservation data via rentals.silverthornresort.com, analytics (GA4), cookies
   - How we use it: fulfilling reservations, responding to inquiries, site improvement
   - Sharing: reservation processor, Google Analytics, no sale of personal info
   - Cookies section linking to `/cookie-settings`
   - Your rights: CCPA (California residents — access, delete, opt-out of "sale"/sharing), GDPR-style rights for EU visitors
   - Data retention, children's privacy (under 13), security, changes, contact
   - Last updated date

2. `terms.tsx` — **Terms of Service**
   - Acceptance of terms
   - Description of service (informational website; reservations handled on separate booking platform and subject to rental agreements)
   - Reservations, cancellations, and rental policies pointer to `/houseboats/policy`, `/cabins/policy`, and signed rental contracts govern
   - Age requirement (21+ primary renter)
   - Assumption of risk (boating/lake activities)
   - Intellectual property (site content © Silverthorn Resort)
   - User conduct
   - Third-party links disclaimer
   - Disclaimers & limitation of liability (as permitted by CA law)
   - Indemnification
   - Governing law: California, venue Shasta County
   - Changes, severability, contact

3. `accessibility.tsx` — **Accessibility Statement**
   - Commitment to WCAG 2.1 AA as a goal
   - Measures taken (semantic HTML, alt text, keyboard nav, color contrast, responsive design)
   - Known limitations (third-party embeds like booking system may vary)
   - Feedback channel — email + phone
   - Compatibility (modern browsers, screen readers)
   - Date and contact

4. `sitemap.tsx` — **HTML Sitemap page** (human-readable, separate from `/sitemap.xml`)
   - Grouped link list: Stay (houseboats, cabins, small boats, moorage), Shasta Lake (shasta-lake, exploring, planning, vs powell), About (history, contact, directions, faq, employment, pro-shop, guest-info), Policies (houseboat policy, cabin policy), Legal (privacy, terms, accessibility, cookie settings)

5. `cookie-settings.tsx` — **Cookie Settings**
   - Explain cookie categories:
     - **Strictly necessary** (always on) — routing, security
     - **Analytics** (Google Analytics GA4) — toggleable
   - Toggle switch bound to consent state (stored in `localStorage` key `str-cookie-consent`)
   - Save button; shows current status
   - Link back to Privacy Policy

## Cookie consent (basic, non-annoying)

New file `src/lib/cookie-consent.ts`:
- `getConsent()` / `setConsent(state)` reading/writing `localStorage`
- State shape: `{ analytics: boolean, decidedAt: string }`
- `applyConsent()` calls `window.gtag('consent', 'update', { analytics_storage: consent.analytics ? 'granted' : 'denied' })`

New component `src/components/CookieBanner.tsx`:
- Small bottom-left card (not full-width overlay, doesn't block content)
- One line: "We use cookies for analytics. [Accept] [Decline] [Settings]"
- Dismisses on any choice, stores consent, calls `applyConsent()`
- Hidden after decision; also hidden on `/cookie-settings`, `/privacy`, `/admin/*`
- Respects `prefers-reduced-motion`

Update `src/routes/__root.tsx`:
- Add Google Consent Mode v2 default (`analytics_storage: 'denied'`) in the inline gtag script **before** `gtag('config', ...)` so GA respects consent from first load
- On mount: call `applyConsent()` from stored preference (so returning visitors' choice sticks)
- Render `<CookieBanner />` next to `<Footer />` (skip on admin)

Update `src/components/SilverthornHomePage.tsx` footer:
- Link `/privacy`, `/terms`, `/sitemap`, `/accessibility`, `/cookie-settings` to the new routes (currently likely `#` or missing)

## Sitemap.xml update

Add the five new paths (`/privacy`, `/terms`, `/accessibility`, `/sitemap`, `/cookie-settings`) with `changefreq: yearly`, low priority, to `STATIC_ENTRIES` in `src/routes/sitemap[.]xml.ts`.

## Notes / disclaimer

Copy is drafted as a solid starting template based on standard US small-business practice (CA-focused, since resort is in California). It is **not** a substitute for review by a licensed attorney — I'll add a short internal comment on each page noting this so it's easy to swap in lawyer-reviewed copy later. Company contact info used: existing `reservations1@silverthornresort.com` and the phone number already in the footer/contact page.

## Out of scope

- No third-party CMP (OneTrust/Cookiebot) — using our own tiny banner as requested
- No changes to the booking platform's own cookies (external domain)
- No IAB TCF integration
