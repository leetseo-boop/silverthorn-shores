Plan: Remove "and our team is available by radio throughout your stay." from the FAQ

1. **Audit all FAQ locations**
   - Search the entire codebase for the phrase "available by radio".
   - Confirm the only occurrence is in `src/components/SilverthornHomePage.tsx` within the `HOME_FAQS` array (answer to "Do I need a boating license or prior experience?").
   - Confirm the `/faq` route (`src/routes/faq.tsx`) does not contain the phrase.

2. **Edit the homepage FAQ answer**
   - In `src/components/SilverthornHomePage.tsx`, update line 1033 from:
     `No license required. Every houseboat rental includes a full hands-on orientation before you leave the dock, and our team is available by radio throughout your stay.`
   - To:
     `No license required. Every houseboat rental includes a full hands-on orientation before you leave the dock.`

3. **Verify**
   - Run a project build/typecheck to ensure no syntax errors were introduced.
   - Confirm the FAQ answer renders correctly on the homepage.