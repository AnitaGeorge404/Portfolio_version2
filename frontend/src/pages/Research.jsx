import React from "react";
import { research } from "@/data/portfolio";
import ResultCard from "@/components/ResultCard";
import { Squiggle, Sparkle, Marker } from "@/components/Decorations";

export default function Research() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12" data-testid="research-page">
      <div className="text-[11px] uppercase tracking-[0.3em] text-plum">/ research · scholar mode</div>
      <h1 className="font-serif text-6xl sm:text-7xl text-ink leading-[0.95] mt-2">
        notes, <span className="italic">papers,</span> manifestos.
      </h1>
      <Squiggle width={220} className="mt-3" />
      <p className="mt-4 font-serif italic text-xl text-ink-soft max-w-2xl">
        less of a CV — more of a thinking-out-loud archive.
      </p>

      <div className="mt-10 space-y-9 border-t border-[var(--border-soft)] pt-8">
        {research.map((r, i) => (
          <ResultCard
            key={r.title}
            url={`anita.dev › research › ${r.title.toLowerCase().replace(/\s+/g, "-")}`}
            title={r.title}
            snippet={r.desc}
            meta={<><Marker n={i + 1} /><span>{r.year} · {r.venue}</span></>}
            footer={`cite as: George, A. (${r.year}). ${r.title}. ${r.venue}.`}
          />
        ))}
      </div>

      <div className="mt-14 border-t border-[var(--border-soft)] pt-8">
        <div className="text-[10px] uppercase tracking-[0.3em] text-plum">currently reading</div>
        <ul className="mt-3 space-y-2 font-serif italic text-xl text-ink">
          <li>— "The Beautiful Constraint" · Adam Morgan</li>
          <li>— "Designing for the Margins" · various essays</li>
          <li>— "Graph Theory" · Reinhard Diestel (forever)</li>
          <li>— anything Bret Victor publishes, twice</li>
        </ul>
      </div>
    </div>
  );
}
