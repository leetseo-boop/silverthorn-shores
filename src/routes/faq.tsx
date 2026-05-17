import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Phone } from "lucide-react";
import faqHero from "@/assets/couple-planning-shasta.webp";

type Faq = { q: string; a: string; render?: () => React.ReactNode };

const FAQS: Faq[] = [
  {
    q: "How do I book a houseboat?",
    a: "Book online 24/7 at rentals.silverthornresort.com, or call our reservation specialists at 800-332-3044. We recommend booking early — summer dates fill fast.",
  },
  {
    q: "What is the minimum age to rent a houseboat or cabin?",
    a: "You must be at least 21 years of age to rent any vessel or cabin at Silverthorn Resort.",
  },
  {
    q: "What is included with a houseboat rental?",
    a: "All houseboats come fully equipped with dishes, pots, pans, silverware, a modern kitchen with range/oven, dishwasher, microwave, refrigerator, propane BBQ, TV, and AC or swamp cooler. Amenities vary by boat — some include hot tubs, waterslides, wet bars, and fireplaces.",
  },
  {
    q: "How many people does each houseboat sleep?",
    a: "Queen: up to 20 guests. Queen I: up to 20 guests. Queen II: up to 16 guests. Senator: up to 16 guests.",
  },
  {
    q: "Where is Silverthorn Resort located?",
    a: "We are located at 16250 Silverthorn Road, Redding, CA 96003, on the shores of Shasta Lake — approximately 15 miles north of Redding via Interstate 5 to Gilman Road.",
  },
  {
    q: "What are the 2026 houseboat seasons and rates?",
    a: "Low Season: January 2 – April 30 and August 20 – November 30. May & September rates apply for those months including Memorial Day and Labor Day. High Season: June 11 – August 19, 2026. See individual houseboat pages for full pricing.",
  },
  {
    q: "Can I bring my pet?",
    a: "All of our houseboats are pet friendly. Please call 800-332-3044 with any questions about traveling with your pet.",
  },
  {
    q: "What is the cancellation and rental policy?",
    a: "See our full Houseboat Rental Policy at /houseboats/policy. We strongly recommend reviewing this before booking.",
    render: () => (
      <>
        See our full{" "}
        <Link
          to="/houseboats/queen"
          className="text-primary underline underline-offset-2 hover:opacity-80"
        >
          Houseboat Rental Policy
        </Link>
        . We strongly recommend reviewing this before booking.
      </>
    ),
  },
  {
    q: "Can I book Jones Valley Resort houseboats through your site?",
    a: "Yes! Silverthorn and Jones Valley Resort are sister marinas managed by the same team on Shasta Lake. If your preferred dates are unavailable at Silverthorn, we can point you to Jones Valley. Visit houseboats.com or call us at 800-332-3044.",
  },
  {
    q: "What is there to do on Shasta Lake beyond the houseboat?",
    a: "Shasta Lake offers 365 miles of shoreline, world-class fishing, water skiing, wakeboarding, kayaking, and hiking. Nearby attractions include Shasta Dam, Shasta Caverns, and the town of Redding. See our Exploring Shasta Lake page for a full guide.",
  },
];

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Silverthorn Resort on Shasta Lake" },
      {
        name: "description",
        content:
          "Answers to common questions about houseboat rentals, cabins, pricing, policies, and visiting Silverthorn Resort on Shasta Lake.",
      },
      { property: "og:title", content: "FAQ — Silverthorn Resort on Shasta Lake" },
      {
        property: "og:description",
        content:
          "Everything you need to know about your Shasta Lake vacation at Silverthorn Resort.",
      },
      { property: "og:url", content: "/faq" },
    ],
    links: [
      { rel: "canonical", href: "/faq" },
      { rel: "preload", as: "image", href: faqHero, fetchPriority: "high" } as any,
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(FAQ_JSONLD),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <main className="bg-background">
      {/* Header */}
      <section className="px-4 pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="text-center md:text-left">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-secondary tracking-tight">
              Frequently Asked Questions
            </h1>
            <div className="mt-5 h-1 w-16 rounded bg-primary mx-auto md:mx-0" />
            <p className="mt-6 text-base md:text-lg text-muted-foreground">
              Everything you need to know about your Shasta Lake vacation.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-xl md:max-w-none">
            <div
              aria-hidden
              className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl bg-primary/15"
            />
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-border rotate-1 md:rotate-2">
              <img
                src={faqHero}
                alt="Couple planning their Shasta Lake houseboat trip on silverthornresort.com"
                width={1536}
                height={1024}
                loading="eager"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Accordion */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-3xl">
          <Accordion
            type="single"
            collapsible
            className="rounded-2xl border border-border bg-card shadow-sm divide-y divide-border overflow-hidden"
          >
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b-0 px-5 md:px-7"
              >
                <AccordionTrigger
                  className="py-5 md:py-6 text-left font-display text-lg md:text-xl font-semibold text-secondary hover:no-underline [&>svg]:text-primary [&>svg]:h-5 [&>svg]:w-5"
                >
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 pt-0 text-base text-muted-foreground leading-relaxed">
                  {f.render ? f.render() : f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[#F5EFE4] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-secondary">
            Still have questions? Our team is happy to help.
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+18003323044"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <Phone className="h-5 w-5" />
              Call 800-332-3044
            </a>
            <Link
              to="/directions"
              className="inline-flex items-center justify-center rounded-md border border-secondary bg-transparent px-6 py-3 text-base font-semibold text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
