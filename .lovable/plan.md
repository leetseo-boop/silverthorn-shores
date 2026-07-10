## Plan

### 1. Fix duplicate header on `/guest-info`
The `GuestInfoPage` in `src/routes/guest-info.tsx` imports and renders its own `<Nav />` and `<Footer />`. However, `src/routes/__root.tsx` already renders `<Nav />` and `<Footer />` around every non-admin route. This causes the two stacked headers seen in the screenshot.

- Remove the `<Nav />` and `<Footer />` imports from `src/routes/guest-info.tsx`.
- Remove the `<Nav />` call at the top of the page JSX and the `<Footer />` call at the bottom.
- The root layout will continue to provide the single shared header and footer.

### 2. Remove "Guest Info" from the Houseboats submenu
In `src/components/SilverthornHomePage.tsx`, the `NAV_LINKS` array has "Guest Info" duplicated:
- Inside the `Houseboats` submenu (`children` array).
- As a standalone top-level item.

Per your answer, keep the standalone top-level link and remove only the `Houseboats` submenu entry:

```ts
{ label: "Guest Info", href: "/guest-info" }, // remove this line only
```

The top-level link will remain:

```ts
{ label: "Guest Info", href: "/guest-info" },
{ label: "FAQ", href: "/faq" },
```

### 3. Verification
- Run a build to confirm no import/type errors after removing `Nav`/`Footer` from `guest-info.tsx`.
- Preview `/guest-info` to confirm only one header is visible and the page still renders correctly.
- Confirm the Houseboats dropdown no longer shows "Guest Info" while the top-level nav still does.