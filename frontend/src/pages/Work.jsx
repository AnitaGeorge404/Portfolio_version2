import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/portfolio";
import { Sparkle, Squiggle, Tape, Paperclip, Marker, HandArrow, Rose, Sprig } from "@/components/Decorations";
import { ArrowUpRight, Bookmark, Quote, Sparkles } from "lucide-react";

const heightClass = {
  short: "min-h-[280px]",
  medium: "min-h-[360px]",
  tall: "min-h-[440px]",
};

// rotating sticky-note overlays for some cards
const stickyOverlays = [
  null,
  { text: "ship it slowly", rotate: 6 },
  null,
  { text: "rewritten 3×", rotate: -8 },
  { text: "discovered, not made", rotate: 4 },
];

function IndexingMeta() {
  const [count, setCount] = useState(5944867);
  const [seconds, setSeconds] = useState(0.14);

  useEffect(() => {
    const t = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 17) - 4);
      setSeconds(+(0.08 + Math.random() * 0.18).toFixed(2));
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.32em] text-plum">
      <span className="inline-flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
        indexing {count.toLocaleString()} thoughts
      </span>
      <span className="text-brown">·</span>
      <span>{seconds.toFixed(2)} seconds</span>
      <span className="text-brown">·</span>
      <span>handcrafted, kerala</span>
      <span className="text-brown">·</span>
      <span className="font-hand text-base normal-case tracking-normal text-plum/80">— curated archive of one person's mind.</span>
    </div>
  );
}

