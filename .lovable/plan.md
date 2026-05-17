## Replace `/` route with uploaded SilverthornHomePage

The uploaded `SilverthornHomePage.jsx` is a self-contained component with inline styles — it doesn't depend on the existing section components or generated images. I'll wire it up as the homepage.

### Steps

1. **Copy the file** into the project as `src/components/SilverthornHomePage.tsx` (renamed `.tsx`, no other edits — its `onMouseEnter` handlers use loose `e.target.style` access which works at runtime; cast as `any` only if TS strict complains).
2. **Replace `src/routes/index.tsx`** so the `/` route renders `<SilverthornHomePage />` and keeps the SEO `head()` meta (Silverthorn Resort title/description).
3. **Delete the now-unused section components** under `src/components/site/` (Navbar, Hero, Fleet, Stats, About, Testimonials, SisterMarina, Footer, BookNowButton) since they're replaced wholesale.
4. **Leave the generated images** in `src/assets/` for now — the uploaded file references `/images/hero-shasta-lake.jpg` and `/images/shasta-lake-about.jpg` as placeholders. After the swap I'll note that these paths are unset and offer to either (a) copy the existing generated hero/about images to `public/images/` so they render, or (b) leave the dark-background placeholders the uploaded file already has.
5. Keep Google Fonts link in `__root.tsx` (already added previously) so Playfair Display + DM Sans load.

### Technical notes

- The component uses `useState` and inline event handler types — TS may flag `e.target.style`. I'll add minimal `as HTMLElement` / `as any` casts only where the build complains, without restructuring the file.
- It's a default export → import default in the route file.
- No new dependencies needed.
