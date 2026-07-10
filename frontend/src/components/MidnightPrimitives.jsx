import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, ExternalLink, Search } from "lucide-react";

/**
 * Midnight-only presentation primitives. Not theme-branching — only ever
 * imported inside a page's `currentTheme === "midnight"` branch, matching
 * the Archive/Scholar precedent of not forcing every theme through one
 * universal component tree.
 *
 * Midnight is not dark mode: everything here is built around a layered
 * darkness system (bg-paper/warm/card/tag/petal = void -> atmosphere ->
 * surface -> active surface -> intelligence) rather than one flat black
 * fill, and gold (--decoration-primary / --rose / --link) is used only as
 * a signal, never as the default text or border color.
 */

/** Small uppercase mono kicker, matches ThemeSectionLabel's midnight grammar */
export function MidnightMetaLine({ children, className = "", signal = false }) {
  return (
    <div
      className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] ${
        signal ? "text-[var(--decoration-primary)]" : "text-[var(--ink-soft)]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Layered glass surface — the base every Midnight panel sits on. A single
 * top-edge specular highlight + graduated fill stands in for "premium
 * glass" instead of a flat rgba() + backdrop-blur() one-liner.
 *   level 2 = surface (default panel)
 *   level 3 = active surface (elevated / hovered)
 *   level 4 = intelligence (warm, gold-adjacent — AI Mode's synthesis panel)
 */
export function MidnightGlassSurface({ children, level = 2, className = "", as = "div" }) {
  const Tag = as;
  const surfaceRef = useRef(null);
  const rafRef = useRef(null);
  const fill =
    level === 4 ? "var(--bg-petal)" : level === 3 ? "var(--bg-tag)" : "var(--bg-card)";

  // Pointer-responsive specular highlight — CSS-var driven, rAF-throttled, no
  // React state writes per pointermove (keeps this cheap even with many
  // records on screen at once).
  const handlePointerMove = (e) => {
    if (rafRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = surfaceRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty("--my", `${((clientY - rect.top) / rect.height) * 100}%`);
    });
  };

  return (
    <Tag
      ref={surfaceRef}
      onMouseMove={handlePointerMove}
      className={`midnight-glass relative border border-[var(--border-soft)] ${className}`}
      style={{
        background: `linear-gradient(165deg, ${fill} 0%, var(--bg-warm) 100%)`,
        backdropFilter: "blur(6px)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(233,231,226,0.28), transparent)" }}
      />
      <span aria-hidden className="midnight-specular pointer-events-none absolute inset-0" />
      {children}
    </Tag>
  );
}

/**
 * A project/record panel. `wide` spans full width (primary system), the
 * default is a compact row — this is the "controlled variation" the brief
 * asks for instead of identical rectangles everywhere.
 */
export function MidnightSystemRecord({ eyebrow, title, href, meta, description, tags = [], actions = [], wide = false, testid }) {
  return (
    <MidnightGlassSurface
      level={2}
      className={`card-enter-midnight p-5 sm:p-6 transition-[border-color,transform] duration-300 hover:border-[var(--border-medium)] hover:-translate-y-0.5 ${wide ? "sm:col-span-2" : ""}`}
    >
      <div data-testid={testid}>
        {eyebrow && <MidnightMetaLine>{eyebrow}</MidnightMetaLine>}
        <Link to={href} className="mt-1.5 block font-serif italic text-2xl sm:text-3xl text-[var(--ink)] hover:text-[var(--decoration-primary)] transition-colors">
          {title}
        </Link>
        {meta && <div className="mt-1 text-[13px] text-[var(--ink-soft)]">{meta}</div>}
        {description && <p className="mt-3 text-[14px] leading-relaxed text-[var(--ink-soft)] max-w-xl">{description}</p>}
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
            {tags.map((t) => (
              <span key={t} className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--sage)] border border-[var(--border-soft)] px-1.5 py-0.5">
                {t}
              </span>
            ))}
          </div>
        )}
        {actions.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
            {actions.map((a, i) => (
              <Link key={i} to={a.to} className="inline-flex items-center gap-1 text-[var(--decoration-primary)] hover:underline underline-offset-4">
                {a.label} <ArrowUpRight size={12} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </MidnightGlassSurface>
  );
}

/** Intelligence query surface — Midnight's search bar, not a recolored white pill. */
export function MidnightQuerySurface({ defaultValue = "", compact = false, autoFocus = false }) {
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
    <form onSubmit={submit} className={compact ? "w-full" : "w-full max-w-xl mx-auto"} data-testid="midnight-search-form">
      <MidnightGlassSurface
        level={focused ? 3 : 2}
        className="midnight-search-row flex items-center gap-3 px-4 py-3 transition-colors duration-300"
      >
        <Search size={16} className="shrink-0" style={{ color: focused ? "var(--decoration-primary)" : "var(--ink-soft)" }} />
        <input
          data-testid="midnight-search-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoFocus={autoFocus}
          placeholder="Query Anita's systems, projects, or engineering patterns"
          className="flex-1 min-w-0 bg-transparent outline-none text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-soft)]"
        />
        <button type="submit" className="shrink-0 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--decoration-primary)] hover:opacity-80">
          Query
        </button>
      </MidnightGlassSurface>
    </form>
  );
}

/** Honest verified-metric line, gold used only on the numerals (the signal), not the labels. */
export function MidnightStatLine({ items }) {
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
