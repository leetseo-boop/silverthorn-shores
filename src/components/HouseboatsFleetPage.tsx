import { Link } from "@tanstack/react-router";
import { houseboats } from "@/data/houseboats";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Mountain,
  Waves,
  Anchor,
  TreePine,
  Flame,
  ChefHat,
  Tv,
  BedDouble,
  Layers,
  ShieldCheck,
  Star,
  Phone,
  MapPin,
  Users,
  Bath,
  Ruler,
} from "lucide-react";

const HERO_IMG =
  "/images/queen-houseboat-exterior-lifestyle-anchored-silverthorn-resort.webp";
const BOOK_URL = "https://rentals.silverthornresort.com/";
const PHONE = "1-800-332-3044";
const MAPS_URL = "https://maps.app.goo.gl/acS8aohrh1m4xFz8A";

const WHY = [
  { icon: Mountain, title: "Mt. Shasta Views", body: "The Pit River Arm delivers some of Shasta Lake's most stunning panoramas, with the snow-capped peak visible from your upper deck on clear days." },
  { icon: Waves, title: "Direct Lake Access", body: "Silverthorn's location on the Pit River Arm gives boaters direct access to the main body of Shasta Lake and every arm — no long cruise to the open water." },
  { icon: Anchor, title: "Full-Service Marina", body: "A well-stocked store, fuel dock, friendly staff, and everything you need for a stress-free houseboat vacation from arrival to return." },
  { icon: TreePine, title: "Secluded Coves", body: "Explore countless sheltered coves along the Pit River Arm — ideal for anchoring overnight, swimming, cliff jumping, and total privacy." },
];

const AMENITIES = [
  { icon: Waves, title: "Hot Tubs & Waterslides", body: "Three of four houseboats — Queen, Queen I, and Queen II — feature hot tubs and waterslides. Soak under the stars with Mt. Shasta in the distance." },
  { icon: ChefHat, title: "Gourmet Kitchens", body: "Fully equipped kitchens with gas stove, oven, microwave, refrigerator, coffee maker, and all the cookware and utensils your group needs." },
  { icon: Tv, title: "Entertainment Systems", body: "Multiple TVs, DVD players, and sound systems on the Queen, Queen I, and Queen II. The Queen features a cozy fireplace for evening ambiance." },
  { icon: BedDouble, title: "Private Staterooms", body: "Choose from 3 to 4 private staterooms depending on your vessel. The Queen leads with a master penthouse suite for maximum privacy." },
  { icon: Layers, title: "Multi-Deck Living", body: "The Queen features three full decks. All boats offer upper deck sun areas with stunning Pit River Arm views." },
  { icon: ShieldCheck, title: "Safety & Comfort", body: "Life jackets, fire extinguishers, CO detectors, navigation lights, and climate control ensure safe, comfortable trips for every group." },
];

const TESTIMONIALS = [
  { quote: "Our family of 18 had the most incredible week on the Queen. The kids loved the waterslide, the adults relaxed in the hot tub every evening, and the Mt. Shasta views were breathtaking. Silverthorn's location is unbeatable.", name: "The Patel Family", boat: "Queen Houseboat" },
  { quote: "We chose the Queen I for our multi-generational trip and it was perfect. Four staterooms gave everyone privacy, and the deck-access rooms were a huge hit. Already planning our return for next summer!", name: "Lisa & David K.", boat: "Queen I Houseboat" },
  { quote: "The Queen II was the perfect size for our group of 14. We loved the fireplace in the evenings and spent every afternoon on the sundeck. The Pit River Arm is gorgeous — so many secluded coves to explore.", name: "The Martinez Group", boat: "Queen II Houseboat" },
];

