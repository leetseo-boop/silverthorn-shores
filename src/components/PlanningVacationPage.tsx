import { Link } from "@tanstack/react-router";
import {
  Anchor,
  Sailboat,
  Fish,
  Sun,
  Clock,
  ShoppingBag,
  Mountain,
  Binoculars,
  Droplets,
  Building2,
  Info,
  Plane,
  Car,
  Phone,
  Hospital,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import hero from "@/assets/planning/planning-family-packing-hero.jpg";
import welcomeSign from "@/assets/planning/silverthorn-resort-welcome-sign.jpg";
import marinaMarket from "@/assets/planning/silverthorn-marina-market-interior.jpg";
import caverns from "@/assets/planning/lake-shasta-caverns-stalactites.png";
import fishing from "@/assets/planning/houseboat-fishing-shasta-lake.jpg";
import sundial from "@/assets/planning/sundial-bridge-redding-mount-shasta.jpg";
import waterworks from "@/assets/planning/waterworks-park-redding.webp";
import dam from "@/assets/planning/shasta-dam-three-shastas.jpg";
import falls from "@/assets/planning/potem-falls-shasta-waterfall.jpg";
import suntracker from "@/assets/planning/suntracker-pontoon-shasta-lake.jpg";

type Boat = { icon: typeof Anchor; name: string; desc: string };
const BOATS: Boat[] = [
  { icon: Sailboat, name: "Ski Boat", desc: "20′ wakeboard boat — fast, fun and perfect for skiing, wakeboarding or cruising." },
  { icon: Sun, name: "Patio Boat", desc: "8-person with BBQ, ice chest, covered shade and restroom — perfect for touring the lake." },
  { icon: Anchor, name: "Deluxe Patio Boat", desc: "8 person, hard-top shade, BBQ, restroom, ladder for sunbathing and a 130 hp motor." },
  { icon: Fish, name: "Fishing Boat", desc: "14′ Klamath with 8 hp motor — ideal for 2–4 anglers ready to catch fish." },
];

type Activity = { img: string; icon: typeof Anchor; title: string; alt: string; copy: string; phone?: { label: string; tel: string } };
const ACTIVITIES: Activity[] = [
  {
    img: suntracker, alt: "Sun Tracker pontoon boat cruising Shasta Lake with green mountains in the background",
    icon: Sailboat, title: "Boating",
    copy: "Explore 365 miles of shoreline and 40,000 surface acres. Choose from ski boats, patio boats, fishing boats, kayaks and stand-up paddleboards at Silverthorn Resort.",
  },
  {
    img: fishing, alt: "Fishing rod casting toward Shasta Lake from a houseboat deck",
    icon: Fish, title: "Fishing",
    copy: "Rainbow & brown trout, chinook salmon, largemouth, spotted & smallmouth bass, crappie, bluegill, catfish and more. California licenses, bait and tackle available at the Marina Market.",
  },
  {
    img: dam, alt: "Shasta Dam releasing water with Shasta Lake and snow-capped Mount Shasta in the background",
    icon: Building2, title: "Tour Shasta Dam",
    copy: "The second largest dam in the US — 6.5 million cubic yards of concrete. Free guided tours hourly in summer. Meet at the visitor center 15 minutes prior; no cell phones on tour.",
    phone: { label: "Shasta Dam Visitor Center", tel: "+15302754463" },
  },
  {
    img: caverns, alt: "Guided tour exploring stalactites inside Lake Shasta Caverns",
    icon: Mountain, title: "Lake Shasta Caverns",
    copy: "Scenic catamaran ride plus a bus to the cavern entrance, then a one-hour guided walk through one of America's most beautiful caverns. Tours run year-round.",
    phone: { label: "Shasta Caverns", tel: "+18007952283" },
  },
  {
    img: falls, alt: "Potem Falls, a 45-foot waterfall on the Pit River Arm of Shasta Lake",
    icon: Droplets, title: "Potem Falls",
    copy: "A beautiful 45-foot waterfall high up the Pit River Arm. Boat as close to Pit 7 Dam as possible, park on the north side, then hike up the dirt road to the falls.",
  },
  {
    img: welcomeSign, alt: "Pine-framed view of Silverthorn Resort marina on Shasta Lake",
    icon: Binoculars, title: "Bird Watching",
    copy: "Bring binoculars to spot Bald Eagles (we're proud of 22+ nesting pairs), Osprey, Canadian Geese, falcons, turkey vultures and songbirds across the lake.",
  },
];

const REDDING = [
  {
    img: sundial,
    alt: "Sundial Bridge over the Sacramento River in Redding with Mount Shasta at sunset",
    title: "Sundial Bridge & Turtle Bay",
    copy: "World-famous Santiago Calatrava bridge plus Turtle Bay Exploration Park — museum, hands-on exhibits, Paul Bunyan's Forest Camp and a riverside café.",
    phone: { label: "Turtle Bay", tel: "+15302438850" },
  },
  {
    img: waterworks,
    alt: "Waterworks Park, the largest water park in Northern California",
    title: "Waterworks Park",
    copy: "The largest water park in Northern California with new slides and attractions every year — a hit with the kids on a hot Redding afternoon.",
    phone: { label: "Waterworks Park", tel: "+15302469550" },
  },
];

type Contact = { icon: typeof Phone; label: string; tel: string };
const INFO_CENTERS: Contact[] = [
  { icon: Info, label: "Redding Chamber of Commerce", tel: "+15302254433" },
  { icon: Info, label: "Redding Visitors Bureau", tel: "+15302254100" },
  { icon: Info, label: "Shasta Lake Chamber of Commerce", tel: "+15302757497" },
  { icon: Info, label: "Shasta Lake Information Center", tel: "+15302751586" },
];
const TRAVEL: Contact[] = [
  { icon: Plane, label: "Redding Municipal Airport", tel: "+15302244320" },
  { icon: Car, label: "Enterprise Rent-A-Car", tel: "+18007368222" },
  { icon: Car, label: "Hertz Rent-A-Car", tel: "+15302214620" },
  { icon: Car, label: "ABC Taxi Cab", tel: "+15302460577" },
  { icon: Car, label: "Redding Yellow Cab", tel: "+15302221234" },
];
const HOSPITALS: Contact[] = [
  { icon: Hospital, label: "Mercy Medical Center", tel: "+15302256000" },
  { icon: Hospital, label: "Shasta Regional Medical Center", tel: "+15302445400" },
];

function formatTel(tel: string) {
  // +15302254433 -> (530) 225-4433
  const d = tel.replace(/\D/g, "").replace(/^1/, "");
  if (d.length !== 10) return tel;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function PhoneCard({ icon: Icon, label, tel }: Contact) {
  return (
    <a
      href={`tel:${tel}`}
      aria-label={`Call ${label} at ${formatTel(tel)}`}
      className="group flex items-center gap-3 rounded-xl border border-border bg-white p-4 min-h-14 shadow-sm transition hover:shadow-md hover:-translate-y-0.5 hover:border-primary/40"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--sand)] text-[var(--lake)]">
        <Icon size={20} aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-sm font-medium text-[var(--navy)] truncate">{label}</span>
        <span className="text-sm text-muted-foreground group-hover:text-primary">{formatTel(tel)}</span>
      </span>
    </a>
  );
}

