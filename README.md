# EXCUSE ME PLS
### Professional Alibi Generation System — v1.0.0

> "For entertainment and cowardice only."

An AI-powered excuse generator built like a fake emergency operations dashboard. Pick a disaster category, choose a tone, and deploy your alibi.

---

## Stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Groq API** — `llama-3.1-8b-instant` for excuse generation

---

## Setup & Run

1. Get a free API key at [console.groq.com](https://console.groq.com)
2. Create a `.env` file:

```env
VITE_GROQ_API_KEY=gsk_...your-key-here...
```

3. Install and run:

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
  types/index.ts              # Category, Mode, Excuse types
  utils/
    generateExcuse.ts         # Groq API call + prompt construction
    excuseEngine.ts           # Score labels + confidence taglines
  components/
    Header.tsx                # Live ticker, glitch logo, fake status badges
    ScenarioSelector.tsx      # 6 disaster categories
    ModeSelector.tsx          # Genuine / Funny / Dark tone selector
    GenerateButton.tsx        # Dramatic animated deploy button
    ExcuseCard.tsx            # Result card with scores, evidence, copy
    ScoreBar.tsx              # Animated score meters
    CustomModal.tsx           # Custom situation input modal
  App.tsx
  main.tsx
  index.css                   # Custom animations, CRT effects, neon borders
```

---

## How to use

1. Pick a scenario — **Late to Work**, **Missed Deadline**, **Skipping Plans**, **Late Reply**, **School Excuse**, or **Custom Situation**
2. Pick a tone:
   - **Genuine** — sincere and plausible
   - **Funny** — absurd with unearned confidence
   - **Dark** — chaotic and unhinged
3. Click **DEPLOY EXCUSE** — watch the dramatic loading sequence
4. Read your excuse, check the believability and absurdity scores
5. Hit **COPY THIS ALIBI** to copy it

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
}
```

---

*Not responsible for terminated employment, ended friendships, or paradoxical time loops.*
