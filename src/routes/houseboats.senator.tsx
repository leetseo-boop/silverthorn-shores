import { createFileRoute } from "@tanstack/react-router";
import { HouseboatDetail } from "@/components/HouseboatDetail";
import { getHouseboatBySlug } from "@/data/houseboats";

const boat = getHouseboatBySlug("senator")!;
const path = "/houseboats/senator";

export const Route = createFileRoute("/houseboats/senator")({
  head: () => ({
    meta: [
      { title: `Senator Houseboat Rental on Shasta Lake | Silverthorn Resort` },
      { name: "description", content: "Rent the Senator houseboat at Silverthorn Resort on Shasta Lake. Sleeps 16 with waterslide, wet bar, fly bridge & full kitchen. Affordable Shasta Lake getaway." },
      { property: "og:title", content: "Senator Houseboat Rental on Shasta Lake | Silverthorn Resort" },
      { property: "og:description", content: "Comfort & convenience on Shasta Lake — sleeps 16 with waterslide, wet bar, captain's fly bridge & full kitchen at Silverthorn Resort." },
      { property: "og:type", content: "product" },
      { property: "og:url", content: path },
      { property: "og:image", content: boat.heroImages[0] },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: boat.heroImages[0] },
    ],
    links: [{ rel: "canonical", href: path }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: `${boat.name} Houseboat`, description: boat.description, image: boat.heroImages, brand: { "@type": "Brand", name: "Silverthorn Resort" }, aggregateRating: { "@type": "AggregateRating", ratingValue: boat.rating, reviewCount: boat.reviews }, offers: { "@type": "AggregateOffer", priceCurrency: "USD", lowPrice: boat.priceFrom, highPrice: boat.extendedPricing.sevenNight.holiday, url: path, availability: "https://schema.org/InStock" } }) },
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: boat.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }) },
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "/" }, { "@type": "ListItem", position: 2, name: "Houseboats", item: "/houseboats" }, { "@type": "ListItem", position: 3, name: boat.name, item: path }] }) },
    ],
  }),
  component: () => <HouseboatDetail boat={boat} />,
});
