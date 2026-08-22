import type { ReactNode } from "react";

export type Faq = { q: string; a: string; render?: () => ReactNode };

export const FAQS: Faq[] = [
  {
    q: "How do I book a houseboat?",
    a: "Book online 24/7 at rentals.silverthornresort.com, or call our reservation specialists at 800-332-3044. We recommend booking early — summer dates fill fast.",
  },
  {
    q: "What is the minimum age to rent a houseboat or cabin?",
    a: "You must be at least 21 years of age to rent any vessel or cabin at Silverthorn Resort.",
  },
  {
    q: "What is included with a houseboat rental?",
    a: "All houseboats come fully equipped with dishes, pots, pans, silverware, a modern kitchen with range/oven, dishwasher, microwave, refrigerator, propane BBQ, TV, and AC or swamp cooler. Amenities vary by boat — some include hot tubs, waterslides, wet bars, and fireplaces.",
  },
  {
    q: "How many people does each houseboat sleep?",
    a: "Queen: up to 20 guests. Queen I: up to 20 guests. Queen II: up to 16 guests. Senator: up to 16 guests.",
  },
  {
    q: "Where is Silverthorn Resort located?",
    a: "We are located at 16250 Silverthorn Road, Redding, CA 96003, on the shores of Shasta Lake — approximately 15 miles north of Redding via Interstate 5 to Gilman Road.",
  },
  {
    q: "What are the 2026 houseboat seasons and rates?",
    a: "Low Season: January 2 – April 30 and August 20 – November 30. May & September rates apply for those months including Memorial Day and Labor Day. High Season: June 11 – August 19, 2026. See individual houseboat pages for full pricing.",
  },
  {
    q: "Can I bring my pet?",
    a: "Silverthorn and Jones Valley Resort are pet friendly. Houseboats accommodate a maximum of 2 dogs — the first dog is free, and the second dog requires a non-refundable $50.00 charge to be paid prior to occupancy/boarding. Any excessive cleaning required upon departure of pet hair, urine, etc. will be charged to the credit card on file at the rate of $95.00 per hour. Any damages will be charged at replacement cost. See our full Pet Policy at /pet-policy.",
    render: () => (
      <>
        Silverthorn and Jones Valley Resort are pet friendly. Houseboats
        accommodate a maximum of <strong>2 dogs</strong> — the{" "}
        <strong>first dog is free</strong>, and the{" "}
        <strong>second dog requires a non-refundable $50.00 charge</strong> to
        be paid prior to occupancy/boarding. Any excessive cleaning required
        upon departure of pet hair, urine, etc. will be charged to the credit
        card on file at the rate of <strong>$95.00 per hour</strong>. Any
        damages will be charged at <strong>replacement cost</strong>. See our
        full{" "}
        <a
          href="/pet-policy"
          className="text-primary underline underline-offset-2 hover:opacity-80"
        >
          Pet Policy
        </a>
        .
      </>
    ),
  },
  {
    q: "What is the cancellation and rental policy?",
    a: "See our full Houseboat Rental Policy at https://silverthornresort.com/houseboats/policy. We strongly recommend reviewing this before booking.",
    render: () => (
      <>
        See our full{" "}
        <a
          href="https://silverthornresort.com/houseboats/policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:opacity-80"
        >
          Houseboat Rental Policy
        </a>
        . We strongly recommend reviewing this before booking.
      </>
    ),
  },
  {
    q: "Can I book Jones Valley Resort houseboats through your site?",
    a: "Yes! Silverthorn and Jones Valley Resort are sister marinas managed by the same team on Shasta Lake. If your preferred dates are unavailable at Silverthorn, we can point you to Jones Valley. Visit houseboats.com or call us at 800-332-3044.",
  },
  {
    q: "What is there to do on Shasta Lake beyond the houseboat?",
    a: "Shasta Lake offers 365 miles of shoreline, world-class fishing, water skiing, wakeboarding, kayaking, and hiking. Nearby attractions include Shasta Dam, Shasta Caverns, and the town of Redding. See our Exploring Shasta Lake page for a full guide.",
  },
];

export const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
