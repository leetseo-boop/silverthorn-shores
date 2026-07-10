## Create Employment page

New route `/employment` with the provided copy, plus the PDF application as a downloadable CDN asset, and a footer link under **Resort → Employment**.

### Steps

1. **Upload PDF as CDN asset**
   - `lovable-assets create --file /mnt/user-uploads/STR-Application-Full.pdf --filename STR-Application-Full.pdf > src/assets/employment/str-application.pdf.asset.json`

2. **Create `src/routes/employment.tsx`**
   - Same visual language as `guest-info.tsx` (NAVY / ORANGE / SAND, Playfair Display headings, breadcrumb + hero + content sections).
   - Sections:
     - Hero: "Employment @ Silverthorn Resort Marina" + "Looking for a change of scenery? Consider working on beautiful Shasta Lake."
     - Year-round openings: 2 cards — **Houseboat Maintenance**, **Marine Mechanic** (each with unique icon).
     - Seasonal positions: single card / list block with the 6 bullets and the "starts recruiting March 15" note.
     - How to apply: address `16250 Silverthorn Rd, Redding, CA 96003`, hours `8am–4:30pm`, with "Download Application" (open PDF) + "Download PDF" buttons.
     - EEO / drug-free footer note.
   - Full SEO `head()`: title, description, og tags, canonical, JSON-LD `JobPosting` entries for the 2 year-round roles + breadcrumb.
   - Mobile-first responsive grid, matches guest-info card style.

3. **Footer link — `Resort → Employment`**
   - Locate the footer's Resort column (in `src/components/SilverthornHomePage.tsx` or wherever `Footer` is defined) and add `{ label: "Employment", href: "/employment" }`.

### Technical details

- No changes to top nav (footer only, as requested).
- Icons: `HardHat` (maintenance), `Wrench` (mechanic), `CalendarClock` (seasonal), `MapPin`, `Clock`, `FileText`, `Download`, `ExternalLink`, `ShieldCheck` (EEO/drug-free).
- The uploaded PDF is only referenced via CDN URL — no binary in repo.
