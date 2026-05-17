import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Fleet } from "@/components/site/Fleet";
import { Stats } from "@/components/site/Stats";
import { About } from "@/components/site/About";
import { Testimonials } from "@/components/site/Testimonials";
import { SisterMarina } from "@/components/site/SisterMarina";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Silverthorn Resort — Shasta Lake Houseboat Rentals" },
      {
        name: "description",
        content:
          "Premium houseboat rentals, lakeside cabins, and ski, fishing & patio boats on Shasta Lake. Family-run since 1984.",
      },
      { property: "og:title", content: "Silverthorn Resort — Shasta Lake Houseboats" },
      {
        property: "og:description",
        content:
          "Shasta Lake's trusted houseboat rental resort. Premium fleet, cabins, and day boats.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <Fleet />
      <Stats />
      <About />
      <Testimonials />
      <SisterMarina />
      <Footer />
    </main>
  );
}
