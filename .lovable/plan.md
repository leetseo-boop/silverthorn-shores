## Fix: Cabin Policy submenu opens the main Cabins page

### Root cause

TanStack's flat-dot routing treats `cabins.policy.tsx` as a **child** of `cabins.tsx`, making `/cabins` a layout parent for `/cabins/policy`. But `src/routes/cabins.tsx` does not render `<Outlet />`, so when the user navigates to `/cabins/policy`, the parent cabins page renders and the policy page never appears — exactly what the user is seeing.

The project already uses the correct opt-out convention for this case: `small-boats_.$slug.tsx` (trailing underscore breaks layout nesting).

### Fix

Rename `src/routes/cabins.policy.tsx` → `src/routes/cabins_.policy.tsx`. URL stays exactly `/cabins/policy`, but it becomes a standalone route instead of a child of `/cabins`. No other files need to change — the nav links (`href: "/cabins/policy"` in header + footer of `SilverthornHomePage.tsx`) and the route's own `createFileRoute("/cabins/policy")` declaration both stay the same. `routeTree.gen.ts` regenerates automatically.

### Files

- **Rename**: `src/routes/cabins.policy.tsx` → `src/routes/cabins_.policy.tsx`