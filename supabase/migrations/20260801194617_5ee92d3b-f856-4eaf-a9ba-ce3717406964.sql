
CREATE TABLE public.thorn_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  role text NOT NULL,
  content text NOT NULL,
  mode text,
  ip_hash text,
  ip_preview text,
  model text,
  tokens_in integer,
  tokens_out integer,
  latency_ms integer,
  handoff boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX thorn_messages_created_idx ON public.thorn_messages (created_at DESC);
CREATE INDEX thorn_messages_session_idx ON public.thorn_messages (session_id);
GRANT SELECT ON public.thorn_messages TO authenticated;
GRANT ALL ON public.thorn_messages TO service_role;
ALTER TABLE public.thorn_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view thorn messages" ON public.thorn_messages FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));

CREATE TABLE public.thorn_learned_facts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text NOT NULL,
  question text,
  answer text NOT NULL,
  source text,
  hits integer NOT NULL DEFAULT 1,
  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE, DELETE ON public.thorn_learned_facts TO authenticated;
GRANT ALL ON public.thorn_learned_facts TO service_role;
ALTER TABLE public.thorn_learned_facts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage learned facts" ON public.thorn_learned_facts FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

CREATE TABLE public.thorn_knowledge_cache (
  slug text PRIMARY KEY,
  url text NOT NULL,
  title text,
  snippet text NOT NULL,
  fetched_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.thorn_knowledge_cache TO authenticated;
GRANT ALL ON public.thorn_knowledge_cache TO service_role;
ALTER TABLE public.thorn_knowledge_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view knowledge cache" ON public.thorn_knowledge_cache FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));

CREATE TABLE public.thorn_staff_roster (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_key text NOT NULL UNIQUE,
  display_name text NOT NULL,
  greeting text NOT NULL,
  tone_notes text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.thorn_staff_roster TO authenticated;
GRANT ALL ON public.thorn_staff_roster TO service_role;
ALTER TABLE public.thorn_staff_roster ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage staff roster" ON public.thorn_staff_roster FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

CREATE TABLE public.thorn_staff_sessions (
  session_id text PRIMARY KEY,
  staff_key text,
  display_name text,
  last_seen_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.thorn_staff_sessions TO authenticated;
GRANT ALL ON public.thorn_staff_sessions TO service_role;
ALTER TABLE public.thorn_staff_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view staff sessions" ON public.thorn_staff_sessions FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));

CREATE TABLE public.thorn_abuse_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash text NOT NULL,
  ip_preview text,
  session_id text,
  term text,
  message text,
  offense_no integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX thorn_abuse_ip_idx ON public.thorn_abuse_events (ip_hash);
GRANT SELECT ON public.thorn_abuse_events TO authenticated;
GRANT ALL ON public.thorn_abuse_events TO service_role;
ALTER TABLE public.thorn_abuse_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view abuse events" ON public.thorn_abuse_events FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));

CREATE TABLE public.thorn_banned_ips (
  ip_hash text PRIMARY KEY,
  ip_preview text,
  reason text,
  banned_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, DELETE ON public.thorn_banned_ips TO authenticated;
GRANT ALL ON public.thorn_banned_ips TO service_role;
ALTER TABLE public.thorn_banned_ips ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage bans" ON public.thorn_banned_ips FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));
