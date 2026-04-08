import { useState, useEffect, useRef } from 'react';

interface Props {
  onConfirm: (situation: string) => void;
  onCancel: () => void;
}

export default function CustomModal({ onConfirm, onCancel }: Props) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCancel]);

  function handleConfirm() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onConfirm(trimmed);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleConfirm();
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div className="animate-slide-up w-full max-w-lg rounded-xl border-2 border-[#ffe600] bg-[#0a0a0f] overflow-hidden shadow-[0_0_40px_#ffe60020]">
        {/* Top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-[#ff2d78] via-[#ffe600] to-[#00ff88]" />

        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-[#1e1e2e]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono-nice tracking-widest text-[#ffe600]/60 uppercase">
                Custom Situation Protocol
              </span>
              <span className="text-[9px] font-mono-nice text-[#ffe600]/30 border border-[#ffe600]/20 rounded px-1">
                UNCLASSIFIED
              </span>
            </div>
            <h2 className="font-emergency text-[#ffe600] text-xl crt-glow">
              DESCRIBE YOUR DISASTER
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="text-[#444] hover:text-[#ff2d78] transition-colors text-xl leading-none mt-0.5 cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5 space-y-4">
          <p className="text-xs font-mono-nice text-[#555] leading-relaxed">
            Tell us what you need an excuse for. Be specific. The AI will tailor the alibi to your exact situation.
          </p>

          <div className="relative">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. I forgot my friend's birthday, I didn't read the book for book club, I missed my dentist appointment for the third time..."
              rows={4}
              maxLength={300}
              className="w-full bg-[#0e0e16] border-2 border-[#1e1e2e] focus:border-[#ffe600] rounded-lg px-4 py-3
                         text-sm font-mono-nice text-[#e8e8e8] placeholder-[#333] resize-none outline-none
                         transition-colors duration-150 leading-relaxed"
            />
            {/* Char count */}
            <span className="absolute bottom-3 right-3 text-[10px] font-mono-nice text-[#333]">
              {text.length}/300
            </span>
          </div>

          {/* Hint */}
          <p className="text-[10px] font-mono-nice text-[#2a2a2a]">
            Tip: more detail = better excuse. ⌘↵ or Ctrl↵ to confirm.
          </p>
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-lg border-2 border-[#1e1e2e] text-[#444] font-emergency text-sm
                       tracking-wider uppercase hover:border-[#333] hover:text-[#666] transition-colors cursor-pointer btn-press"
          >
            ABORT
          </button>
          <button
            onClick={handleConfirm}
            disabled={!text.trim()}
            className={`flex-2 flex-grow-[2] py-3 rounded-lg border-2 font-emergency text-sm tracking-wider uppercase
                        transition-all duration-150 cursor-pointer btn-press
                        ${text.trim()
                          ? 'border-[#ffe600] bg-[#ffe600]/10 text-[#ffe600] hover:bg-[#ffe600]/20'
                          : 'border-[#1e1e2e] text-[#2a2a2a] cursor-not-allowed'
                        }`}
          >
            🚀 GENERATE ALIBI
          </button>
        </div>
      </div>
    </div>
  );
}
