import { createFileRoute } from "@tanstack/react-router";
import { HistoryPage } from "@/components/HistoryPage";
import heroDam from "@/assets/history/shasta-dam-aerial-lake-shasta.webp";

const url = "https://silver-shasta-dreams.lovable.app/about/history";
const title =
  "Our History — Silverthorn Resort on Shasta Lake Since 1853";
const description =
  "From George Silverthorn's 1853 Pit River ferry to the building of Shasta Dam, discover the 170-year story behind one of Shasta Lake's premier houseboat resorts.";

export const Route = createFileRoute("/about/history")({
  component: HistoryPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:image", content: `https://silver-shasta-dreams.lovable.app${heroDam}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: `https://silver-shasta-dreams.lovable.app${heroDam}` },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "preload", as: "image", href: heroDam, fetchPriority: "high" } as any,
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Our History — Silverthorn Resort on Shasta Lake",
          description,
          image: [`https://silver-shasta-dreams.lovable.app${heroDam}`],
          datePublished: "2024-01-01",
          dateModified: "2026-05-19",
          author: { "@type": "Organization", name: "Silverthorn Resort" },
          publisher: {
            "@type": "Organization",
            name: "Silverthorn Resort",
            url: "https://silver-shasta-dreams.lovable.app",
          },
          mainEntityOfPage: url,
          about: [
            { "@type": "Place", name: "Shasta Lake" },
            { "@type": "Place", name: "Shasta Dam" },
            { "@type": "Place", name: "Pit River" },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://silver-shasta-dreams.lovable.app/" },
            { "@type": "ListItem", position: 2, name: "About", item: "https://silver-shasta-dreams.lovable.app/about/history" },
            { "@type": "ListItem", position: 3, name: "Our History", item: url },
          ],
        }),
      },
    ],
  }),
});
