## Add 4 PDFs to Guest Info page

Upload the 4 uploaded PDFs as CDN assets and add them to the `docs` array in `src/routes/guest-info.tsx`, placed at the top of the list in this exact order (respecting original filenames as titles):

1. **SVR HB Rental Contract** — `SVR-HB-Rental-Contract.pdf` — icon: `FileSignature`
2. **Silverthorn Small Boat Contract** — `Silverthorn-Small-Boat-Contract.pdf` — icon: `ScrollText`
3. **Houseboat guest check-in process PDF** — `Houseboat-guest-check-in-process-PDF.pdf` — icon: `ClipboardCheck`
4. **Suggested SVR** — `Suggested-SVR.pdf` — icon: `Lightbulb`

Followed by the existing 3 docs, each keeping its current unique icon (`Ship`, `HomeIcon`, `Anchor`). Total 7 cards, no icon repeats.

### Technical details

- Run `lovable-assets create --file /mnt/user-uploads/<name>.pdf --filename <name>.pdf > src/assets/guest-info/<slug>.pdf.asset.json` for each of the 4 new PDFs.
- Import the 4 new `.asset.json` pointers at the top of `src/routes/guest-info.tsx`.
- Prepend 4 new entries to the `docs` array in the order above; keep the same `Doc` shape and same card block markup — no visual/style changes.
- Add `FileSignature`, `ScrollText`, `ClipboardCheck`, `Lightbulb` to the `lucide-react` import.
- Grid stays `md:grid-cols-3` — 7 cards will wrap naturally (3+3+1).
- JSON-LD `hasPart` auto-includes new docs since it maps over `docs`.
