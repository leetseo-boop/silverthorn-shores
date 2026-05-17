## Add framed hero image to FAQ page

Update `src/routes/faq.tsx` header section to feature the new `couple-planning-shasta.webp` hero image alongside the existing headline.

### Layout
Convert the centered text-only header into a two-column hero on desktop, stacked on mobile:

- **Left (md:6 cols)**: existing copy — H1 "Frequently Asked Questions", orange divider, subtext — left-aligned on desktop, centered on mobile.
- **Right (md:6 cols)**: the hero image, nicely framed.

### Image framing
- `<img>` with `src` imported from `@/assets/couple-planning-shasta.webp`, `width={1536} height={1024}`, `loading="eager"` + `fetchPriority="high"` (it's the LCP for this page).
- Wrapper: `aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border` with a subtle rotate (`rotate-1 md:rotate-2`) for a polaroid-ish feel.
- Behind it, a decorative offset block: an absolutely positioned `bg-primary/10` (orange tint) rounded panel offset `-bottom-3 -right-3` to give depth.
- Optional small `bg-sand` (`#F4EFE6`) corner sticker badge "Plan your Shasta Lake trip" — skip if it feels busy.

### Spacing
- Section padding tightened: `pt-16 md:pt-24 pb-12 md:pb-16`.
- Two-column grid: `grid md:grid-cols-2 gap-10 md:gap-14 items-center max-w-6xl mx-auto`.

### Preload
Add a `<link rel="preload" as="image" href={heroImg}>` entry to the route's `head().links` so the LCP loads fast (same pattern as `src/routes/index.tsx`).

### Tokens / styling
Reuse existing tokens (`--secondary`, `--primary`, `--border`, `--muted-foreground`). No new dependencies. Single file touched: `src/routes/faq.tsx`.
