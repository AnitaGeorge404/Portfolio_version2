import React from "react";
import { Link } from "react-router-dom";
import { Squiggle, Sparkle, HandArrow } from "@/components/Decorations";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20" data-testid="not-found-page">
      <div className="text-[11px] uppercase tracking-[0.3em] text-plum">404 · no result</div>
      <h1 className="font-serif text-6xl sm:text-7xl text-ink leading-[0.95] mt-2">
        nothing <span className="italic">indexed</span> at that url.
      </h1>
      <Squiggle width={220} className="mt-3" />
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
        <HandArrow className="rotate-[-30deg]" />
        <p className="font-hand text-plum text-2xl mt-2">
          — even a 404 deserves a soft landing.
        </p>
      </div>
    </div>
  );
}
