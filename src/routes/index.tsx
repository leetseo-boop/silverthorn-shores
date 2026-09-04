import { createFileRoute } from "@tanstack/react-router";
import SilverthornHomePage, { HOME_FAQS } from "@/components/SilverthornHomePage";
import heroMarina from "@/assets/home-hero-marina.webp";
import { PROMO, isPromoActive } from "@/lib/promo";

const SITE = "https://silverthornresort.com";
const URL = `${SITE}/`;
const TITLE = "Silverthorn Resort — Shasta Lake Houseboats & Cabins";
const BASE_DESCRIPTION =
  "Family-run Shasta Lake resort on the Pit River Arm. Luxury houseboat rentals, lakeside cabins, ski boats, patio boats & jet skis. Book your 2026 getaway.";
const OG_IMAGE = `${SITE}${heroMarina}`;

export const Route = createFileRoute("/")({
  component: SilverthornHomePage,
  head: () => {
    const promo = isPromoActive();
    const DESCRIPTION = promo
      ? "End of Summer Sale at Silverthorn Resort on Shasta Lake: 20% off houseboats, small boats and lakeside cabins with code LABOR26, through September 30. New reservations only."
      : BASE_DESCRIPTION;
    const PAGE_TITLE = promo
      ? "End of Summer Sale 20% Off | Silverthorn Resort Shasta Lake"
      : TITLE;
    return {
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "canonical", href: URL },
      { rel: "preload", as: "image", href: heroMarina, fetchPriority: "high" } as any,
    ],
    scripts: [
      ...(promo
        ? [{
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SaleEvent",
              name: "Silverthorn Resort End of Summer Sale — 20% Off",
              description: `20% off Shasta Lake houseboats, small boat rentals (jet skis excluded) and lakeside cabins at Silverthorn Resort. Use code ${PROMO.code}. New reservations only.`,
              startDate: "2026-09-01",
              endDate: PROMO.validThrough,
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: "Silverthorn Resort",
                address: { "@type": "PostalAddress", streetAddress: "16250 Silverthorn Road", addressLocality: "Redding", addressRegion: "CA", postalCode: "96003", addressCountry: "US" },
              },
              organizer: { "@type": "Organization", name: "Silverthorn Resort", url: SITE },
              offers: { "@type": "Offer", url: URL, priceCurrency: "USD", availability: "https://schema.org/InStock", validThrough: PROMO.validThrough, description: `20% off with code ${PROMO.code}` },
            }),
          }]
        : []),
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
    };
  },
});
