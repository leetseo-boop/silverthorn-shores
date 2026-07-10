# Guest Information Page

Create a new `/guest-info` page that hosts the 3 uploaded PDFs (Houseboats, Cabins, Small Boats) as clearly-labeled download cards, styled to match the rest of the site.

## Uploads → Lovable Assets
Upload the 3 PDFs to the CDN (not committed to repo):
- `Guest_Info_and_Cleaning_Check_List_Silverthorn_Resort.pdf` → Houseboats
- `Cabins_Guest_info_and_Cleaning_List_Silverthorn.pdf` → Cabins
- `Small_Boats_Guest_info_and_Cleaning_List_Silverthorn.pdf` → Small Boats

Each becomes an `.asset.json` pointer under `src/assets/guest-info/`.

## New Route
`src/routes/guest-info.tsx` with full head() SEO (title <60ch, description, og tags, canonical, JSON-LD `WebPage` + `BreadcrumbList`).

## Layout (matches site design language — navy/orange/sand, Playfair headings)
- **Hero band** (compact, navy gradient): H1 "Guest Information", welcome copy from the user message, phone + contact CTA buttons.
- **3-card grid** (`sm:grid-cols-1 md:grid-cols-3`), one card per PDF:
  - Large lucide icon in an orange tinted tile (`Ship` / `Home` / `Anchor`)
  - Title (e.g., "Houseboat Guest Info & Cleaning List")
  - Short one-line description
  - File meta line: "PDF · Download or save"
  - Primary button **"Open PDF"** → opens in new tab (`target="_blank"`, `rel="noopener"`) so users can view/save via browser
  - Secondary button **"Download"** → same href with `download` attribute
- **Help band**: "Questions? Contact us" CTA linking `/contact` and `tel:` link.
- Mobile-first: stacked cards, tap-friendly buttons, sufficient spacing — same pattern as Planning/FAQ pages.

## Navigation
Add "Guest Info" as a top-level nav item in `NAV_LINKS` (`src/components/SilverthornHomePage.tsx`) between "About" and "FAQ", plus mirror the link in the footer quick-links list.

## Notes
- No business logic changes; presentation only.
- PDFs served from CDN URL, so "Open PDF" reliably renders inline in browsers and users can save via the browser toolbar.
- `noindex` global remains (site not yet public to crawlers).
