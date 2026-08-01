import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Dog,
  PawPrint,
  ShieldCheck,
  AlertTriangle,
  LifeBuoy,
  Sun,
  Droplets,
  Backpack,
  Footprints,
  Squirrel,
  ClipboardList,
  Phone,
  Mail,
  Clock,
  Ship,
  Home,
  ArrowRight,
} from "lucide-react";
import { MobileToc, BackToTop } from "@/components/PolicyMobileHelpers";
import heroAsset from "@/assets/pets/pet-hero.webp.asset.json";
import campfireAsset from "@/assets/pets/pet-campfire.webp.asset.json";
import sunglassesAsset from "@/assets/pets/pet-sunglasses.webp.asset.json";
import pontoonAsset from "@/assets/pets/pet-pontoon.webp.asset.json";
import dalmatianAsset from "@/assets/pets/pet-dalmatian.webp.asset.json";
import frenchieRestAsset from "@/assets/pets/pet-frenchie-rest.webp.asset.json";
import frenchieOverlookAsset from "@/assets/pets/pet-frenchie-overlook.webp.asset.json";

const GALLERY: { src: string; alt: string; portrait?: boolean }[] = [
  {
    src: campfireAsset.url,
    alt: "Small white poodle mix in a pink harness by a lakeside campfire next to a Silverthorn houseboat on Shasta Lake",
  },
  {
    src: sunglassesAsset.url,
    alt: "Goldendoodle wearing sunglasses being carried along the Silverthorn Resort dock at sunset on Shasta Lake",
  },
  {
    src: pontoonAsset.url,
    alt: "Sheltie mix in a red harness sitting on a rental pontoon boat near the Shasta Dam bridge on Shasta Lake",
    portrait: true,
  },
  {
    src: dalmatianAsset.url,
    alt: "Dalmatian on a leash walking the boarding ramp at the Silverthorn Resort houseboat marina",
    portrait: true,
  },
  {
    src: frenchieRestAsset.url,
    alt: "Black and white French bulldog resting in the sun on the shaded dock walkway at Silverthorn Resort",
  },
  {
    src: frenchieOverlookAsset.url,
    alt: "Tan French bulldog posing on a stone wall at a Shasta Lake overlook above the Silverthorn Resort marina",
    portrait: true,
  },
];

const NAVY = "#1B2B3A";
const ORANGE = "#E8640A";
const SAND = "#F4EFE6";
const DISPLAY = "'Playfair Display', Georgia, serif";

const PHONE = "800-332-3044";
const EMAIL = "reserve1@houseboats.com";
const SITE = "https://silverthornresort.com";
const url = `${SITE}/pet-policy`;

const title = "Pet Policy — Shasta Lake Houseboats & Cabins | Silverthorn Resort";
const description =
  "Silverthorn Resort pet policy: max 2 dogs per houseboat, 1st dog free, 2nd dog $50 non-refundable, $95/hour excessive cleaning, plus tips for houseboating with your dog.";

type Section = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  body: React.ReactNode;
};

const GUIDELINES = [
  "Dogs are welcome on houseboats and in cabins (no cats or exotic pets)",
  "Maximum 2 dogs per houseboat — 1st dog stays free, 2nd dog is $50.00 (non-refundable)",
  "Pets must be declared at the time of booking",
  "All dogs must be well-behaved and house-trained",
];

const RULES = [
  "Pet owners are responsible for all damage — charged at replacement cost",
  "Pets must not be left unattended on the houseboat",
  "Clean up after your pet at all times — on the boat and on shore",
  "Aggressive breeds or dogs with a bite history are not permitted",
  "Excessive cleaning of pet hair, urine, etc. is charged at $95.00 per hour",
  "Health ordinances do not allow pets inside the marina store",
];

const TIPS: { icon: React.ComponentType<{ className?: string }>; title: string; text: string }[] = [
  {
    icon: LifeBuoy,
    title: "Bring a pet life jacket",
    text: "Even strong swimmers tire quickly in open water. A bright doggie life vest keeps your pet safe and easy to spot.",
  },
  {
    icon: Backpack,
    title: "Pack familiar items",
    text: "Bed, toys, food, bowls, leash and any medications. Familiar things help pets settle into a new environment.",
  },
  {
    icon: Droplets,
    title: "Shade and fresh water",
    text: "Shasta Lake summers are hot. Make sure your dog always has shade and plenty of cool drinking water.",
  },
  {
    icon: Footprints,
    title: "Plan bathroom breaks",
    text: "Set up a spot on the lower deck (a pee pad works well) or plan regular shore stops.",
  },
  {
    icon: Squirrel,
    title: "Watch for wildlife",
    text: "Keep your dog leashed on shore to avoid porcupines, skunks and other Shasta Lake locals.",
  },
  {
    icon: ClipboardList,
    title: "Bring paperwork",
    text: "Carry up-to-date vaccination records in case of an emergency at the vet.",
  },
];