export default function Work() {
  const [filter, setFilter] = useState("all");
  const tags = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tags))),
    []
  );
  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-20" data-testid="work-page">
      {/* ---------- title block ---------- */}
      <div className="relative max-w-3xl">
        <Rose className="absolute -top-10 -left-6 opacity-70 hidden sm:block" size={110} />
        <Sparkle className="absolute -top-2 right-0 opacity-70" size={18} />
        <div className="text-[11px] uppercase tracking-[0.3em] text-plum">/ work · search category</div>
        <h1 className="font-serif text-6xl sm:text-7xl lg:text-[88px] text-ink leading-[0.92] mt-2">
          <span className="italic">work,</span><br /> indexed.
        </h1>
        <Squiggle width={240} className="mt-3" />
        <p className="mt-4 font-serif italic text-xl text-ink-soft max-w-xl">
          search results filtered to things she actually built. half projects, half love letters.
        </p>
      </div>

      {/* indexing metadata */}
      <div className="mt-8 pb-4 border-b border-[var(--border-soft)]">
        <IndexingMeta />
      </div>

      {/* filter row */}
      <div className="mt-6 flex flex-wrap items-center gap-2" data-testid="work-filters">
        <span className="text-[10px] uppercase tracking-[0.3em] text-plum mr-1">filter</span>
        <button
          onClick={() => setFilter("all")}
          data-testid="work-filter-all"
          className={`px-3 py-1 text-xs rounded-full border transition ${
            filter === "all"
              ? "bg-ink text-paper border-ink"
              : "bg-tag border-[var(--border-soft)] text-ink hover:bg-warm"
          }`}
        >
          all
        </button>
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            data-testid={`work-filter-${t}`}
            className={`px-3 py-1 text-xs rounded-full border transition ${
              filter === t
                ? "bg-ink text-paper border-ink"
                : "bg-tag border-[var(--border-soft)] text-ink hover:bg-warm"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ---------- results header ---------- */}
      <div className="mt-10 flex items-baseline justify-between">
        <h2 className="font-serif text-3xl text-ink">
          <span className="italic">{filtered.length}</span> result{filtered.length === 1 ? "" : "s"}
        </h2>
        <span className="font-hand text-plum text-xl rotate-[-2deg]">— softly ranked</span>
      </div>

      {/* ---------- editorial masonry of search-result cards ---------- */}
      <div
        className="mt-8 columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance]"
        data-testid="work-results"
      >
        {filtered.map((p, idx) => {
          const overlay = stickyOverlays[idx % stickyOverlays.length];
          return (
            <Link
              to={`/projects/${p.slug}`}
              key={p.slug}
              data-testid={`work-result-${p.slug}`}
              className="pin-card relative block break-inside-avoid bg-white border border-[var(--border-soft)] p-5 sm:p-6 group"
              style={{ transform: `rotate(${(idx % 3 - 1) * 0.35}deg)` }}
            >
              {/* tape and decorations */}
              <Tape className="-top-2 left-8" w={70} rotate={-9} />
              {idx % 2 === 0 && <Tape className="-top-2 right-8" w={50} rotate={7} />}
              {idx === 0 && <Paperclip className="absolute -top-3 right-3 rotate-12" size={26} />}
              {overlay && (
                <span
                  className="absolute -top-3 -right-3 bg-pink/80 border border-plum/30 px-2.5 py-1 font-hand text-plum text-base shadow-sm"
                  style={{ transform: `rotate(${overlay.rotate}deg)` }}
                >
                  {overlay.text}
                </span>
              )}

              {/* breadcrumb */}
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-sage font-mono">
                <span className="w-3.5 h-3.5 rounded-full bg-tag border border-[var(--border-soft)]" />
                <span className="truncate">
                  ANITA.DEV <span className="text-brown">›</span> PROJECTS <span className="text-brown">›</span>{" "}
                  <span className="text-plum">{p.slug.toUpperCase()}</span>
                </span>
              </div>

              {/* title */}
              <h3 className="mt-3 font-serif text-3xl sm:text-4xl text-ink leading-[1.02] tracking-tight group-hover:text-plum transition-colors">
                <span className="italic">{p.name}</span>
              </h3>
              <div className="font-hand text-plum text-xl leading-tight mt-1">— {p.tagline}</div>

              {/* image — varying heights, soft */}
              <div className={`relative mt-4 overflow-hidden ${heightClass[p.height] || "min-h-[320px]"}`}>
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-95 transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-paper/40 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.3em] bg-paper/85 backdrop-blur px-2 py-0.5 rounded-full text-plum">
                  {p.year}
                </div>
              </div>

              {/* description */}
              <p className="mt-4 text-[14px] leading-relaxed text-ink-soft font-sans line-clamp-4">
                {p.summary}
              </p>

              {/* tag pills */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] bg-tag border border-[var(--border-soft)] text-plum"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* divider */}
              <div className="mt-4 border-t border-dashed border-brown/60" />

              {/* footer — handwritten note + date */}
              <div className="mt-3 flex items-end justify-between gap-3">
                <span className="font-hand text-plum text-lg leading-tight italic max-w-[70%]">
                  "{p.note}"
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-plum whitespace-nowrap">
                  {p.year} · open ↗
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ---------- empty state ---------- */}
      {filtered.length === 0 && (
        <div className="mt-12 max-w-xl">
          <p className="font-serif italic text-2xl text-ink-soft">
            no results in this filter — try <button className="link-soft text-link" onClick={() => setFilter("all")}>all</button>.
          </p>
        </div>
      )}

      {/* ---------- footnote ---------- */}
      <div className="mt-16 max-w-3xl flex items-start gap-4">
        <HandArrow className="rotate-[-25deg] shrink-0" />
        <p className="font-hand text-plum text-2xl leading-snug">
          — click any pin to read the long, soft version. each project has its own
          search-result page with motivation, architecture, and what almost broke her.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/projects" data-testid="work-to-projects" className="btn-soft inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm">
          <Bookmark size={14} /> classic pinterest view
        </Link>
        <Link to="/ai-mode" data-testid="work-to-ai" className="btn-soft inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm">
          <Sparkles size={14} /> ask ai mode about her work
        </Link>
      </div>
    </div>
  );
}
