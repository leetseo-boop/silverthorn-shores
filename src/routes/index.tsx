import { createFileRoute } from "@tanstack/react-router";
import SilverthornHomePage, { HOME_FAQS } from "@/components/SilverthornHomePage";
import heroMarina from "@/assets/home-hero-marina.webp";
import { PROMO } from "@/lib/promo";

const SITE = "https://silverthornresort.com";
const URL = `${SITE}/`;
const TITLE = "Silverthorn Resort — Shasta Lake Houseboats & Cabins";
const DESCRIPTION =
  "Family-run Shasta Lake resort. Houseboats, cabins & boat rentals. Summer 2026: 20% off Queen I & Queen II — code BREAK20 (Jul 12–Aug 25).";
const OG_IMAGE = `${SITE}${heroMarina}`;

export const Route = createFileRoute("/")({
  component: SilverthornHomePage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "canonical", href: URL },
      { rel: "preload", as: "image", href: heroMarina, fetchPriority: "high" } as any,
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: HOME_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});
