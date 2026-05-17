Remove duplicate Nav/Footer from `src/routes/houseboats.policy.tsx`:

- Drop the `import { Nav, Footer } from "@/components/SilverthornHomePage"` line.
- Remove the `<Nav />` element at the top of `PolicyPage` and the `<Footer />` element at the bottom.

The root route (`src/routes/__root.tsx`) already wraps every page with `<Nav />` and `<Footer />`, so the page should not render its own.

No other files affected.