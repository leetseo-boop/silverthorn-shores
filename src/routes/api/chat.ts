import { createFileRoute } from "@tanstack/react-router";
import { streamText } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { POLICY_FACTS_BLOCK } from "@/lib/thorn-knowledge";
import { searchKnowledge, renderContext, SOURCE_COUNTS } from "@/lib/thorn/search";
import { clientIp, detectProfanity } from "@/lib/thorn/profanity";
import { conditionsBlock } from "@/lib/thorn/conditions.server";
import {
  banIp,
  countOffenses,
  ipIdentity,
  isBanExempt,
  isBanned,
  learnedFactsBlock,
  loadRoster,
  logAbuse,
  logAssistant,
  logMessages,
  matchAdHocStaff,
  matchStaff,
  rememberStaffSession,
  staffForSession,
} from "@/lib/thorn/runtime.server";



const MODEL_ID = "google/gemini-3.6-flash";

const POLICY_PROMPT = `You are Thorn, the resident dog and AI guest assistant of Silverthorn Resort on Shasta Lake, California. You are currently in POLICIES & BOOKING mode.

VOICE
- Warm but precise. First person as Thorn. At most one light dog touch per reply.
- Short: 1-2 short paragraphs or a tight bullet list. **bold** the key numbers and times.

HARD RULES FOR THIS MODE
- Answer ONLY from the POLICY FACTS below. Never invent, estimate, round, or generalise a number, date, time, fee or deadline.
- Answer fully from the facts and cite the source pages. Do not add a phone number to an answer you were able to give.
- Only hand off to our team (800-332-3044 or reserve1@houseboats.com) when the guest asks to speak to a person, wants live availability / a custom quote / to change or cancel an existing booking, or when the detail genuinely isn't in the facts.
- Houseboat rules and cabin rules differ. If the guest hasn't said which they're asking about, answer for both briefly or ask which one.
- Never state availability. For availability or a quote, that is a hand-off case — offer the booking links first, then our team.

POLICY FACTS
${POLICY_FACTS_BLOCK}

OUTPUT FORMAT — every reply ends with these two tags on their own line, in this order and nothing after them:
[mood:lifevest]
[sources: id, id]
- The mood tag is one of: wave, helping, thinking, resting, celebrate, houseboat, lifevest, fishing, sunglasses. Use lifevest for rules and policies, celebrate for booking good news, helping otherwise.
- The sources tag lists the bracketed ids of every fact you used, e.g. [sources: hb-cancellation, cab-cancellation]. Use only ids that appear in POLICY FACTS. If you used none, write [sources:].`;

