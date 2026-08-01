## Goal

A dedicated Pet Policy page at `/pet-policy`, styled like the rest of Silverthorn, using the houseboats.com rules — and those same numbers applied everywhere pets are mentioned.

## New page: /pet-policy

Sections, in order:
1. Hero — "Pet Policy — Shasta Lake Houseboats & Cabins" with the intro line. Text-only hero for now (gradient/brand treatment, matching the other policy pages); a placeholder slot ready for the real photos you'll send later.
2. Yes — pets are allowed: max 2 dogs per houseboat, 1st free, 2nd $50 non-refundable paid before boarding, excessive cleaning $95/hour to the card on file, damages at replacement cost.
3. Pet Policy Guidelines (dogs only, max 2, declare at booking, house-trained).
4. Important Rules (owner liable for damage, never leave pets unattended, clean up, no aggressive/bite-history dogs, $95/hr cleaning).
5. Tips for Houseboating With Your Dog — icon cards: pet life jacket, familiar items, shade & water, bathroom breaks, wildlife.
6. Hot Surface Warning callout.
7. A Few Other Things You'll Need — food & water, doggie toilet, snacks, carrier/harness/leash (no pets in marina stores per health ordinance), dog ladder/ramp, vaccination paperwork.
8. Pet Policy FAQ — accordion with the 6 questions, answered from the rules above.
9. CTA — houseboats, cabins, contact.

Mobile-first layout with a sticky section nav, same pattern as `/houseboats/policy`.

## SEO

Own `head()`: title, description, og/twitter tags, canonical, plus `FAQPage` and `BreadcrumbList` JSON-LD. Added to `sitemap.xml` and the `/sitemap` page.

## Fee alignment (you chose: houseboats.com numbers everywhere)

Replace the current "1 pet free / $35 each extra / $25 per hour" wording with "max 2 dogs / 1st free / 2nd $50 / $95 per hour" in:
- `/houseboats/policy` pets section
- `/cabins/policy` pets section
- FAQ "Can I bring my pet?" answer
- Thorn's policy facts (`src/lib/thorn-knowledge.ts`: `hb-pets`, `cab-pets`)

## Navigation & links

- Shasta Lake dropdown gets "Pet Policy" (desktop + mobile nav in `SilverthornHomePage.tsx`), plus the footer list.
- A Pet Policy link/card added to `/planning`.

## Thorn

- Add a `pet-policy` source in `src/lib/thorn-sources.ts` pointing at `/pet-policy`, and repoint `hb-pets` / `cab-pets` citations there so any pet answer links the new page.
- Update the pet facts text with the new fees and tips so Thorn answers pet questions fully in both normal and Policies mode.
- Add a "pet" pattern to mood detection so Thorn shows a fitting mood on pet questions.

## Technical notes

- New `src/components/PetPolicyPage.tsx` + `src/routes/pet-policy.tsx` (route metadata in the route file, per existing convention).
- No database or backend changes.
- Verification: typecheck plus a browser pass on mobile and desktop widths, and a live Thorn question ("can I bring my dog?") to confirm the new fees and the `/pet-policy` citation appear.
