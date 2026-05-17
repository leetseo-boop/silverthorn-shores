const stats = [
  { value: "40+", label: "Years on Shasta" },
  { value: "30", label: "Boats in Fleet" },
  { value: "365", label: "Miles of Shoreline" },
  { value: "50k+", label: "Happy Guests" },
];

export function Stats() {
  return (
    <section className="bg-lake text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center md:text-left">
            <div className="font-display text-4xl sm:text-5xl">{s.value}</div>
            <div className="text-xs tracking-[0.2em] uppercase text-white/80 mt-2">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
