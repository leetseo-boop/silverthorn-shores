import { Link } from "@tanstack/react-router";
import heroMarina from "@/assets/history/silverthorn-marina-shasta-lake-hero.webp";
import heroDam from "@/assets/history/shasta-dam-aerial-lake-shasta.webp";
import ferry from "@/assets/history/silverthorn-ferry-pit-river-1853.webp";
import damTower from "@/assets/history/shasta-dam-construction-tower.webp";
import damSpillway from "@/assets/history/shasta-dam-construction-spillway.webp";
import damColor from "@/assets/history/shasta-dam-construction-color.webp";
import ruins from "@/assets/history/silverthorn-ruins-shasta-lake-shoreline.webp";
import satellite from "@/assets/history/shasta-lake-satellite-shoreline.webp";

const gallery = [
  {
    src: damTower,
    alt: "Workers atop the central headtower during Shasta Dam construction, late 1930s",
    caption: "Headtower rising over the Sacramento River canyon",
    date: "c. 1939",
  },
  {
    src: damSpillway,
    alt: "Shasta Dam spillway under construction with cableway towers in the background",
    caption: "Pouring the spillway",
    date: "c. 1942",
  },
  {
    src: damColor,
    alt: "Color photograph of Shasta Dam mid-construction with cableways and concrete forms",
    caption: "Shasta Dam mid-pour, captured in rare color",
    date: "c. 1942",
  },
  {
    src: heroDam,
    alt: "Aerial view of Shasta Dam holding back Shasta Lake with Mount Shasta on the horizon",
    caption: "Shasta Dam from the air today",
    date: "Modern day",
  },
  {
    src: ferry,
    alt: "Historic photo of a wooden ferry crossing the Pit River near the original Silverthorn homestead",
    caption: "A Pit River ferry near the original Silverthorn crossing",
    date: "c. 1900",
  },
  {
    src: ruins,
    alt: "Exposed concrete foundation near Shasta Dam along the Shasta Lake shoreline at low water",
    caption: "Shasta Dam foundation, exposed at low water",
    date: "Modern day",
  },
  {
    src: satellite,
    alt: "Satellite view of Shasta Lake showing four major arms and 375 miles of shoreline",
    caption: "Shasta Lake from above — 375 miles of shoreline",
    date: "Modern day",
  },
];