export function PlanningVacationPage() {
  return (
    <main className="bg-white text-[var(--navy)]">
      {/* HERO */}
      <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
        <img
          src={hero}
          alt="Family loading kayaks, coolers and beach gear into the car for a Shasta Lake vacation"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/75" />
        <div className="relative z-10 flex h-full items-end">
          <div className="mx-auto w-full max-w-6xl px-6 pb-16 text-white">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm opacity-90">
              <ol className="flex flex-wrap items-center gap-1">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li aria-hidden="true">›</li>
                <li><Link to="/shasta-lake" className="hover:underline">Shasta Lake</Link></li>
                <li aria-hidden="true">›</li>
                <li aria-current="page" className="font-medium">Planning Guide</li>
              </ol>
            </nav>
            <p className="font-display uppercase tracking-[0.3em] text-primary mb-3 text-xs sm:text-sm">
              Silverthorn Resort · Shasta Lake
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight max-w-4xl">
              Planning Your Shasta Lake Vacation
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg opacity-95">
              Boat rentals, marina market hours, can't-miss activities, Redding attractions and every
              local number you might need — all in one guide.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/houseboats">Book a Houseboat <ArrowRight className="ml-1" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/40 hover:bg-white hover:text-[var(--navy)]">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SMALL BOAT RENTALS */}
      <section className="py-20 sm:py-24" aria-labelledby="boats-heading">
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">On the water</p>
            <h2 id="boats-heading" className="font-display text-3xl sm:text-4xl mb-4">Silverthorn Small Boat Rentals</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Get out on the lake your way. Pick from ski boats, patio boats and fishing boats — plus
              kayaks, stand-up paddleboards, tubes, wakeboards, kneeboards and water skis available for rent.
            </p>
            <Button asChild variant="outline">
              <Link to="/small-boats">See the small boat fleet <ArrowRight className="ml-1" /></Link>
            </Button>
          </div>
          <img
            src={welcomeSign}
            alt="Welcome to Silverthorn Resort sign overlooking houseboats on Shasta-Trinity National Forest waters"
            width={1920} height={1440}
            loading="lazy" decoding="async"
            className="rounded-2xl shadow-xl w-full h-[360px] object-cover"
          />
        </div>

        <div className="mx-auto max-w-6xl px-6 mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BOATS.map(({ icon: Icon, name, desc }) => (
            <Card key={name} className="p-6 hover:shadow-lg hover:-translate-y-1 transition rounded-2xl">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--sand)] text-primary mb-4">
                <Icon size={24} aria-hidden="true" />
              </span>
              <h3 className="font-display text-xl mb-2">{name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* MARINA MARKET */}
      <section className="py-20 sm:py-24 bg-[var(--sand)]" aria-labelledby="market-heading">
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <img
            src={marinaMarket}
            alt="Inside the Silverthorn Marina Market and apparel shop with snacks, sunglasses and resort apparel"
            width={1920} height={1080}
            loading="lazy" decoding="async"
            className="rounded-2xl shadow-xl w-full h-[400px] object-cover order-2 lg:order-1"
          />
          <div className="order-1 lg:order-2">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 flex items-center gap-2">
              <ShoppingBag size={14} aria-hidden="true" /> On-site essentials
            </p>
            <h2 id="market-heading" className="font-display text-3xl sm:text-4xl mb-4">Apparel Shop &amp; Marina Market</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Name-brand apparel and gifts, mid-week essentials, fishing accessories, ice, beer, fresh sandwiches
              and our famous pizzas — everything you need without leaving the resort.
            </p>

            <div className="rounded-2xl bg-white p-5 shadow-sm border border-border mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={18} className="text-primary" aria-hidden="true" />
                <h3 className="font-display text-lg">Hours</h3>
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li><strong className="text-[var(--navy)]">Summer:</strong> 8:00 a.m. – 6:30 p.m., 7 days a week</li>
                <li><strong className="text-[var(--navy)]">Off-season:</strong> 8:00 a.m. – 4:30 p.m., 7 days a week</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Reef", "Cielo Rosso", "Von Zipper", "Bait &amp; Tackle", "Ice &amp; Beer", "Fresh Pizza"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[var(--navy)] border border-border"
                  dangerouslySetInnerHTML={{ __html: tag }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THINGS TO DO */}
      <section className="py-20 sm:py-24" aria-labelledby="things-heading">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">While you're here</p>
            <h2 id="things-heading" className="font-display text-3xl sm:text-4xl mb-3">Things to Do on Shasta Lake</h2>
            <p className="text-muted-foreground">
              From hourly Shasta Dam tours to 22+ pairs of nesting bald eagles, there's more to do than one trip can fit.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACTIVITIES.map(({ img, alt, icon: Icon, title, copy, phone }) => (
              <Card key={title} className="overflow-hidden rounded-2xl hover:shadow-xl hover:-translate-y-1 transition p-0">
                <div className="relative h-52 overflow-hidden">
                  <img src={img} alt={alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                  <span className="absolute top-3 left-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-primary shadow">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{copy}</p>
                  {phone && (
                    <a
                      href={`tel:${phone.tel}`}
                      aria-label={`Call ${phone.label} at ${formatTel(phone.tel)}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <Phone size={14} aria-hidden="true" />
                      {phone.label}: {formatTel(phone.tel)}
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* REDDING ATTRACTIONS */}
      <section className="py-20 sm:py-24 bg-[var(--sand)]" aria-labelledby="redding-heading">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 flex items-center justify-center gap-2">
              <MapPin size={14} aria-hidden="true" /> 30 minutes from the resort
            </p>
            <h2 id="redding-heading" className="font-display text-3xl sm:text-4xl mb-3">Redding Attractions</h2>
            <p className="text-muted-foreground">Two iconic stops that round out any Shasta Lake vacation.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {REDDING.map(({ img, alt, title, copy, phone }) => (
              <Card key={title} className="overflow-hidden rounded-2xl hover:shadow-xl transition p-0">
                <img src={img} alt={alt} className="h-72 w-full object-cover" loading="lazy" decoding="async" />
                <div className="p-7">
                  <h3 className="font-display text-2xl mb-3">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{copy}</p>
                  <a
                    href={`tel:${phone.tel}`}
                    aria-label={`Call ${phone.label} at ${formatTel(phone.tel)}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <Phone size={14} aria-hidden="true" />
                    {phone.label}: {formatTel(phone.tel)}
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* INFO & SERVICES */}
      <section className="py-20 sm:py-24" aria-labelledby="info-heading">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Save these numbers</p>
            <h2 id="info-heading" className="font-display text-3xl sm:text-4xl mb-3">Information &amp; Services</h2>
            <p className="text-muted-foreground">Tap any card to call directly from your phone.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div>
              <h3 className="font-display text-xl mb-4 flex items-center gap-2">
                <Info size={20} className="text-primary" aria-hidden="true" /> Information Centers
              </h3>
              <div className="space-y-3">
                {INFO_CENTERS.map((c) => <PhoneCard key={c.label} {...c} />)}
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl mb-4 flex items-center gap-2">
                <Plane size={20} className="text-primary" aria-hidden="true" /> Travel &amp; Transport
              </h3>
              <div className="space-y-3">
                {TRAVEL.map((c) => <PhoneCard key={c.label} {...c} />)}
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl mb-4 flex items-center gap-2">
                <Hospital size={20} className="text-primary" aria-hidden="true" /> Hospitals
              </h3>
              <div className="space-y-3">
                {HOSPITALS.map((c) => <PhoneCard key={c.label} {...c} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[var(--navy)] text-white py-20 sm:py-24" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 id="cta-heading" className="font-display text-3xl sm:text-5xl mb-4">Ready to plan your trip?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Lock in your dates on a Silverthorn houseboat or get in touch with our team for help building the
            perfect Shasta Lake itinerary.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/houseboats">Book a Houseboat <ArrowRight className="ml-1" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white hover:text-[var(--navy)]">
              <Link to="/contact">Contact Silverthorn</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PlanningVacationPage;
