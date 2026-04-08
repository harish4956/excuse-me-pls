import type { Category } from '../types';

interface Scenario {
  id: Category;
  label: string;
  emoji: string;
  sublabel: string;
  threat: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

const SCENARIOS: Scenario[] = [
  { id: 'late_work',        label: 'Late to Work',      emoji: '🏃', sublabel: 'Tardiness Protocol',   threat: 'HIGH'     },
  { id: 'missed_deadline',  label: 'Missed Deadline',   emoji: '💀', sublabel: 'Deliverable Failure',  threat: 'CRITICAL' },
  { id: 'skipping_plans',   label: 'Skipping Plans',    emoji: '🛋️', sublabel: 'Social Evasion',       threat: 'MEDIUM'   },
  { id: 'late_reply',       label: 'Late Reply',        emoji: '📱', sublabel: 'Comms Blackout',       threat: 'LOW'      },
  { id: 'school',           label: 'School Excuse',     emoji: '📚', sublabel: 'Academic Emergency',   threat: 'HIGH'     },
  { id: 'general',          label: 'Custom Situation',  emoji: '🌀', sublabel: 'Tap to describe →',    threat: 'MEDIUM'   },
];

const THREAT_COLORS: Record<string, string> = {
  LOW:      'text-[#00ff88] border-[#00ff88]/40 bg-[#00ff88]/5',
  MEDIUM:   'text-[#ffe600] border-[#ffe600]/40 bg-[#ffe600]/5',
  HIGH:     'text-[#ff8c00] border-[#ff8c00]/40 bg-[#ff8c00]/5',
  CRITICAL: 'text-[#ff2d78] border-[#ff2d78]/40 bg-[#ff2d78]/5',
};

const ACTIVE_COLORS: Record<string, string> = {
  LOW:      'neon-border-green bg-[#00ff88]/10',
  MEDIUM:   'neon-border-yellow bg-[#ffe600]/10',
  HIGH:     'border-[#ff8c00] bg-[#ff8c00]/10',
  CRITICAL: 'neon-border-pink bg-[#ff2d78]/10',
};

interface Props {
  selected: Category | null;
  customSituation: string | null;
  onSelect: (cat: Category) => void;
  onCustomClick: () => void;
}

export default function ScenarioSelector({ selected, customSituation, onSelect, onCustomClick }: Props) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#00ff88]/30" />
        <div className="font-emergency text-[#00ff88] text-sm tracking-widest uppercase crt-glow">
          ⚠ SELECT YOUR DISASTER ⚠
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#00ff88]/30" />
      </div>

      <div className="text-center text-xs text-[#555] font-mono-nice mb-4">
        Choose the incident category for targeted alibi generation
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {SCENARIOS.map((s) => {
          const isSelected = selected === s.id;
          const isCustom   = s.id === 'general';
          const threatCls  = THREAT_COLORS[s.threat];
          const activeCls  = ACTIVE_COLORS[s.threat];

          return (
            <button
              key={s.id}
              onClick={() => isCustom ? onCustomClick() : onSelect(s.id)}
              className={`
                relative flex flex-col items-start p-3 rounded-lg border-2 text-left
                transition-all duration-150 cursor-pointer group
                ${isSelected
                  ? activeCls
                  : 'border-[#1e1e2e] bg-[#0e0e16] hover:border-[#2e2e3e] hover:bg-[#12121e]'
                }
              `}
            >
              <span className={`text-[9px] font-mono-nice font-bold tracking-widest border rounded px-1 py-0.5 mb-2 ${threatCls}`}>
                {isCustom ? 'CUSTOM' : s.threat}
              </span>

              <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{s.emoji}</span>
              <span className={`font-bold text-sm leading-tight ${isSelected ? 'text-white' : 'text-[#ccc]'}`}>
                {s.label}
              </span>

              {/* Show entered situation preview if custom is selected, otherwise show sublabel */}
              {isCustom && isSelected && customSituation ? (
                <span className="text-[10px] text-[#ffe600]/70 font-mono-nice mt-0.5 line-clamp-2 leading-tight">
                  "{customSituation}"
                </span>
              ) : (
                <span className={`text-[10px] font-mono-nice mt-0.5 ${isCustom ? 'text-[#ffe600]/40' : 'text-[#555]'}`}>
                  {s.sublabel}
                </span>
              )}

              {isSelected && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
              )}

              {/* Edit hint for selected custom */}
              {isCustom && isSelected && (
                <span className="absolute bottom-2 right-2 text-[9px] font-mono-nice text-[#ffe600]/30 hover:text-[#ffe600]/60 transition-colors">
                  ✏️ edit
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
