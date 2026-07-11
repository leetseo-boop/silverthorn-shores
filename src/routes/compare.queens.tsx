import { createFileRoute } from "@tanstack/react-router";
import { QueenComparePage } from "@/components/QueenComparePage";
import { getHouseboatBySlug } from "@/data/houseboats";

const q1 = getHouseboatBySlug("queen-i")!;
const q2 = getHouseboatBySlug("queen-ii")!;
const url = "https://silver-shasta-dreams.lovable.app/compare/queens";

export const Route = createFileRoute("/compare/queens")({
  head: () => ({
    meta: [
      { title: "Queen I vs Queen II — Compare Shasta Lake Houseboats | Silverthorn Resort" },
      {
        name: "description",
        content:
          "Compare the Queen I and Queen II luxury houseboats at Silverthorn Resort — capacity, beds, amenities, low & high season pricing side by side. Book with 20% off promo BREAK20.",
      },
      { property: "og:title", content: "Queen I vs Queen II — Shasta Lake Houseboat Comparison" },
      {
        property: "og:description",
        content:
          "Sleeps, staterooms, features and seasonal rates for Queen I and Queen II — pick the right Silverthorn Resort houseboat.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: q1.heroImages[0] },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: q1.heroImages[0] },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Queen I vs Queen II Houseboat Comparison",
          itemListElement: [q1, q2].map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name: `${b.name} Houseboat`,
              description: b.description,
              image: b.heroImages,
              brand: { "@type": "Brand", name: "Silverthorn Resort" },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: b.rating,
                reviewCount: b.reviews,
              },
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "USD",
                lowPrice: b.priceFrom,
                highPrice: b.extendedPricing.sevenNight.holiday,
                url: b.bookingUrl,
                availability: "https://schema.org/InStock",
              },
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
            { "@type": "ListItem", position: 1, name: "Home", item: "https://silver-shasta-dreams.lovable.app/" },
            { "@type": "ListItem", position: 2, name: "Houseboats", item: "https://silver-shasta-dreams.lovable.app/houseboats" },
            { "@type": "ListItem", position: 3, name: "Queen I vs Queen II", item: url },
          ],
        }),
      },
    ],
  }),
  component: QueenComparePage,
});
