import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { aiOverview, peopleAlsoAsk, profile, obsessions } from "@/data/portfolio";
import { Squiggle, Sparkle, Tape, Sprig, Rose } from "@/components/Decorations";
import SearchBar from "@/components/SearchBar";

const conversation = [
  {
    role: "user",
    text: "tell me everything about anita george, but softly.",
  },
  {
    role: "ai",
    text:
      "Anita George is a 20-year-old computer-science undergraduate at IIIT Kottayam. She works at the soft seam between AI engineering and editorial design — building emotionally-driven software like VantaAI, fAImer and LawGorithm. Her sensibility is research-leaning, feminine, and quietly ambitious about humane technology.",
  },
  {
    role: "user",
    text: "what does she actually care about?",
  },
  {
    role: "ai",
    text:
      "She cares about software feeling handmade. She romanticizes graph theory because she thinks every interesting thing — language, friendship, attention — is a graph in disguise. She wants AI to be more like a good librarian and less like a salesperson.",
  },
  {
    role: "user",
    text: "what's her stack?",
  },
  {
    role: "ai",
    text:
      "Python and PyTorch on the AI side; React, Tailwind and FastAPI on the full-stack side; MongoDB, Postgres, vector stores when needed. But more importantly: notebooks, scanned botanicals, and a long Are.na board.",
  },
];

export default function AIMode() {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setShown((s) => (s < conversation.length ? s + 1 : s));
    }, 700);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12" data-testid="ai-mode-page">
      <div className="relative">
        <Rose className="absolute -top-8 -left-10 opacity-70 hidden sm:block" size={90} />
        <div className="text-[11px] uppercase tracking-[0.3em] text-plum inline-flex items-center gap-2">
          <Sparkles size={12} className="text-sage" /> ai mode · perplexity-ish
        </div>
        <h1 className="font-serif text-6xl sm:text-7xl text-ink leading-[0.95] mt-2">
          ask <span className="italic">anita</span> anything.
        </h1>
        <Squiggle width={220} className="mt-3" />
        <p className="mt-3 font-serif italic text-xl text-ink-soft max-w-2xl">
          a small, curated AI that knows her work, her obsessions, and the way she writes.
          <br />
          (it's a script, but it's an honest one.)
        </p>
      </div>

      <div className="mt-8">
        <SearchBar defaultValue="who is anita george?" />
      </div>

      {/* answer card */}
      <div className="mt-10 relative bg-white/80 border border-lavender rounded-2xl p-6 sm:p-8 shadow-[0_30px_60px_-40px_rgba(138,121,134,0.4)]" data-testid="ai-answer-card">
        <div className="absolute -top-3 left-6 px-2.5 py-1 bg-paper border border-lavender rounded-full text-[10px] uppercase tracking-[0.25em] text-plum inline-flex items-center gap-1.5">
          <Sparkles size={11} className="text-sage" /> generated answer
        </div>
        <Tape className="-top-3 right-10" rotate={-12} w={70} />
        <p className="font-serif italic text-2xl sm:text-3xl text-ink leading-snug">
          "{aiOverview.answer}"
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-plum">sources</span>
          {aiOverview.citations.map((c, i) => (
            <a key={c.url} href={c.url} target="_blank" rel="noreferrer" className="text-xs font-mono-soft text-link link-soft">
              [{i + 1}] {c.label}
            </a>
          ))}
        </div>
      </div>

      {/* faux conversation */}
      <div className="mt-12 space-y-6">
        <div className="text-[10px] uppercase tracking-[0.3em] text-plum">live thread · auto-typing</div>
        {conversation.slice(0, shown).map((m, i) => (
          <div key={i} className={`max-w-2xl ${m.role === "user" ? "ml-auto" : ""}`}>
            <div className="text-[10px] uppercase tracking-[0.3em] text-plum mb-1">
              {m.role === "user" ? "anonymous · 2:14am" : "anita.ai"}
            </div>
            <div
              className={`rounded-2xl p-4 sm:p-5 border ${
                m.role === "user"
                  ? "bg-warm border-[var(--border-soft)]"
                  : "bg-white border-lavender"
              }`}
            >
              {m.role === "ai" ? (
                <p className="font-serif italic text-lg text-ink leading-relaxed">{m.text}</p>
              ) : (
                <p className="font-sans text-base text-ink-soft leading-relaxed">{m.text}</p>
              )}
            </div>
          </div>
        ))}
        {shown >= conversation.length && (
          <div className="max-w-2xl">
            <div className="font-hand text-plum text-xl">— end of thread. ask another, slowly.</div>
          </div>
        )}
      </div>

      {/* related */}
      <div className="mt-16 border-t border-[var(--border-soft)] pt-8">
        <div className="text-[10px] uppercase tracking-[0.3em] text-plum">things ai mode knows about</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {obsessions.map((o) => (
            <span key={o} className="px-3 py-1 rounded-full bg-tag border border-[var(--border-soft)] text-sm text-ink hover:bg-warm cursor-pointer">
              {o}
            </span>
          ))}
        </div>
      </div>

      {/* paa */}
      <div className="mt-12">
        <h2 className="font-serif text-3xl text-ink">people also ask</h2>
        <ul className="mt-4 space-y-3">
          {peopleAlsoAsk.slice(0, 5).map((q) => (
            <li key={q.q} className="border border-[var(--border-soft)] rounded-xl bg-white/70 p-4">
              <div className="font-serif text-xl text-ink">{q.q}</div>
              <p className="mt-1 text-sm text-ink-soft leading-relaxed">{q.a}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
