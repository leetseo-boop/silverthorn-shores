import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  BedDouble,
  Utensils,
  Tv,
  Flame,
  Bath,
  Anchor,
  Trees,
  Phone,
  ExternalLink,
  MapPin,
  Accessibility,
  Waves,
  Calendar,
  Sparkles,
} from "lucide-react";
import resortMap from "@/assets/silverthorn-resort-map.png";
import cabin1Img from "@/assets/cabin-1.jpg";
import cabin2Img from "@/assets/cabin-2.jpg";
import cabin3Img from "@/assets/cabin-3.jpg";
import cabin4Img from "@/assets/cabin-4.jpg";
import cabin5Img from "@/assets/cabin-5.jpg";
import cabin6Img from "@/assets/cabin-6.jpg";
import cabin7Img from "@/assets/cabin-7.jpg";
import cabin8Img from "@/assets/cabin-8.jpg";

const BOOKING_ALL = "https://rentals.silverthornresort.com/category/9";
const PHONE = "800-332-3044";

type Cabin = {
  id: number;
  name: string;
  type: string;
  sleeps: number;
  beds: string;
  highlights: string;
  description: string;
  weekly?: string;
  threeNight?: string;
  url?: string;
  unavailable?: boolean;
  accessible?: boolean;
  badge?: string;
  image?: string;
  imageAlt?: string;
};

