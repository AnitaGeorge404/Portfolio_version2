import React from "react";
import { Link } from "react-router-dom";
import { Squiggle, Sparkle, HandArrow } from "@/components/Decorations";
import { useTheme } from "@/context/ThemeContext";
import { ScholarMetaLine } from "@/components/ScholarPrimitives";
import { MidnightMetaLine } from "@/components/MidnightPrimitives";

function MidnightNotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24" data-testid="not-found-page">
      <MidnightMetaLine signal>No matching signal</MidnightMetaLine>
      <h1 className="mt-2 font-serif italic text-4xl text-[var(--ink)]">Nothing indexed at that address.</h1>
      <p className="mt-3 text-[15px] text-[var(--ink-soft)]">
        Query the system, or return to the index.
      </p>
      <div className="mt-6 flex flex-wrap gap-x-5 text-sm">
        <Link to="/" className="text-[var(--decoration-primary)] hover:underline underline-offset-4" data-testid="nf-home">Return to system</Link>
        <Link to="/ai-mode" className="text-[var(--decoration-primary)] hover:underline underline-offset-4" data-testid="nf-ai">Query Anita's work</Link>
        <Link to="/work" className="text-[var(--decoration-primary)] hover:underline underline-offset-4" data-testid="nf-work">View indexed systems</Link>
      </div>
    </div>
  );
}

function ScholarNotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20" data-testid="not-found-page">
      <ScholarMetaLine>No indexed record found</ScholarMetaLine>
      <h1 className="mt-1 font-serif text-3xl sm:text-4xl text-[var(--ink)]">Nothing indexed at that URL.</h1>
      <p className="mt-3 text-[15px] text-[var(--ink-soft)]">
        Try searching, or return to the index.
      </p>
      <div className="mt-6 flex flex-wrap gap-x-5 text-sm">
        <Link to="/" className="text-[var(--link)] hover:underline underline-offset-4" data-testid="nf-home">Return to index</Link>
        <Link to="/ai-mode" className="text-[var(--link)] hover:underline underline-offset-4" data-testid="nf-ai">Search with AI</Link>
        <Link to="/work" className="text-[var(--link)] hover:underline underline-offset-4" data-testid="nf-work">Browse work</Link>
      </div>
    </div>
  );
}

export default function NotFound() {
  const { currentTheme } = useTheme();
  if (currentTheme === "search") {
    return <ScholarNotFound />;
  }
  if (currentTheme === "midnight") {
    return <MidnightNotFound />;
  }
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20" data-testid="not-found-page">
      <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--plum)]">404 · no result</div>
      <h1 className="font-serif text-6xl sm:text-7xl text-ink leading-[0.95] mt-2">
        nothing <span className="italic" style={{ color: "#C96B84" }}>indexed</span> at that url.
      </h1>
      <Squiggle width={220} className="mt-3" color="#EDAABB" />
      <p className="mt-4 font-serif italic text-xl text-ink-soft max-w-xl">
        this corner of the archive is empty. try the homepage, or ask AI Mode something.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className="btn-soft inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm" data-testid="nf-home">
          ← back home
        </Link>
        <Link to="/ai-mode" className="btn-soft inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm" data-testid="nf-ai">
          ask ai mode →
        </Link>
        <Link to="/work" className="btn-soft inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm" data-testid="nf-work">
          browse work →
        </Link>
      </div>
      <div className="mt-12 max-w-xl">
        <HandArrow className="rotate-[-30deg]" color="#C96B84" />
        <p className="font-hand text-[var(--plum)] text-2xl mt-2">
          — even a 404 deserves a soft landing.
        </p>
      </div>
    </div>
  );
}
