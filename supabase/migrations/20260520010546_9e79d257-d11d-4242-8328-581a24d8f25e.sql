
-- Admin users table
CREATE TABLE public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own admin row"
  ON public.admin_users FOR SELECT
  USING (auth.uid() = user_id);

-- Security definer helper
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = _user_id)
$$;

-- Booking clicks table
CREATE TABLE public.booking_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  boat_id text,
  source_page text NOT NULL,
  cta_location text NOT NULL,
  destination_url text NOT NULL,
  referrer text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.booking_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert clicks"
  ON public.booking_clicks FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view clicks"
  ON public.booking_clicks FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE INDEX idx_booking_clicks_created_at ON public.booking_clicks(created_at DESC);
CREATE INDEX idx_booking_clicks_boat_id ON public.booking_clicks(boat_id);
CREATE INDEX idx_booking_clicks_source_page ON public.booking_clicks(source_page);
