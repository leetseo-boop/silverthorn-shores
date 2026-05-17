import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const path = "/contact";
const title = "Contact Silverthorn Resort | Shasta Lake Houseboat Rentals";
const description =
  "Get in touch with Silverthorn Resort on Shasta Lake. Call 800-332-3044, email reservations, find directions, and reach our marina team.";
const ogImage = "/src/assets/home-hero-marina.webp";

const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Silverthorn Resort",
  telephone: "+1-800-332-3044",
  email: "reservations@silverthornresort.com",
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
  url: path,
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
      { property: "og:url", content: path },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: path }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(LOCAL_BUSINESS_JSONLD),
      },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(30, "Phone too long").optional().or(z.literal("")),
  dates: z.string().trim().max(100, "Too long").optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(1000, "Message too long"),
});

type FormState = {
  name: string;
  email: string;
  phone: string;
  dates: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  dates: "",
  message: "",
};

function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    const { name, email, phone, dates, message } = parsed.data;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      dates ? `Dates of interest: ${dates}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");
    const mailto = `mailto:reservations@silverthornresort.com?subject=${encodeURIComponent(
      `Website inquiry — ${name}`,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <main className="bg-background">
      {/* Header */}
      <section className="px-4 pt-16 md:pt-24 pb-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-secondary tracking-tight">
            Get in Touch
          </h1>
          <div className="mx-auto mt-5 h-1 w-16 rounded bg-primary" />
          <p className="mt-6 text-base md:text-lg text-muted-foreground">
            Our team is here to help you plan the perfect Shasta Lake vacation.
          </p>
        </div>
      </section>

      {/* Two-column */}
      <section className="px-4 pb-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          {/* LEFT — details */}
          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Reservations
              </p>
              <a
                href="tel:+18003323044"
                className="mt-2 block font-display text-4xl md:text-5xl font-bold text-primary hover:opacity-80"
              >
                800-332-3044
              </a>
              <Button asChild size="lg" className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="tel:+18003323044">
                  <Phone className="mr-2 h-4 w-4" /> Call Now
                </a>
              </Button>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold text-secondary">Email</p>
                <a
                  href="mailto:reservations@silverthornresort.com"
                  className="text-muted-foreground hover:text-primary"
                >
                  reservations@silverthornresort.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold text-secondary">Address</p>
                <p className="text-muted-foreground">
                  16250 Silverthorn Road
                  <br />
                  Redding, CA 96003
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-secondary p-6 text-secondary-foreground shadow-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="font-display text-xl font-semibold">
                  Marina Store Hours
                </h3>
              </div>
              <p className="mt-2 text-lg">Mon–Sun 8:00 AM – 6:30 PM</p>
              <p className="mt-1 text-sm opacity-80">
                Seasonal — hours may vary, call to confirm.
              </p>
            </div>

            <div>
              <p className="font-semibold text-secondary mb-3">Follow us</p>
              <div className="flex items-center gap-3">
                {[
                  { Icon: Facebook, href: "https://facebook.com/silverthornresort", label: "Facebook" },
                  { Icon: Twitter, href: "https://twitter.com/SilverthornDock", label: "Twitter" },
                  { Icon: Instagram, href: "https://instagram.com/silverthornresortandmarina", label: "Instagram" },
                  { Icon: Youtube, href: "https://www.youtube.com/results?search_query=silverthorn+resort+shasta+lake", label: "YouTube" },
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
          </div>

          {/* RIGHT — form */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-secondary">
              Send us a message
            </h2>
            <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input id="name" value={form.name} onChange={update("name")} maxLength={100} required />
                {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" value={form.email} onChange={update("email")} maxLength={255} required />
                {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={update("phone")} maxLength={30} />
                {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
              </div>
              <div>
                <Label htmlFor="dates">Dates interested in</Label>
                <Input
                  id="dates"
                  value={form.dates}
                  onChange={update("dates")}
                  placeholder="e.g. Jul 12–19, 2026"
                  maxLength={100}
                />
                {errors.dates && <p className="mt-1 text-sm text-destructive">{errors.dates}</p>}
              </div>
              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea id="message" rows={5} value={form.message} onChange={update("message")} maxLength={1000} required />
                {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
              </div>
              <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Send Message
              </Button>
              {submitted && (
                <p className="text-sm text-secondary">
                  Opening your email client… if nothing happens, please email us directly at{" "}
                  <a href="mailto:reservations@silverthornresort.com" className="text-primary underline">
                    reservations@silverthornresort.com
                  </a>
                  .
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                For fastest response, call us at{" "}
                <a href="tel:+18003323044" className="text-primary font-medium">
                  800-332-3044
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="px-4 pb-12">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl ring-1 ring-border shadow-sm">
          <iframe
            title="Map to Silverthorn Resort"
            src="https://www.google.com/maps?q=Silverthorn+Resort,+16250+Silverthorn+Road,+Redding,+CA+96003&output=embed"
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
