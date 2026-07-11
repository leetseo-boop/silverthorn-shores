import { createFileRoute } from "@tanstack/react-router";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Car,
} from "lucide-react";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.85a8.16 8.16 0 0 0 4.77 1.52V6.92a4.85 4.85 0 0 1-1.84-.23Z" />
  </svg>
);
import { Button } from "@/components/ui/button";
import heroMarina from "@/assets/home-hero-marina.webp";

const path = "/contact";
const SITE = "https://silverthornresort.com";
const title = "Contact Silverthorn Resort | Shasta Lake Marina";
const description =
  "Get in touch with Silverthorn Resort on Shasta Lake. Call 800-332-3044, email reservations, find directions, and reach our marina team.";
const ogImage = `${SITE}${heroMarina}`;

const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
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
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "18:30",
    },
  ],
  sameAs: [
    "https://facebook.com/silverthornresort",
    "https://twitter.com/SilverthornDock",
    "https://instagram.com/silverthornresortandmarina",
    "https://www.youtube.com/@houseboatslakeshasta",
    "https://www.tiktok.com/@houseboats.com",
  ],
  url: `${SITE}${path}`,
  image: ogImage,
};

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}${path}` },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: `${SITE}${path}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(LOCAL_BUSINESS_JSONLD),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="bg-background">
      {/* Header */}
      <section className="px-4 pt-16 md:pt-24 pb-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-secondary tracking-tight">
            Get in Touch
          </h1>
          <div className="mx-auto mt-5 h-1 w-16 rounded bg-primary" />
          <p className="mt-6 text-base md:text-lg text-muted-foreground">
            Our team is here to help you plan the perfect Shasta Lake vacation.
          </p>
        </div>
      </section>

      {/* Call CTA */}
      <section className="px-4 pb-12">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-8 md:p-12 text-center shadow-sm">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-secondary">
            Have questions? Give us a call.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Our reservation team is happy to help you plan your trip, answer
            questions about boats, or recommend dates that fit your group.
          </p>
          <p className="mt-8 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Reservations
          </p>
          <a
            href="tel:+18003323044"
            className="mt-2 block font-display text-3xl sm:text-5xl md:text-6xl font-bold text-primary hover:opacity-80"
          >
            800-332-3044
          </a>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="tel:+18003323044">
                <Phone className="mr-2 h-4 w-4" /> Call Now
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="mailto:reserve1@houseboats.com">
                <Mail className="mr-2 h-4 w-4" /> Email Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="px-4 pb-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="font-display text-xl font-semibold text-secondary">Email</h3>
            </div>
            <a
              href="mailto:reserve1@houseboats.com"
              className="mt-3 block break-all text-muted-foreground hover:text-primary"
            >
              reserve1@houseboats.com
            </a>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-display text-xl font-semibold text-secondary">Address</h3>
            </div>
            <p className="mt-3 text-muted-foreground">
              16250 Silverthorn Road
              <br />
              Redding, CA 96003
            </p>
          </div>

          <div className="rounded-2xl bg-secondary p-6 text-secondary-foreground shadow-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="font-display text-xl font-semibold">Marina Store Hours</h3>
            </div>
            <p className="mt-3 text-lg">Mon–Sun 8:00 AM – 6:30 PM</p>
            <p className="mt-1 text-sm opacity-80">
              Seasonal — hours may vary, call to confirm.
            </p>
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-semibold text-secondary mb-4">Follow us</p>
          <div className="flex items-center justify-center gap-3">
            {[
              { Icon: Facebook, href: "https://facebook.com/silverthornresort", label: "Facebook" },
              { Icon: Twitter, href: "https://twitter.com/SilverthornDock", label: "Twitter" },
              { Icon: Instagram, href: "https://instagram.com/silverthornresortandmarina", label: "Instagram" },
              { Icon: Youtube, href: "https://www.youtube.com/@houseboatslakeshasta", label: "YouTube" },
              { Icon: TikTokIcon, href: "https://www.tiktok.com/@houseboats.com", label: "TikTok" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-secondary transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="px-4 pb-12">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl ring-1 ring-border shadow-sm">
          <iframe
            title="Map to Silverthorn Resort"
            src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY}&q=${encodeURIComponent("Silverthorn Resort, 16250 Silverthorn Road, Redding, CA 96003")}`}
            width="100%"
            height={350}
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      {/* Directions strip */}
      <section className="px-4 pb-12">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {[
            {
              title: "From Redding",
              body: "Take I-5 North → Exit Gilman Road → Follow signs to Silverthorn Resort (~15 miles, 20 min).",
            },
            { title: "From Sacramento", body: "3 hours via I-5 North." },
            { title: "From Bay Area", body: "4 hours via I-80 East to I-5 North." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg font-semibold text-secondary">{c.title}</h3>
              </div>
              <p className="mt-2 text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sister marina note */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-3xl rounded-2xl bg-[#F5EFE4] p-6 text-center">
          <p className="text-secondary">
            Looking for <span className="font-semibold">Jones Valley Resort</span>? Visit{" "}
            <a
              href="https://www.houseboats.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline font-medium"
            >
              houseboats.com
            </a>{" "}
            or call us — same team, same lake.
          </p>
        </div>
      </section>
    </main>
  );
}
