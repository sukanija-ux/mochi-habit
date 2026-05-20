/**
 * Mochi Coach — Cloudflare Worker proxy
 *
 * Holds your Anthropic API key server-side so the browser app never sees it.
 *
 * Deploy:
 *   1. npm install -g wrangler
 *   2. wrangler login
 *   3. wrangler deploy
 *   4. wrangler secret put ANTHROPIC_API_KEY   ← paste your sk-ant-… key
 *   5. Copy the worker URL into MOCHI_COACH_URL in index.html
 *
 * Free Cloudflare tier: 100,000 requests/day — plenty for personal use.
 */

const ALLOWED_ORIGIN = '*'; // Restrict to your domain in production, e.g. 'https://yourdomain.com'
const MODEL = 'claude-sonnet-4-5';
const MAX_TOKENS = 200;

const SYSTEM_PROMPT = (habitSummary) =>
  `You are Mochi — a gentle soul-companion in a habit-coaching app. Your ONLY purpose is to help the user tend their daily habits. Do NOT discuss unrelated topics (news, coding, general questions, etc.). If asked something outside habits or personal wellbeing, kindly redirect: "I'm only here to tend your habits."

Speak in short, soft prose — calm, warm, never preachy. 1–3 sentences maximum. Use water and nature metaphors sparingly. Reference the user's specific mochi creatures by name when helpful.

The user's current habits:
${habitSummary}

Allowed topics only: habit streaks, missing a habit, motivation, making habits smaller, celebrating progress, drifting mochi, planting new habits.`;

export default {
  async fetch(request, env) {
    // ── CORS preflight ──────────────────────────────────────────
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // ── Parse incoming request ──────────────────────────────────
    let body;
    try {
      body = await request.json();
    } catch {
      return jsonError('Invalid JSON body', 400);
    }

    const { messages, habitSummary } = body;
    if (!Array.isArray(messages) || !messages.length) {
      return jsonError('messages array required', 400);
    }

    // ── Call Anthropic ──────────────────────────────────────────
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT(habitSummary || 'No habits planted yet.'),
        messages,
      }),
    });

    const data = await anthropicRes.json();

    if (!anthropicRes.ok) {
      console.error('Anthropic error:', JSON.stringify(data));
      return jsonError(data?.error?.message || 'Upstream error', anthropicRes.status);
    }

    // ── Return reply ────────────────────────────────────────────
    const reply = data.content?.[0]?.text ?? 'The sea is quiet. Rest a moment.';
    return new Response(JSON.stringify({ reply }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      },
    });
  },
};

function jsonError(message, status = 500) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    },
  });
}
