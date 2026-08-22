# Fix: Admin page (and other pages) stuck on "Loading…"

## What's happening

Loading `/admin` in a browser shows only "Loading…" and the app crashes during startup with:

`The requested module '/src/routes/faq.tsx?tsr-shared=1' does not provide an export named 'FAQS'`

This is a JavaScript crash triggered by the FAQ page's code, but because it happens while the app boots, it can break other pages too — including the admin dashboard.

## Root cause

`src/routes/faq.tsx` declares the FAQ list (`FAQS`) and the derived search-engine data block (`FAQ_JSONLD`) at the top of the route file, and both the page's `head()` metadata and the page component use them. The framework splits route files into separate chunks; when data is shared this way between the metadata block and the component, the split can drop the value from the shared chunk, producing the missing-export crash above.

## The fix

1. Move the FAQ question/answer array out of the route file into a plain data module (e.g. `src/data/faqs.ts`), exporting both the list and the JSON-LD object. `src/routes/faq.tsx` imports from there — no content or wording changes.
2. Audit the other route files that follow the same risky pattern (data declared in the route file and used inside `head()`): `src/routes/houseboats.index.tsx`, `src/routes/cabins.tsx`, `src/routes/pet-policy.tsx`. Move their FAQ data to data modules the same way so this can't resurface.
3. Verify: reload `/admin` in a real browser, confirm the sign-in form renders with no console errors, and confirm `/faq`, `/cabins`, `/houseboats`, `/pet-policy` still render with their FAQ sections and structured data intact.

## Notes

No visual, content, or SEO changes — this is purely moving data into importable modules so the build can split routes safely.
