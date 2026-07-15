
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE TABLE public.google_reviews_cache (
  place_id text PRIMARY KEY,
  reviews jsonb NOT NULL DEFAULT '[]'::jsonb,
  rating numeric,
  user_ratings_total integer,
  fetched_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.google_reviews_cache TO anon, authenticated;
GRANT ALL ON public.google_reviews_cache TO service_role;

ALTER TABLE public.google_reviews_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read cached reviews"
  ON public.google_reviews_cache FOR SELECT
  TO anon, authenticated
  USING (true);
