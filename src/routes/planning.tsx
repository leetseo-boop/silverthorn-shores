import { createFileRoute } from "@tanstack/react-router";
import { PlanningVacationPage } from "@/components/PlanningVacationPage";
import hero from "@/assets/planning/planning-family-packing-hero.webp";

const SITE = "https://silverthornresort.com";
const url = `${SITE}/planning`;
const title = "Planning Your Shasta Lake Vacation — Silverthorn Resort Guide";
const description =
  "Plan your Shasta Lake trip: small boat rentals, marina market hours, Shasta Dam & Lake Shasta Caverns tours, Redding attractions, plus local phone numbers.";
const ogImage = `${SITE}${hero}`;

export const Route = createFileRoute("/planning")({
  component: PlanningVacationPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "preload", as: "image", href: hero, fetchPriority: "high" } as never,
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: "Shasta Lake Vacation Planning Guide",
          description,
          image: [ogImage],
          url,
          touristType: ["Families", "Anglers", "Boaters", "Houseboaters", "Outdoor enthusiasts"],
          provider: {
            "@type": "LodgingBusiness",
            name: "Silverthorn Resort",
            telephone: "+1-800-332-3044",
            address: {
              "@type": "PostalAddress",
              streetAddress: "16250 Silverthorn Road",
              addressLocality: "Redding",
              addressRegion: "CA",
              postalCode: "96003",
              addressCountry: "US",
            },
          },
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
            { "@type": "ListItem", position: 3, name: "Planning Guide", item: url },
          ],
        }),
      },
    ],
  }),
});