const ESSENTIALS: { title: string; text: string }[] = [
  {
    title: "Food & water",
    text: "Bring more water than you think you'll need. You and your dog will both be in the sun more than usual.",
  },
  {
    title: "Newspapers or a doggie toilet",
    text: "Your dog probably won't get it right every time. Watch for their usual warning signs, accompany them as you would on a walk, and clean up any messes.",
  },
  {
    title: "Doggie snacks",
    text: "Always keep treats handy to reward good behavior on board.",
  },
  {
    title: "A carrier, harness or leash",
    text: "Local leash laws apply even at the dock, and health ordinances do not allow pets in marina stores.",
  },
  {
    title: "A dog ladder or ramp",
    text: "You'll need an easy way for your dog to get out of the water and back on board. A collapsible floating ramp mimics the shoreline and is easier for older or heavier dogs.",
  },
  {
    title: "Proper paperwork",
    text: "Up-to-date papers and vaccination records, just in case.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Are pets allowed on Shasta Lake houseboats?",
    a: "Yes. Silverthorn Resort is a pet-friendly resort. Dogs are welcome on our houseboats and in our cabins — no cats or exotic pets.",
  },
  {
    q: "How much does it cost to bring a pet?",
    a: "The 1st dog stays free. The 2nd dog is a $50.00 non-refundable fee, paid prior to occupancy or boarding.",
  },
  {
    q: "Are there size or breed limits?",
    a: "There is no size limit, but a maximum of 2 dogs per houseboat. Aggressive breeds and dogs with a bite history are not permitted.",
  },
  {
    q: "What rules apply on board?",
    a: "Dogs must be well-behaved and house-trained, must never be left unattended on the houseboat, must be leashed on shore and at the dock, and you must clean up after them at all times.",
  },
  {
    q: "Do I need to declare my pet at booking?",
    a: "Yes. All pets must be declared at the time of booking so we can note them on your reservation.",
  },
  {
    q: "What pet damages or cleaning fees apply?",
    a: "Any excessive cleaning required on departure (pet hair, urine, etc.) is charged to the credit card on file at $95.00 per hour. Any damages are charged at replacement cost.",
  },
];

