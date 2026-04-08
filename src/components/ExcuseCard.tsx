import { useState } from 'react';
import type { Excuse } from '../types';
import { getConfidenceTagline } from '../utils/excuseEngine';
import ScoreBar from './ScoreBar';

const CATEGORY_LABELS: Record<string, string> = {
  late_work:        'LATE TO WORK',
  missed_deadline:  'MISSED DEADLINE',
  skipping_plans:   'SKIPPING PLANS',
  late_reply:       'LATE REPLY',
  school:           'SCHOOL EXCUSE',
  general:          'CUSTOM SITUATION',
};

const MODE_META: Record<string, { label: string; color: string; icon: string }> = {
  believable: { label: 'GENUINE',   color: 'text-[#00ff88] border-[#00ff88]/50 bg-[#00ff88]/10', icon: '🤝' },
  risky:      { label: 'FUNNY',     color: 'text-[#ffe600] border-[#ffe600]/50 bg-[#ffe600]/10', icon: '😂' },
  unhinged:   { label: 'DARK',      color: 'text-[#ff2d78] border-[#ff2d78]/50 bg-[#ff2d78]/10', icon: '💀' },
};

// Deployment checklist — funny pre-flight items
const CHECKLIST = [
  'Plausible deniability: confirmed',
  'Facial expression: calibrated',
  'Backup story: loaded',
  'Exit strategy: not required (probably)',
];

function getThreatBadge(believability: number, absurdity: number): { label: string; color: string } {
  const risk = absurdity - believability;
  if (risk >= 5)  return { label: 'THREAT: MAXIMUM',   color: 'text-[#ff2d78] border-[#ff2d78]/50 bg-[#ff2d78]/10' };
  if (risk >= 2)  return { label: 'THREAT: ELEVATED',  color: 'text-[#ff8c00] border-[#ff8c00]/50 bg-[#ff8c00]/10' };
  if (risk >= 0)  return { label: 'THREAT: MODERATE',  color: 'text-[#ffe600] border-[#ffe600]/50 bg-[#ffe600]/10' };
  return           { label: 'THREAT: CONTAINED',  color: 'text-[#00ff88] border-[#00ff88]/50 bg-[#00ff88]/10' };
}

function getExpiry(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
}

const JURISDICTIONS = [
  'INTERNATIONAL WATERS',
  'TIMEZONE GMT+DENIAL',
  'COUNTY OF PLAUSIBLE',
  'DISTRICT OF REASONABLE DOUBT',
  'PROVINCE OF BARELY LEGAL',
];

/** Stable index into a list derived from an arbitrary string. */
function stableIndex(str: string, listLength: number): number {
  const hash = str.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return hash % listLength;
}

interface Props {
  excuse: Excuse;
}

