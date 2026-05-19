## Add "Small Boats" button to final CTA block

In `src/components/ShastaLakePage.tsx`, the "Make Shasta Lake your next memory" CTA section currently has two buttons: **Browse Houseboats** and **View Cabins**.

Add a third button **Small Boats** → `<Link to="/small-boats">`, styled as a secondary outline button matching the existing "View Cabins" style (transparent with white border), placed after View Cabins. The existing `flex flex-wrap justify-center gap-3` wrapper already handles wrapping on mobile.

No other changes.