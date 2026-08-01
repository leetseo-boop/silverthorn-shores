## Goal
Create a new, SEO-friendly "Meet Thorn" page using the uploaded marina photo as the hero, and add it to the footer under the Resort column only.

## Proposed URL
`/thorn` (e.g., `https://silverthornresort.com/thorn`).

## What we will build
1. **New route file**: `src/routes/thorn.tsx`
   - Exports a TanStack `Route` at `/thorn` with full `head()` metadata (title, description, OG/Twitter tags, canonical, JSON-LD `WebPage` + `BreadcrumbList`).
   - Uses the existing `src/assets/home-hero-marina.webp` as the hero image (the marina shot with Thorn). The image will be rendered normally with a subtle gradient overlay, not as a transparent PNG.
   - Page content follows the user's copy exactly, with light Silverthorn styling:
     - Warm intro block with the provided prose.
     - A small "Snap a picture & tag us" CTA card with social links.
     - Breadcrumb: Home / Meet Thorn.
   - Uses the same design tokens as other resort pages: `NAVY #1B2B3A`, `ORANGE #E8640A`, `SAND #F4EFE6`, `DISPLAY 'Playfair Display'`.

2. **Footer update**: `src/components/SilverthornHomePage.tsx`
   - Add `{ label: "Meet Thorn", href: "/thorn" }` to the **Resort** footer column only.
   - No changes to the main header navigation.

3. **Route registration**: TanStack Start file-based routing will auto-register `src/routes/thorn.tsx`; no manual `routeTree.gen.ts` edits.

## Out of scope
- Header navigation (explicitly requested as footer-only).
- New image generation or Thorn cartoon assets (the user supplied the hero photo and wants it used as-is).
- Changes to Thorn AI chat behavior.

## Verification
- Typecheck the project after edits.
- Confirm the new `/thorn` route resolves and renders the hero image, breadcrumb, body copy, and footer link.
- Confirm the footer Resort column includes "Meet Thorn" and no other columns are changed.