import { useEffect, useState } from 'react';

const TICKER_ITEMS = [
  '⚠ EXCUSE LEVELS: CRITICAL',
  '🔴 PLAUSIBILITY INDEX: COMPROMISED',
  '📡 ALIBI GENERATOR: ONLINE AND UNETHICAL',
  '🚨 DUCK INCIDENT STILL UNDER INVESTIGATION',
  '⚡ MERCURY IN RETROGRADE: TRAVEL NOT ADVISED',
  '🔒 THIS APP IS CLASSIFIED: EYES ONLY',
  '📋 FOR ENTERTAINMENT AND COWARDICE ONLY',
  '🌀 EXCUSE DATABASE: FULLY OPERATIONAL',
  '⚠ DO NOT FORWARD TO HR',
  '🧠 ETHICAL SUBROUTINES: BYPASSED',
  '📎 LEGAL DISCLAIMER: SOMEWHERE IN THE FINE PRINT',
  '🛰 ALIBI SATELLITE: UPLINK NOMINAL',
  '🎭 CONFIDENCE LEVELS: DANGEROUSLY HIGH',
  '🔥 BELIEVABILITY ENGINE: RUNNING HOT',
];

const SYS_METRICS = [
  { label: 'CPU',     value: 'PANICKING'    },
  { label: 'MEMORY',  value: 'FULL OF REGRET' },
  { label: 'UPTIME',  value: '14 YRS 0 DAYS' },
  { label: 'MOOD',    value: 'UNHINGED'     },
];

