Update the `NAV_LINKS` array in `src/components/SilverthornHomePage.tsx` (lines 113-152) to the new structure. Houseboats, Cabins, and Small Boats entries stay exactly as they are. Replace the current About block and the top-level FAQ/Contact entries with:

```ts
{
  label: "Shasta Lake",
  children: [
    { label: "Shasta Lake",         href: "/shasta-lake" },
    { label: "Explore Shasta Lake", href: "/exploring-shasta-lake" },
    { label: "Planning Guide",      href: "/planning" },
  ],
},
{
  label: "About",
  children: [
    { label: "Our History", href: "/about/history" },
    { label: "Contact",     href: "/contact" },
    { label: "Directions",  href: "/directions" },
  ],
},
{ label: "FAQ", href: "/faq" },
```

No other files change. Both desktop and mobile nav already iterate `NAV_LINKS`, so they update automatically. The `/planning` link remains a placeholder per your choice.