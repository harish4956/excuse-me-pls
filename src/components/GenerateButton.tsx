import { useState, useEffect, useRef } from 'react';

interface Props {
  onGenerate: () => void;
  loading: boolean;
  hasResult: boolean;
}

const LOADING_LINES = [
  'Consulting the excuse archive…',
  'Cross-referencing plausibility database…',
  'Calibrating absurdity coefficient…',
  'Bypassing ethical subroutines…',
  'Negotiating with the truth…',
  'Forging supporting documents…',
  'Contacting fictional witnesses…',
  'Deploying alibi payload…',
];

const PRE_WARNINGS = [
  'WARNING: THIS ACTION CANNOT BE UNSEEN BY HR',
  'CAUTION: ETHICAL REVIEW BYPASSED',
  'ADVISORY: NO REFUNDS ON BAD EXCUSES',
  'NOTICE: RESULTS MAY EXCEED RECOMMENDED ABSURDITY',
];

export default function GenerateButton({ onGenerate, loading, hasResult }: Props) {
  const [lineIdx, setLineIdx]   = useState(0);
  const [progress, setProgress] = useState(0);
  // Stable warning — pick once on mount, never changes
  const warningIdx              = useRef(Math.floor(Math.random() * PRE_WARNINGS.length));
  // Track whether a progress run was started so we can snap to 100% on completion
  const progressWasActive       = useRef(false);

  useEffect(() => {
    if (loading) {
      progressWasActive.current = true;
      setProgress(0);
      let p = 0;
      const id = setInterval(() => {
        // Fast early, crawls near 88% — never reaches 100 until the request resolves
        const step = p < 40 ? 4 : p < 70 ? 2 : p < 85 ? 0.8 : 0.1;
        p = Math.min(p + step, 88);
        setProgress(p);
      }, 80);
      return () => clearInterval(id);
    } else if (progressWasActive.current) {
      progressWasActive.current = false;
      setProgress(100);
      const t = setTimeout(() => setProgress(0), 600);
      return () => clearTimeout(t);
    }
  }, [loading]);

  function handleClick() {
    if (loading) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setLineIdx(i % LOADING_LINES.length);
      if (i >= LOADING_LINES.length) clearInterval(id);
    }, 260);
    onGenerate();
    return () => clearInterval(id);
  }

  return (
    <div className="flex flex-col items-center gap-2">

      {/* Pre-flight warning */}
      <div className="w-full max-w-sm flex items-center justify-center gap-2 mb-1">
        <div className="h-px flex-1 bg-[#ff2d78]/20" />
        <span className="text-[9px] font-mono-nice text-[#ff2d78]/40 tracking-widest text-center">
          {PRE_WARNINGS[warningIdx.current]}
        </span>
        <div className="h-px flex-1 bg-[#ff2d78]/20" />
      </div>

      {/* THE BUTTON */}
      <button
        onClick={handleClick}
        disabled={loading}
        className={`
          relative w-full max-w-sm py-5 px-8 rounded-xl overflow-hidden
          font-emergency text-xl sm:text-2xl tracking-wider uppercase
          transition-all duration-150 cursor-pointer btn-press border-2
          ${loading
            ? 'border-[#ff2d78]/40 bg-[#1a0010] text-[#ff2d78]/60 cursor-wait'
            : 'border-[#ff2d78] bg-gradient-to-br from-[#2a0018] to-[#160008] text-[#ff2d78] animate-pulse-glow hover:from-[#3d0022] hover:to-[#1a000e]'
          }
        `}
      >
        {/* Scanlines */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,45,120,0.8) 3px, rgba(255,45,120,0.8) 4px)',
        }} />

        <span className="absolute top-1.5 left-2 text-[10px] font-mono-nice text-[#ff2d78]/30">▸▸▸</span>
        <span className="absolute top-1.5 right-2 text-[10px] font-mono-nice text-[#ff2d78]/30">◂◂◂</span>
        <span className="absolute bottom-1.5 left-2 text-[9px] font-mono-nice text-[#ff2d78]/20">SYS:RDY</span>
        <span className="absolute bottom-1.5 right-2 text-[9px] font-mono-nice text-[#ff2d78]/20">v4.2.0</span>

        {/* Progress bar along the bottom edge */}
        {progress > 0 && (
          <div
            className="absolute bottom-0 left-0 h-0.5 bg-[#ff2d78] transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        )}

        <span className="relative z-10 crt-glow">
          {loading ? '⏳ GENERATING…' : hasResult ? '🔄 DEPLOY ANOTHER' : '🚀 DEPLOY EXCUSE'}
        </span>
      </button>

      {/* Loading status */}
      {loading && (
        <div className="w-full max-w-sm space-y-2">
          <div className="font-mono-nice text-xs text-[#ffe600] animate-blink-slow text-center">
            {LOADING_LINES[lineIdx]}
          </div>
          <div className="flex items-center gap-2 px-1">
            <div className="flex-1 h-1.5 bg-[#1a0010] rounded overflow-hidden border border-[#ff2d78]/20">
              <div
                className="h-full bg-gradient-to-r from-[#ff2d78] to-[#ffe600] transition-all duration-100 rounded"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] font-mono-nice text-[#ff2d78]/50 tabular-nums w-8 text-right">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="text-[10px] font-mono-nice text-[#333] text-center">
            Do not close this tab. Or do. We can't stop you.
          </div>
        </div>
      )}

      {/* Microcopy */}
      {!loading && (
        <div className="text-[11px] text-[#3a3a3a] font-mono-nice text-center max-w-xs leading-relaxed">
          {hasResult
            ? '"Spin again but worse" — anonymous user review ★★★★☆'
            : 'By clicking you agree to assume full responsibility for consequences'}
        </div>
      )}
    </div>
  );
}
