## FAQ page at `/faq`

**New file**: `src/routes/faq.tsx` (TanStack Start route, picked up automatically by the router plugin — no manual edit to `routeTree.gen.ts`).

Nav and Footer are already rendered globally in `src/routes/__root.tsx`, so the route only renders page content (same pattern as the fixed pro-shop route).

### Structure

1. **`head()`** — title, description, og:title/description, og:url, canonical `/faq`, plus a `scripts` entry with `type: "application/ld+json"` containing a `FAQPage` schema built from the 10 Q&A pairs (single source of truth — same array drives the UI).

2. **Page header** — centered section, white background. Playfair Display H1 "Frequently Asked Questions" in navy `--secondary` (#1B2B3A). DM Sans subtext in muted foreground: "Everything you need to know about your Shasta Lake vacation." Thin orange divider underneath for accent.

3. **Accordion FAQ** — use the existing shadcn `Accordion` (`@/components/ui/accordion`) in `type="single" collapsible` mode. Render all 10 Q&A pairs from a `FAQS` array. Override the trigger's default chevron color to orange (`--primary`, #E8640A) via a class on the chevron icon — wrap the trigger so the chevron is `text-primary`. Question in Playfair, answer in DM Sans muted-foreground, generous padding, rounded card container, soft border.
   - Q8's answer renders "Houseboat Rental Policy" as a `<Link to="/houseboats/policy">` (orange underline on hover). Q1 keeps the phone/URL as plain text (no live links needed).

4. **CTA strip** — full-width section with background `#F5EFE4` (sand-tinted, matches `--sand` token). Centered headline "Still have questions? Our team is happy to help." Two buttons:
   - Primary orange: `<a href="tel:+18003323044">` "Call 800-332-3044"
   - Outline secondary: `<Link to="/contact">` "Contact Us"

### Tokens / styling

- Reuse existing tokens: `--primary` (#E8640A), `--secondary` (#1B2B3A), `--sand` (#F4EFE6), Playfair Display via `font-display`, DM Sans via default `font-sans`.
- The CTA strip's spec color (#F5EFE4) is ~identical to the existing `--sand` token (#F4EFE6); use `bg-[#F5EFE4]` inline to match the spec exactly without touching the token.
- No new dependencies, no edits to other files.

### JSON-LD shape

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." } }
  ]
}
```

### Note on `/contact` link

The Contact CTA points to `/contact`, which does not yet exist as a route. The link will render but 404 until that page is built — flagging so you can confirm. Want me to also scaffold `/contact`, or leave the link pending?
