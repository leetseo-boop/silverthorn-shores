import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { SILVERTHORN_PLACE_ID, type GoogleReview, type ReviewsPayload } from "./googleReviews.types";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";

function publicSupabase() {
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(process.env.SUPABASE_URL!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

async function fetchFromGoogle(placeId: string): Promise<ReviewsPayload> {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const mapsKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!lovableKey || !mapsKey) throw new Error("Missing Google Maps connector credentials");

  const res = await fetch(`${GATEWAY_URL}/places/v1/places/${placeId}?languageCode=en`, {
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": mapsKey,
      "X-Goog-FieldMask": "id,rating,userRatingCount,reviews",
    },
  });

  if (res.status === 403) {
    const details: Array<{ reason?: string }> = (await res.json())?.error?.details ?? [];
    const reason = details.find((d) => d.reason)?.reason;
    if (reason === "API_KEY_HTTP_REFERRER_BLOCKED") {
      throw new Error('Google Maps server key is referrer-restricted. Set the server key restrictions to "None" or "IP addresses".');
    }
    if (reason === "API_KEY_SERVICE_BLOCKED") {
      throw new Error("Google Maps server key does not allow Places API (New). Add Places API to the key's allowed APIs list.");
    }
    throw new Error("Google Maps request was denied (403). Check the server key restrictions.");
  }

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Google Places error [${res.status}]: ${body}`);
  }

  const data = (await res.json()) as {
    rating?: number;
    userRatingCount?: number;
    reviews?: Array<{
      rating?: number;
      text?: { text?: string };
      originalText?: { text?: string };
      relativePublishTimeDescription?: string;
      publishTime?: string;
      googleMapsUri?: string;
      authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
    }>;
  };

  const reviews: GoogleReview[] = (data.reviews ?? [])
    .filter((r) => (r.rating ?? 0) >= 4)
    .map((r) => ({
      author: r.authorAttribution?.displayName ?? "Google User",
      authorUrl: r.authorAttribution?.uri ?? null,
      authorPhoto: r.authorAttribution?.photoUri ?? null,
      rating: r.rating ?? 5,
      relativeTime: r.relativePublishTimeDescription ?? "",
      text: r.text?.text ?? r.originalText?.text ?? "",
      publishTime: r.publishTime ?? "",
      googleMapsUri: r.googleMapsUri ?? null,
    }))
    .filter((r) => r.text.length > 0);

  return {
    reviews,
    rating: data.rating ?? null,
    totalReviews: data.userRatingCount ?? null,
    placeId,
  };
}

export async function getGoogleReviewsPayload(): Promise<ReviewsPayload> {
  try {
    const supabase = publicSupabase();
    const { data, error } = await supabase
      .from("google_reviews_cache")
      .select("place_id, reviews, rating, user_ratings_total")
      .eq("place_id", SILVERTHORN_PLACE_ID)
      .maybeSingle();

    if (error) throw error;
    if (data && Array.isArray(data.reviews) && data.reviews.length > 0) {
      return {
        reviews: data.reviews as unknown as GoogleReview[],
        rating: data.rating ? Number(data.rating) : null,
        totalReviews: data.user_ratings_total ?? null,
        placeId: data.place_id,
      };
    }
  } catch (err) {
    console.error("[getGoogleReviewsPayload] cache read failed:", err);
  }

  try {
    return await fetchFromGoogle(SILVERTHORN_PLACE_ID);
  } catch (err) {
    console.error("[getGoogleReviewsPayload] live fetch failed:", err);
    return { reviews: [], rating: null, totalReviews: null, placeId: SILVERTHORN_PLACE_ID };
  }
}

export async function refreshGoogleReviews(): Promise<ReviewsPayload> {
  const payload = await fetchFromGoogle(SILVERTHORN_PLACE_ID);
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("google_reviews_cache").upsert(
    {
      place_id: payload.placeId,
      reviews: payload.reviews as unknown as Database["public"]["Tables"]["google_reviews_cache"]["Insert"]["reviews"],
      rating: payload.rating,
      user_ratings_total: payload.totalReviews,
      fetched_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "place_id" },
  );
  if (error) throw error;
  return payload;
}