import React, { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/portfolio";
import { Sparkle, Tape, Paperclip, Rose, Sprig, Squiggle, HandArrow } from "@/components/Decorations";
import { ArrowUpRight } from "lucide-react";

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

const heightMap = {
  short: "min-h-[260px]",
  medium: "min-h-[360px]",
  tall: "min-h-[460px]",
};

const colorBg = {
  lavender: "bg-lavender/30",
  pink: "bg-pink/30",
  sage: "bg-sage/20",
  plum: "bg-plum/15",
};

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14" data-testid="projects-page">
      {/* header */}
      <div className="relative max-w-3xl">
        <Rose className="absolute -top-8 -left-8 opacity-70" size={90} />
        <div className="text-[11px] uppercase tracking-[0.3em] text-plum">/ projects</div>
        <h1 className="font-serif text-6xl sm:text-7xl text-ink leading-[0.95] mt-2">
          a <span className="italic">pinterest</span><br /> of things i made
        </h1>
        <Squiggle width={200} className="mt-3" />
        <p className="mt-4 font-serif italic text-xl text-ink-soft max-w-xl">
          half projects, half love letters. pin the ones that catch you.
        </p>
        <div className="mt-2 font-hand text-plum text-xl rotate-[-2deg] inline-block">
          ↑ structurally pinterest. emotionally a notebook.
        </div>
      </div>

      {/* filters */}
      <div className="mt-10 flex flex-wrap gap-2 items-center" data-testid="project-filters">
        <span className="text-[10px] uppercase tracking-[0.3em] text-plum mr-2">filter</span>
        <button
          onClick={() => setFilter("all")}
          data-testid="filter-all"
          className={`px-3 py-1 text-xs rounded-full border transition ${
            filter === "all" ? "bg-ink text-paper border-ink" : "bg-tag border-[var(--border-soft)] text-ink hover:bg-warm"
          }`}
        >
          all
        </button>
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            data-testid={`filter-${t}`}
            className={`px-3 py-1 text-xs rounded-full border transition ${
              filter === t ? "bg-ink text-paper border-ink" : "bg-tag border-[var(--border-soft)] text-ink hover:bg-warm"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* masonry */}
      <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance]" data-testid="projects-masonry">
        {filtered.map((p, idx) => (
          <Link
            to={`/projects/${p.slug}`}
            key={p.slug}
            data-testid={`pin-${p.slug}`}
            className="pin-card relative block break-inside-avoid bg-white border border-[var(--border-soft)] rounded-sm overflow-hidden p-3"
            style={{ transform: `rotate(${(idx % 3 - 1) * 0.4}deg)` }}
          >
            {/* tape */}
            <Tape className="-top-2 left-6" w={70} rotate={-9} />
            {idx % 2 === 0 && <Tape className="-top-2 right-6" w={50} rotate={8} />}

            <div className={`relative overflow-hidden ${colorBg[p.color] || "bg-warm/40"} ${heightMap[p.height] || "min-h-[340px]"}`}>
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.3em] text-paper bg-ink/60 backdrop-blur px-2 py-0.5 rounded-full">
                {p.year}
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="font-hand text-paper/90 text-lg leading-tight italic drop-shadow-md">
                  "{p.note}"
                </div>
              </div>
              {idx === 0 && <Paperclip className="absolute -top-1 right-2 rotate-12 drop-shadow-sm" size={28} color="#FFF" />}
            </div>

            <div className="mt-3 px-1">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-serif text-2xl text-ink leading-tight">{p.name}</h3>
                <ArrowUpRight size={16} className="text-plum opacity-60" />
              </div>
              <div className="font-hand text-plum text-lg leading-tight">— {p.tagline}</div>
              <p className="mt-2 text-[13px] text-ink-soft leading-relaxed line-clamp-3">{p.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] bg-tag border border-[var(--border-soft)] text-plum">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* footnote */}
      <div className="mt-16 max-w-3xl">
        <HandArrow className="rotate-[-30deg]" />
        <p className="font-hand text-plum text-2xl">
          — click a pin to read the long, soft version.
        </p>
      </div>
    </div>
  );
}
