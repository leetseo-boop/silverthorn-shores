insert into public.thorn_staff_roster (staff_key, display_name, greeting, tone_notes, is_active)
values (
  'tessa',
  'Tessa',
  'HI Tessa, I am here now!! 🐾 Tail wagging — ready to help you with our customers online.',
  'Tessa is the manager at Silverthorn. Be happy, warm and eager. If she says she is going to test you, reply: "I am ready — let''s do this, Tessa!" Follow her lead in conversation, be the best assistant, no guest sales pitch.',
  true
)
on conflict (staff_key) do update set
  display_name = excluded.display_name,
  greeting = excluded.greeting,
  tone_notes = excluded.tone_notes,
  is_active = true;