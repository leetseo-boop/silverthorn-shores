import { createFileRoute } from "@tanstack/react-router";
import { HouseboatDetail } from "@/components/HouseboatDetail";
import { getHouseboatBySlug } from "@/data/houseboats";
import { PROMO, isPromoActive, rentalAggregateOffer, saleEventJsonLd } from "@/lib/promo";

const boat = getHouseboatBySlug("queen")!;
const path = "/houseboats/queen";

export const Route = createFileRoute("/houseboats/queen")({
  head: () => {
    const promo = isPromoActive();
    const title = promo ? "20% Off Queen Houseboat | Shasta Lake Fall Sale" : "Queen Houseboat Rental on Shasta Lake | Silverthorn Resort";
    const description = promo ? `Shasta Lake Fall Sale 2026: 20% off Queen houseboat low-season rates with code ${PROMO.code}, October 1–31. New reservations only; restrictions apply.` : "Rent the Queen — the most elite houseboat at Silverthorn Resort on Shasta Lake. Sleeps 20, master penthouse, hot tub, waterslide, fireplace, 3 baths. Book online.";
    return ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
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
      ...(promo
        ? [{ type: "application/ld+json", children: JSON.stringify(saleEventJsonLd({ url: path, name: `${PROMO.title} — ${PROMO.percentLabel} the ${boat.name} Houseboat`, description: `${PROMO.percentLabel} the ${boat.name} houseboat's low-season rates at Silverthorn Resort on Shasta Lake with code ${PROMO.code}, October 1–31, 2026. New reservations only; restrictions apply.` })) }]
        : []),
    ],
    });
  },
  component: () => <HouseboatDetail boat={boat} />,
});

function productJsonLd(b: typeof boat, url: string) {
  return {
    "@context": "https://schema.org", "@type": "Product",
    name: `${b.name} Houseboat`, description: b.description, image: b.heroImages,
    brand: { "@type": "Brand", name: "Silverthorn Resort" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating, reviewCount: b.reviews },
    offers: rentalAggregateOffer(b.priceFrom, b.extendedPricing.sevenNight.holiday, url),
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
