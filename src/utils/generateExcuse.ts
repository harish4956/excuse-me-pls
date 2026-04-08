import type { Excuse, Category, Mode } from '../types';

// ── Prompt data ───────────────────────────────────────────────────────────────

const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  late_work:       'arriving late to work or the office',
  missed_deadline: 'missing a deadline or failing to deliver something on time',
  skipping_plans:  'cancelling or skipping social plans with someone',
  late_reply:      'replying very late to a message or email',
  school:          'a school situation such as missing class, late homework, or absence',
  general:         'a general situation requiring an excuse',
};

const MODE_DESCRIPTIONS: Record<Mode, string> = {
  believable: 'GENUINE tone — sincere, realistic, and actually plausible. Something a real person might believably say. No jokes. Believability 7–10, absurdity 1–3.',
  risky:      'FUNNY tone — comedic and absurd, delivered with total unearned confidence. Funny but not mean. Believability 3–6, absurdity 6–8.',
  unhinged:   'DARK tone — darkly comedic, cynical, slightly unsettling, and chaotic. Embrace bleak humour and grim scenarios. Believability 1–3, absurdity 8–10.',
};

const SYSTEM_PROMPT = `You are a comedy writer specialising in generating funny, creative excuses.
Respond ONLY with a valid JSON object — no markdown, no explanation, no code fences.
The JSON must have exactly these fields:
- "text": string — the excuse in first person, 1–3 sentences, specific and funny, not generic
- "believability": integer 1–10
- "absurdity": integer 1–10
- "fakeEvidence": string or null — one-line description of fake supporting evidence (receipt, photo, document), or null`;

// ── Types ─────────────────────────────────────────────────────────────────────

interface AIResponse {
  text?: string;
  believability?: number;
  absurdity?: number;
  fakeEvidence?: string | null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function clamp(n: number, min = 1, max = 10): number {
  return Math.min(max, Math.max(min, Math.round(n)));
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function generateExcuse(
  category: Category,
  mode: Mode,
  signal?: AbortSignal,
  customSituation?: string,
): Promise<Excuse> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY as string | undefined;
  if (!apiKey) throw new Error('NO_API_KEY');

  const situation = customSituation
    ? `the following specific situation: "${customSituation}"`
    : CATEGORY_DESCRIPTIONS[category];

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    signal,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      temperature: 1.1,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user',   content: `Generate a ${MODE_DESCRIPTIONS[mode]} excuse for: ${situation}.` },
      ],
    }),
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error('INVALID_KEY');
    if (response.status === 429) throw new Error('RATE_LIMIT');
    throw new Error(`API_ERROR:${response.status}`);
  }

  const data    = await response.json();
  const content = data.choices?.[0]?.message?.content ?? '';

  let parsed: AIResponse;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error('PARSE_ERROR');
  }

  if (!parsed.text || typeof parsed.believability !== 'number' || typeof parsed.absurdity !== 'number') {
    throw new Error('INVALID_SHAPE');
  }

  return {
    id:            `ai-${Date.now()}`,
    category,
    mode,
    text:          parsed.text,
    believability: clamp(parsed.believability),
    absurdity:     clamp(parsed.absurdity),
    fakeEvidence:  parsed.fakeEvidence ?? undefined,
  };
}
