import type { Mode } from '../types';

interface Tab {
  id: Mode;
  label: string;
  emoji: string;
  desc: string;
  description: string;
  // Tailwind classes — must be full strings so Tailwind can detect them at build time
  activeBar:    string;
  activeBg:     string;
  activeText:   string;
  activeBorder: string;
}

const TABS: Tab[] = [
  {
    id:           'believable',
    label:        'Genuine',
    emoji:        '🤝',
    desc:         'Actually might work',
    description:  'Generates a sincere, realistic excuse someone might actually believe',
    activeBar:    'bg-[#00ff88]',
    activeBg:     'bg-[#00ff88]/10',
    activeText:   'text-[#00ff88]',
    activeBorder: 'border-[#00ff88]',
  },
  {
    id:           'risky',
    label:        'Funny',
    emoji:        '😂',
    desc:         'Confidence over logic',
    description:  'Generates an absurd excuse delivered with unearned confidence',
    activeBar:    'bg-[#ffe600]',
    activeBg:     'bg-[#ffe600]/10',
    activeText:   'text-[#ffe600]',
    activeBorder: 'border-[#ffe600]',
  },
  {
    id:           'unhinged',
    label:        'Dark',
    emoji:        '💀',
    desc:         'Chaotic and unhinged',
    description:  'Generates a chaotic, darkly comedic excuse with zero regard for consequences',
    activeBar:    'bg-[#ff2d78]',
    activeBg:     'bg-[#ff2d78]/10',
    activeText:   'text-[#ff2d78]',
    activeBorder: 'border-[#ff2d78]',
  },
];

interface Props {
  selected: Mode;
  onSelect: (mode: Mode) => void;
}

export default function ModeSelector({ selected, onSelect }: Props) {
  const activeTab = TABS.find((t) => t.id === selected)!;

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#ffe600]/30" />
        <div className="font-emergency text-[#ffe600] text-sm tracking-widest uppercase crt-glow">
          ⚡ EXCUSE TONE ⚡
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#ffe600]/30" />
      </div>

      <div className="relative flex rounded-xl overflow-hidden border-2 border-[#1e1e2e] bg-[#0a0a0f]">
        {TABS.map((tab) => {
          const isActive = tab.id === selected;
          return (
            <button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              className={`
                relative flex-1 flex flex-col items-center gap-1.5 py-4 px-2
                transition-all duration-200 cursor-pointer group
                ${isActive ? tab.activeBg : 'bg-transparent hover:bg-white/5'}
              `}
            >
              {/* Colored indicator bar along the top edge */}
              {isActive && <span className={`absolute top-0 inset-x-0 h-0.5 ${tab.activeBar}`} />}

              {/* Divider between tabs (skip the first) */}
              {tab.id !== 'believable' && (
                <span className="absolute left-0 top-3 bottom-3 w-px bg-[#1e1e2e]" />
              )}

              <span className={`text-2xl transition-transform duration-150 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                {tab.emoji}
              </span>

              <span className={`font-emergency text-base tracking-wide transition-colors ${isActive ? tab.activeText : 'text-[#555]'}`}>
                {tab.label}
              </span>

              <span className={`text-[10px] font-mono-nice leading-tight text-center transition-colors ${isActive ? `${tab.activeText} opacity-70` : 'text-[#333]'}`}>
                {tab.desc}
              </span>

              {isActive && (
                <span className={`text-[9px] font-mono-nice font-bold tracking-widest mt-0.5 animate-blink ${tab.activeText}`}>
                  ● SELECTED
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Description bar for the active tab */}
      <div className={`mt-2 rounded-lg px-3 py-2 border ${activeTab.activeBorder} ${activeTab.activeBg} text-center`}>
        <span className={`text-[11px] font-mono-nice opacity-80 ${activeTab.activeText}`}>
          {activeTab.description}
        </span>
      </div>
    </div>
  );
}
