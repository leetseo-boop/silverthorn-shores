import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Phone } from "lucide-react";
import faqHero from "@/assets/couple-planning-shasta.webp";

import { FAQS, FAQ_JSONLD } from "@/data/faq-page";


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
      <section className="px-4 pt-16 md:pt-24 pb-10 md:pb-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-14">
          <div className="text-center md:text-left">
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-secondary tracking-tight">
              Frequently Asked Questions
            </h1>
            <div className="mt-5 h-1 w-16 rounded bg-primary mx-auto md:mx-0" />
            <p className="mt-6 text-base md:text-lg text-muted-foreground">
              Everything you need to know about your Shasta Lake vacation.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-md sm:max-w-lg md:max-w-none">
            <div
              aria-hidden
              className="absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3 h-full w-full rounded-2xl bg-primary/15"
            />
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-border md:rotate-2">
              <img
                src={faqHero}
                alt="Couple planning their Shasta Lake houseboat trip on silverthornresort.com"
                width={1536}
                height={1024}
                loading="eager"
                fetchPriority="high"
                decoding="async"
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
