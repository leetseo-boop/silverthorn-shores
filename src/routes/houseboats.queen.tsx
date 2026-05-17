import { createFileRoute } from "@tanstack/react-router";
import { HouseboatDetail } from "@/components/HouseboatDetail";
import { getHouseboatBySlug } from "@/data/houseboats";

const boat = getHouseboatBySlug("queen")!;
const path = "/houseboats/queen";

export const Route = createFileRoute("/houseboats/queen")({
  head: () => ({
    meta: [
      { title: `Queen Houseboat Rental on Shasta Lake | Silverthorn Resort` },
      { name: "description", content: "Rent the Queen — the most elite houseboat at Silverthorn Resort on Shasta Lake. Sleeps 20, master penthouse, hot tub, waterslide, fireplace, 3 baths. Book online." },
      { property: "og:title", content: "Queen Houseboat Rental on Shasta Lake | Silverthorn Resort" },
      { property: "og:description", content: "Most elite luxury houseboat at Silverthorn Resort. Sleeps 20 with master penthouse, hot tub, waterslide & gourmet kitchen." },
      { property: "og:type", content: "product" },
      { property: "og:url", content: path },
      { property: "og:image", content: boat.heroImages[0] },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: boat.heroImages[0] },
    ],
    links: [{ rel: "canonical", href: path }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(productJsonLd(boat, path)) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(boat)) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd(boat, path)) },
    ],
  }),
  component: () => <HouseboatDetail boat={boat} />,
});

function productJsonLd(b: typeof boat, url: string) {
  return {
    "@context": "https://schema.org", "@type": "Product",
    name: `${b.name} Houseboat`, description: b.description, image: b.heroImages,
    brand: { "@type": "Brand", name: "Silverthorn Resort" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating, reviewCount: b.reviews },
    offers: { "@type": "AggregateOffer", priceCurrency: "USD", lowPrice: b.priceFrom, highPrice: b.extendedPricing.sevenNight.holiday, url, availability: "https://schema.org/InStock" },
  };
}
function faqJsonLd(b: typeof boat) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: b.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) };
}
function breadcrumbJsonLd(b: typeof boat, url: string) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "/" },
    { "@type": "ListItem", position: 2, name: "Houseboats", item: "/houseboats" },
    { "@type": "ListItem", position: 3, name: b.name, item: url },
  ] };
}
