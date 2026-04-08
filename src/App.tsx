import { useState, useRef } from 'react';
import type { Category, Mode, Excuse } from './types';
import { generateExcuse } from './utils/generateExcuse';
import Header from './components/Header';
import ScenarioSelector from './components/ScenarioSelector';
import ModeSelector from './components/ModeSelector';
import GenerateButton from './components/GenerateButton';
import ExcuseCard from './components/ExcuseCard';
import CustomModal from './components/CustomModal';

const ERROR_MESSAGES: Record<string, string> = {
  NO_API_KEY:  'No API key found. Create a .env file with VITE_GROQ_API_KEY=gsk_... then restart the dev server.',
  INVALID_KEY: 'API key rejected. Double-check your VITE_GROQ_API_KEY in .env.',
  RATE_LIMIT:  'Rate limit hit. Wait a moment and try again.',
};
const FALLBACK_ERROR = 'Excuse generation failed. The AI is probably also late to work.';

export default function App() {
  const [category, setCategory]               = useState<Category | null>(null);
  const [mode, setMode]                       = useState<Mode>('risky');
  const [excuse, setExcuse]                   = useState<Excuse | null>(null);
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState<string | null>(null);
  const [shakeKey, setShakeKey]               = useState(0);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customSituation, setCustomSituation] = useState<string | null>(null);
  const abortRef                              = useRef<AbortController | null>(null);

  function handleCategorySelect(cat: Category) {
    setCategory(cat);
    if (cat !== 'general') setCustomSituation(null);
  }

  function handleCustomConfirm(situation: string) {
    setCustomSituation(situation);
    setCategory('general');
    setShowCustomModal(false);
  }

  async function generate() {
    if (!category) {
      setShakeKey((k) => k + 1);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const result = await generateExcuse(
        category,
        mode,
        controller.signal,
        category === 'general' && customSituation ? customSituation : undefined,
      );
      setExcuse(result);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      const code = err instanceof Error ? err.message : '';
      setError(ERROR_MESSAGES[code] ?? FALLBACK_ERROR);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8 space-y-8">

        <section key={`shake-${shakeKey}`} className={shakeKey > 0 ? 'animate-shake' : ''}>
          <ScenarioSelector
            selected={category}
            customSituation={customSituation}
            onSelect={handleCategorySelect}
            onCustomClick={() => setShowCustomModal(true)}
          />
          {shakeKey > 0 && (
            <p className="mt-2 text-center text-xs font-mono-nice text-[#ff2d78] animate-blink">
              ⚠ Select a disaster category first, operator.
            </p>
          )}
        </section>

        <section>
          <ModeSelector selected={mode} onSelect={setMode} />
        </section>

        <section>
          <GenerateButton onGenerate={generate} loading={loading} hasResult={!!excuse} />
        </section>

        {error && !loading && (
          <div className="neon-border-pink rounded-lg p-4 text-center space-y-1">
            <div className="text-[#ff2d78] font-emergency text-sm">⚠ UPLINK FAILURE</div>
            <div className="text-xs font-mono-nice text-[#ff2d78]/70">{error}</div>
          </div>
        )}

        {excuse && !loading && !error && (
          <section key={excuse.id}>
            <ExcuseCard excuse={excuse} />
          </section>
        )}

        {!excuse && !loading && !error && (
          <div className="text-center py-4 space-y-2">
            <div className="text-4xl animate-float">🎭</div>
            <p className="text-xs font-mono-nice text-[#333]">Your alibi will appear here. It will be professional.</p>
            <p className="text-xs font-mono-nice text-[#2a2a2a]">(It will not be professional.)</p>
          </div>
        )}
      </main>

      <footer className="border-t border-[#1e1e2e] py-4 px-4 text-center space-y-1">
        <div className="text-[10px] font-mono-nice text-[#2a2a2a] tracking-widest uppercase">
          Excuse Me Pls — Professional Alibi Generation System — v1.0.0
        </div>
        <div className="text-[10px] font-mono-nice text-[#222]">
          Not responsible for terminated employment, ended friendships, or paradoxical time loops.
        </div>
      </footer>

      {showCustomModal && (
        <CustomModal
          onConfirm={handleCustomConfirm}
          onCancel={() => setShowCustomModal(false)}
        />
      )}
    </div>
  );
}
