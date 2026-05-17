# Remove contact form, restructure /contact around a "call us" CTA

## Changes to `src/routes/contact.tsx`

1. **Remove the form entirely** — delete the right-column `<form>` card (lines ~267–323), the `useState` for `form`/`errors`/`submitted`, the `contactSchema`/zod imports, `onSubmit`, `update`, and the now-unused `Input`/`Textarea`/`Label` imports.

2. **Convert the two-column section into a single centered layout** that puts contact info front and center:
   - Large "Call us" hero panel: headline "Have questions? Give us a call.", subtext "Our reservation team is happy to help you plan your trip, answer questions about boats, or recommend dates.", the existing big orange `800-332-3044` link, and the existing "Call Now" button. Add a secondary "Email us" button right next to it (`mailto:reserve1@houseboats.com`).
   - Below it, a 3-card row: **Email** (reserve1@houseboats.com), **Address** (16250 Silverthorn Road, Redding CA 96003), **Marina Store Hours** (Mon–Sun 8:00 AM – 6:30 PM, seasonal note). Reuses the existing icons/styling.
   - **Follow us** social row stays, centered below the cards.

3. **Keep untouched**: page header ("Get in Touch"), JSON-LD schema, the Google Map iframe section, the Directions strip, and the sister-marina note.

## Files touched
- `src/routes/contact.tsx` only.

No new dependencies, no routing changes.
