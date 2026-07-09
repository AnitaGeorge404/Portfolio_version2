import React, { useState } from "react";
import { galleryImages } from "@/data/portfolio";
import { Tape, Sparkle, Squiggle, Rose, Paperclip } from "@/components/Decorations";
import { X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { ScholarFilterBar, ScholarMetaLine } from "@/components/ScholarPrimitives";

const tags = ["all", ...Array.from(new Set(galleryImages.map((i) => i.tag)))];

function ScholarImages() {
  const [active, setActive] = useState("All");
  const [open, setOpen] = useState(null);
  const options = ["All", ...Array.from(new Set(galleryImages.map((i) => i.tag)))];
  const filtered = active === "All" ? galleryImages : galleryImages.filter((i) => i.tag === active);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12" data-testid="images-page">
      <ScholarMetaLine>Anita George · Visual artifact index</ScholarMetaLine>
      <h1 className="mt-1 font-serif text-3xl sm:text-4xl text-[var(--ink)]">Images</h1>
      <p className="mt-2 text-[15px] text-[var(--ink-soft)] max-w-2xl">
        A moodboard she works from — not project screenshots.
      </p>

      <div className="mt-6">
        <ScholarFilterBar options={options} active={active} onSelect={setActive} testid="image-filters" />
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-[var(--border-soft)]" data-testid="images-grid">
        {filtered.map((img, idx) => (
          <button
            key={img.src}
            onClick={() => setOpen(img)}
            className="relative block w-full aspect-square bg-[var(--bg-paper)] group overflow-hidden"
            data-testid={`gallery-img-${idx}`}
          >
            <img src={img.src} alt={img.caption} loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-[var(--bg-paper)]/92 px-2 py-1.5 text-left opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-[12px] text-[var(--ink)] truncate">{img.caption}</div>
              <div className="font-mono text-[10px] text-[var(--ink-soft)]">{img.tag}</div>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-[var(--ink)]/60 z-50 flex items-center justify-center p-6"
          onClick={() => setOpen(null)}
          data-testid="image-modal"
        >
          <div className="relative max-w-3xl bg-[var(--bg-paper)] border border-[var(--border-soft)] p-4" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(null)} className="absolute -top-3 -right-3 bg-[var(--bg-paper)] border border-[var(--border-soft)] rounded-full w-8 h-8 flex items-center justify-center" aria-label="close">
              <X size={16} />
            </button>
            <img src={open.src} alt={open.caption} className="w-full max-h-[70vh] object-contain" />
            <ScholarMetaLine className="mt-3">{open.tag}</ScholarMetaLine>
            <div className="text-[15px] text-[var(--ink)]">{open.caption}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Images() {
  const [active, setActive] = useState("all");
  const [open, setOpen] = useState(null);
  const filtered = active === "all" ? galleryImages : galleryImages.filter((i) => i.tag === active);
  const { currentTheme } = useTheme();

  if (currentTheme === "search") {
    return <ScholarImages />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12" data-testid="images-page">
      <div className="relative max-w-3xl">
        <Rose className="absolute -top-6 -right-2 opacity-70" size={80} />
        <div className="text-[11px] uppercase tracking-[0.3em] text-plum">/ images</div>
        <h1 className="font-serif text-6xl sm:text-7xl text-ink leading-[0.95] mt-2">
          her <span className="italic">scanned</span> internet.
        </h1>
        <Squiggle width={220} className="mt-3" />
        <p className="mt-3 font-serif italic text-xl text-ink-soft max-w-xl">
          the moodboard her brain uses while she works.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            data-testid={`image-tag-${t}`}
            className={`px-3 py-1 rounded-full text-xs border transition ${
              active === t ? "bg-ink text-paper border-ink" : "bg-tag border-[var(--border-soft)] text-ink hover:bg-warm"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4" data-testid="images-grid">
        {filtered.map((img, idx) => (
          <button
            key={img.src}
            onClick={() => setOpen(img)}
            className="pin-card relative break-inside-avoid block w-full bg-white border border-[var(--border-soft)] p-2"
            style={{ transform: `rotate(${(idx % 5 - 2) * 0.6}deg)` }}
            data-testid={`gallery-img-${idx}`}
          >
            {idx % 3 === 0 && <Tape className="-top-2 left-4" w={50} rotate={-8} />}
            {idx % 4 === 1 && <Paperclip className="absolute -top-2 right-2 rotate-12" size={18} />}
            <img src={img.src} alt={img.caption} loading="lazy" className="w-full h-auto object-cover" />
            <div className="mt-2 px-1 text-left">
              <div className="font-hand text-plum text-base leading-tight">— {img.caption}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-plum mt-0.5">{img.tag}</div>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-ink/70 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setOpen(null)}
          data-testid="image-modal"
        >
          <div className="relative max-w-3xl bg-paper border border-[var(--border-soft)] p-4" onClick={(e) => e.stopPropagation()}>
            <Tape className="-top-3 left-12" w={90} rotate={-7} />
            <button onClick={() => setOpen(null)} className="absolute -top-4 -right-4 bg-paper border border-[var(--border-soft)] rounded-full w-9 h-9 flex items-center justify-center" aria-label="close">
              <X size={16} />
            </button>
            <img src={open.src} alt={open.caption} className="w-full max-h-[70vh] object-contain" />
            <div className="mt-3 font-hand text-plum text-2xl">"{open.caption}"</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-plum">{open.tag}</div>
          </div>
        </div>
      )}
    </div>
  );
}