const CABINS: Cabin[] = [
  {
    id: 1,
    name: "Cabin #1",
    type: "Studio",
    sleeps: 4,
    beds: "Full-size double bed + sofa sleeper",
    highlights: "Full kitchen · Full bath · Outdoor BBQ · DirecTV",
    description:
      "A cozy lakeside studio just steps from the marina. Fully equipped kitchen, comfortable double bed, sofa sleeper, full bathroom, and an outside BBQ for evenings under the pines.",
    weekly: "$1,514.84",
    threeNight: "$649.22",
    url: "https://rentals.silverthornresort.com/details/30",
    image: cabin1Img,
    imageAlt: "Cabin 1 interior at Silverthorn Resort — knotty pine walls, dining table with chairs, futon sofa, and full kitchen counter in a cozy Shasta Lake studio cabin",
  },
  {
    id: 2,
    name: "Cabin #2",
    type: "Two-Bedroom",
    sleeps: 6,
    beds: "2 bedrooms, each with double beds, plus futon sleeper",
    highlights: "Full kitchen · Full bath · Outdoor BBQ · DirecTV",
    description:
      "Our two-bedroom Shasta Lake cabin sleeps six comfortably with two private bedrooms, a futon sleeper, full kitchen, full bathroom, and a gas BBQ — perfect for small families and friends bringing their own boat.",
    weekly: "$2,316.34",
    threeNight: "$992.72",
    url: "https://rentals.silverthornresort.com/details/31",
    badge: "Family Favorite",
    image: cabin2Img,
    imageAlt: "Cabin 2 bedroom at Silverthorn Resort — wood-beam ceiling, bunk bed with bear-print quilts and a double bed in a two-bedroom Shasta Lake family cabin",
  },
  {
    id: 3,
    name: "Cabin #3",
    type: "Accessible Studio",
    sleeps: 5,
    beds: "Full-size bed + double/single bunk",
    highlights: "ADA accessible · Full kitchen · Full bath · BBQ · DirecTV",
    description:
      "Our handicapped-accessible studio cabin features a full-size bed and a double/single bunk, a fully accessible bathroom, full kitchen, and outside BBQ — sleeps up to five.",
    weekly: "$1,514.84",
    threeNight: "$649.22",
    url: "https://rentals.silverthornresort.com/details/32",
    accessible: true,
    image: cabin3Img,
    imageAlt: "Cabin 3 kitchen and dining area at Silverthorn Resort — full-size refrigerator, electric range, microwave and round dining table in an ADA-accessible Shasta Lake studio cabin",
  },
  {
    id: 4,
    name: "Cabin #4",
    type: "One-Bedroom",
    sleeps: 4,
    beds: "Full-size bed + sofa sleeper",
    highlights: "Private bedroom · Full kitchen · Full bath · BBQ · DirecTV",
    description:
      "A cozy one-bedroom cabin tucked into the pines with a private bedroom, sofa sleeper, fully equipped kitchen, full bath, and outdoor BBQ — a quiet retreat just a short walk from the dock.",
    weekly: "$1,755.29",
    threeNight: "$752.27",
    url: "https://rentals.silverthornresort.com/details/33",
    image: cabin4Img,
    imageAlt: "Cabin 4 living area at Silverthorn Resort — wood-beam ceiling, double bed, green futon sofa, dining set and forest views in a one-bedroom Shasta Lake cabin",
  },
  {
    id: 5,
    name: "Cabin #5",
    type: "Studio",
    sleeps: 4,
    beds: "Double bed + sofa sleeper",
    highlights: "Full kitchen · Full bath · Outdoor BBQ · DirecTV",
    description:
      "A bright, comfortable studio cabin with double bed, sofa sleeper, full kitchen, full bath, and outside BBQ — ideal for couples or a small family weekend on Shasta Lake.",
    weekly: "$1,514.84",
    threeNight: "$649.22",
    url: "https://rentals.silverthornresort.com/details/34",
    image: cabin5Img,
    imageAlt: "Cabin 5 studio interior at Silverthorn Resort — bright open layout with double bed, futon sofa and dining table in a Shasta Lake lakeside studio cabin",
  },
  {
    id: 6,
    name: "Cabin #6",
    type: "Studio",
    sleeps: 4,
    beds: "Double bed + sofa sleeper",
    highlights: "Secluded · Forest views · Quiet end unit",
    description:
      "A quiet end unit with secluded forest views, a short walk to the lake. Currently unavailable for booking.",
    unavailable: true,
    image: cabin6Img,
    imageAlt: "Dusk view from the Silverthorn Resort cabins — tall pines framing Shasta Lake at twilight with the marina and houseboats below",
  },
  {
    id: 7,
    name: "Cabin #7",
    type: "One-Bedroom · Lake View",
    sleeps: 4,
    beds: "Two double beds + sofa",
    highlights: "Second deck · Trinity Forest & Shasta Lake views · BBQ",
    description:
      "Our second-deck one-bedroom cabin delivers stunning views of the Trinity Forest and Shasta Lake from the moment you step onto the deck. Two double beds, sofa, full kitchen, full bath, and outside BBQ.",
    weekly: "$1,835.44",
    threeNight: "$786.62",
    url: "https://rentals.silverthornresort.com/details/36",
    badge: "Best View",
    image: cabin7Img,
    imageAlt: "Cabin 7 second-deck living room at Silverthorn Resort — daybed with trundle, pine paneling and sliding glass door opening to a private balcony with Shasta Lake and Trinity Forest views",
  },
  {
    id: 8,
    name: "Cabin #8",
    type: "Family Cabin · Two-Bedroom",
    sleeps: 8,
    beds: "Queen bed, full bed, two futon sleepers",
    highlights: "Wood stove · Jacuzzi tub · 2nd-story deck · Large kitchen",
    description:
      "Our largest family cabin sleeps up to eight with a queen bed, full bed, and two futon sleepers. Wood stove, Jacuzzi tub, a large kitchen, big-screen DirecTV, and a 2nd-story deck with BBQ and breathtaking views of Shasta Lake.",
    weekly: "$2,316.34",
    threeNight: "$992.72",
    url: "https://rentals.silverthornresort.com/details/37",
    badge: "Largest · Sleeps 8",
    image: cabin8Img,
    imageAlt: "Cabin 8 great room at Silverthorn Resort — wood-burning stove with brick hearth, daybed, futon, dining table and full kitchen in a spacious two-bedroom Shasta Lake family cabin sleeping 8",
  },
];

