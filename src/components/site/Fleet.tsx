import { BookNowButton } from "./BookNowButton";
import boat1 from "@/assets/boat-1.jpg";
import boat2 from "@/assets/boat-2.jpg";
import boat3 from "@/assets/boat-3.jpg";
import boat4 from "@/assets/boat-4.jpg";
import cabins from "@/assets/cabins.jpg";
import smallBoats from "@/assets/small-boats.jpg";

const boats = [
  { name: "Sierra 56", img: boat1, length: "56 ft", sleeps: "10", tier: "Classic" },
  { name: "Cascade 59", img: boat2, length: "59 ft", sleeps: "12", tier: "Comfort" },
  { name: "Summit 70", img: boat3, length: "70 ft", sleeps: "14", tier: "Premium" },
  { name: "Majestic 75", img: boat4, length: "75 ft", sleeps: "16", tier: "Luxury" },
];

export function Fleet() {
  return (
    <section id="fleet" className="bg-muted py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="text-xs tracking-[0.25em] uppercase text-primary">The Fleet</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-3 text-navy">
              Pick your floating home.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Four houseboat tiers, cozy lakeside cabins, and a full lineup of small craft —
            so every group finds the right fit.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {boats.map((b) => (
            <article
              key={b.name}
              className="group bg-white rounded-lg overflow-hidden border border-border hover:shadow-xl transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={b.img}
                  alt={`${b.name} houseboat`}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary">
                    {b.tier}
                  </span>
                  <span className="text-xs text-muted-foreground">{b.length}</span>
                </div>
                <h3 className="font-display text-2xl text-navy">{b.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">Sleeps up to {b.sleeps}</p>
                <BookNowButton size="sm" className="w-full mt-5">
                  Book {b.name}
                </BookNowButton>
              </div>
            </article>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <FeatureTile
            img={cabins}
            tag="Stay Ashore"
            title="Lakeside Cabins"
            copy="Wood-paneled cabins steps from the marina — perfect for guests who prefer solid ground."
          />
          <FeatureTile
            img={smallBoats}
            tag="Day Boats"
            title="Ski, Fish & Patio Boats"
            copy="Add a ski boat, fishing boat, or patio pontoon to any trip. Reserve by the day."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureTile({
  img,
  tag,
  title,
  copy,
}: {
  img: string;
  tag: string;
  title: string;
  copy: string;
}) {
  return (
    <article className="relative rounded-lg overflow-hidden bg-navy text-white min-h-[320px] group">
      <img
        src={img}
        alt={title}
        loading="lazy"
        width={1280}
        height={800}
        className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
      <div className="relative p-8 flex flex-col justify-end h-full min-h-[320px]">
        <span className="text-[10px] tracking-[0.25em] uppercase text-primary">{tag}</span>
        <h3 className="font-display text-3xl mt-2">{title}</h3>
        <p className="text-white/80 text-sm mt-2 max-w-sm">{copy}</p>
        <BookNowButton size="sm" className="mt-5 self-start">
          Reserve
        </BookNowButton>
      </div>
    </article>
  );
}
