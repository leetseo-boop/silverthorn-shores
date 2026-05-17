import { createFileRoute } from "@tanstack/react-router";
import SilverthornHomePage from "@/components/SilverthornHomePage";
import heroMarina from "@/assets/home-hero-marina.webp";

export const Route = createFileRoute("/")({
  component: SilverthornHomePage,
  head: () => ({
    meta: [
      { title: "Silverthorn Resort — Shasta Lake Houseboat Rentals" },
      {
        name: "description",
        content:
          "Premium houseboat rentals, lakeside cabins, and ski, fishing & patio boats on Shasta Lake. Family-run since 1975.",
      },
      { property: "og:title", content: "Silverthorn Resort — Shasta Lake Houseboats" },
      {
        property: "og:description",
        content:
          "Shasta Lake's trusted houseboat rental resort. Premium fleet, cabins, and day boats.",
      },
    ],
    links: [
      { rel: "preload", as: "image", href: heroMarina, fetchpriority: "high" } as any,
    ],
  }),
});
