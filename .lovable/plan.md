## Swap Silverthorn logo

**Steps:**
1. Copy uploaded `SILVERTHORN_LOGO_300DPI.webp` → `src/assets/silverthorn-logo.webp`.
2. In `src/components/SilverthornHomePage.tsx` nav (~line 148–162): replace the orange `⚓` square + "Silverthorn Resort" text span with an `<img>` of the imported logo (height ~40px, auto width, `alt="Silverthorn Resort Marina"`). Keep the link to `/`.
3. Footer "Silverthorn Resort" wordmark (~line 719): optionally replace with same logo (smaller, inverted/contained on dark bg) — confirm if you want this too.

**Out of scope:** breadcrumb text in route files ("Silverthorn Resort" as a text crumb), the ⚓ emoji bullet in the "Both marinas managed…" line. These are content, not the logo.

**Note:** the nav is only defined once (in `SilverthornHomePage.tsx`); houseboat detail pages use their own nav inside `HouseboatDetail.tsx` which also has the ⚓ square — I'll swap that one too for consistency.