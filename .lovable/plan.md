## Add "Groups" sales block to /shasta-lake

Insert a new section into `src/components/ShastaLakePage.tsx`, placed between the **Audiences** section and the **Gallery** section, so the page reads: Activities → Fish → Audiences → **Groups** → Gallery → CTA.

### Visual design

Full-bleed band on the warm cream tone (`#F1ECE2`) to differentiate from the white Audiences section above and the gallery below — OR a deeper navy band (`#0D2030`, white text) to give the page a second high-contrast "moment" matching the Facts band. Recommend the **navy variant** since the cream tone is already used by Fish and Gallery, and a second dark band balances the page rhythm.

Layout (desktop):
```text
┌──────────────────────────────────────────────────────────┐
│  GROUPS & PRIVATE EVENTS  (eyebrow)                      │
│  Bring your whole crew to Shasta Lake (h2, serif)        │
│  Short 1–2 line lead paragraph                           │
│                                                          │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐            │
│  │ Youth  │ │Corporate││ College│ │Churches│            │
│  │ icon   │ │ icon   │ │ icon   │ │ icon   │            │
│  │ title  │ │ title  │ │ title  │ │ title  │            │
│  │ short  │ │ short  │ │ short  │ │ short  │            │
│  └────────┘ └────────┘ └────────┘ └────────┘            │
│                                                          │
│        [ Contact Us → ]  (primary orange CTA)            │
│        Custom quotes · multi-boat discounts              │
└──────────────────────────────────────────────────────────┘
```

Mobile: 1 column stack, cards full-width, CTA centered.
Tablet (sm+): 2 columns. Desktop (md+): 4 columns.

### Content

- **Eyebrow:** "Groups & Private Events"
- **H2:** "Bring your whole crew to Shasta Lake"
- **Lead:** "From summer camps to company retreats, we host groups of every shape and size — multiple houseboats, coordinated check-ins, and a marina team that's done it all before."

Four cards (each with a Lucide icon, short title, 1-sentence pitch):

| Card | Icon | Pitch |
|---|---|---|
| Youth Ministries | `Users` / `Tent` | Camps, retreats and lock-in weekends with safe, supervised waterfront fun. |
| Corporate Retreats | `Briefcase` | Off-sites, leadership retreats and team-building on the water — leave the conference room behind. |
| College Groups | `GraduationCap` | Senior trips, fraternity & sorority weekends and club getaways with room for the whole roster. |
| Churches | `Church` | Congregation retreats, men's & women's weekends and family camps on Shasta Lake. |

CTA: orange `#E8640A` button "Contact Us" → `<Link to="/contact">`. Subtext under button: "Custom quotes & multi-boat discounts available."

### Implementation

Single edit to `src/components/ShastaLakePage.tsx`:
1. Add Lucide imports: `Users, Briefcase, GraduationCap, Church`.
2. Add a `groups` const array (icon component, title, pitch).
3. Insert the new `<section>` between Audiences (ends `</section>`) and the Gallery section.
4. Reuse existing typography tokens (Playfair serif headings, same eyebrow style, same card padding/shadow as Audiences cards but inverted for dark background: `bg-white/5`, `border-white/10`, icon in orange).
5. CTA uses the same orange button class already used by the final CTA band for visual consistency.

No other files change. No new images, no nav changes, no SEO changes needed (it's the same route).