const FAQS = [
  { q: "How much does it cost to rent a houseboat at Silverthorn Resort?", a: "Rates start around $4,200 for shorter low-season stays and range up to roughly $11,700 for a 7-night holiday week on the flagship Queen. Pricing varies by vessel, season, and trip length — see each boat's detail page for exact rates." },
  { q: "What is the best houseboat for a large family at Silverthorn Resort?", a: "The Queen and Queen I both sleep up to 20 guests across multiple private staterooms, making them ideal for large families and multi-generational trips. The Queen adds a master penthouse suite for the ultimate flagship experience." },
  { q: "Do all houseboats at Silverthorn Resort have hot tubs?", a: "Three of our four boats — Queen, Queen I, and Queen II — feature hot tubs and waterslides on the upper deck. The Senator focuses on value, comfort, and panoramic fly-bridge views instead." },
  { q: "Where is Silverthorn Resort located?", a: "Silverthorn Resort sits on the Pit River Arm of Shasta Lake in Northern California, just off Interstate 5 near Lakehead — about 15 minutes north of Redding, CA." },
  { q: "What is the cancellation policy for Silverthorn Resort rentals?", a: "Cancellation terms vary by trip date and how far in advance you cancel. Full details are provided at booking and on the rental policy page — please call us with any questions before reserving." },
  { q: "What is included in a Silverthorn Resort houseboat rental?", a: "Your rental includes the houseboat, basic cookware, dishes and utensils, life jackets, fire extinguishers, mooring stakes, and a marina orientation. Fuel, food, and personal items are not included." },
  { q: "When is the best time to rent a houseboat on Shasta Lake?", a: "May through September is peak houseboating season with warm water, long days, and reliable sunshine. Late spring and early fall offer fewer crowds and great rates." },
  { q: "How far in advance should I book at Silverthorn Resort?", a: "For summer weekends and holiday weeks, book 6–12 months ahead. Off-peak and shoulder-season dates can often be reserved closer in — call us to check live availability." },
];

function StatChip({ icon: Icon, label }: { icon: typeof Ruler; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground">
      <Icon className="h-3.5 w-3.5 text-primary" />
      {label}
    </span>
  );
}

