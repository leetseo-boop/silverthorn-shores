import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Sitemap | Silverthorn Resort" },
      { name: "description", content: "All pages on the Silverthorn Resort website — houseboats, cabins, small boats, Shasta Lake info, and more." },
      { property: "og:title", content: "Sitemap | Silverthorn Resort" },
      { property: "og:description", content: "Full list of pages on silverthornresort.com." },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "https://silverthornresort.com/sitemap" }],
  }),
  component: SitemapPage,
});

const GROUPS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Stay",
    links: [
      { label: "Houseboats", to: "/houseboats" },
      { label: "Queen I", to: "/houseboats/queen-i" },
      { label: "Queen II", to: "/houseboats/queen-ii" },
      { label: "Queen", to: "/houseboats/queen" },
      { label: "Senator", to: "/houseboats/senator" },
      { label: "Compare Queens", to: "/compare/queens" },
      { label: "Cabins", to: "/cabins" },
      { label: "Small Boats", to: "/small-boats" },
      { label: "Moorage", to: "/moorage" },
      { label: "Pro Shop", to: "/pro-shop" },
    ],
  },
  {
    title: "Shasta Lake",
    links: [
      { label: "About Shasta Lake", to: "/shasta-lake" },
      { label: "Exploring Shasta Lake", to: "/exploring-shasta-lake" },
      { label: "Planning Your Vacation", to: "/planning" },
      { label: "Shasta vs. Lake Powell", to: "/shasta-vs-lake-powell" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our History", to: "/about/history" },
      { label: "Contact", to: "/contact" },
      { label: "Directions", to: "/directions" },
      { label: "FAQ", to: "/faq" },
      { label: "Guest Info", to: "/guest-info" },
      { label: "Employment", to: "/employment" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Houseboat Policy", to: "/houseboats/policy" },
      { label: "Cabin Policy", to: "/cabins/policy" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Accessibility", to: "/accessibility" },
      { label: "Cookie Settings", to: "/cookie-settings" },
    ],
  },
];

function SitemapPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16" style={{ color: "#1B2B3A" }}>
      <h1 className="text-4xl font-bold mb-3">Sitemap</h1>
      <p className="text-muted-foreground mb-10">Every page on silverthornresort.com, organized for easy browsing.</p>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {GROUPS.map((g) => (
          <div key={g.title}>
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "#1B2B3A" }}>{g.title}</h2>
            <ul className="space-y-2">
              {g.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[15px] hover:underline" style={{ color: "#1A6FA8" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-12 text-sm text-muted-foreground">
        Looking for the machine-readable version? <a href="/sitemap.xml" className="underline">sitemap.xml</a>
      </p>
    </main>
  );
}