export default function Header() {
  const [tick, setTick]       = useState(0);
  const [metricIdx, setMetricIdx] = useState(0);

  useEffect(() => {
    const clock = setInterval(() => setTick((t) => t + 1), 1000);
    const cycle = setInterval(() => setMetricIdx((i) => (i + 1) % SYS_METRICS.length), 2200);
    return () => { clearInterval(clock); clearInterval(cycle); };
  }, []);

  const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
  const metric  = SYS_METRICS[metricIdx];

  return (
    <header className="w-full border-b-2 border-[#ff2d78] bg-[#0a0a0f] animate-flicker">

      {/* ── Top status bar ── */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#ff2d78]/10 border-b border-[#ff2d78]/30 text-[10px] font-mono-nice text-[#ff2d78]">
        <div className="flex items-center gap-3">
          <span className="animate-blink font-bold">● LIVE</span>
          <span className="hidden sm:inline text-[#ff2d78]/40">|</span>
          <span className="hidden sm:inline text-[#ff2d78]/60 tracking-widest">EXCUSE-ME-PLS OPS CENTER — TERMINAL v4.2.0</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1 text-[#ff2d78]/50">
            <span className="animate-blink-slow">{metric.label}:</span>
            <span className="text-[#ffe600]/70 font-bold animate-counter-pop" key={metricIdx}>{metric.value}</span>
          </span>
          <span className="text-[#ff2d78]/40">|</span>
          <span className="tabular-nums font-bold">{timeStr}</span>
        </div>
      </div>

      {/* ── Main header ── */}
      <div className="flex flex-col items-center py-8 px-4 relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(#00ff88 1px, transparent 1px), linear-gradient(90deg, #00ff88 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Corner system labels */}
        <div className="absolute top-3 left-3 text-[9px] font-mono-nice text-[#00ff88]/30 hidden sm:flex flex-col gap-0.5">
          <span>SYS:OK</span>
          <span>EXC:RDY</span>
          <span className="animate-blink-slow">PWR:ON</span>
        </div>
        <div className="absolute top-3 right-3 text-[9px] font-mono-nice text-[#00ff88]/30 hidden sm:flex flex-col items-end gap-0.5">
          <span>GRID:LOCKED</span>
          <span>AUTH:BYPASSED</span>
          <span className="animate-blink-slow">SYNC:OK</span>
        </div>

        {/* Logo */}
        <div className="relative z-10 text-center">
          <div className="inline-block">
            <span
              className="font-emergency text-5xl sm:text-7xl text-[#00ff88] crt-glow glitch-wrap animate-float"
              data-text="EXCUSE ME PLS"
            >
              EXCUSE ME PLS
            </span>
          </div>

          {/* Subtitle with flanking warnings */}
          <div className="mt-3 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-[9px] font-mono-nice text-[#ff2d78]/50 border border-[#ff2d78]/20 rounded px-1.5 py-0.5 hidden sm:inline">
              ⚠ CAUTION
            </span>
            <span className="font-mono-nice text-[#ffe600] text-sm sm:text-base tracking-widest uppercase crt-glow">
              ⚡ Professional Alibi Generation System ⚡
            </span>
            <span className="text-[9px] font-mono-nice text-[#ff2d78]/50 border border-[#ff2d78]/20 rounded px-1.5 py-0.5 hidden sm:inline">
              ⚠ CAUTION
            </span>
          </div>

          <div className="mt-2 text-[#666] text-xs font-mono-nice max-w-sm mx-auto leading-relaxed">
            Powered by desperation, caffeine, and{' '}
            <span className="text-[#ff2d78] animate-blink-slow">questionable reasoning</span>
            <br className="hidden sm:block" />
            <span className="text-[#444]"> — NOT A SUBSTITUTE FOR ACTUAL ACCOUNTABILITY</span>
          </div>
        </div>

        {/* Status badges */}
        <div className="relative z-10 flex flex-wrap gap-2 mt-6 justify-center">
          {[
            { label: 'EXCUSES DEPLOYED',  value: `${1337 + tick * 3}`,   color: 'neon-border-green',  textColor: 'text-[#00ff88]' },
            { label: 'HR COMPLAINTS',     value: '0  (claimed)',          color: 'neon-border-green',  textColor: 'text-[#00ff88]' },
            { label: 'ABSURDITY LEVEL',   value: 'MAXIMUM',               color: 'neon-border-yellow', textColor: 'text-[#ffe600]' },
            { label: 'LEGAL EXPOSURE',    value: 'MODERATE',              color: 'neon-border-pink',   textColor: 'text-[#ff2d78]' },
          ].map((b) => (
            <div key={b.label} className={`${b.color} bg-black/30 rounded px-3 py-1.5 text-center min-w-[90px]`}>
              <div className="text-[9px] text-[#444] font-mono-nice tracking-widest mb-0.5">{b.label}</div>
              <div className={`text-sm font-emergency tabular-nums ${b.textColor}`}>{b.value}</div>
            </div>
          ))}
        </div>

        {/* Threat level bar */}
        <div className="relative z-10 mt-5 flex items-center gap-3">
          <span className="text-[9px] font-mono-nice text-[#444] tracking-widest uppercase">Threat Level</span>
          <div className="flex gap-1">
            {['bg-[#00ff88]','bg-[#ffe600]','bg-[#ff8c00]','bg-[#ff2d78]','bg-[#ff2d78]'].map((c, i) => (
              <div key={i} className={`w-5 h-3 rounded-sm ${i < 4 ? c : 'bg-[#ff2d78]'} ${i === 3 ? 'animate-blink' : ''}`} />
            ))}
          </div>
          <span className="text-[9px] font-mono-nice text-[#ff2d78] font-bold tracking-widest animate-blink-slow">ELEVATED</span>
        </div>
      </div>

      {/* ── Ticker tape ── */}
      <div className="overflow-hidden border-t border-[#ff2d78]/20 bg-[#ff2d78]/5 py-1.5">
        <div className="animate-ticker whitespace-nowrap text-[11px] font-mono-nice text-[#ff2d78]/60">
          {TICKER_ITEMS.join('    ◆    ')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{TICKER_ITEMS.join('    ◆    ')}
        </div>
      </div>
    </header>
  );
}
