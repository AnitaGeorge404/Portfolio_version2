import React from "react";
import { archive } from "@/data/portfolio";
import { Squiggle, Sparkle, Tape, Sprig } from "@/components/Decorations";

export default function Archive() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12" data-testid="archive-page">
      <div className="text-[11px] uppercase tracking-[0.3em] text-plum">/ archive · hidden tab</div>
      <h1 className="font-serif text-6xl sm:text-7xl text-ink leading-[0.95] mt-2">
        the <span className="italic">old</span> internet of me.
      </h1>
      <Squiggle width={220} className="mt-3" />
      <p className="mt-4 font-serif italic text-xl text-ink-soft">
        a wax museum of half-finished sites, embarrassing usernames, and the me who didn't know yet.
      </p>

      <ol className="mt-12 relative pl-6 border-l border-dashed border-brown/70 space-y-8 notebook-lines">
        {archive.map((a, i) => (
          <li key={a.date} className="relative" data-testid={`archive-item-${i}`}>
            <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-pink border border-plum/40" />
            <div className="text-[10px] uppercase tracking-[0.3em] text-plum">{a.date}</div>
            <div className="font-serif italic text-xl text-ink leading-relaxed">{a.note}</div>
          </li>
        ))}
      </ol>

      <div className="mt-16 relative">
        <Tape className="-top-3 left-10" w={90} rotate={-7} />
        <div className="bg-warm/60 border border-[var(--border-soft)] p-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-plum">postscript</div>
          <p className="mt-2 font-hand text-2xl text-ink leading-snug">
            — every embarrassing version of me lives here so the next one can be braver.
          </p>
        </div>
      </div>
    </div>
  );
}
