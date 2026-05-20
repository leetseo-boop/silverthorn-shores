
-- Clean any existing non-https rows so the constraint can be added safely
DELETE FROM public.booking_clicks WHERE destination_url IS NULL OR destination_url !~* '^https://';

ALTER TABLE public.booking_clicks
  ALTER COLUMN destination_url SET NOT NULL,
  ADD CONSTRAINT booking_clicks_destination_url_https_only
    CHECK (destination_url ~* '^https://[^[:space:]]{1,2000}$');

-- Tighten SECURITY DEFINER: revoke from anon/public so only authenticated users can call it
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;
