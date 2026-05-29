## Add Suntracker image to Boating card on /planning

1. Copy `user-uploads://Suntracker_1.jpg` to `src/assets/planning/suntracker-pontoon-shasta-lake.jpg`.
2. In `src/components/PlanningVacationPage.tsx`:
   - Import the new image as `suntracker`.
   - Update the Boating activity entry to use `img: suntracker` and SEO-optimized alt: `"Sun Tracker pontoon boat cruising Shasta Lake with green mountains in the background"`.

No other changes.