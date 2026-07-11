import { createFileRoute } from "@tanstack/react-router";
import { ShastaVsPowellPage, SHASTA_VS_POWELL_FAQS } from "@/components/ShastaVsPowellPage";
import heroImg from "@/assets/shasta-lake/shasta-lake-aerial-pit-river-arm.webp";

const SITE = "https://silverthornresort.com";
const URL = `${SITE}/shasta-vs-lake-powell`;
const TITLE = "Shasta Lake vs Lake Powell — Houseboat Comparison 2026";
const DESCRIPTION =
  "Shasta Lake vs Lake Powell: drive time, cost, houseboats, scenery and season compared. Honest guide from Silverthorn Resort, family-run on Shasta since 1986.";
const OG_IMAGE = `${SITE}${heroImg}`;

export const Route = createFileRoute("/shasta-vs-lake-powell")({
  component: ShastaVsPowellPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "canonical", href: URL },
      { rel: "preload", as: "image", href: heroImg, fetchPriority: "high" } as never,
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Shasta Lake vs Lake Powell — Houseboat Comparison",
          description: DESCRIPTION,
          image: [OG_IMAGE],
          url: URL,
          author: { "@type": "Organization", name: "Silverthorn Resort" },
          publisher: {
            "@type": "Organization",
            name: "Silverthorn Resort",
            logo: {
              "@type": "ImageObject",
              url: `${SITE}/favicon.png`,
            },
          },
          mainEntityOfPage: URL,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: SHASTA_VS_POWELL_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
            { "@type": "ListItem", position: 2, name: "Shasta Lake", item: `${SITE}/shasta-lake` },
            { "@type": "ListItem", position: 3, name: "Shasta vs Lake Powell", item: URL },
          ],
        }),
      },
    ],
  }),
});