export function HouseboatsFleetPage() {
  return (
    <main className="bg-background text-foreground">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Queen houseboat anchored at Silverthorn Resort on the Pit River Arm of Shasta Lake"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="relative mx-auto max-w-6xl px-4 py-28 md:py-40">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Pit River Arm • Shasta Lake • Northern California
          </p>
          <h1 className="mt-4 font-serif text-3xl sm:text-4xl font-semibold leading-tight text-white md:text-6xl">
            Silverthorn Resort Houseboat Rentals on Shasta Lake
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Experience the Pit River Arm's stunning Mt. Shasta views and direct access to the main lake. Choose from four premium houseboats and create the vacation of a lifetime.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full">
              <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" data-cta="hero">Check Availability & Book Now</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white">
              <a href={`tel:${PHONE}`}><Phone className="mr-1.5 h-4 w-4" />{PHONE}</a>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/80">
            <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />4.9 Average Rating</span>
            <span>400+ Happy Groups</span>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">Why Choose Silverthorn Resort on Shasta Lake</h2>
          <p className="mt-4 text-muted-foreground">
            Located on the Pit River Arm, Silverthorn offers direct main-lake access, jaw-dropping Mt. Shasta views, and full-service marina convenience.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FLEET */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">Our Premium Houseboat Fleet</h2>
            <p className="mt-4 text-muted-foreground">
              Every houseboat at Silverthorn Resort is maintained to the highest standards. Whether you're planning a romantic getaway or a 20-person family reunion, we have the perfect vessel for your Shasta Lake adventure.
            </p>
          </div>

          <div className="mt-14 space-y-16">
            {houseboats.map((boat, i) => {
              const reverse = i % 2 === 1;
              return (
                <article
                  key={boat.id}
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}
                >
                  <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-border">
                    <img
                      src={boat.heroImages[0]}
                      alt={boat.heroAltTexts[0]}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <Badge variant="secondary" className="rounded-full">{boat.badge}</Badge>
                    <h3 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">{boat.name} Houseboat</h3>
                    <p className="mt-1.5 text-sm font-medium uppercase tracking-wider text-primary">{boat.tagline}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <StatChip icon={Ruler} label={boat.length} />
                      <StatChip icon={Users} label={`Sleeps ${boat.sleeps}`} />
                      <StatChip icon={BedDouble} label={`${boat.staterooms} Staterooms`} />
                      <StatChip icon={Bath} label={`${boat.bathrooms} Baths`} />
                    </div>

                    <p className="mt-5 text-muted-foreground">{boat.description}</p>

                    <p className="mt-5 text-sm">
                      <span className="font-semibold text-foreground">Best for: </span>
                      <span className="text-muted-foreground">{boat.bestFor.join(", ")}.</span>
                    </p>

                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {boat.highlights.slice(0, 8).map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <Button asChild className="rounded-full">
                        <Link
                          to={
                            boat.slug === "queen" ? "/houseboats/queen"
                              : boat.slug === "queen-i" ? "/houseboats/queen-i"
                              : boat.slug === "queen-ii" ? "/houseboats/queen-ii"
                              : "/houseboats/senator"
                          }
                        >
                          Explore the {boat.name}
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="rounded-full">
                        <a href={boat.bookingUrl} target="_blank" rel="noopener noreferrer" data-cta="fleet-card" data-boat-id={boat.slug}>Book Now</a>
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">Amenities & Onboard Features</h2>
          <p className="mt-4 text-muted-foreground">
            Every houseboat at Silverthorn Resort comes loaded with amenities to make your Shasta Lake vacation unforgettable.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">Guest Reviews & Testimonials</h2>
            <p className="mt-4 text-muted-foreground">Hear from families and groups who've experienced unforgettable Shasta Lake houseboat vacations at Silverthorn Resort.</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-sm">
                <div className="flex gap-0.5 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 grow text-sm leading-relaxed text-foreground">"{t.quote}"</blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.boat}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-20 md:py-28">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-muted-foreground">Everything you need to know about renting a houseboat on Shasta Lake at Silverthorn Resort.</p>
        </div>
        <Accordion type="single" collapsible className="mt-10">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FINAL CTA */}
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center md:py-28">
          <Flame className="mx-auto h-8 w-8 opacity-80" />
          <h2 className="mt-4 font-serif text-3xl font-semibold md:text-5xl">Book Your Shasta Lake Houseboat</h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85">
            Summer 2026 dates are filling fast. Reserve your luxury houseboat at Silverthorn Resort today and lock in the best rates for an unforgettable Shasta Lake vacation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" data-cta="final-cta">Check Availability & Book Now</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <a href={`tel:${PHONE}`}><Phone className="mr-1.5 h-4 w-4" />Call {PHONE}</a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-primary-foreground/75">Open 7 days a week, 8am – 4:30pm • Summer until 6pm</p>
        </div>
      </section>

      {/* DIRECTIONS */}
      <section className="mx-auto max-w-5xl px-4 py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">Getting to Silverthorn Resort</h2>
            <p className="mt-4 text-muted-foreground">
              Silverthorn Resort is conveniently located on the Pit River Arm of Shasta Lake, just off Interstate 5 near Lakehead, California — about 15 minutes north of Redding, one of the most accessible marinas on the lake.
            </p>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-foreground">From Redding, CA</dt>
                <dd className="mt-1 text-muted-foreground">Take I-5 north ~15 miles to the Lakeshore Drive exit. Follow Lakeshore Drive east to Silverthorn Resort. Total drive time is roughly 15–20 minutes.</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">From Sacramento</dt>
                <dd className="mt-1 text-muted-foreground">~2.5 hours north on I-5 directly to the Lakehead exit.</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">From the Bay Area</dt>
                <dd className="mt-1 text-muted-foreground">Plan on about 3.5 hours of driving. Nearest airport is Redding Municipal (RDD); larger options are Sacramento (SMF) and San Francisco (SFO).</dd>
              </div>
            </dl>
          </div>
          <Button asChild variant="outline" className="rounded-full lg:mt-2">
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
              <MapPin className="mr-1.5 h-4 w-4" />Get Directions
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
