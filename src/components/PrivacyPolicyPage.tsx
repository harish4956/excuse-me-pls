import { useEffect } from 'react';

interface Props {
  onClose: () => void;
}

export default function PrivacyPolicyPage({ onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Prevent body scroll while page is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0f] flex flex-col overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1 w-full flex-shrink-0 bg-gradient-to-r from-[#ff2d78] via-[#ffe600] to-[#00ff88]" />

      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-[#1e1e2e]">
        <div>
          <div className="text-[10px] font-mono-nice tracking-widest text-[#00ff88]/60 uppercase mb-0.5">
            Legal Department — Classification: Public
          </div>
          <h1 className="font-emergency text-[#00ff88] text-xl crt-glow tracking-widest">
            PRIVACY POLICY
          </h1>
        </div>
        <button
          onClick={onClose}
          className="text-[#444] hover:text-[#ff2d78] transition-colors text-xl leading-none cursor-pointer"
          aria-label="Close privacy policy"
        >
          ✕
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-8 text-sm font-mono-nice text-[#888] leading-relaxed">

          <p className="text-[#555] text-xs">Last updated: April 2025</p>

          {/* Section */}
          <section className="space-y-2">
            <h2 className="font-emergency text-[#ffe600] text-sm tracking-widest uppercase">
              1. What This App Does
            </h2>
            <p>
              Excuse Me Pls generates AI-powered excuses based on a scenario category and tone you select.
              It sends your input to the Groq API and displays the result. That's it.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-emergency text-[#ffe600] text-sm tracking-widest uppercase">
              2. Data We Collect
            </h2>
            <p>
              We collect nothing. There are no user accounts, no login, no analytics, no cookies,
              and no database. Nothing you do in this app is stored by us.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-emergency text-[#ffe600] text-sm tracking-widest uppercase">
              3. Data Sent to Third Parties
            </h2>
            <p>
              When you click <span className="text-[#ff2d78]">DEPLOY EXCUSE</span>, the following is sent
              to the <span className="text-[#ccc]">Groq API</span>:
            </p>
            <ul className="list-none space-y-1 pl-4 border-l border-[#1e1e2e]">
              <li>— Your selected scenario category (e.g. "Late to Work")</li>
              <li>— Your selected tone (Genuine / Funny / Dark)</li>
              <li>— Your custom situation text, if you typed one</li>
            </ul>
            <p>
              This data is processed by Groq to generate your excuse. Groq's privacy practices are
              governed by their own policy at{' '}
              <span className="text-[#00ff88]">groq.com/privacy</span>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-emergency text-[#ffe600] text-sm tracking-widest uppercase">
              4. API Key
            </h2>
            <p>
              This app uses a <span className="text-[#ccc]">VITE_GROQ_API_KEY</span> environment variable
              to authenticate with Groq. Because Vite bundles environment variables prefixed with{' '}
              <span className="text-[#ccc]">VITE_</span> into the client-side JavaScript, this key is
              technically visible in the browser's source. It is your responsibility to manage and
              rotate this key.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-emergency text-[#ffe600] text-sm tracking-widest uppercase">
              5. Cookies & Tracking
            </h2>
            <p>
              None. This app uses no cookies, no local storage, no session storage, and no third-party
              analytics or tracking scripts.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-emergency text-[#ffe600] text-sm tracking-widest uppercase">
              6. Children's Privacy
            </h2>
            <p>
              This app is not directed at children under 13 and does not knowingly collect any
              information from them.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-emergency text-[#ffe600] text-sm tracking-widest uppercase">
              7. Changes to This Policy
            </h2>
            <p>
              If this policy changes, the "Last updated" date above will reflect it. Continued use
              of the app after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-emergency text-[#ffe600] text-sm tracking-widest uppercase">
              8. Contact
            </h2>
            <p>
              Questions? Open an issue on{' '}
              <span className="text-[#00ff88]">github.com/harish4956/excuse-me-pls</span>.
            </p>
          </section>

          <div className="pt-4 border-t border-[#1e1e2e] text-[10px] text-[#333]">
            Not responsible for terminated employment, ended friendships, or paradoxical time loops.
          </div>
        </div>
      </div>

      {/* Footer close button */}
      <div className="flex-shrink-0 border-t border-[#1e1e2e] px-6 py-4 text-center">
        <button
          onClick={onClose}
          className="font-emergency text-xs tracking-widest uppercase text-[#444] hover:text-[#00ff88] transition-colors cursor-pointer"
        >
          ← BACK TO APP
        </button>
      </div>
    </div>
  );
}
