import React from "react";
import { shopping } from "@/data/portfolio";
import { Squiggle, Sparkle, Tape } from "@/components/Decorations";
import { useTheme } from "@/context/ThemeContext";
import { ScholarMetaLine } from "@/components/ScholarPrimitives";
import { MidnightMetaLine } from "@/components/MidnightPrimitives";
import { HerbariumFieldLabel } from "@/components/HerbariumPrimitives";

function HerbariumShopping() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14" data-testid="shopping-page">
      <HerbariumFieldLabel>Personal-interest index</HerbariumFieldLabel>
      <h1 className="mt-2 font-serif italic text-4xl sm:text-5xl text-[var(--ink)]">Wishlist</h1>
      <p className="mt-2 text-[15px] text-[var(--ink-soft)] max-w-xl">
        A tongue-in-cheek personal record — small things that shape a life.
      </p>

      <div className="mt-8">
        {shopping.map((s) => (
          <article key={s.item} className="py-3 border-t border-[var(--border-soft)] flex items-baseline justify-between gap-4">
            <div>
              <div className="text-[15px] text-[var(--ink)]">{s.item}</div>
              <div className="text-[13px] text-[var(--ink-soft)]">{s.note}</div>
            </div>
            <span className="font-mono text-[12px] text-[var(--decoration-primary)] shrink-0">{s.price}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

function MidnightShopping() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14" data-testid="shopping-page">
      <MidnightMetaLine signal>Personal-interest index</MidnightMetaLine>
      <h1 className="mt-2 font-serif italic text-4xl sm:text-5xl text-[var(--ink)]">Wishlist</h1>
      <p className="mt-2 text-[15px] text-[var(--ink-soft)] max-w-xl">
        A tongue-in-cheek personal record — small things that shape a life.
      </p>

      <div className="mt-8">
        {shopping.map((s) => (
          <article key={s.item} className="py-3 border-t border-[var(--border-soft)] flex items-baseline justify-between gap-4">
            <div>
              <div className="text-[15px] text-[var(--ink)]">{s.item}</div>
              <div className="text-[13px] text-[var(--ink-soft)]">{s.note}</div>
            </div>
            <span className="font-mono text-[12px] text-[var(--decoration-primary)] shrink-0">{s.price}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

function ScholarShopping() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12" data-testid="shopping-page">
      <ScholarMetaLine>Anita George · Personal wishlist record</ScholarMetaLine>
      <h1 className="mt-1 font-serif text-3xl sm:text-4xl text-[var(--ink)]">Wishlist</h1>
      <p className="mt-2 text-[15px] text-[var(--ink-soft)] max-w-2xl">
        A tongue-in-cheek personal-interest record — small things that shape a life.
      </p>

      <div className="mt-8" data-testid="shopping-grid">
        {shopping.map((s, idx) => (
          <article key={s.item} className="py-3 border-t border-[var(--border-soft)] flex items-baseline justify-between gap-4">
            <div>
              <div className="text-[15px] text-[var(--ink)]">{s.item}</div>
              <div className="text-[13px] text-[var(--ink-soft)]">{s.note}</div>
            </div>
            <span className="font-mono text-[13px] text-[var(--ink-soft)] shrink-0">{s.price}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Shopping() {
  const { currentTheme } = useTheme();
  if (currentTheme === "search") {
    return <ScholarShopping />;
  }
  if (currentTheme === "midnight") {
    return <MidnightShopping />;
  }
  if (currentTheme === "herbarium") {
    return <HerbariumShopping />;
  }
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
