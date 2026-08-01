GRANT DELETE ON public.thorn_messages TO authenticated;
GRANT DELETE ON public.thorn_abuse_events TO authenticated;
CREATE POLICY "Admins can delete thorn messages" ON public.thorn_messages FOR DELETE TO authenticated USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete abuse events" ON public.thorn_abuse_events FOR DELETE TO authenticated USING (is_admin(auth.uid()));