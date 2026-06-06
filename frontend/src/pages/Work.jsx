import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/portfolio";
import { Sparkle, Squiggle, Tape, Paperclip, Marker, HandArrow, CherryBlossom, Sprig, PetalRain } from "@/components/Decorations";
import { ArrowUpRight, Bookmark, Sparkles } from "lucide-react";

const heightClass = {
  short: "min-h-[240px]",
  medium: "min-h-[300px]",
  tall: "min-h-[380px]",
};

// Sticky note overlays
const stickyNotes = [
  null,
  { text: "ship it slowly", rotate: 6 },
  null,
  { text: "rewritten 3×", rotate: -8 },
  { text: "discovered, not made", rotate: 4 },
];

// Washi tape color cycling
const tapeVariants = ["pink", "yellow", "mint", "pink", "yellow"];

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
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.32em] text-[var(--plum)]">
      <span className="inline-flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--rose)] animate-pulse" />
        indexing {count.toLocaleString()} memories
      </span>
      <span className="text-[var(--blossom)]">·</span>
      <span>{seconds.toFixed(2)} seconds</span>
      <span className="text-[var(--blossom)]">·</span>
      <span>handcrafted · kerala</span>
      <span className="text-[var(--blossom)]">·</span>
      <span className="font-hand text-base normal-case tracking-normal text-[var(--rose)]">— curated archive of one person&apos;s mind.</span>
    </div>
  );
}

