import React from "react";
import { Link } from "react-router-dom";
import { themes, dsa, achievements, certifications } from "@/data/portfolio";
import ResultCard from "@/components/ResultCard";
import { Squiggle, Sparkle, Marker, Tape, Sprig } from "@/components/Decorations";
import { ArrowUpRight, BookOpen } from "lucide-react";

export default function Research() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12" data-testid="research-page">
      <div className="relative">
        <Sprig className="absolute -top-8 -right-2 opacity-60 hidden sm:block" size={70} />
        <div className="text-[10px] uppercase tracking-[0.3em] text-plum">/ research · recurring themes</div>
        <h1 className="font-serif text-6xl sm:text-7xl text-ink leading-[0.95] mt-2">
          themes <span className="italic">across</span> the work.
        </h1>
        <Squiggle width={220} className="mt-3" />
        <p className="mt-4 font-serif italic text-xl text-ink-soft max-w-2xl">
          not a CV — a map of the technical and design themes that recur across her projects.
        </p>
      </div>

      {/* DSA panel */}
      <div className="mt-10 relative bg-white/85 border border-[var(--border-soft)] rounded-2xl p-6" data-testid="dsa-panel">
        <Tape className="-top-3 left-10" rotate={-7} w={70} />
        <div className="text-[10px] uppercase tracking-[0.3em] text-plum inline-flex items-center gap-2">
          <BookOpen size={12} /> algorithmic foundation
        </div>
        <div className="mt-3 grid grid-cols-3 gap-4 max-w-2xl">
          <div>
            <div className="font-serif text-4xl text-ink">{dsa.total}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-plum">DSA problems</div>
          </div>
          <div>
            <div className="font-serif text-4xl text-ink">{dsa.leetcode}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-plum">LeetCode</div>
          </div>
          <div>
            <div className="font-serif text-4xl text-ink">{dsa.codeforces}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-plum">Codeforces</div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {dsa.focus.map((f) => (
            <span key={f} className="px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] bg-tag border border-[var(--border-soft)] text-plum rounded-full">{f}</span>
          ))}
        </div>
      </div>

      {/* Themes */}
      <div className="mt-12 space-y-9 border-t border-[var(--border-soft)] pt-8">
        {themes.map((t, i) => (
          <ResultCard
            key={t.title}
            url={`anita.dev › themes › ${t.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            title={t.title}
            snippet={t.desc}
            meta={<><Marker n={i + 1} /><span>{t.year} · {t.venue}</span></>}
          />
        ))}
      </div>

      {/* Achievements + certifications */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-paper border border-[var(--border-soft)] rounded-2xl p-6" data-testid="achievements-panel">
          <div className="text-[10px] uppercase tracking-[0.3em] text-plum">achievements</div>
          <ul className="mt-3 space-y-3">
            {achievements.map((a) => (
              <li key={a.title}>
                <div className="font-serif text-xl text-ink">{a.result}</div>
                <div className="text-sm text-ink-soft">{a.title} · {a.year}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-paper border border-[var(--border-soft)] rounded-2xl p-6" data-testid="certifications-panel">
          <div className="text-[10px] uppercase tracking-[0.3em] text-plum">certifications</div>
          <ul className="mt-3 space-y-2">
            {certifications.map((c) => (
              <li key={c.title} className="text-sm">
                <div className="font-serif text-lg text-ink leading-tight">{c.title}</div>
                <div className="text-xs text-plum uppercase tracking-[0.2em] mt-0.5">{c.issuer}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* footer */}
      <div className="mt-12 border-t border-[var(--border-soft)] pt-6">
        <Link to="/work" className="btn-soft inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm">
          see the projects these themes show up in <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}
