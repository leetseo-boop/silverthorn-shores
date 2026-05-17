## Three small FAQ updates

### 1. FAQPage JSON-LD — already in place, verify only
`src/routes/faq.tsx` already emits a valid `FAQPage` JSON-LD via the route's `head().scripts`, built from the `FAQS` array (single source of truth, so it stays in sync with the visible content). No code change needed — I'll just confirm it's present after the other edits. If you'd also like a `BreadcrumbList` schema (Home › FAQ) on top of `FAQPage`, say the word and I'll add it.

### 2. Mobile spacing / alignment of the FAQ hero image
Current issues on small screens:
- The `rotate-1 md:rotate-2` tilt is applied on mobile too, which clips corners against the small viewport edges and unbalances the layout.
- The orange offset accent block (`-bottom-3 -right-3`) plus the tilt push content past the section padding.
- The image wrapper has `max-w-xl` but no horizontal breathing room from the page edge on narrow phones.

Fix in `src/routes/faq.tsx`:
- Remove tilt on mobile, keep it only on desktop: change `rotate-1 md:rotate-2` → `md:rotate-2` (no rotation under md).
- Constrain the wrapper on mobile and add a small inner gutter: `max-w-md sm:max-w-lg md:max-w-none`.
- Reduce the accent offset on mobile: `-bottom-2 -right-2 md:-bottom-3 md:-right-3`.
- Tighten vertical rhythm between the copy and image on mobile: bump the grid gap from `gap-10` → `gap-8 md:gap-14`.
- Bottom padding of the hero section: `pb-10 md:pb-16` so the image isn't crowding the accordion.

### 3. Pet policy answer
In the `FAQS` array, update Q7 ("Can I bring my pet?") answer.
- Before: "Some cabins are pet friendly. Please call 800-332-3044 to confirm availability for your specific cabin and dates. Houseboats are not pet friendly."
- After: "All of our houseboats are pet friendly. Please call 800-332-3044 with any questions about traveling with your pet."

Because the JSON-LD is generated from `FAQS`, the schema updates automatically — no separate edit.

Single file touched: `src/routes/faq.tsx`.
