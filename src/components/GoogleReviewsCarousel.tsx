import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGoogleReviews, type GoogleReview } from "@/lib/googleReviews.functions";



const FALLBACK: GoogleReview[] = [
  {
    author: "The Martinez Family",
    authorUrl: null,
    authorPhoto: null,
    rating: 5,
    relativeTime: "",
    text: "Absolutely incredible experience. The Queen houseboat exceeded every expectation — the kids still talk about the waterslide. We'll be back every summer.",
    publishTime: "",
    googleMapsUri: null,
  },
  {
    author: "Dave & Linda K.",
    authorUrl: null,
    authorPhoto: null,
    rating: 5,
    relativeTime: "",
    text: "Third year in a row renting the Senator. The staff is incredible, the lake is stunning, and there's truly nothing like waking up on the water at Shasta.",
    publishTime: "",
    googleMapsUri: null,
  },
  {
    author: "The Johnson Crew",
    authorUrl: null,
    authorPhoto: null,
    rating: 5,
    relativeTime: "",
    text: "We rented a cabin and spent days on rented day boats. Perfect family vacation — peaceful, beautiful, and surprisingly affordable for what you get.",
    publishTime: "",
    googleMapsUri: null,
  },
];

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <div className="text-base" style={{ color: "#E8A855", letterSpacing: "2px" }} aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(full)}
      <span style={{ color: "#E5DDD0" }}>{"★".repeat(Math.max(0, 5 - full))}</span>
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <div
      className="rounded-2xl p-5 border h-full flex flex-col"
      style={{ backgroundColor: "#fff", borderColor: "#E2DED6" }}
    >
      <div className="flex items-start justify-between mb-3 gap-2">
        <Stars rating={review.rating} />
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"/>
        </svg>
      </div>
      <p className="text-sm leading-relaxed italic mb-4 line-clamp-6" style={{ color: "#444" }}>
        "{review.text}"
      </p>
      <div className="mt-auto flex items-center gap-3">
        {review.authorPhoto ? (
          <img
            src={review.authorPhoto}
            alt=""
            width={36}
            height={36}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="rounded-full flex-shrink-0"
            style={{ width: 36, height: 36, objectFit: "cover" }}
          />
        ) : (
          <div
            className="rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
            style={{ width: 36, height: 36, backgroundColor: "#E8640A" }}
            aria-hidden="true"
          >
            {review.author.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <div className="text-xs font-semibold truncate" style={{ color: "#1B2B3A" }}>{review.author}</div>
          <div className="text-xs mt-0.5 truncate" style={{ color: "#9a8a7a" }}>
            {review.relativeTime ? `${review.relativeTime} · ` : ""}Google Review
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GoogleReviewsCarousel() {
  const { data } = useQuery({
    queryKey: ["google-reviews"],
    queryFn: () => getGoogleReviews(),
    staleTime: 30 * 60 * 1000, // 30 min
    refetchOnWindowFocus: false,
  });

  const reviews = useMemo<GoogleReview[]>(() => {
    const live = data?.reviews ?? [];
    return live.length > 0 ? live : FALLBACK;
  }, [data]);

  const rating = 4;
  const totalReviews = data?.totalReviews ?? null;

  const [index, setIndex] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const id = setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(id);
  }, [reviews.length]);

  return (
    <div
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      {/* Aggregate rating header */}
      <div className="flex flex-col items-center gap-2 mb-8">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full" style={{ backgroundColor: "#fff", border: "1px solid #E2DED6" }}>
          <span className="text-2xl font-bold" style={{ color: "#1B2B3A", fontFamily: "'Playfair Display', Georgia, serif" }}>
            {rating.toFixed(1)}
          </span>
          <Stars rating={rating} />
          {totalReviews != null && (
            <span className="text-xs" style={{ color: "#6B5B4A" }}>
              · {totalReviews} Google reviews
            </span>
          )}
        </div>
      </div>

      {/* Mobile: single card rotating */}
      <div className="md:hidden">
        <div className="relative">
          <ReviewCard review={reviews[index]} />
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to review ${i + 1}`}
              className="rounded-full transition-all"
              style={{
                width: i === index ? 20 : 8,
                height: 8,
                backgroundColor: i === index ? "#E8640A" : "#D4CBBE",
              }}
            />
          ))}
        </div>
      </div>

      {/* Desktop: 3 rotating cards */}
      <div className="hidden md:block">
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((offset) => {
            const r = reviews[(index + offset) % reviews.length];
            return <ReviewCard key={`${index}-${offset}`} review={r} />;
          })}
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to review ${i + 1}`}
              className="rounded-full transition-all"
              style={{
                width: i === index ? 20 : 8,
                height: 8,
                backgroundColor: i === index ? "#E8640A" : "#D4CBBE",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
