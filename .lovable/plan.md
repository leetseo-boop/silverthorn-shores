# Fix: Individual Small Boat Pages Don't Render

## Problem
Clicking a boat card on `/small-boats` updates the URL (e.g. `/small-boats/patio-boat`) but the page still shows the fleet listing hero — the detail page never renders.

## Root Cause
TanStack Router's file-based routing treats `small-boats.tsx` as a **parent layout** for `small-boats.$slug.tsx` because they share the `small-boats` prefix. The parent `SmallBoatsPage` component does not render `<Outlet />`, so the matched child route has nowhere to mount. Verified by navigating to `/small-boats/patio-boat` — URL is correct, console is clean, but the fleet hero renders.

## Fix
Rename the dynamic route to use the **non-nested** (underscore-suffix) convention so it becomes a sibling of the fleet page instead of a child:

- Rename `src/routes/small-boats.$slug.tsx` → `src/routes/small-boats_.$slug.tsx`

The trailing `_` on `small-boats_` tells TanStack Router this route shares the URL path prefix but is NOT a child of `small-boats.tsx`. Both routes then render independently:
- `/small-boats` → `small-boats.tsx` (fleet)
- `/small-boats/patio-boat` → `small-boats_.$slug.tsx` (detail)

No code changes needed inside the file (the `createFileRoute("/small-boats/$slug")` path stays identical — only the **filename** changes). `routeTree.gen.ts` regenerates automatically.

## Verification
After the rename, navigate to `/small-boats/patio-boat` and confirm the `SilverthornBoatDetail` component renders with the Patio Boat hero, gallery, pricing, and FAQ.