export default function ExcuseCard({ excuse }: Props) {
  const [copied, setCopied]             = useState(false);
  const [stampVisible, setStampVisible] = useState(false);

  const tagline    = getConfidenceTagline(excuse.believability, excuse.absurdity);
  const modeMeta   = MODE_META[excuse.mode];
  const threat     = getThreatBadge(excuse.believability, excuse.absurdity);
  const expiry     = getExpiry();
  const jurisdiction = JURISDICTIONS[stableIndex(excuse.id, JURISDICTIONS.length)];

  async function handleCopy() {
    await navigator.clipboard.writeText(excuse.text);
    setCopied(true);
    setStampVisible(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="animate-slide-up relative">
      <div className="relative rounded-xl border-2 border-[#1e1e2e] bg-[#0e0e16] overflow-hidden">

        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#ff2d78] via-[#ffe600] to-[#00ff88]" />

        {/* ── Card header ── */}
        <div className="flex items-start justify-between px-4 pt-4 pb-3 border-b border-[#1e1e2e]">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] font-mono-nice tracking-widest text-[#444] uppercase border border-[#2a2a2a] rounded px-1.5 py-0.5">
                {CATEGORY_LABELS[excuse.category]}
              </span>
              <span className={`text-[9px] font-mono-nice font-bold border rounded px-1.5 py-0.5 ${modeMeta.color}`}>
                {modeMeta.icon} {modeMeta.label}
              </span>
              <span className={`text-[9px] font-mono-nice font-bold border rounded px-1.5 py-0.5 ${threat.color}`}>
                {threat.label}
              </span>
            </div>
            <div className="text-[9px] font-mono-nice text-[#2a2a2a] flex items-center gap-2">
              <span>ALIBI #{excuse.id.toUpperCase()}</span>
              <span>—</span>
              <span className="text-[#ff2d78]/40">EYES ONLY</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="animate-blink text-[10px] font-mono-nice text-[#ff2d78] font-bold">● ACTIVE</span>
            <span className="text-[9px] font-mono-nice text-[#333]">READY TO DEPLOY</span>
            <span className="text-[9px] font-mono-nice text-[#2a2a2a]">EXP: {expiry}</span>
          </div>
        </div>

        {/* ── Excuse text with CLASSIFIED watermark ── */}
        <div className="px-4 py-6 relative classified-bg">
          <div className="absolute top-2 left-3 text-5xl text-[#1e1e2e] font-serif leading-none select-none">"</div>
          <p className="font-mono-nice text-[#e8e8e8] text-base sm:text-lg leading-relaxed relative z-10 pl-4 pr-2">
            {excuse.text}
          </p>
          <div className="absolute bottom-2 right-4 text-5xl text-[#1e1e2e] font-serif leading-none select-none">"</div>
        </div>

        {/* ── Fake evidence ── */}
        {excuse.fakeEvidence && (
          <div className="mx-4 mb-4 p-3 rounded border border-[#ffe600]/20 bg-[#ffe600]/5 danger-stripes">
            <div className="flex items-start gap-2">
              <span className="text-[#ffe600] shrink-0">📎</span>
              <div>
                <div className="text-[9px] font-mono-nice text-[#ffe600]/50 tracking-widest uppercase mb-0.5">
                  Supporting Evidence — Authenticity: Unverified
                </div>
                <div className="text-xs font-mono-nice text-[#ffe600]/80">{excuse.fakeEvidence}</div>
              </div>
            </div>
          </div>
        )}

        {/* ── Deployment checklist ── */}
        <div className="mx-4 mb-4 p-3 rounded border border-[#1e1e2e] bg-[#080810]">
          <div className="text-[9px] font-mono-nice text-[#333] tracking-widest uppercase mb-2">
            ▸ PRE-DEPLOYMENT CHECKLIST
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {CHECKLIST.map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <span className="text-[#00ff88] text-xs">✓</span>
                <span className="text-[10px] font-mono-nice text-[#3a3a3a]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Diagnostic readout ── */}
        <div className="px-4 pb-4 space-y-3">
          <div className="flex items-center gap-2 border-t border-[#1e1e2e] pt-3">
            <div className="h-px flex-1 bg-[#1e1e2e]" />
            <span className="text-[9px] font-mono-nice text-[#333] tracking-widest uppercase">
              ░ DIAGNOSTIC READOUT ░
            </span>
            <div className="h-px flex-1 bg-[#1e1e2e]" />
          </div>
          <ScoreBar type="believability" value={excuse.believability} />
          <ScoreBar type="absurdity"     value={excuse.absurdity} />
        </div>

        {/* ── Jurisdiction + tagline ── */}
        <div className="mx-4 mb-4 grid grid-cols-2 gap-2">
          <div className="p-2 rounded bg-[#080810] border border-[#1e1e2e] text-center">
            <div className="text-[8px] font-mono-nice text-[#333] tracking-widest uppercase mb-0.5">Jurisdiction</div>
            <div className="text-[10px] font-mono-nice text-[#444] leading-tight">{jurisdiction}</div>
          </div>
          <div className="p-2 rounded bg-[#ff2d78]/5 border border-[#ff2d78]/20 text-center flex items-center justify-center">
            <span className="text-[10px] font-mono-nice text-[#ff2d78]/70 italic leading-tight">"{tagline}"</span>
          </div>
        </div>

        {/* ── Copy button ── */}
        <div className="px-4 pb-2">
          <button
            onClick={handleCopy}
            className={`
              w-full py-3.5 px-6 rounded-lg border-2 font-emergency text-base tracking-wider uppercase
              transition-all duration-150 cursor-pointer btn-press relative overflow-hidden
              ${copied
                ? 'border-[#00ff88] bg-[#00ff88]/10 text-[#00ff88] animate-pulse-glow-g'
                : 'border-[#00ff88]/40 bg-[#00ff88]/5 text-[#00ff88] hover:border-[#00ff88] hover:bg-[#00ff88]/10'
              }
            `}
          >
            <span className="absolute top-1 left-2 text-[9px] font-mono-nice text-[#00ff88]/20">▸▸</span>
            <span className="absolute top-1 right-2 text-[9px] font-mono-nice text-[#00ff88]/20">◂◂</span>
            {copied ? '✅ ALIBI COPIED — DEPLOY IMMEDIATELY' : '📋 COPY THIS ALIBI'}
          </button>
        </div>

        {/* ── Footer disclaimer ── */}
        <div className="px-4 pb-4 pt-1 flex items-center justify-center gap-2">
          <div className="h-px flex-1 bg-[#1a1a1a]" />
          <span className="text-[9px] font-mono-nice text-[#222]">
            For entertainment and cowardice only. Not legal advice. Not financial advice. Not any kind of advice.
          </span>
          <div className="h-px flex-1 bg-[#1a1a1a]" />
        </div>
      </div>

      {/* ── DEPLOYED stamp on copy ── */}
      {stampVisible && (
        <div
          className="absolute top-6 right-4 pointer-events-none animate-stamp-in z-20"
          onAnimationEnd={() => setTimeout(() => setStampVisible(false), 2500)}
        >
          <div className="border-4 border-[#00ff88] rounded-lg px-4 py-3 rotate-[-6deg] bg-[#00ff88]/5">
            <div className="font-emergency text-[#00ff88] text-3xl crt-glow leading-tight tracking-wider">
              DEPLOYED
            </div>
            <div className="font-emergency text-[#00ff88] text-xs crt-glow tracking-[0.3em] text-center mt-0.5">
              GOOD LUCK
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
