const reviews = [
  {
    quote:
      "The Summit 70 was unreal. The team had us launched and on the water in under an hour — best family trip we've ever taken.",
    name: "Jessica M.",
    trip: "Family of 12 · Summit 70",
  },
  {
    quote:
      "We've rented from a lot of marinas on Shasta. Silverthorn's boats are by far the cleanest and best maintained. Won't go anywhere else.",
    name: "Derek H.",
    trip: "Annual guest · Cascade 59",
  },
  {
    quote:
      "Booked a cabin and a patio boat for our anniversary. Quiet, gorgeous, and the staff went out of their way every day.",
    name: "Priya & Sam",
    trip: "Cabin + Patio Boat",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-muted py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-xs tracking-[0.25em] uppercase text-primary">Guest Stories</span>
          <h2 className="font-display text-4xl sm:text-5xl mt-3 text-navy">
            Forty years of return visits.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="bg-white border border-border rounded-lg p-7 flex flex-col"
            >
              <div className="text-primary text-lg tracking-widest mb-4">★★★★★</div>
              <blockquote className="text-navy/90 leading-relaxed">"{r.quote}"</blockquote>
              <figcaption className="mt-6 pt-5 border-t border-border">
                <div className="font-medium text-navy">{r.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{r.trip}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
