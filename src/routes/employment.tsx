import { createFileRoute } from "@tanstack/react-router";
import { HardHat, Wrench, CalendarClock, MapPin, Clock, FileText, Download, ExternalLink, ShieldCheck, Briefcase } from "lucide-react";
import applicationPdf from "@/assets/employment/str-application.pdf.asset.json";

const NAVY = "#1B2B3A";
const ORANGE = "#E8640A";
const SAND = "#F4EFE6";
const DISPLAY = "'Playfair Display', Georgia, serif";

const SITE = "https://silverthornresort.com";
const URL = `${SITE}/employment`;
const TITLE = "Employment | Silverthorn Resort Marina on Shasta Lake";
const DESCRIPTION =
  "Join the Silverthorn Resort Marina team on beautiful Shasta Lake. Year-round houseboat maintenance & marine mechanic roles plus seasonal positions. Download our employment application.";

const yearRound = [
  {
    title: "Houseboat Maintenance",
    icon: HardHat,
    desc: "Experience in minor construction, finish work, painting, plumbing, electrical, etc. Full-time, year-round position with benefits.",
  },
  {
    title: "Marine Mechanic",
    icon: Wrench,
    desc: "Experienced with maintaining marine engines on large and small boats. Full-time, year-round position with benefits.",
  },
];

const seasonal = [
  "Houseboat Cleaners",
  "Maintenance",
  "Mechanics",
  "Retail Clerks",
  "Service Crew",
];

const jobPostings = yearRound.map((r) => ({
  "@type": "JobPosting",
  title: r.title,
  description: r.desc,
  employmentType: "FULL_TIME",
  datePosted: "2026-01-01",
  hiringOrganization: {
    "@type": "Organization",
    name: "Silverthorn Resort Marina",
    sameAs: SITE,
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      streetAddress: "16250 Silverthorn Rd",
      addressLocality: "Redding",
      addressRegion: "CA",
      postalCode: "96003",
      addressCountry: "US",
    },
  },
}));

const ldGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": URL,
      url: URL,
      name: TITLE,
      description: DESCRIPTION,
    },
    ...jobPostings,
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Employment", item: URL },
      ],
    },
  ],
};

export const Route = createFileRoute("/employment")({
  component: EmploymentPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(ldGraph) }],
  }),
});

function EmploymentPage() {
  const pdfKB = Math.round(applicationPdf.size / 1024);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: NAVY }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: SAND }} className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap" aria-label="Breadcrumb">
            <a href="/" className="text-gray-600 hover:opacity-75">Home</a>
            <span className="text-gray-400">/</span>
            <span className="font-medium" style={{ color: NAVY }}>Employment</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0f1e2b 100%)` }}>
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
            style={{ backgroundColor: ORANGE, color: "white" }}>
            <Briefcase className="w-3.5 h-3.5" /> Join Our Team
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight text-white mb-4" style={{ fontFamily: DISPLAY }}>
            Employment @ Silverthorn Resort Marina
          </h1>
          <p className="text-lg text-white/85 max-w-2xl mx-auto mb-2 font-semibold">
            Looking for a change of scenery?
          </p>
          <p className="text-base text-white/75 max-w-2xl mx-auto">
            Consider working on beautiful Shasta Lake. We have the following employment opportunities available.
          </p>
        </div>
      </section>

      {/* Year-round positions */}
      <section className="py-14 md:py-20" style={{ backgroundColor: SAND }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: ORANGE }}>
              Year-Round · With Benefits
            </div>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: DISPLAY, color: NAVY }}>
              Full-Time Openings
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {yearRound.map((r) => (
              <article
                key={r.title}
                className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-shadow p-6 md:p-8 flex flex-col"
                style={{ borderColor: "rgba(27,43,58,0.1)" }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}
                >
                  <r.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 leading-snug" style={{ color: NAVY, fontFamily: DISPLAY }}>
                  {r.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-5 flex-1">{r.desc}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: `${NAVY}12`, color: NAVY }}>
                    Full-Time
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: `${NAVY}12`, color: NAVY }}>
                    Year-Round
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}>
                    Benefits
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8 items-start">
            <div className="md:col-span-2">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}
              >
                <CalendarClock className="w-7 h-7" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: ORANGE }}>
                Starts Recruiting March 15
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: DISPLAY, color: NAVY }}>
                Seasonal Positions
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Silverthorn Resort begins recruiting for seasonal roles each spring. Great fit for students, hospitality pros, and anyone who loves the lake.
              </p>
            </div>
            <div className="md:col-span-3">
              <ul className="grid sm:grid-cols-2 gap-3">
                {seasonal.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg border"
                    style={{ borderColor: "rgba(27,43,58,0.1)", backgroundColor: SAND }}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: ORANGE }}
                    />
                    <span className="text-sm md:text-base font-medium" style={{ color: NAVY }}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section className="py-14 md:py-20" style={{ backgroundColor: SAND }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: ORANGE }}>
              How to Apply
            </div>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: DISPLAY, color: NAVY }}>
              Visit Our Office
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl border p-6 flex items-start gap-4" style={{ borderColor: "rgba(27,43,58,0.1)" }}>
              <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}>
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs uppercase font-semibold tracking-wider text-gray-500 mb-1">Address</div>
                <div className="font-semibold" style={{ color: NAVY }}>16250 Silverthorn Rd</div>
                <div className="text-sm text-gray-600">Redding, CA 96003</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border p-6 flex items-start gap-4" style={{ borderColor: "rgba(27,43,58,0.1)" }}>
              <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}>
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs uppercase font-semibold tracking-wider text-gray-500 mb-1">Business Hours</div>
                <div className="font-semibold" style={{ color: NAVY }}>8:00 AM – 4:30 PM</div>
                <div className="text-sm text-gray-600">Daily</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border p-6 flex items-start gap-4" style={{ borderColor: "rgba(27,43,58,0.1)" }}>
              <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}>
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs uppercase font-semibold tracking-wider text-gray-500 mb-1">Application</div>
                <div className="font-semibold" style={{ color: NAVY }}>PDF · {pdfKB} KB</div>
                <div className="text-sm text-gray-600">Complete before your visit</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border p-6 md:p-8 text-center" style={{ borderColor: "rgba(27,43,58,0.1)" }}>
            <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: DISPLAY, color: NAVY }}>
              Download the Employment Application
            </h3>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto text-sm md:text-base">
              Please complete and bring the application with you when you visit our office.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={applicationPdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all"
                style={{ backgroundColor: ORANGE }}
              >
                <ExternalLink className="w-5 h-5" /> Open Application
              </a>
              <a
                href={applicationPdf.url}
                download="STR-Application-Full.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 transition-all hover:bg-gray-50"
                style={{ color: NAVY, borderColor: NAVY }}
              >
                <Download className="w-5 h-5" /> Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* EEO */}
      <section className="py-10 bg-white border-t" style={{ borderColor: "rgba(27,43,58,0.08)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-start gap-4 p-5 rounded-xl" style={{ backgroundColor: `${NAVY}08` }}>
            <ShieldCheck className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: ORANGE }} />
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              <strong style={{ color: NAVY }}>Silverthorn Resort is an Equal Opportunity Employer and a Drug-Free Company.</strong>{" "}
              Drug testing is required.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
