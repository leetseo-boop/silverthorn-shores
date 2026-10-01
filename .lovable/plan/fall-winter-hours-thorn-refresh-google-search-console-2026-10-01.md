# Fall/Winter Hours + Thorn Refresh + Google Search Console

## 1. New hours: 8:00 AM – 4:30 PM, 7 days a week (Fall/Winter)
Update visible text everywhere it shows the old summer hours:
- Contact page: hours card and business schema (closes 18:30 → 16:30)
- Directions page and Houseboats fleet page footer line ("Summer until 6pm" removed)
- Planning guide: show "Fall/Winter: 8:00 a.m. – 4:30 p.m., 7 days a week" as the current schedule
- Small Boats FAQ answer on rental hours
- Small boat and cabin schema already use 08:00–16:30 (kept)
- Houseboat/cabin check-in times are a separate topic and stay unchanged

## 2. Thorn knows everything new
- Replace "Mon–Sun 8:00 AM – 6:30 PM" in Thorn's knowledge and chat instructions with the Fall/Winter hours
- Confirm Thorn has: Fall Sale 2026 (code fall26, Oct 1–31, 20% off Queen, all cabins, Sun Tracker, Patio Boat, Party Cruiser I, fishing boat, kayak, new reservations only), and the latest cabins page facts (prices, pets, FAQs)
- Update `llms.txt` hours for AI search

## 3. Google Search Console
- Link Google Search Console to the project (connect card)
- Confirm the verified property for silverthornresort.com, then resubmit the sitemap so Google picks up the new hours, the Fall Sale, and the cabins page changes
- Note: changes must be published first so Google sees them; I'll ask to publish before resubmitting

## Technical notes
Files: contact.tsx, DirectionsPage.tsx, HouseboatsFleetPage.tsx, PlanningVacationPage.tsx, small-boats.tsx, thorn-knowledge.ts, thorn/kb-site.ts, api/chat.ts, public/llms.txt.
