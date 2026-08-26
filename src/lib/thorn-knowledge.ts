/**
 * Policy facts Thorn is allowed to quote in "Policies & Booking" mode.
 * Every entry mirrors what is published on the policy pages and carries the
 * anchor it came from, so answers can cite the exact section.
 *
 * Server-only: imported by src/routes/api/chat.ts.
 * If a policy page changes, update the matching entry here.
 */

import { POLICY_SOURCES } from "./thorn-sources";

export type PolicyFact = {
  /** Source id from POLICY_SOURCES, e.g. hb-cancellation */
  id: keyof typeof POLICY_SOURCES;
  /** The fact itself, plain text */
  text: string;
};

export const POLICY_FACTS: PolicyFact[] = [
  // ---------- Houseboats ----------
  {
    id: "hb-renter",
    text: "Houseboats: the Charter Captain and Co-Captain must each be at least 21 years old and hold a valid driver's license. Rental fees must be paid in full at least 75 days before arrival. A booking deposit is due at booking and applies to the rental fee. Visa, MasterCard, American Express, Discover or cash accepted; refundable cash payments are returned by mailed check (no cash refunds).",
  },
  {
    id: "hb-security-deposit",
    text: "Refundable security/damage deposit is collected on arrival and returned if the boat comes back undamaged, clean and with all inventory. Standard amounts: Queen, Queen I and Queen II $1,000 (holiday $5,000 cash); Presidential and Senator $500 (holiday $3,000 cash); wakeboard boats $500; patio and fishing boats $200; cabins $100.",
  },
  {
    id: "hb-cancellation",
    text: "Houseboat cancellation tiers (written cancellation required): within 5 days of booking — full deposit refund if booked 75+ days before arrival; more than 75 days before arrival — 50% of the deposit refundable; 46–74 days before arrival — full deposit forfeited; less than 45 days before arrival — full deposit plus all rental fees forfeited; after a date change — full deposit plus all additional rental fees forfeited.",
  },
  {
    id: "hb-check-in",
    text: "Houseboat check-in: May–September 3:00–6:00 PM, October–April 1:00–4:00 PM. No boarding until all paperwork is complete and the operating instructions have finished.",
  },
  {
    id: "hb-check-out",
    text: "Houseboat check-out: the vessel must be unloaded, cleaned and back at the gas dock between 9:00 AM and 10:00 AM on the return date. Late returns may be charged and deducted from the damage deposit or the card on file.",
  },
  {
    id: "hb-fuel",
    text: "Fuel tanks are full at departure and are refilled at the primary renter's expense on return. All gas used is the renter's responsibility.",
  },
  {
    id: "hb-parking",
    text: "Parking passes are issued per houseboat: Queen / Queen I get 5; Queen II, Presidential and Senator get 4. Extra permits may not be available in peak season and unpermitted vehicles are towed at the owner's expense — carpool when possible.",
  },
  {
    id: "hb-travel-insurance",
    text: "Travel insurance is offered and recommended because cancellation penalties are strict; details are on the houseboat policy page.",
  },
  {
    id: "pet-policy",
    text: "Pet policy (houseboats and cabins): Silverthorn is pet friendly — dogs only, no cats or exotic pets. Maximum 2 dogs per houseboat; the 1st dog stays free and the 2nd dog is a non-refundable $50.00 paid before occupancy/boarding. Pets must be declared at booking, must be house-trained and well behaved, must never be left unattended on the boat, and must be leashed on shore and at the dock (health ordinances mean no pets inside the marina store). Aggressive breeds or dogs with a bite history are not permitted. Excessive cleaning (pet hair, urine) is charged to the card on file at $95.00 per hour and damages at replacement cost. Tips: bring a pet life jacket, familiar bedding/toys/bowls, shade and plenty of water, a plan for bathroom breaks, a dog ladder or ramp, and vaccination paperwork. The dock and parking area get extremely hot for paws in peak season.",
  },
  {
    id: "hb-pets",
    text: "Houseboats are pet friendly: maximum 2 dogs per boat — the 1st dog stays free and the 2nd dog is a non-refundable $50.00 paid before boarding. Excessive cleaning (pet hair, urine) is $95.00 per hour charged to the card on file; damages at replacement cost.",
  },

  // ---------- Cabins ----------
  {
    id: "cab-renter",
    text: "Cabins: the primary renter must be at least 21 years old and hold a valid state-issued driver's license. Rental fees plus the security/damage deposit must be paid in full at least 75 days before arrival. No cash refunds — refundable cash payments are returned by check.",
  },
  {
    id: "cab-deposits",
    text: "Cabin booking deposit is $100. Other deposits: Queen, Queen I, Queen II $1,000; Presidential and Senator $500; wakeboard boats $500; Tahoe boats $500; patio and fishing boats $200.",
  },
  {
    id: "cab-cancellation",
    text: "Cabin cancellation tiers (written cancellation required): within 5 days of booking — full refund if booked 75+ days before arrival; more than 75 days before arrival — 50% of the deposit refundable; 46–74 days before arrival — full deposit forfeited; less than 45 days before arrival — the entire rental fee is retained.",
  },
  {
    id: "cab-check-in",
    text: "Cabin check-in: May–September 3:00–6:00 PM, October–April 1:00–4:00 PM.",
  },
  {
    id: "cab-check-out",
    text: "Cabin check-out is no later than 11:00 AM on the departure date, with the cabin left in the same general condition as on arrival.",
  },
  {
    id: "cab-pets",
    text: "Cabins are pet friendly: maximum 2 dogs — the 1st dog stays free and the 2nd dog is a non-refundable $50.00 paid before occupancy. Excessive cleaning is $95.00 per hour; damages at replacement cost.",
  },
  {
    id: "cab-smoking",
    text: "Cabins are non-smoking; the no-smoking rule and related charges are on the cabin policy page.",
  },
  {
    id: "cab-parking",
    text: "Cabin parking is limited and permit-controlled; see the cabin policy page for the current allocation.",
  },

  // ---------- Booking & documents ----------
  {
    id: "guest-info",
    text: "Rental contracts, the houseboat check-in process, cleaning lists and cabin/small-boat documents are all downloadable on the guest information page.",
  },
  {
    id: "booking-contact",
    text: "Reservations and availability: call 800-332-3044 or email reserve1@houseboats.com. Marina store hours are Mon–Sun 8:00 AM–6:30 PM (seasonal).",
  },
];

/** Facts block injected into the policy-mode system prompt. */
export const POLICY_FACTS_BLOCK = POLICY_FACTS.map((f) => {
  const src = POLICY_SOURCES[f.id];
  return `- [${f.id}] (${src.label} — ${src.href}) ${f.text}`;
}).join("\n");