export default function Work() {
  const [filter, setFilter] = useState("all");
  const tags = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.tags))), []);
  const filtered = filter === "all" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-20" data-testid="work-page">
      {/* Title block */}
      <div className="relative max-w-3xl">
        <CherryBlossom className="absolute -top-12 -left-6 opacity-70 hidden sm:block animate-float-slow" size={120} />
        <Sparkle className="absolute -top-2 right-0 opacity-70" size={18} color="#C96B84" />
        <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--plum)]">/ work · search category</div>
        <h1 className="font-serif text-6xl sm:text-7xl lg:text-[88px] text-ink leading-[0.92] mt-2">
          <span className="italic" style={{ color: "#C96B84" }}>work,</span><br />
          <span className="text-[var(--plum)]">indexed.</span>
        </h1>
        <Squiggle width={240} className="mt-3" color="#EDAABB" />
        <p className="mt-4 font-serif italic text-xl text-ink-soft max-w-xl">
          search results filtered to things she actually built. half projects, half love letters.
        </p>
      </div>

      {/* Indexing metadata */}
      <div className="mt-8 pb-4 border-b border-[var(--border-soft)]">
        <IndexingMeta />
      </div>

      {/* Filter row */}
      <div className="mt-6 flex flex-wrap items-center gap-2" data-testid="work-filters">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--plum)] mr-1">filter</span>
        <button
          onClick={() => setFilter("all")}
          data-testid="work-filter-all"
          className={`px-3 py-1 text-xs rounded-full border transition-all ${
            filter === "all"
              ? "bg-[var(--plum)] text-[var(--bg-paper)] border-[var(--plum)]"
              : "bg-[var(--bg-petal)] border-[var(--border-soft)] text-ink hover:bg-[var(--pink)]/30"
          }`}
        >
          all
        </button>
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            data-testid={`work-filter-${t}`}
            className={`px-3 py-1 text-xs rounded-full border transition-all ${
              filter === t
                ? "bg-[var(--plum)] text-[var(--bg-paper)] border-[var(--plum)]"
                : "bg-[var(--bg-petal)] border-[var(--border-soft)] text-ink hover:bg-[var(--pink)]/30"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Results header */}
      <div className="mt-10 flex items-baseline justify-between">
        <h2 className="font-serif text-3xl text-ink">
          <span className="italic" style={{ color: "#C96B84" }}>{filtered.length}</span>{" "}
          result{filtered.length === 1 ? "" : "s"}
        </h2>
        <span className="font-hand text-[var(--rose)] text-xl rotate-[-2deg]">— softly ranked</span>
      </div>

      {/* Scrapbook masonry grid */}
      <div
        className="mt-8 columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance]"
        data-testid="work-results"
      >
        {filtered.map((p, idx) => {
          const sticky = stickyNotes[idx % stickyNotes.length];
          const tapeVariant = tapeVariants[idx % tapeVariants.length];
          const tapeVariant2 = tapeVariants[(idx + 2) % tapeVariants.length];
          return (
            <Link
              to={`/projects/${p.slug}`}
              key={p.slug}
              data-testid={`work-result-${p.slug}`}
              className="pin-card relative block break-inside-avoid group"
              style={{ transform: `rotate(${(idx % 3 - 1) * 0.4}deg)` }}
            >
              {/* Polaroid-style card */}
              <div className="bg-white border border-[var(--border-soft)] shadow-[0_4px_20px_-8px_rgba(44,26,29,0.18)]">
                {/* Washi tape decorations */}
                <Tape
                  className="absolute -top-3 left-8"
                  w={70}
                  rotate={-9}
                  variant={tapeVariant}
                />
                {idx % 2 === 0 && (
                  <Tape
                    className="absolute -top-3 right-8"
                    w={50}
                    rotate={7}
                    variant={tapeVariant2}
                  />
                )}
                {idx === 0 && (
                  <Paperclip className="absolute -top-3 right-3 rotate-12" size={24} color="#C96B84" />
                )}

                {/* Sticky note overlay */}
                {sticky && (
                  <div
                    className="sticky-note absolute -top-4 -right-3 px-2.5 py-1 font-hand text-[var(--plum)] text-base z-10"
                    style={{ transform: `rotate(${sticky.rotate}deg)` }}
                    aria-hidden
                  >
                    {sticky.text}
                  </div>
                )}

                {/* Card content */}
                <div className="p-5 sm:p-6">
                  {/* Breadcrumb */}
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[var(--sage)] font-mono">
                    <span className="w-3.5 h-3.5 rounded-full bg-[var(--bg-petal)] border border-[var(--border-soft)]" />
                    <span className="truncate">
                      ANITA.DEV <span className="text-[var(--blossom)]">›</span> PROJECTS{" "}
                      <span className="text-[var(--blossom)]">›</span>{" "}
                      <span className="text-[var(--plum)]">{p.slug.toUpperCase()}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 font-serif text-3xl sm:text-4xl text-ink leading-[1.02] tracking-tight group-hover:text-[var(--plum)] transition-colors">
                    <span className="italic">{p.name}</span>
                  </h3>
                  <div className="font-hand text-[var(--rose)] text-xl leading-tight mt-1">— {p.tagline}</div>

                  {/* Image — polaroid inner photo */}
                  <div className={`relative mt-4 overflow-hidden ${heightClass[p.height] || "min-h-[300px]"}`}>
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-petal)]/30 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.3em] bg-white/90 backdrop-blur px-2 py-0.5 rounded-full text-[var(--plum)]">
                      {p.year}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-[13px] leading-relaxed text-ink-soft font-sans line-clamp-3">
                    {p.summary}
                  </p>

                  {/* Tag pills */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] bg-[var(--bg-petal)] border border-[var(--border-soft)] text-[var(--plum)] rounded-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="mt-4 border-t border-dashed border-[var(--blossom)]/50" />

                  {/* Footer */}
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <span className="font-hand text-[var(--rose)] text-lg leading-tight italic max-w-[70%]">
                      &ldquo;{p.note}&rdquo;
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--plum)] whitespace-nowrap">
                      {p.year} · open ↗
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-12 max-w-xl">
          <p className="font-serif italic text-2xl text-ink-soft">
            no results in this filter —{" "}
            <button className="link-soft text-[var(--link)]" onClick={() => setFilter("all")}>
              try all
            </button>.
          </p>
        </div>
      )}

      {/* Footnote */}
      <div className="mt-16 max-w-3xl flex items-start gap-4">
        <HandArrow className="rotate-[-25deg] shrink-0" color="#C96B84" />
        <p className="font-hand text-[var(--plum)] text-2xl leading-snug">
          — click any card to read the full scrapbook page. each project has motivation, architecture, and what almost broke her.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/projects"
          data-testid="work-to-projects"
          className="btn-soft inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
        >
          <Bookmark size={14} /> pinterest view
        </Link>
        <Link
          to="/ai-mode"
          data-testid="work-to-ai"
          className="btn-soft inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
        >
          <Sparkles size={14} /> ask AI about her work
        </Link>
      </div>
    </div>
  );
}
