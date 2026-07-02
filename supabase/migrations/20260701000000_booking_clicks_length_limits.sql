-- booking_clicks accepts anonymous inserts, so bound every text column to
-- stop oversized-payload spam. Trim any existing oversized rows first so the
-- constraints can be added safely.
UPDATE public.booking_clicks SET boat_id = left(boat_id, 100) WHERE length(boat_id) > 100;
UPDATE public.booking_clicks SET source_page = left(source_page, 300) WHERE length(source_page) > 300;
UPDATE public.booking_clicks SET cta_location = left(cta_location, 100) WHERE length(cta_location) > 100;
UPDATE public.booking_clicks SET referrer = left(referrer, 2000) WHERE length(referrer) > 2000;
UPDATE public.booking_clicks SET user_agent = left(user_agent, 500) WHERE length(user_agent) > 500;

ALTER TABLE public.booking_clicks
  ADD CONSTRAINT booking_clicks_boat_id_len CHECK (boat_id IS NULL OR length(boat_id) <= 100),
  ADD CONSTRAINT booking_clicks_source_page_len CHECK (length(source_page) <= 300),
  ADD CONSTRAINT booking_clicks_cta_location_len CHECK (length(cta_location) <= 100),
  ADD CONSTRAINT booking_clicks_referrer_len CHECK (referrer IS NULL OR length(referrer) <= 2000),
  ADD CONSTRAINT booking_clicks_user_agent_len CHECK (user_agent IS NULL OR length(user_agent) <= 500);
