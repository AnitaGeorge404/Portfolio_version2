import React from "react";
import { shopping } from "@/data/portfolio";
import { Squiggle, Sparkle, Tape } from "@/components/Decorations";

export default function Shopping() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12" data-testid="shopping-page">
      <div className="text-[11px] uppercase tracking-[0.3em] text-plum">/ shopping · gently ironic</div>
      <h1 className="font-serif text-6xl sm:text-7xl text-ink leading-[0.95] mt-2">
        her <span className="italic">soft</span> wishlist.
      </h1>
      <Squiggle width={220} className="mt-3" />
      <p className="mt-4 font-serif italic text-xl text-ink-soft max-w-xl">
        a tongue-in-cheek "shopping" tab — small things that shape a life.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="shopping-grid">
        {shopping.map((s, idx) => (
          <div
            key={s.item}
            className="pin-card relative bg-white border border-[var(--border-soft)] p-5"
            style={{ transform: `rotate(${(idx % 3 - 1) * 0.4}deg)` }}
          >
            <Tape className="-top-3 left-8" w={60} rotate={-7} />
            <div className="text-[10px] uppercase tracking-[0.3em] text-plum">item {String(idx + 1).padStart(2, "0")}</div>
            <div className="mt-1 font-serif text-2xl text-ink leading-tight">{s.item}</div>
            <div className="mt-1 font-mono-soft text-sm text-sage">{s.price}</div>
            <div className="mt-3 font-hand text-plum text-lg leading-tight">— {s.note}</div>
          </div>
        ))}
      </div>

      <div className="mt-12 max-w-xl font-hand text-plum text-2xl">
        — this page is mostly a joke. mostly.
      </div>
    </div>
  );
}
