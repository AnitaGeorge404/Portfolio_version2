import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, Search } from "lucide-react";

/**
 * Herbarium-only presentation primitives. Not theme-branching — only ever
 * imported inside a page's `currentTheme === "herbarium"` branch, matching
 * the Archive/Scholar/Midnight precedent.
 *
 * The central grammar: the VIEWPORT is a deep forest environment; the
 * SPECIMEN SHEET is a distinct ivory archival surface that breaks from it.
 * Never render forest-green text on the specimen sheet or specimen-ivory
 * text on the forest — the specimen-* tokens are a deliberately separate
 * palette from the bg/ink environment tokens for exactly this reason.
 */

// ── Botanical illustrations — real recognizable silhouettes, not blobs ──

/** A fern frond: central rachis with tapering paired pinnae. Used sparingly. */
export function FernFrond({ className = "", size = 70, color = "var(--decoration-primary)", style }) {
  const pairs = [14, 24, 34, 44, 54, 64, 74];
  return (
    <svg viewBox="0 0 60 100" width={size} height={(size * 100) / 60} className={className} style={style} aria-hidden>
      <path d="M30 96 L30 8" stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.9" />
      {pairs.map((y, i) => {
        const scale = 1 - i * 0.11;
        const len = 15 * scale;
        const top = 96 - y;
        return (
          <g key={y} opacity={0.85 - i * 0.04}>
            <path d={`M30 ${top} Q ${30 - len * 0.6} ${top - 5} ${30 - len} ${top - 9}`} stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="round" />
            <path d={`M30 ${top} Q ${30 + len * 0.6} ${top - 5} ${30 + len} ${top - 9}`} stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="round" />
          </g>
        );
      })}
    </svg>
  );
}

/** A four-leaf clover: distinct heart-shaped lobes around a center + stem. */
export function CloverLeaf({ className = "", size = 32, color = "var(--decoration-primary)", style }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} style={style} aria-hidden>
      <path d="M16 16 C16 8 10 4 6 8 C2 12 8 16 16 16 Z" fill={color} opacity="0.9" />
      <path d="M16 16 C24 16 30 12 26 8 C22 4 16 8 16 16 Z" fill={color} opacity="0.75" />
      <path d="M16 16 C8 16 4 22 8 26 C12 30 16 24 16 16 Z" fill={color} opacity="0.75" />
      <path d="M16 16 C16 24 20 30 24 26 C28 22 24 16 16 16 Z" fill={color} opacity="0.9" />
      <path d="M16 18 L16 30" stroke={color} strokeWidth="1.3" opacity="0.6" strokeLinecap="round" />
      <circle cx="16" cy="16" r="1.4" fill="var(--specimen-ink, #2A2418)" opacity="0.5" />
    </svg>
  );
}

/** A single pointed leaf with a visible midrib and veins. */
export function FieldLeaf({ className = "", size = 40, color = "var(--decoration-primary)", style }) {
  return (
    <svg viewBox="0 0 40 60" width={size} height={(size * 60) / 40} className={className} style={style} aria-hidden>
      <path d="M20 5 C32 15 34 35 20 55 C6 35 8 15 20 5 Z" fill={color} opacity="0.75" />
      <path d="M20 8 L20 52" stroke="var(--specimen-ink, #2A2418)" strokeWidth="0.8" opacity="0.3" />
      <path d="M20 20 L12 28 M20 20 L28 28 M20 32 L13 39 M20 32 L27 39" stroke="var(--specimen-ink, #2A2418)" strokeWidth="0.5" opacity="0.25" />
    </svg>
  );
}

const MOTIFS = { fern: FernFrond, clover: CloverLeaf, leaf: FieldLeaf };

// ── Field label / metadata ──

export function HerbariumFieldLabel({ children, className = "", muted = false }) {
  return (
    <div className={`font-mono text-[10px] uppercase tracking-[0.12em] ${muted ? "text-[var(--sage)]" : "text-[var(--decoration-primary)]"} ${className}`}>
      {children}
    </div>
  );
}

/** Field label variant meant to sit ON a specimen sheet (dark ink, not forest ivory). */
export function SpecimenFieldLabel({ children, className = "" }) {
  return (
    <div className={`font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--specimen-ink-soft)] ${className}`}>
      {children}
    </div>
  );
}

/**
 * The specimen sheet — the one surface that deliberately breaks from the
 * forest palette. Ivory paper, thin sage rule, small classification header.
 */