const SECTIONS: Section[] = [
  {
    id: "pets-allowed",
    title: "Yes — Pets Are Allowed",
    icon: Dog,
    body: (
      <>
        <p>
          Silverthorn Resort and our sister marina, Jones Valley Resort, are pet-friendly. We allow a{" "}
          <strong>maximum of 2 dogs per houseboat</strong> — the <strong>1st dog stays free</strong>, and the{" "}
          <strong>2nd dog is a $50.00 non-refundable fee</strong> paid prior to occupancy/boarding.
        </p>
        <p>
          Any excessive cleaning required upon departure (pet hair, urine, etc.) will be charged to the credit card on
          file at <strong>$95.00 per hour</strong>. Any damages will be charged at <strong>replacement cost</strong>.
        </p>
      </>
    ),
  },
  {
    id: "guidelines",
    title: "Pet Policy Guidelines",
    icon: PawPrint,
    body: (
      <ul className="space-y-2">
        {GUIDELINES.map((g) => (
          <li key={g} className="flex gap-3">
            <PawPrint className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: ORANGE }} aria-hidden="true" />
            <span>{g}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "rules",
    title: "Important Rules",
    icon: ShieldCheck,
    body: (
      <ul className="space-y-2">
        {RULES.map((r) => (
          <li key={r} className="flex gap-3">
            <ShieldCheck className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: ORANGE }} aria-hidden="true" />
            <span>{r}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "tips",
    title: "Tips for Houseboating With Your Dog",
    icon: LifeBuoy,
    body: (
      <div className="grid sm:grid-cols-2 gap-4">
        {TIPS.map(({ icon: Icon, title: t, text }) => (
          <div key={t} className="rounded-xl border p-4" style={{ borderColor: "rgba(27,43,58,0.1)" }}>
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
              style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="font-semibold mb-1" style={{ color: NAVY }}>
              {t}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "hot-surfaces",
    title: "Hot Surface Warning",
    icon: AlertTriangle,
    body: (
      <div className="rounded-xl border-l-4 p-4" style={{ borderColor: ORANGE, backgroundColor: `${ORANGE}0F` }}>
        <p>
          In peak season the dock and parking area get <strong>extremely hot</strong> for paws. Plan accordingly —
          consider booties, carry your dog across hot surfaces, and try to schedule arrivals and departures during
          cooler hours.
        </p>
      </div>
    ),
  },
  {
    id: "essentials",
    title: "A Few Other Things You'll Need",
    icon: Backpack,
    body: (
      <div className="space-y-3">
        {ESSENTIALS.map(({ title: t, text }) => (
          <p key={t}>
            <strong>{t}.</strong> {text}
          </p>
        ))}
        <p>
          Boating with pets takes patience and preparation, but when you and your best friend are out on the water,
          you'll be glad you did it.
        </p>
      </div>
    ),
  },
  {
    id: "faq",
    title: "Pet Policy FAQ",
    icon: ClipboardList,
    body: (
      <div className="space-y-3">
        {FAQS.map(({ q, a }) => (
          <details key={q} className="rounded-xl border bg-white p-4" style={{ borderColor: "rgba(27,43,58,0.1)" }}>
            <summary className="cursor-pointer font-semibold list-none flex items-start gap-2" style={{ color: NAVY }}>
              <PawPrint className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: ORANGE }} aria-hidden="true" />
              <span>{q}</span>
            </summary>
            <p className="mt-3 text-gray-700 leading-relaxed text-[15px]">{a}</p>
          </details>
        ))}
      </div>
    ),
  },
];

const LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      name: title,
      description,
      url,
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Shasta Lake", item: `${SITE}/shasta-lake` },
        { "@type": "ListItem", position: 3, name: "Pet Policy", item: url },
      ],
    },
  ],
};

export const Route = createFileRoute("/pet-policy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: "Pet Policy — Shasta Lake Houseboats & Cabins" },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:image", content: `${SITE}${heroAsset.url}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pet Policy — Shasta Lake Houseboats & Cabins" },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: `${SITE}${heroAsset.url}` },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(LD) }],
  }),
  component: PetPolicyPage,
});

function PetPolicyPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: NAVY }}>
      {/* Hero */}
      <section className="relative isolate overflow-hidden" style={{ backgroundColor: NAVY }}>
        <img
          src={heroAsset.url}
          alt="Two dogs in stars-and-stripes life jackets riding a paddleboard on Shasta Lake with the Silverthorn Resort houseboat marina behind them"
          className="absolute inset-0 w-full h-full object-cover"
          width={1500}
          height={1125}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(105deg, ${NAVY}F2 0%, ${NAVY}D9 45%, rgba(27,43,58,0.55) 100%)`,
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24 text-white">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide mb-4"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            <PawPrint className="w-4 h-4" aria-hidden="true" /> Pet-Friendly Resort
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: DISPLAY }}>
            Pet Policy — Shasta Lake Houseboats &amp; Cabins
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            We love pets! Here's everything you need to know about bringing your furry family members aboard at
            Silverthorn Resort.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:+1${PHONE.replace(/-/g, "")}`}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-12 px-5 py-3 rounded-lg font-semibold"
              style={{ backgroundColor: ORANGE, color: "white" }}
            >
              <Phone className="w-4 h-4" aria-hidden="true" /> Call {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-12 px-5 py-3 rounded-lg font-semibold bg-white/95 hover:bg-white transition-all"
              style={{ color: NAVY }}
            >
              <Mail className="w-4 h-4" aria-hidden="true" /> Email Us
            </a>
          </div>
        </div>
      </section>

      <MobileToc sections={SECTIONS.map((s) => ({ id: s.id, title: s.title }))} />

      {/* Breadcrumb */}
      <div style={{ backgroundColor: SAND }} className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="text-gray-600 hover:opacity-75">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link to="/shasta-lake" className="text-gray-600 hover:opacity-75">
              Shasta Lake
            </Link>
            <span className="text-gray-400">/</span>
            <span className="font-medium" style={{ color: NAVY }}>
              Pet Policy
            </span>
          </nav>
        </div>
      </div>

      {/* Quick reference */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid sm:grid-cols-3 gap-4">
          {[
            { icon: Dog, label: "Dogs per houseboat", value: "Maximum 2", sub: "Dogs only — no cats or exotics" },
            { icon: PawPrint, label: "Pet fees", value: "1st free · 2nd $50", sub: "Non-refundable, paid before boarding" },
            { icon: Sun, label: "Excessive cleaning", value: "$95 / hour", sub: "Damages at replacement cost" },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div
              key={label}
              className="rounded-xl border bg-white p-5 text-center"
              style={{ borderColor: "rgba(27,43,58,0.1)" }}
            >
              <div
                className="mx-auto w-11 h-11 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
              <div className="font-bold text-lg mt-1" style={{ color: NAVY }}>
                {value}
              </div>
              <div className="text-xs text-gray-500 mt-1">{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Content + TOC */}
      <section className="py-8 md:py-14" style={{ backgroundColor: SAND }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[260px_1fr] gap-8">
          <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border bg-white p-4" style={{ borderColor: "rgba(27,43,58,0.1)" }}>
              <div className="flex items-center gap-2 mb-3 px-2">
                <Clock className="w-4 h-4" style={{ color: ORANGE }} aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: NAVY }}>
                  On this page
                </span>
              </div>
              <nav className="flex lg:flex-col gap-1" aria-label="Pet policy sections">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-orange-50"
                    style={{ color: NAVY }}
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="space-y-5">
            {SECTIONS.map(({ id, title: t, icon: Icon, body }) => (
              <article
                key={id}
                id={id}
                className="scroll-mt-24 rounded-2xl border bg-white p-5 sm:p-6 md:p-8"
                style={{ borderColor: "rgba(27,43,58,0.1)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold" style={{ fontFamily: DISPLAY, color: NAVY }}>
                    {t}
                  </h2>
                </div>
                <div className="space-y-3 text-gray-700 leading-relaxed text-[15px] md:text-base">{body}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pet gallery */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide mb-3"
              style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}
            >
              <PawPrint className="w-4 h-4" aria-hidden="true" /> Good boys &amp; girls
            </div>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: DISPLAY, color: NAVY }}>
              Pets of Silverthorn
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-[15px] md:text-base">
              A few of the four-legged guests who have joined their families on Shasta Lake with us.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {GALLERY.map(({ src, alt, portrait }) => (
              <figure
                key={src}
                className="group overflow-hidden rounded-2xl border bg-gray-100"
                style={{ borderColor: "rgba(27,43,58,0.1)" }}
              >
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    portrait ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-14" style={{ backgroundColor: SAND }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center" style={{ fontFamily: DISPLAY, color: NAVY }}>
            Plan the rest of your trip
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { to: "/houseboats", icon: Ship, title: "Luxury Houseboats", desc: "Browse the Queen, Presidential and Senator fleet." },
              { to: "/cabins", icon: Home, title: "Lake Cabins", desc: "Pet-friendly cabins steps from the marina." },
              { to: "/houseboats/policy", icon: ShieldCheck, title: "Rental Policy", desc: "Deposits, cancellation, check-in and check-out." },
            ].map(({ to, icon: Icon, title: t, desc }) => (
              <Link
                key={to}
                to={to}
                className="group rounded-2xl border bg-white p-6 transition-shadow hover:shadow-lg flex flex-col"
                style={{ borderColor: "rgba(27,43,58,0.1)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ fontFamily: DISPLAY, color: NAVY }}>
                  {t}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed flex-1">{desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "var(--lake)" }}>
                  Learn more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14" style={{ backgroundColor: ORANGE, color: "white" }}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: DISPLAY }}>
              Questions about bringing your dog?
            </h2>
            <p className="text-white/90">Our reservation team is happy to help you plan a pet-friendly trip.</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center w-full md:w-auto">
            <a
              href={`tel:+1${PHONE.replace(/-/g, "")}`}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-12 px-6 py-3 rounded-lg bg-white font-semibold"
              style={{ color: NAVY }}
            >
              <Phone className="w-5 h-5" aria-hidden="true" /> Call {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-12 px-6 py-3 rounded-lg font-semibold border-2 border-white text-white"
            >
              <Mail className="w-5 h-5" aria-hidden="true" /> {EMAIL}
            </a>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
