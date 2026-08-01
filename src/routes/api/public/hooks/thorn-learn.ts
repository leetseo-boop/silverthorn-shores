import { createFileRoute } from "@tanstack/react-router";
import { generateText } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { getAdmin } from "@/lib/thorn/runtime.server";

/**
 * Nightly self-learning pass (00:00 PST via pg_cron).
 * Clusters the day's guest questions that ended in a hand-off or a weak answer
 * and drafts candidate facts for staff approval in the admin dashboard.
 */
export const Route = createFileRoute("/api/public/hooks/thorn-learn")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["REVIEWS_REFRESH_SECRET"];
        const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
        if (!secret || token !== secret) {
          return new Response("Unauthorized", { status: 401 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("Not configured", { status: 500 });

        const admin = await getAdmin();
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        const { data: rows, error } = await admin
          .from("thorn_messages")
          .select("session_id, role, content, handoff, created_at")
          .gte("created_at", since)
          .order("created_at", { ascending: true })
          .limit(600);

        if (error) {
          console.error("[thorn-learn] read failed", error.message);
          return new Response(JSON.stringify({ ok: false, error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Pair each user question with Thorn's reply; keep the weak ones.
        const pairs: { q: string; a: string }[] = [];
        const list = rows ?? [];
        for (let i = 0; i < list.length - 1; i++) {
          const u = list[i];
          const a = list[i + 1];
          if (u.role !== "user" || a.role !== "assistant" || u.session_id !== a.session_id) continue;
          const weak =
            a.handoff ||
            /i'm not sure|i don't have|not something i|can't confirm|give (us|our team) a call/i.test(
              a.content ?? "",
            );
          if (weak) pairs.push({ q: u.content, a: a.content });
        }

        if (pairs.length === 0) {
          return new Response(JSON.stringify({ ok: true, drafted: 0, reviewed: 0 }), {
            headers: { "Content-Type": "application/json" },
          });
        }

        const gateway = createLovableAiGatewayProvider(key);
        const { text } = await generateText({
          model: gateway("google/gemini-3.6-flash"),
          system: `You review guest chat logs for Silverthorn Resort on Shasta Lake and produce a short list of knowledge gaps for staff to fill.
Group similar questions together. For each distinct gap output one line in exactly this pipe format and nothing else:
TOPIC | REPRESENTATIVE QUESTION | DRAFT ANSWER OR "NEEDS STAFF INPUT" | HITS
- TOPIC is 2-5 words.
- Only draft an answer when it is clearly derivable from the guest conversation itself; otherwise write NEEDS STAFF INPUT. Never invent prices, dates, hours or availability.
- HITS is how many guest questions fell into that group.
- At most 12 lines. No preamble, no markdown, no numbering.`,
          prompt: pairs
            .slice(-120)
            .map((p, i) => `${i + 1}. Q: ${p.q}\n   A: ${p.a.slice(0, 300)}`)
            .join("\n"),
        });

        const drafts = text
          .split("\n")
          .map((l) => l.split("|").map((c) => c.trim()))
          .filter((c) => c.length >= 3 && c[0] && c[1])
          .slice(0, 12);

        let drafted = 0;
        for (const [topic, question, answer, hits] of drafts) {
          const { error: upsertError } = await admin.from("thorn_learned_facts").upsert(
            {
              topic,
              question,
              answer: answer || "NEEDS STAFF INPUT",
              source: "nightly-learning",
              hits: Number(hits) || 1,
              approved: false,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "topic" },
          );
          if (upsertError) console.error("[thorn-learn] upsert failed", upsertError.message);
          else drafted++;
        }

        return new Response(JSON.stringify({ ok: true, drafted, reviewed: pairs.length }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
