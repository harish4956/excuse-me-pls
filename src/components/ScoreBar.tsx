import { useEffect, useRef, useState } from 'react';
import { scoreLabel } from '../utils/excuseEngine';

interface Props {
  type: 'believability' | 'absurdity';
  value: number;
}

const BELIEVABILITY_GRADIENT = 'linear-gradient(90deg, #ff2d78 0%, #ffe600 50%, #00ff88 100%)';
const ABSURDITY_GRADIENT     = 'linear-gradient(90deg, #00ff88 0%, #ffe600 40%, #ff2d78 100%)';

export default function ScoreBar({ type, value }: Props) {
  const barRef          = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const pct   = Math.round((value / 10) * 100);
  const label = scoreLabel(value, type);
  const isB   = type === 'believability';

  useEffect(() => {
    if (!barRef.current) return;
    barRef.current.style.setProperty('--score-w', `${pct}%`);
    // Small delay so animation fires after mount
    const t = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(t);
  }, [pct]);

  const severityColor = isB
    ? (value >= 7 ? 'text-[#00ff88] border-[#00ff88]/40 bg-[#00ff88]/5'
      : value >= 4 ? 'text-[#ffe600] border-[#ffe600]/40 bg-[#ffe600]/5'
      : 'text-[#ff2d78] border-[#ff2d78]/40 bg-[#ff2d78]/5')
    : (value >= 7 ? 'text-[#ff2d78] border-[#ff2d78]/40 bg-[#ff2d78]/5'
      : value >= 4 ? 'text-[#ffe600] border-[#ffe600]/40 bg-[#ffe600]/5'
      : 'text-[#00ff88] border-[#00ff88]/40 bg-[#00ff88]/5');

  return (
    <div className="space-y-1.5">
      {/* Label row */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-mono-nice tracking-widest text-[#555] uppercase">
          {isB ? '📊 Believability' : '🌀 Absurdity'}
        </span>
        <div className="flex items-center gap-2">
          <span className={`text-[9px] font-mono-nice font-bold border rounded px-1.5 py-0.5 ${severityColor}`}>
            {label}
          </span>
          <span className={`font-emergency text-lg tabular-nums ${isB ? 'text-[#00ff88]' : 'text-[#ff2d78]'} ${ready ? 'animate-counter-pop' : 'opacity-0'}`}>
            {value}/10
          </span>
        </div>
      </div>

      {/* Track */}
      <div className="h-4 bg-[#080810] rounded border border-[#1e1e2e] overflow-visible relative">
        {/* Tick marks */}
        <div className="absolute inset-0 flex overflow-hidden rounded" style={{ pointerEvents: 'none' }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="flex-1 border-r border-[#1a1a24]" />
          ))}
        </div>

        {/* Fill */}
        <div
          ref={barRef}
          className="score-bar-fill h-full rounded relative overflow-hidden"
          style={{ background: isB ? BELIEVABILITY_GRADIENT : ABSURDITY_GRADIENT }}
        >
          {/* Sheen */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent" />
        </div>

        {/* Pulsing cursor at fill end */}
        {ready && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white animate-pulse-dot"
            style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
          />
        )}
      </div>
    </div>
  );
}