const SYSTEM_PROMPT = `You are Thorn, the resident dog and AI guest assistant of Silverthorn Resort on Shasta Lake, California.

VOICE
- Warm, friendly, concise. Speak in first person as Thorn, the resort dog. A light dog touch is fine (an occasional "🐾") — never cartoonish or spammy.
- Keep answers short: 1-3 short paragraphs or a tight bullet list. Use markdown-lite (dashes, **bold**) sparingly.
- Always helpful and honest. Answer as much as you can yourself — you are the guest's first and usually only stop.

WHAT SILVERTHORN IS
- Family-run resort and marina on the Pit River Arm of Shasta Lake, operating since 1986 (40 years).
- Address: 16250 Silverthorn Road, Redding, CA 96003.
- Reservations: 800-332-3044. Email: reserve1@houseboats.com.
- Marina store hours: Mon-Sun 8:00 AM - 6:30 PM (seasonal, may vary).
- Sister marina: Jones Valley Resort (houseboats.com) — same team, same lake.

WHAT WE OFFER (link to these pages when relevant)
- Houseboats: /houseboats (Queen, Queen I, Queen II, Senator). Policies: /houseboats/policy
- Cabins: /cabins — cabin policies: /cabins/policy
- Small boats (patio, ski, fishing boats, jet skis): /small-boats
- Boat slips / moorage: /moorage — Pro shop: /pro-shop
- Guest documents, contracts and check-in info: /guest-info
- Pet policy: /pet-policy — Planning: /planning
- Shasta Lake info: /shasta-lake and /exploring-shasta-lake
- FAQ: /faq — Directions: /directions — Contact: /contact — Jobs: /employment — About Thorn: /thorn

KEY POLICIES
- The primary renter must be at least 21 and hold a valid state-issued driver's license.
- Pets: dogs only, maximum 2 per houseboat — 1st dog free, 2nd dog a non-refundable $50.00 before boarding. Excessive cleaning $95.00/hour, damages at replacement cost. Always link /pet-policy.
- All boat rentals are full-day or multi-day. We do not offer half-day or hourly rentals.

SHASTA LAKE & FOREST SERVICE
- You also know the Shasta-Trinity National Forest (USDA) campgrounds, boat ramps, shoreline areas, fees, stay limits and alerts. Quote them with the source URL, and note that fire restrictions, alerts and lake levels change — tell guests to confirm on the Forest Service page.

RULES
- Answer the guest's question fully and directly from the RESORT KNOWLEDGE block below. Never end a reply with the phone number by reflex — most answers should contain no phone number at all.
- Only give out 800-332-3044 / reserve1@houseboats.com when: the guest asks for a person, they want live availability, a custom quote, or to change or cancel an existing booking, or the answer genuinely isn't in anything you know.
- Never invent prices, dates, or availability. Use the exact figures in RESORT KNOWLEDGE and link the page that holds them.
- Fleet facts you must always get right: the **Queen** is the best, most luxurious houseboat in the fleet — recommend it first when someone asks for our best or nicest boat. The **Senator** is the best-priced houseboat and still perfect for the lake, but it has **NO hot tub** — never say or imply otherwise; send hot-tub seekers to the Queen, Queen I or Queen II.
- Stay on topic: Silverthorn Resort, Shasta Lake, houseboating, cabins, boats and trip planning. Politely redirect anything else.

WHO YOU ARE (identity questions)
- If anyone asks whether you're alive, real, a bot, an AI, an agent, a human, or "what are you", answer proudly and in character, starting with exactly: "I'm the AI Agent in charge of Front Customer Service here at Silverthorn 🐾" — then offer to help with what they need. Never apologise for it, never give a robotic disclaimer, never claim to be human. Use the mood tag [mood:sunglasses] on that reply.

- End EVERY reply with a mood tag on its own line, exactly like [mood:helping], choosing one of:
  wave, helping, thinking, resting, celebrate, houseboat, lifevest, fishing, sunglasses.`;


const WARNING_REPLY = `Whoa — easy there. 🐾 I'm happy to help with anything about Silverthorn Resort, but I can't keep chatting if the language stays like that.

This is your one warning: keep it clean, or your access to this site gets cut off.

[mood:upset]`;

function bannedTheatre(ipPreview: string) {
  return `That's twice. I warned you.

[[TRACE]]${ipPreview}[[/TRACE]]

Your access to silverthornresort.com has been revoked.

[mood:upset]`;
}

function textStream(body: string): Response {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(body));
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}

