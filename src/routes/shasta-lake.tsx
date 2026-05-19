import { createFileRoute } from "@tanstack/react-router";
import { ShastaLakePage } from "@/components/ShastaLakePage";
import heroDam from "@/assets/shasta-lake/shasta-dam-mount-shasta-hero.jpg";

const SITE = "https://silver-shasta-dreams.lovable.app";
const url = `${SITE}/shasta-lake`;
const title = "About Shasta Lake — 30,000 Acres in Northern California | Silverthorn Resort";
const description =
  "Shasta Lake: 30,000 acres, 365 miles of shoreline, 517 ft depth. Houseboating, fishing, hiking and family fun at Silverthorn Resort on the Pit River Arm.";
const ogImage = `${SITE}${heroDam}`;

export const Route = createFileRoute("/shasta-lake")({
  component: ShastaLakePage,
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
      { rel: "preload", as: "image", href: heroDam, fetchPriority: "high" } as never,
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristAttraction",
          name: "Shasta Lake",
          description,
          image: [ogImage],
          url,
          geo: { "@type": "GeoCoordinates", latitude: 40.7857, longitude: -122.3886 },
          address: {
            "@type": "PostalAddress",
            addressRegion: "CA",
            addressCountry: "US",
            addressLocality: "Lakehead",
          },
          touristType: ["Families", "Anglers", "Boaters", "Outdoor enthusiasts"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
            { "@type": "ListItem", position: 2, name: "About", item: `${SITE}/about/history` },
            { "@type": "ListItem", position: 3, name: "Shasta Lake", item: url },
          ],
        }),
      },
    ],
  }),
});
