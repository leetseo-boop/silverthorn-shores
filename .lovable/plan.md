# Replace site-wide contact email with `reserve1@houseboats.com`

Three different addresses currently appear across the site. All become `reserve1@houseboats.com`.

## Files to update

1. **`src/components/SilverthornHomePage.tsx`** (line 25)
   `EMAIL = "reservations@silverthornresort.com"` → `"reserve1@houseboats.com"` (drives the global footer/nav).

2. **`src/components/DirectionsPage.tsx`** (line 15)
   `EMAIL = "reserve@silverthornresort.com"` → `"reserve1@houseboats.com"` (constant used in 2 mailto links).

3. **`src/routes/directions.tsx`** (line 32)
   JSON-LD `email: "reserve@silverthornresort.com"` → `"reserve1@houseboats.com"`.

4. **`src/routes/contact.tsx`** — 5 spots (lines 37, 159, 208, 211, 309–310)
   LocalBusiness JSON-LD email, mailto subject target, contact-card link href + visible text, and the fallback line under the submit button. All → `reserve1@houseboats.com`.

## Out of scope (not changed)
- `rentals.silverthornresort.com` booking URLs — that's the booking platform domain, not an email.
- `silverthornresort.com` mentioned in FAQ copy/alt text — descriptive site reference, not an email.
- The contact form's `mailto:` behavior stays as-is for now (we agreed the real server-side send waits on email-domain re-setup).

Total: 5 files, ~9 line edits, single-pass.