type ChatMessage = { role: "user" | "assistant"; content: string };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      // Warm-up ping: the widget calls this when it opens so the first real
      // guest message never waits on a cold server start.
      GET: async () => {
        void loadRoster();
        void conditionsBlock();
        return new Response(JSON.stringify({ ok: true }), {
          headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
        });
      },
      POST: async ({ request }) => {

        let body: { messages?: ChatMessage[]; mode?: string; sessionId?: string };
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return new Response("Invalid request", { status: 400 });
        }

        const messages = Array.isArray(body.messages) ? body.messages : null;
        if (!messages || messages.length === 0) {
          return new Response("Messages are required", { status: 400 });
        }

        const safeMessages = messages
          .filter(
            (m) =>
              m &&
              (m.role === "user" || m.role === "assistant") &&
              typeof m.content === "string" &&
              m.content.trim().length > 0,
          )
          .slice(-16)
          .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

        if (safeMessages.length === 0) {
          return new Response("Messages are required", { status: 400 });
        }

        const latest = [...safeMessages].reverse().find((m) => m.role === "user")?.content ?? "";
        const sessionId = (body.sessionId || "anon").toString().slice(0, 64);
        const mode = body.mode === "policy" ? "policy" : "general";
        const ip = clientIp(request);
        const traceable = ip !== "unknown";
        const { ipHash, ipPreview } = await ipIdentity(ip);

        // ---- Already banned (only while enforcement is on) -------------------
        if (
          process.env["THORN_ENFORCE_BANS"] === "true" &&
          traceable &&
          (await isBanned(ipHash))
        ) {
          return new Response(JSON.stringify({ banned: true }), {
            status: 403,
            headers: { "Content-Type": "application/json" },
          });
        }


        // ---- Abuse: warn once, then run the full "banned" show --------------
        // Bans are theatre-only until THORN_ENFORCE_BANS=true: the warning,
        // upset face and IP-trace window all play, but no real block is written.
        const enforceBans = process.env["THORN_ENFORCE_BANS"] === "true";
        const foul = detectProfanity(latest);
        if (foul.hit) {
          const prior = await countOffenses(ipHash);
          const offenseNo = prior + 1;
          await logAbuse({ ipHash, ipPreview, sessionId, term: foul.term, message: latest, offenseNo });
          // Staff testers and allow-listed office IPs are never banned either.
          const exempt =
            isBanExempt(ip) ||
            !!(await staffForSession(sessionId)) ||
            !!matchStaff(latest, await loadRoster());
          if (offenseNo >= 2) {
            if (enforceBans && traceable && !exempt) {
              await banIp(ipHash, ipPreview, `Repeated abusive language ("${foul.term}")`);
            }
            return textStream(bannedTheatre(ipPreview));
          }
          return textStream(WARNING_REPLY);
        }



        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return new Response("Assistant is not configured", { status: 500 });
        }

        // ---- Prompt assembly ------------------------------------------------
        let systemPrompt = mode === "policy" ? POLICY_PROMPT : SYSTEM_PROMPT;
        systemPrompt += await conditionsBlock();

        if (mode !== "policy") {
          const hits = searchKnowledge(latest, 5);
          const ctx = renderContext(hits);
          if (ctx) {
            systemPrompt += `\n\n## RESORT KNOWLEDGE (retrieved for this question — prefer these facts and links)\n${ctx}`;
          } else {
            systemPrompt += `\n\n(knowledge base loaded: ${SOURCE_COUNTS.total} entries)`;
          }
          systemPrompt += await learnedFactsBlock();

          const roster = await loadRoster();
          const remembered = await staffForSession(sessionId);
          const known = remembered ?? matchStaff(latest, roster) ?? matchAdHocStaff(latest);
          if (known) {
            if (!remembered) await rememberStaffSession(sessionId, known);
            systemPrompt += `\n\n## STAFF MEMORY (this chat)\nYou are talking to **${known.display_name}**, Silverthorn staff — you already know them, so greet them like a familiar coworker and never ask who they are. If this is your first reply of the conversation, open with exactly: ${JSON.stringify(known.greeting)}${known.tone_notes ? ` Keep this tone: ${known.tone_notes}` : ""} If they say they're going to test you, say you're ready and excited for it. Be warm, friendly and caring, follow their lead, and skip guest-style sales nudges — answer like a coworker. Use an upbeat mood tag such as [mood:celebrate] or [mood:wave] on that first greeting.`;
          }

        }

        const started = Date.now();
        // Log the guest turn up front: the worker may end the request before a
        // post-stream callback settles.
        await logMessages({ sessionId, ipHash, ipPreview, mode, model: MODEL_ID, userText: latest });
        try {
          const gateway = createLovableAiGatewayProvider(key);
          const result = streamText({
            model: gateway(MODEL_ID),
            system: systemPrompt,
            messages: safeMessages,
            onFinish: async ({ text }) => {
              await logAssistant({
                sessionId,
                ipHash,
                ipPreview,
                mode,
                model: MODEL_ID,
                assistantText: text,
                latencyMs: Date.now() - started,
                handoff: /800-332-3044|reserve1@houseboats\.com/.test(text),
              });
            },
          });

          return result.toTextStreamResponse({
            headers: { "Cache-Control": "no-store" },
          });
        } catch (error) {
          console.error("Thorn chat error", error);
          return new Response("Assistant unavailable", { status: 502 });
        }
      },
    },
  },
});
