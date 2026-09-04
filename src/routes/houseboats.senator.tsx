import { createFileRoute } from "@tanstack/react-router";
import { HouseboatDetail } from "@/components/HouseboatDetail";
import { getHouseboatBySlug } from "@/data/houseboats";
import { PROMO, isPromoActive, rentalAggregateOffer, saleEventJsonLd } from "@/lib/promo";

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
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: `${boat.name} Houseboat`, description: boat.description, image: boat.heroImages, brand: { "@type": "Brand", name: "Silverthorn Resort" }, aggregateRating: { "@type": "AggregateRating", ratingValue: boat.rating, reviewCount: boat.reviews }, offers: rentalAggregateOffer(boat.priceFrom, boat.extendedPricing.sevenNight.holiday, path) }) },
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: boat.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }) },
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "/" }, { "@type": "ListItem", position: 2, name: "Houseboats", item: "/houseboats" }, { "@type": "ListItem", position: 3, name: boat.name, item: path }] }) },
      ...(isPromoActive()
        ? [{ type: "application/ld+json", children: JSON.stringify(saleEventJsonLd({ url: path, name: `${PROMO.title} — ${PROMO.percentLabel} the ${boat.name} Houseboat`, description: `${PROMO.percentLabel} the ${boat.name} houseboat at Silverthorn Resort on Shasta Lake with code ${PROMO.code}, through September 30, 2026. New reservations only.` })) }]
        : []),
    ],
  }),
  component: () => <HouseboatDetail boat={boat} />,
});
