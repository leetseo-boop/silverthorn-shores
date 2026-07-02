import { createFileRoute } from "@tanstack/react-router";
import { DirectionsPage } from "@/components/DirectionsPage";

const path = "/directions";
const title = "Directions to Silverthorn Resort | Shasta Lake, Redding CA";
const description =
  "How to get to Silverthorn Resort on Shasta Lake's Pit River Arm. Address, embedded map, drive times from Redding, Sacramento, and the Bay Area, plus turn-by-turn directions.";
const ogImage = "/images/queen-houseboat-exterior-lifestyle-anchored-silverthorn-resort.webp";

export const Route = createFileRoute("/directions")({
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
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: path }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: "Silverthorn Resort",
          telephone: "+1-800-332-3044",
          email: "reserve1@houseboats.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "16250 Silverthorn Road",
            addressLocality: "Redding",
            addressRegion: "CA",
            postalCode: "96003",
            addressCountry: "US",
          },
          geo: { "@type": "GeoCoordinates", latitude: 40.7783, longitude: -122.2436 },
          url: path,
          image: ogImage,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Directions", item: path },
          ],
        }),
      },
    ],
  }),
  component: DirectionsPage,
});
