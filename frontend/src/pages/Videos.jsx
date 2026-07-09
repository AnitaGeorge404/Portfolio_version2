import React from "react";
import { videos } from "@/data/portfolio";
import { Squiggle, Sparkle, Tape } from "@/components/Decorations";
import { Play } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { ScholarMetaLine } from "@/components/ScholarPrimitives";

function ScholarVideos() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12" data-testid="videos-page">
      <ScholarMetaLine>Anita George · Indexed media records</ScholarMetaLine>
      <h1 className="mt-1 font-serif text-3xl sm:text-4xl text-[var(--ink)]">Videos</h1>
      <p className="mt-2 text-[15px] text-[var(--ink-soft)] max-w-2xl">
        Screen recordings of things she's built — real videos coming when she has time to record them.
      </p>

      <div className="mt-6" data-testid="videos-grid">
        {videos.map((v) => (
          <article key={v.title} className="py-4 border-b border-[var(--border-soft)] flex items-center gap-4">
            <div className="relative w-28 h-16 shrink-0 bg-[var(--bg-card)] overflow-hidden">
              <img src={v.thumb} alt={v.title} className="w-full h-full object-cover opacity-90" />
              <Play size={16} className="absolute inset-0 m-auto text-white" />
            </div>
            <div className="min-w-0">
              <div className="font-serif text-lg text-[var(--ink)] truncate">{v.title}</div>
              <div className="text-[13px] text-[var(--ink-soft)]">{v.channel} · {v.duration}</div>
              <div className="font-mono text-[11px] text-[var(--ink-soft)] mt-0.5">Status: placeholder — not yet recorded</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Videos() {
  const { currentTheme } = useTheme();
  if (currentTheme === "search") {
    return <ScholarVideos />;
  }
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12" data-testid="videos-page">
      <div className="relative max-w-3xl">
        <div className="text-[11px] uppercase tracking-[0.3em] text-plum">/ videos</div>
        <h1 className="font-serif text-6xl sm:text-7xl text-ink leading-[0.95] mt-2">
          short clips, <span className="italic">soft demos.</span>
        </h1>
        <Squiggle width={220} className="mt-3" />
        <p className="mt-3 font-serif italic text-xl text-ink-soft max-w-xl">
          screen recordings of things i made, the way i'd show a friend.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6" data-testid="videos-grid">
        {videos.map((v, idx) => (
          <div key={v.title} className="pin-card relative bg-white border border-[var(--border-soft)] p-3" style={{ transform: `rotate(${(idx % 2 ? 0.4 : -0.4)}deg)` }}>
            <Tape className="-top-3 left-8" w={70} rotate={-7} />
            <div className="relative h-56 overflow-hidden bg-warm">
              <img src={v.thumb} alt={v.title} className="w-full h-full object-cover mix-blend-multiply opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
              <button className="absolute inset-0 flex items-center justify-center group" aria-label={`play ${v.title}`}>
                <span className="w-16 h-16 rounded-full bg-paper/85 backdrop-blur border border-paper flex items-center justify-center transition-transform group-hover:scale-105">
                  <Play size={20} className="text-ink ml-1" />
                </span>
              </button>
              <div className="absolute bottom-2 right-2 text-[10px] uppercase tracking-[0.2em] text-paper bg-ink/70 backdrop-blur px-2 py-0.5 rounded-full">
                {v.duration}
              </div>
            </div>
            <div className="mt-3 px-1">
              <div className="font-serif text-2xl text-ink">{v.title}</div>
              <div className="font-hand text-plum text-lg">— {v.channel}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 max-w-2xl">
        <p className="font-hand text-plum text-2xl">
          (real videos coming when she finally has time to record them.)
        </p>
      </div>
    </div>
  );
}