export function HistoryPage() {
  return (
    <main style={{ backgroundColor: "#FBF8F3", color: "#1B2B3A" }}>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroDam}
          alt="Aerial view of Shasta Dam holding back the deep blue waters of Shasta Lake with Mount Shasta on the horizon"
          width={1600}
          height={900}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="w-full h-[52vh] md:h-[62vh] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/55" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-5xl w-full px-6 pb-10 md:pb-16 text-white">
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase opacity-90">
              Since 1853
            </p>
            <h1
              className="mt-3 text-4xl md:text-6xl leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
            >
              Our History
            </h1>
            <p className="mt-3 max-w-2xl text-base md:text-lg opacity-95">
              From a Pit River ferry to one of Shasta Lake's premier
              houseboat resorts — more than 170 years on the water.
            </p>
          </div>
        </div>
      </section>

      {/* Story top */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24 grid md:grid-cols-5 gap-12 items-start">
        <article className="md:col-span-3 space-y-6 text-[1.05rem] leading-relaxed">
          <h2
            className="text-3xl md:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
          >
            A family story that began in 1853
          </h2>
          <p>
            Silverthorn Resort began on <strong>August 1, 1853</strong> with
            George Silverthorn, who ran one of the first ferries in Northern
            California on the Pit River. George married Lucy, a Wintu Indian,
            and they had five children together. The Silverthorn name lives on
            with their descendants in the local area.
          </p>
          <p>
            Since the time of George and Lucy Silverthorn, the area has
            undergone tremendous growth and change. Redding became the hub of
            the north state. Later, when the <strong>Shasta Dam</strong> was
            built, the resulting <strong>Shasta Lake</strong> became a major
            tourist attraction, drawing over one million visitors annually.
          </p>
          <blockquote
            className="border-l-4 pl-5 italic text-lg md:text-xl"
            style={{ borderColor: "#E8640A", color: "#1B2B3A" }}
          >
            "The Silverthorn name still echoes along the Pit River Arm —
            in the families who live here, and in the resort that carries it forward."
          </blockquote>
          <p>
            With over <strong>375 miles of shoreline</strong>, an average depth
            of 400 feet, and 40,000 acres of surface water, Shasta Lake has
            quickly become a major houseboating and wakeboarding destination.
            The lake has hundreds of nooks, crannies, and coves creating
            secluded spots for all — even on the busiest summer weekends.
          </p>
        </article>

        <figure className="md:col-span-2 md:sticky md:top-24">
          <img
            src={ferry}
            alt="George Silverthorn's wooden ferry on the Pit River in Northern California, circa 1853"
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            className="w-full rounded-xl shadow-lg object-cover"
          />
          <figcaption className="mt-3 text-sm opacity-70">
            George Silverthorn's ferry on the Pit River — one of the first in
            Northern California.
          </figcaption>
        </figure>
      </section>

      {/* Stats */}
      <section style={{ backgroundColor: "#0D2030", color: "#ffffff" }}>
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <h2 className="sr-only">Shasta Lake by the numbers</h2>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              ["375 mi", "Shoreline"],
              ["400 ft", "Average depth"],
              ["40,000", "Surface acres"],
              ["1M+", "Annual visitors"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt
                  className="text-3xl md:text-5xl"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#E8640A" }}
                >
                  {n}
                </dt>
                <dd className="mt-2 text-sm uppercase tracking-widest opacity-80">
                  {l}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Story bottom */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24 space-y-6 text-[1.05rem] leading-relaxed">
        <h2
          className="text-3xl md:text-4xl text-center"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
        >
          Becoming a premier Shasta Lake resort
        </h2>
        <p>
          Like most of Northern California, Silverthorn Resort has also grown
          and changed over the years — becoming one of the premier resorts on
          Shasta Lake. Silverthorn has some of the most luxurious boats on the
          lake such as the <Link to="/houseboats/queen" className="underline" style={{ color: "#E8640A" }}>Queen houseboat</Link>{" "}
          with private staterooms, a hot tub, and three full decks of space.
        </p>
        <p>
          Silverthorn Resort also has a marina with a fully-stocked grocery
          store, pro and apparel shop, fuel dock, private moorage, and a
          courtesy dock. For the less nautically inclined, we have{" "}
          <Link to="/cabins" className="underline" style={{ color: "#E8640A" }}>
            cozy cabins along the lake
          </Link>.
        </p>
        <p>
          At Silverthorn, we know that you have a lot of choices for making
          summer memories — and we value the time that you choose to spend
          with us at Shasta Lake.
        </p>
      </section>

      {/* Gallery */}
      <section style={{ backgroundColor: "#F1ECE2" }}>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs tracking-[0.3em] uppercase opacity-70">
              Photo Archive
            </p>
            <h2
              className="mt-3 text-3xl md:text-4xl"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
            >
              Shasta Lake Through Time
            </h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((img) => (
              <li key={img.src} className="group">
                <figure className="overflow-hidden rounded-xl shadow-md bg-white">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="p-4">
                    <p className="text-sm font-medium">{img.caption}</p>
                    <p className="text-xs opacity-60 mt-1">{img.date}</p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#0D2030", color: "#ffffff" }}>
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20 text-center">
          <h2
            className="text-3xl md:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
          >
            Be part of the next chapter
          </h2>
          <p className="mt-4 opacity-90 max-w-2xl mx-auto">
            Book a houseboat or a lakeside cabin and make your own memories on
            Shasta Lake.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/houseboats"
              className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#E8640A" }}
            >
              Browse Houseboats
            </Link>
            <Link
              to="/cabins"
              className="inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors"
              style={{
                border: "1.5px solid rgba(255,255,255,0.4)",
                color: "#ffffff",
              }}
            >
              View Cabins
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HistoryPage;
