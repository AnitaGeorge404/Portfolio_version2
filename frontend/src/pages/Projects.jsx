import React, { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/portfolio";
import { Sparkle, Tape, Paperclip, CherryBlossom, Sprig, Squiggle, HandArrow } from "@/components/Decorations";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { ScholarResultRow, ScholarFilterBar, ScholarMetaLine } from "@/components/ScholarPrimitives";
import { MidnightMetaLine, MidnightSystemRecord } from "@/components/MidnightPrimitives";

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

const heightMap = {
  short: "min-h-[240px]",
  medium: "min-h-[320px]",
  tall: "min-h-[420px]",
};

// Washi tape variants cycling
const tapeVariants = ["pink", "yellow", "mint", "pink", "yellow"];

function ScholarProjects() {
  const [filter, setFilter] = useState("All");
  const tags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14" data-testid="projects-page">
      <ScholarMetaLine>Anita George · Complete project index</ScholarMetaLine>
      <h1 className="mt-1 font-serif text-3xl sm:text-4xl text-[var(--ink)]">Projects</h1>
      <p className="mt-2 text-[15px] text-[var(--ink-soft)] max-w-2xl">
        The full indexed corpus of Anita's engineering work — every verified project record.
      </p>

      <div className="mt-6">
        <ScholarFilterBar options={tags} active={filter} onSelect={setFilter} testid="project-filters" />
      </div>

      <div className="mt-2" data-testid="projects-masonry">
        {filtered.map((p) => (
          <ScholarResultRow
            key={p.slug}
            testid={`pin-${p.slug}`}
            eyebrow={`Anita George · Project · ${p.year} · ${p.status || "active"}`}
            title={p.name}
            href={`/projects/${p.slug}`}
            meta={p.tagline}
            description={p.summary}
            tags={p.tags}
            actions={[{ label: "View project", to: `/projects/${p.slug}` }]}
          />
        ))}
      </div>
    </div>
  );
}

function MidnightProjects() {
  const [filter, setFilter] = useState("All");
  const tags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14" data-testid="projects-page">
      <MidnightMetaLine signal>Complete system catalog</MidnightMetaLine>
      <h1 className="mt-2 font-serif italic text-4xl sm:text-5xl text-[var(--ink)]">Projects</h1>
      <p className="mt-2 text-[15px] text-[var(--ink-soft)] max-w-xl">
        The full indexed catalog of Anita's engineering systems.
      </p>

      <div className="mt-6 flex flex-wrap gap-2" data-testid="project-filters">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            data-testid={`filter-${t}`}
            className={`px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.06em] border transition-colors ${
              filter === t
                ? "border-[var(--decoration-primary)] text-[var(--decoration-primary)]"
                : "border-[var(--border-soft)] text-[var(--ink-soft)] hover:border-[var(--border-medium)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4" data-testid="projects-masonry">
        {filtered.map((p) => (
          <MidnightSystemRecord
            key={p.slug}
            testid={`pin-${p.slug}`}
            eyebrow={`System · ${p.year}`}
            title={p.name}
            href={`/projects/${p.slug}`}
            meta={p.tagline}
            description={p.summary}
            tags={p.tags}
            actions={[{ label: "View system", to: `/projects/${p.slug}` }]}
          />
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? projects : projects.filter((p) => p.tags.includes(filter));
  const { currentTheme } = useTheme();

  if (currentTheme === "search") {
    return <ScholarProjects />;
  }

  if (currentTheme === "midnight") {
    return <MidnightProjects />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14" data-testid="projects-page">
      {/* Header */}
      <div className="relative max-w-3xl">
        <CherryBlossom className="absolute -top-10 -left-8 opacity-70 hidden sm:block animate-float-slow" size={100} />
        <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--plum)]">/ projects</div>
        <h1 className="font-serif text-6xl sm:text-7xl text-ink leading-[0.95] mt-2">
          a <span className="italic" style={{ color: "#C96B84" }}>scrapbook</span><br />
          <span className="text-[var(--plum)]">of things i made</span>
        </h1>
        <Squiggle width={200} className="mt-3" color="#EDAABB" />
        <p className="mt-4 font-serif italic text-xl text-ink-soft max-w-xl">
          half projects, half love letters. pin the ones that catch you.
        </p>
        <div className="mt-2 font-hand text-[var(--rose)] text-xl rotate-[-2deg] inline-block">
          ↑ structurally pinterest. emotionally a notebook.
        </div>
      </div>

      {/* Filters */}
      <div className="mt-10 flex flex-wrap gap-2 items-center" data-testid="project-filters">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--plum)] mr-2">filter</span>
        <button
          onClick={() => setFilter("all")}
          data-testid="filter-all"
          className={`px-3 py-1 text-xs rounded-full border transition-all ${
            filter === "all"
              ? "bg-[var(--plum)] text-[var(--bg-paper)] border-[var(--plum)]"
              : "bg-[var(--bg-petal)] border-[var(--border-soft)] text-ink hover:bg-[var(--pink)]/30"
          }`}
        >
          all
        </button>
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            data-testid={`filter-${t}`}
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

      {/* Masonry grid */}
      <div
        className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance]"
        data-testid="projects-masonry"
      >
        {filtered.map((p, idx) => (
          <Link
            to={`/projects/${p.slug}`}
            key={p.slug}
            data-testid={`pin-${p.slug}`}
            className="pin-card relative block break-inside-avoid group"
            style={{ transform: `rotate(${(idx % 3 - 1) * 0.4}deg)` }}
          >
            {/* Polaroid card */}
            <div className="bg-white border border-[var(--border-soft)] overflow-hidden p-2.5 shadow-[0_4px_20px_-8px_rgba(44,26,29,0.15)]">
              {/* Washi tape */}
              <Tape
                className="absolute -top-3 left-6"
                w={70}
                rotate={-9}
                variant={tapeVariants[idx % tapeVariants.length]}
              />
              {idx % 2 === 0 && (
                <Tape
                  className="absolute -top-3 right-6"
                  w={50}
                  rotate={8}
                  variant={tapeVariants[(idx + 2) % tapeVariants.length]}
                />
              )}

              <div className={`relative overflow-hidden bg-[var(--bg-petal)]/40 ${heightMap[p.height] || "min-h-[320px]"}`}>
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/25 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.3em] bg-white/90 backdrop-blur px-2 py-0.5 rounded-full text-[var(--plum)]">
                  {p.year}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="font-hand text-white/95 text-lg leading-tight italic drop-shadow-md">
                    &ldquo;{p.note}&rdquo;
                  </div>
                </div>
                {idx === 0 && (
                  <Paperclip className="absolute -top-1 right-2 rotate-12 drop-shadow-sm" size={26} color="#C96B84" />
                )}
              </div>

              <div className="mt-3 px-1 pb-1">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-serif text-2xl text-ink leading-tight group-hover:text-[var(--plum)] transition-colors">
                    {p.name}
                  </h3>
                  <ArrowUpRight size={16} className="text-[var(--rose)] opacity-60" />
                </div>
                <div className="font-hand text-[var(--rose)] text-lg leading-tight">— {p.tagline}</div>
                <p className="mt-2 text-[13px] text-ink-soft leading-relaxed line-clamp-2">{p.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] bg-[var(--bg-petal)] border border-[var(--border-soft)] text-[var(--plum)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footnote */}
      <div className="mt-16 max-w-3xl">
        <HandArrow className="rotate-[-30deg]" color="#C96B84" />
        <p className="font-hand text-[var(--plum)] text-2xl">
          — click a card to read the full scrapbook page.
        </p>
      </div>
    </div>
  );
}
