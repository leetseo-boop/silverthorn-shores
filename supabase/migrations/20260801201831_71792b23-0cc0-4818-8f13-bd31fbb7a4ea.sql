CREATE TABLE public.thorn_daily_conditions (
  day date NOT NULL PRIMARY KEY,
  weather jsonb NOT NULL DEFAULT '{}'::jsonb,
  lake jsonb NOT NULL DEFAULT '{}'::jsonb,
  fetched_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.thorn_daily_conditions TO anon, authenticated;
GRANT ALL ON public.thorn_daily_conditions TO service_role;
ALTER TABLE public.thorn_daily_conditions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read daily conditions" ON public.thorn_daily_conditions FOR SELECT TO anon, authenticated USING (true);