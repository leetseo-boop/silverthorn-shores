import { createFileRoute } from "@tanstack/react-router";
import { HouseboatsFleetPage } from "@/components/HouseboatsFleetPage";
import { houseboats } from "@/data/houseboats";

const SITE = "https://silverthornresort.com";
const path = `${SITE}/houseboats`;
const ogImage = `${SITE}/images/queen-houseboat-exterior-lifestyle-anchored-silverthorn-resort.webp`;
const title = "Shasta Lake Houseboat Rentals | Silverthorn Resort Fleet";
const description = "Rent the Queen, Queen I, Queen II or Senator houseboat on Shasta Lake. Hot tubs, waterslides, sleeps up to 20. Pit River Arm marina — book 2026.";

const FAQS = [
  { q: "How much does it cost to rent a houseboat at Silverthorn Resort?", a: "Rates start around $4,200 for shorter low-season stays and range up to roughly $11,700 for a 7-night holiday week on the flagship Queen." },
  { q: "What is the best houseboat for a large family at Silverthorn Resort?", a: "The Queen and Queen I both sleep up to 20 guests across multiple private staterooms, ideal for large families and multi-generational trips." },
  { q: "Do all houseboats at Silverthorn Resort have hot tubs?", a: "Three of our four boats — Queen, Queen I, and Queen II — feature hot tubs and waterslides on the upper deck." },
  { q: "Where is Silverthorn Resort located?", a: "Silverthorn Resort sits on the Pit River Arm of Shasta Lake in Northern California, just off I-5 near Lakehead — about 15 minutes north of Redding." },
];

export const Route = createFileRoute("/houseboats/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: path },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: path }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Silverthorn Resort Houseboat Fleet",
          itemListElement: houseboats.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name: `${b.name} Houseboat`,
              url: `/houseboats/${b.slug}`,
              image: b.heroImages[0],
              aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating, reviewCount: b.reviews },
            },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Houseboats", item: path },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: HouseboatsFleetPage,
});