export function HerbariumSpecimenSheet({ id, title, className = "", children }) {
  return (
    <div
      className={`relative bg-[var(--specimen-bg)] border border-[var(--specimen-border)] px-5 py-5 sm:px-6 sm:py-6 ${className}`}
      style={{ backgroundImage: "radial-gradient(rgba(42,36,24,0.025) 1px, transparent 1px)", backgroundSize: "3px 3px" }}
    >
      {(id || title) && (
        <div className="flex items-baseline justify-between border-b border-[var(--specimen-border)] pb-2 mb-3">
          {id && <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--specimen-ink-soft)]">{id}</span>}
          {title && <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--specimen-ink-soft)]">{title}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

/** A project/system specimen record — the field-record version of a project card. */
export function HerbariumSystemRecord({ index, motif = "leaf", eyebrow, title, href, meta, description, tags = [], actions = [], wide = false, testid }) {
  const Motif = MOTIFS[motif] || FieldLeaf;
  return (
    <HerbariumSpecimenSheet
      id={`SPECIMEN ${String(index ?? 0).padStart(2, "0")}`}
      title={eyebrow}
      className={`transition-transform duration-500 hover:-translate-y-0.5 ${wide ? "sm:col-span-2" : ""}`}
    >
      <div data-testid={testid} className="relative">
        <Motif className="absolute -top-1 -right-1 opacity-70 hidden sm:block" size={44} />
        <Link to={href} className="block font-serif italic text-2xl sm:text-3xl text-[var(--specimen-ink)] hover:opacity-75 transition-opacity pr-10">
          {title}
        </Link>
        {meta && <div className="mt-1 text-[13px] text-[var(--specimen-ink-soft)]">{meta}</div>}
        {description && <p className="mt-3 text-[14px] leading-relaxed text-[var(--specimen-ink)] max-w-xl">{description}</p>}
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
            {tags.map((t) => (
              <span key={t} className="font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--specimen-ink-soft)] border border-[var(--specimen-border)] px-1.5 py-0.5">
                {t}
              </span>
            ))}
          </div>
        )}
        {actions.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
            {actions.map((a, i) => (
              <Link key={i} to={a.to} className="inline-flex items-center gap-1 text-[var(--burgundy)] hover:underline underline-offset-4">
                {a.label} <ArrowUpRight size={12} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </HerbariumSpecimenSheet>
  );
}

/** Field archive exploration surface — Herbarium's search bar. */
export function HerbariumSearchSurface({ defaultValue = "", compact = false, autoFocus = false }) {
  const [value, setValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const submit = (e) => {
    e?.preventDefault?.();
    const q = (value || "").toLowerCase().trim();
    if (
      q.includes("work") || q.includes("project") || q.includes("vanta") ||
      q.includes("studybee") || q.includes("faimer") || q.includes("lawgorithm") ||
      q.includes("delai") || q.includes("neurobridge")
    ) navigate("/work");
    else if (q.includes("contact") || q.includes("email") || q.includes("hello")) navigate("/contact");
    else if (q.includes("research") || q.includes("paper")) navigate("/research");
    else if (q.includes("image") || q.includes("photo") || q.includes("gallery")) navigate("/images");
    else navigate("/ai-mode");
  };

  return (
    <form onSubmit={submit} className={compact ? "w-full" : "w-full max-w-xl"} data-testid="herbarium-search-form">
      <div
        className="flex items-center gap-3 px-4 py-2.5 bg-[var(--specimen-bg)] border transition-colors duration-300"
        style={{ borderColor: focused ? "var(--decoration-primary)" : "var(--specimen-border)" }}
      >
        <Search size={15} style={{ color: focused ? "var(--burgundy)" : "var(--specimen-ink-soft)" }} className="shrink-0" />
        <input
          data-testid="herbarium-search-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoFocus={autoFocus}
          placeholder="Search the field archive"
          className="flex-1 min-w-0 bg-transparent outline-none text-[15px] text-[var(--specimen-ink)] placeholder:text-[var(--specimen-ink-soft)]"
        />
        <button type="submit" className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--burgundy)] hover:opacity-75">
          Explore
        </button>
      </div>
    </form>
  );
}

export function HerbariumStatLine({ items }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px]">
      {items.map(([label, value]) => (
        <span key={label} className="text-[var(--ink-soft)]">
          <span className="text-[var(--decoration-primary)] font-medium">{value}</span> {label}
        </span>
      ))}
    </div>
  );
}
