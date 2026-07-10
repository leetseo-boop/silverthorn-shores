import { createFileRoute } from "@tanstack/react-router";
import { Ship, Home as HomeIcon, Anchor, FileText, Download, ExternalLink, Phone, Mail, MapPin } from "lucide-react";
import houseboatPdf from "@/assets/guest-info/houseboat.pdf.asset.json";
import cabinPdf from "@/assets/guest-info/cabin.pdf.asset.json";
import smallBoatsPdf from "@/assets/guest-info/small-boats.pdf.asset.json";

const NAVY = "#1B2B3A";
const ORANGE = "#E8640A";
const SAND = "#F4EFE6";
const DISPLAY = "'Playfair Display', Georgia, serif";

const SITE = "https://silver-shasta-dreams.lovable.app";
const URL = `${SITE}/guest-info`;
const TITLE = "Guest Information & Cleaning Lists | Silverthorn";
const DESCRIPTION =
  "Download guest information and cleaning checklists for houseboats, cabins, and small boat rentals at Silverthorn Resort on Shasta Lake.";

type Doc = {
  key: string;
  title: string;
  desc: string;
  icon: typeof Ship;
  url: string;
  filename: string;
  sizeKB: number;
};

const docs: Doc[] = [
  {
    key: "houseboat",
    title: "Houseboat Guest Info & Cleaning List",
    desc: "Everything you need to know before your houseboat vacation — packing tips, arrival details, and the end-of-trip cleaning checklist.",
    icon: Ship,
    url: houseboatPdf.url,
    filename: "Houseboat_Guest_Info_Silverthorn.pdf",
    sizeKB: Math.round(houseboatPdf.size / 1024),
  },
  {
    key: "cabin",
    title: "Cabin Guest Info & Cleaning List",
    desc: "Guest guide and departure checklist for lakeside cabin stays at Silverthorn Resort.",
    icon: HomeIcon,
    url: cabinPdf.url,
    filename: "Cabin_Guest_Info_Silverthorn.pdf",
    sizeKB: Math.round(cabinPdf.size / 1024),
  },
  {
    key: "small-boats",
    title: "Small Boats Guest Info & Cleaning List",
    desc: "Rental information and return checklist for jet skis, wakeboard boats, pontoons, and other day boats.",
    icon: Anchor,
    url: smallBoatsPdf.url,
    filename: "Small_Boats_Guest_Info_Silverthorn.pdf",
    sizeKB: Math.round(smallBoatsPdf.size / 1024),
  },
];

const ldGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": URL,
      url: URL,
      name: TITLE,
      description: DESCRIPTION,
      hasPart: docs.map((d) => ({
        "@type": "DigitalDocument",
        name: d.title,
        url: `${SITE}${d.url}`,
        encodingFormat: "application/pdf",
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Guest Info", item: URL },
      ],
    },
  ],
};

export const Route = createFileRoute("/guest-info")({
  component: GuestInfoPage,
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
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(ldGraph) },
    ],
  }),
});

function GuestInfoPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: NAVY }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: SAND }} className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap" aria-label="Breadcrumb">
            <a href="/" className="text-gray-600 hover:opacity-75">Home</a>
            <span className="text-gray-400">/</span>
            <span className="font-medium" style={{ color: NAVY }}>Guest Info</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section
        className="relative"
        style={{
          background: `linear-gradient(135deg, ${NAVY} 0%, #0f1e2b 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
            style={{ backgroundColor: ORANGE, color: "white" }}>
            <FileText className="w-3.5 h-3.5" /> Guest Documents
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight text-white mb-4" style={{ fontFamily: DISPLAY }}>
            Guest Information
          </h1>
          <p className="text-lg text-white/85 max-w-2xl mx-auto mb-2">
            Thank you for choosing Silverthorn Resort!
          </p>
          <p className="text-base text-white/75 max-w-2xl mx-auto">
            Below, you'll find important information and documents to download before enjoying your Shasta Lake vacation with us.
            Please contact us if you have any questions.
          </p>
        </div>
      </section>

      {/* PDF Cards */}
      <section className="py-14 md:py-20" style={{ backgroundColor: SAND }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: DISPLAY, color: NAVY }}>
              Download Your Guest Documents
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Tap "Open PDF" to view in your browser, or "Download" to save a copy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {docs.map((d) => (
              <article
                key={d.key}
                className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-shadow p-6 md:p-7 flex flex-col"
                style={{ borderColor: "rgba(27,43,58,0.1)" }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${ORANGE}1A`, color: ORANGE }}
                >
                  <d.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2 leading-snug" style={{ color: NAVY, fontFamily: DISPLAY }}>
                  {d.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">{d.desc}</p>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-5">
                  <FileText className="w-4 h-4" style={{ color: ORANGE }} />
                  PDF · {d.sizeKB} KB
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-auto">
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-white text-sm transition-all"
                    style={{ backgroundColor: ORANGE }}
                  >
                    <ExternalLink className="w-4 h-4" /> Open PDF
                  </a>
                  <a
                    href={d.url}
                    download={d.filename}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm border-2 transition-all hover:bg-gray-50"
                    style={{ color: NAVY, borderColor: NAVY }}
                  >
                    <Download className="w-4 h-4" /> Download
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact band */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: DISPLAY, color: NAVY }}>
            Questions About Your Stay?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team is happy to help before, during, and after your visit. Reach out any time.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all"
              style={{ backgroundColor: ORANGE }}
            >
              <Mail className="w-5 h-5" /> Contact Us
            </a>
            <a
              href="tel:+18003323044"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 transition-all"
              style={{ color: NAVY, borderColor: NAVY }}
            >
              <Phone className="w-5 h-5" /> 1-800-332-3044
            </a>
            <a
              href="/directions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border-2 transition-all"
              style={{ color: NAVY, borderColor: NAVY }}
            >
              <MapPin className="w-5 h-5" /> Directions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