const FAQS = [
  {
    q: "Is a boat slip included with each cabin rental?",
    a: "Yes — one boat slip is included with every cabin rental at Silverthorn Resort, so you can bring your own boat right up to the dock. Additional slips can be reserved based on availability.",
  },
  {
    q: "Can I bring my own boat to Shasta Lake?",
    a: "Absolutely. Silverthorn Resort has a private boat ramp, courtesy dock, fuel dock, and pro shop on the main dock. Each cabin rental includes one complimentary slip for the duration of your stay.",
  },
  {
    q: "What is the minimum stay for a Shasta Lake cabin?",
    a: "Off-season the minimum stay is 3 nights. During peak high season (June 11 – August 19, 2026) we book by the week only — 7-night minimum.",
  },
  {
    q: "Are pets allowed in the cabins?",
    a: "Please call us at 800-332-3044 to discuss pet policies and availability before booking, as restrictions vary by unit.",
  },
  {
    q: "Is there an ADA-accessible cabin?",
    a: "Yes — Cabin #3 is our handicapped-accessible studio with a full kitchen, accessible bathroom, full-size bed, and double/single bunk. It sleeps up to five.",
  },
  {
    q: "What's included in the cabin rate?",
    a: "Rates include all mandatory booking fees and 10% occupancy taxes. Each cabin comes fully equipped with a full kitchen, full bathroom, DirecTV, outdoor BBQ, and one boat slip.",
  },
];

const AMENITIES = [
  { icon: Utensils, label: "Full kitchen" },
  { icon: Bath, label: "Full bathroom" },
  { icon: Tv, label: "DirecTV / DVD" },
  { icon: Flame, label: "Outdoor BBQ" },
  { icon: BedDouble, label: "Linens provided" },
  { icon: Anchor, label: "1 boat slip included" },
  { icon: Trees, label: "Forest setting" },
  { icon: Waves, label: "Steps to marina" },
];

const SITE = "https://silver-shasta-dreams.lovable.app";
const PAGE_URL = `${SITE}/cabins`;
const OG_IMAGE = `${SITE}${cabin8Img}`;
const PAGE_TITLE = "Shasta Lake Cabin Rentals | Silverthorn Resort Lakeside Cabins";
const PAGE_DESC =
  "8 lakeside cabins on Shasta Lake sleeping 4–8. Full kitchens, BBQs, DirecTV, one boat slip per cabin. Bring your own boat or rent at the marina.";

export const Route = createFileRoute("/cabins")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "Shasta Lake cabins, Silverthorn cabins, lake cabins, Shasta Lake lodging, cabin rentals Shasta Lake, family cabin rentals, bring your own boat, lakeside cabin rentals California",
      },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: "Silverthorn Resort Cabins",
          description: PAGE_DESC,
          url: "/cabins",
          telephone: "+1-800-332-3044",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            addressRegion: "CA",
            addressLocality: "Shasta Lake",
            addressCountry: "US",
          },
          amenityFeature: AMENITIES.map((a) => ({
            "@type": "LocationFeatureSpecification",
            name: a.label,
            value: true,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Cabins", item: "/cabins" },
          ],
        }),
      },
    ],
  }),
  component: CabinsPage,
});

function CabinsPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Header */}
      <section className="bg-[var(--sand)] border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-4">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Cabins</span>
          </nav>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ color: "var(--navy)" }}
          >
            Shasta Lake Cabins at Silverthorn Resort
          </h1>
          <p className="mt-4 max-w-3xl text-base sm:text-lg text-muted-foreground">
            Eight lakeside cabins nestled in the pines — studios sleeping 4 up to a two-bedroom family
            cabin sleeping 8. Full kitchens, gas BBQs, DirecTV, and a complimentary boat slip with
            every cabin. Bring your own boat or rent one of ours and step right onto the dock.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={BOOKING_ALL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Check availability <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={`tel:${PHONE.replace(/-/g, "")}`}
              className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-5 py-3 text-sm font-semibold hover:bg-accent hover:text-accent-foreground"
            >
              <Phone className="h-4 w-4" /> Call {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Resort Map */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5" style={{ color: "var(--lake)" }} />
            <h2 className="text-xl sm:text-2xl font-semibold" style={{ color: "var(--navy)" }}>
              Find your cabin — Silverthorn Resort area map
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5 max-w-3xl">
            Cabin locations <strong>C1–C8</strong> are marked on the map. Tap a cabin chip below to
            jump to its details. Cabins are a short stroll from the main dock, fuel, pro shop, and
            boat ramp.
          </p>
          <figure className="rounded-xl overflow-hidden border border-border bg-white">
            <img
              src={resortMap}
              alt="Silverthorn Resort map 2026 Shasta Lake"
              loading="lazy"
              decoding="async"
              width={1740}
              height={920}
              className="w-full h-auto"
            />
            <figcaption className="text-xs text-muted-foreground p-3 border-t border-border">
              Silverthorn Resort, Shasta Lake — cabin locations C1–C8.
            </figcaption>
          </figure>

          {/* Legend chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {CABINS.map((c) =>
              c.unavailable ? (
                <span
                  key={c.id}
                  aria-disabled="true"
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground line-through"
                  title="Currently unavailable"
                >
                  C{c.id}
                </span>
              ) : (
                <a
                  key={c.id}
                  href={`#cabin-${c.id}`}
                  className="inline-flex items-center gap-1 rounded-full border border-input bg-background px-3 py-1.5 text-xs font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                >
                  C{c.id} · {c.type.split(" · ")[0]}
                </a>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4 text-base leading-relaxed text-foreground/90">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--navy)" }}>
              About our Shasta Lake cabins
            </h2>
            <p>
              Nestled in the pines on the shores of Shasta Lake, Silverthorn Resort cabins are ideal
              for the perfect family getaway, fishing trip, or reunion. There are{" "}
              <strong>eight cabins</strong> ranging from cozy studios that sleep 4 up to two-bedroom
              units that sleep up to 8. We also have a{" "}
              <strong>handicapped-accessible unit</strong> — Cabin #3 — please ask for details.
            </p>
            <p>
              Each cabin offers a cozy, rustic atmosphere with{" "}
              <strong>full kitchens, private bathrooms, patios or decks, gas barbecues, DirecTV</strong>{" "}
              and more. Our cabins are a short stroll from our marina, where you'll find fuel, the
              pro shop, a courtesy dock, and the boat ramp.
            </p>
            <p>
              During your stay, plan a lake adventure aboard one of our{" "}
              <Link to="/small-boats" className="text-[var(--lake)] underline underline-offset-2 hover:no-underline">
                patio boats or wakeboard boats
              </Link>
              , explore the houseboating lifestyle on our{" "}
              <Link to="/houseboats" className="text-[var(--lake)] underline underline-offset-2 hover:no-underline">
                luxury houseboats
              </Link>
              , or grab supplies and tackle at the{" "}
              <Link to="/pro-shop" className="text-[var(--lake)] underline underline-offset-2 hover:no-underline">
                Silverthorn Pro Shop
              </Link>
              . <strong>One boat slip is included</strong> with every cabin rental — additional slips
              can be provided based on availability.
            </p>
          </div>

          <aside className="rounded-xl border border-border bg-[var(--sand)] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5" style={{ color: "var(--primary)" }} />
              <h3 className="font-semibold" style={{ color: "var(--navy)" }}>
                2026 stay minimums
              </h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <div className="font-semibold">High Season</div>
                <div className="text-muted-foreground">
                  June 11 – August 19, 2026 · Weekly rentals only (7-night minimum)
                </div>
              </li>
              <li>
                <div className="font-semibold">Off-Season</div>
                <div className="text-muted-foreground">3-night minimum stay</div>
              </li>
              <li className="pt-3 border-t border-border text-xs text-muted-foreground">
                Rates include all mandatory booking fees and 10% occupancy taxes. See{" "}
                <Link to="/houseboats/policy" className="underline">
                  rental policies
                </Link>
                .
              </li>
            </ul>
          </aside>
        </div>
      </section>

      {/* Cabin Cards */}
      <section className="border-b border-border bg-[var(--sand)]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--navy)" }}>
                Choose your cabin
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Starting rates include all mandatory booking fees and taxes.
              </p>
            </div>
            <a
              href={BOOKING_ALL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[var(--lake)] hover:underline inline-flex items-center gap-1"
            >
              View all availability <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {CABINS.map((cabin) => (
              <CabinCard key={cabin.id} cabin={cabin} />
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: "var(--navy)" }}>
            Cabin amenities at a glance
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {AMENITIES.map((a) => (
              <div
                key={a.label}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
              >
                <a.icon className="h-5 w-5 flex-shrink-0" style={{ color: "var(--lake)" }} />
                <span className="text-sm font-medium">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="border-b border-border bg-[var(--sand)]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid lg:grid-cols-2 gap-10">
          <article className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--lake)]">
              <Anchor className="h-4 w-4" /> Bring your own boat
            </div>
            <h2 className="text-2xl font-bold" style={{ color: "var(--navy)" }}>
              The easiest lake cabin if you're towing
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              Every Silverthorn cabin rental includes <strong>one complimentary boat slip</strong> at
              our private marina, so you can pull right in after launching at our on-site boat ramp.
              You'll find a courtesy dock, fuel dock, restrooms, and a fully stocked pro shop steps
              from your cabin door. Need an extra slip for a second boat or jet ski? Just ask — we
              accommodate based on availability.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              No boat of your own? Pair your stay with one of our{" "}
              <Link to="/small-boats" className="text-[var(--lake)] underline">
                patio boats, fishing boats, or wakeboard boats
              </Link>{" "}
              and have it waiting at the dock when you arrive.
            </p>
          </article>

          <article className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--lake)]">
              <Users className="h-4 w-4" /> Family reunions & groups
            </div>
            <h2 className="text-2xl font-bold" style={{ color: "var(--navy)" }}>
              Combine cabins for the whole family
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              Planning a Shasta Lake family reunion or friends' trip? Book multiple cabins side-by-side
              and take over the grassy tree trail, picnic area, and beach. Cabin #8 alone sleeps eight
              with a Jacuzzi tub and 2nd-story deck — combine with Cabin #2 (sleeps 6) and Cabin #7
              (sleeps 4) and you've got an 18-person base camp on the lake.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              Call <a href={`tel:${PHONE.replace(/-/g, "")}`} className="text-[var(--lake)] underline">{PHONE}</a>{" "}
              to coordinate dates, slips, and group rates.
            </p>
          </article>

          <article className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--lake)]">
              <Trees className="h-4 w-4" /> What's nearby
            </div>
            <h2 className="text-2xl font-bold" style={{ color: "var(--navy)" }}>
              Shasta Lake & the Trinity Forest
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              Silverthorn sits on a quiet arm of <strong>Shasta Lake</strong> — California's largest
              reservoir — surrounded by the Shasta-Trinity National Forest. World-class fishing for
              trout, bass, and salmon is right out front. Swim from our beach, waterski and wakeboard
              the calm morning water, or cruise the 365 miles of shoreline. Lassen Volcanic National
              Park, Shasta Caverns, and Mt. Shasta are all easy day trips.
            </p>
          </article>

          <article className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--lake)]">
              <Sparkles className="h-4 w-4" /> Why choose Silverthorn
            </div>
            <h2 className="text-2xl font-bold" style={{ color: "var(--navy)" }}>
              Lake cabins built for the way families actually vacation
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              Full kitchens mean no nightly restaurant bill. Gas BBQs on every cabin. DirecTV for rainy
              afternoons. Linens provided. An ADA-accessible unit. A private dock, fuel, ramp, and pro
              shop all on-site. And a quiet pine-shaded setting that puts you a one-minute walk from
              your boat. It's why families come back year after year.
            </p>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: "var(--navy)" }}>
            Shasta Lake cabin FAQs
          </h2>
          <dl className="space-y-5">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-lg border border-border bg-card p-5">
                <dt className="font-semibold mb-2" style={{ color: "var(--navy)" }}>
                  {f.q}
                </dt>
                <dd className="text-sm text-foreground/85 leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ backgroundColor: "var(--navy)" }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Plan your Shasta Lake getaway</h2>
          <p className="mt-3 text-white/80 max-w-2xl mx-auto">
            Book a cabin, bring your boat (we'll save you a slip), and unplug in the pines.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={BOOKING_ALL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Book a cabin <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={`tel:${PHONE.replace(/-/g, "")}`}
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function CabinCard({ cabin }: { cabin: Cabin }) {
  const unavailable = cabin.unavailable;
  return (
    <article
      id={`cabin-${cabin.id}`}
      aria-labelledby={`cabin-${cabin.id}-title`}
      aria-disabled={unavailable || undefined}
      className={`group flex flex-col rounded-xl overflow-hidden border border-border bg-card shadow-sm transition-shadow scroll-mt-24 ${
        unavailable ? "opacity-75" : "hover:shadow-lg"
      }`}
    >
      {/* Image slot */}
      <div
        className={`relative aspect-[3/2] w-full overflow-hidden bg-gradient-to-br from-[var(--lake)]/15 to-[var(--navy)]/25 flex items-center justify-center ${
          unavailable ? "grayscale" : ""
        }`}
      >
        {cabin.image ? (
          <img
            src={cabin.image}
            alt={cabin.imageAlt ?? `${cabin.name} — ${cabin.type} cabin at Silverthorn Resort on Shasta Lake`}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            loading="lazy"
            decoding="async"
            width={1600}
            height={1067}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <div className="text-center text-[var(--navy)]/40 px-4">
            <BedDouble className="h-10 w-10 mx-auto mb-2" />
            <div className="text-xs font-semibold uppercase tracking-wider">
              {cabin.name} photo
            </div>
          </div>
        )}

        {/* Location pin badge */}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-[var(--navy)] shadow">
          <MapPin className="h-3 w-3" style={{ color: "var(--primary)" }} />
          C{cabin.id}
        </span>

        {cabin.badge && !unavailable && (
          <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground shadow">
            {cabin.badge}
          </span>
        )}

        {unavailable && (
          <>
            <div className="absolute inset-0 bg-black/45 pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[140%] -rotate-12 bg-destructive/95 py-2.5 text-center text-white shadow-lg ring-2 ring-white/70">
                <span className="block text-lg sm:text-2xl font-extrabold uppercase tracking-[0.2em]">
                  Currently Unavailable
                </span>
              </div>
            </div>
          </>
        )}

        {cabin.accessible && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-[var(--lake)] px-2.5 py-1 text-xs font-bold text-white shadow">
            <Accessibility className="h-3 w-3" /> ADA accessible
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 id={`cabin-${cabin.id}-title`} className="text-lg font-bold" style={{ color: "var(--navy)" }}>
            {cabin.name}
          </h3>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
            <Users className="h-3.5 w-3.5" /> Sleeps {cabin.sleeps}
          </span>
        </div>
        <div className="text-sm font-medium text-[var(--lake)] mt-0.5">{cabin.type}</div>

        <p className="text-sm text-foreground/80 mt-3 leading-relaxed line-clamp-3 min-h-[60px]">{cabin.description}</p>

        <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground min-h-[60px]">
          <li className="flex items-start gap-2">
            <BedDouble className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
            <span>{cabin.beds}</span>
          </li>
          <li className="flex items-start gap-2">
            <Sparkles className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
            <span>{cabin.highlights}</span>
          </li>
        </ul>

        <div className="mt-auto pt-5">
          {!unavailable && (cabin.weekly || cabin.threeNight) ? (
            <div className="grid grid-cols-2 gap-3 rounded-lg bg-[var(--sand)] p-3">
              {cabin.weekly && (
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Starting weekly
                  </div>
                  <div className="text-sm font-bold" style={{ color: "var(--navy)" }}>
                    {cabin.weekly}
                  </div>
                </div>
              )}
              {cabin.threeNight && (
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    3-night min
                  </div>
                  <div className="text-sm font-bold" style={{ color: "var(--navy)" }}>
                    {cabin.threeNight}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-lg bg-muted/50 p-3 text-center text-xs font-medium text-muted-foreground">
              Rates unavailable
            </div>
          )}

          <div className="mt-5 pt-4 border-t border-border">
            {unavailable ? (
              <button
                type="button"
                disabled
                className="w-full inline-flex items-center justify-center rounded-md bg-muted px-4 py-2.5 text-sm font-semibold text-muted-foreground cursor-not-allowed"
              >
                Currently unavailable
              </button>
            ) : (
              <a
                href={cabin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Book Cabin #{cabin.id} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
