# EXCUSE ME PLS
### Professional Alibi Generation System — v1.0.0

> "For entertainment and cowardice only."

A hilariously over-the-top excuse generator built like a fake emergency operations dashboard.

---

## Stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- No backend. No database. No auth. No nonsense.

---

## Setup & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build    # production build
npm run preview  # preview production build locally
```

---

## Project Structure

```
src/
  data/excuses.ts          # 45 excuse templates with metadata
  types/index.ts           # TypeScript types
  utils/excuseEngine.ts    # random pick + score labels
  components/
    Header.tsx             # Live ticker, glitch logo, fake status badges
    ScenarioSelector.tsx   # 6 disaster categories
    ModeSelector.tsx       # Believable / Risky / Unhinged
    GenerateButton.tsx     # Dramatic animated deploy button
    ExcuseCard.tsx         # Result card with scores, evidence, copy
    ScoreBar.tsx           # Animated score meters
  App.tsx
  main.tsx
  index.css                # Custom animations, CRT effects, neon borders
```

---

## How to test the main flow

1. Pick a scenario (e.g. "Late to Work")
2. Pick a risk mode (Believable / Risky / Unhinged)
3. Click **DEPLOY EXCUSE** — watch the dramatic loading sequence
4. Read your excuse, check the believability and absurdity scores
5. Hit **COPY THIS ALIBI** — a "COPIED / DEPLOY NOW" stamp animates in
6. Click **DEPLOY ANOTHER** to get a fresh one

**Edge case:** Clicking DEPLOY without selecting a scenario shakes the selector and shows an error.

---

## Excuse data model

```ts
interface Excuse {
  id: string;
  category: 'late_work' | 'missed_deadline' | 'skipping_plans' | 'late_reply' | 'school' | 'general';
  mode: 'believable' | 'risky' | 'unhinged';
  text: string;
  believability: number;  // 1–10
  absurdity: number;      // 1–10
  fakeEvidence?: string;
  audienceFit?: Audience[];
}
```

Add more excuses to `src/data/excuses.ts` — no other changes needed.

---

*Not responsible for terminated employment, ended friendships, or paradoxical time loops.*
