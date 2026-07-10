import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, ExternalLink, Search } from "lucide-react";

/**
 * Scholar-only presentation primitives. These are intentionally NOT theme-
 * branching (unlike Theme* components) — they are only ever imported from
 * inside a page's `currentTheme === "search"` branch. Archive/Midnight/
 * Herbarium never render these, so they can stay plain and dense without
 * needing internal theme conditionals.
 */

/** Small uppercase mono kicker, e.g. "PROJECT · 2024 · ACTIVE" */
export function ScholarMetaLine({ children, className = "" }) {
  return (
    <div className={`font-mono text-[11px] tracking-[0.04em] text-[var(--ink-soft)] ${className}`}>
      {children}
    </div>
  );
}

/**
 * One indexed record — the core Scholar list-item primitive used for
 * projects, research topics, media artifacts, timeline entries, etc.
 */
export function ScholarResultRow({
  eyebrow,
  title,
  href,
  external,
  meta,
  description,
  tags = [],
  actions = [],
  testid,
}) {
  const TitleTag = href ? (external ? "a" : Link) : "div";
  const titleProps = href
    ? external
      ? { href, target: "_blank", rel: "noreferrer" }
      : { to: href }
    : {};

  return (
    <article className="card-enter-scholar py-5 border-b border-[var(--border-soft)]" data-testid={testid}>
      {eyebrow && <ScholarMetaLine className="mb-1">{eyebrow}</ScholarMetaLine>}
      <TitleTag
        {...titleProps}
        className="inline-flex items-center gap-1.5 text-xl sm:text-2xl font-serif text-[var(--link)] hover:underline underline-offset-4 leading-snug"
      >
        {title}
        {href && (external ? <ExternalLink size={14} className="shrink-0" /> : <ArrowUpRight size={14} className="shrink-0" />)}
      </TitleTag>
      {meta && <div className="mt-1 text-[13px] text-[var(--ink-soft)]">{meta}</div>}
      {description && (
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink)] max-w-2xl">{description}</p>
      )}
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {tags.map((t) => (
            <span key={t} className="font-mono text-[11px] text-[var(--ink-soft)] border border-[var(--border-soft)] px-1.5 py-0.5">
              {t}
            </span>
          ))}
        </div>
      )}
      {actions.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          {actions.map((a, i) =>
            a.href ? (
              <a
                key={`${a.label}-${i}`}
                href={a.href}
                target={a.external ? "_blank" : undefined}
                rel={a.external ? "noreferrer" : undefined}
                className="text-[var(--link)] hover:underline underline-offset-4"
              >
                {a.label}
              </a>
            ) : (
              <Link key={`${a.label}-${i}`} to={a.to} className="text-[var(--link)] hover:underline underline-offset-4">
                {a.label}
              </Link>
            )
          )}
        </div>
      )}
    </article>
  );
}

/** Restrained text-tab filter row with underline-selected state, replaces pill buttons. */
export function ScholarFilterBar({ options, active, onSelect, testid }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[var(--border-soft)] pb-2" data-testid={testid}>
      {options.map((opt) => {
        const isActive = active === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            aria-pressed={isActive}
            className={`text-sm pb-1.5 border-b-2 transition-colors ${
              isActive
                ? "text-[var(--link)] border-[var(--link)] font-medium"
                : "text-[var(--ink-soft)] border-transparent hover:text-[var(--ink)]"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/** Honest, source-verified stat line — "N indexed / N repositories / ..." */
export function ScholarStatLine({ items }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[var(--ink-soft)]">
      {items.map(([label, value], i) => (
        <span key={label}>
          <span className="text-[var(--ink)] font-medium">{value}</span> {label}
          {i < items.length - 1 && <span className="ml-4 text-[var(--border-medium)]">·</span>}
        </span>
      ))}
    </div>
  );
}

/** Restrained author/profile index block. */
export function ScholarProfileIndex({ profile, interests = [] }) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-[var(--ink)]">{profile.name}</h2>
      <p className="mt-0.5 text-sm text-[var(--ink-soft)]">
        {profile.role.split(" · ")[0]} &middot; {profile.universityShort}
      </p>
      {interests.length > 0 && (
        <div className="mt-3">
          <ScholarMetaLine>Engineering interests</ScholarMetaLine>
          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-sm text-[var(--ink)]">
            {interests.map((i) => (
              <span key={i}>{i}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Scholar's own search input — the theme's central interaction primitive.
 * Square-cornered, hairline-bordered, no pill/dots/mic decoration. Reuses
 * the same keyword-routing contract as the shared SearchBar so behavior
 * stays consistent, just with Scholar's own chrome and focus state.
 */
export function ScholarSearchBar({ defaultValue = "", compact = false, autoFocus = false }) {
  const [value, setValue] = useState(defaultValue);
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
    <form onSubmit={submit} className={compact ? "w-full" : "w-full max-w-xl"} data-testid="scholar-search-form">
      <div className="scholar-search-row flex items-center gap-2.5 border border-[var(--border-medium)] px-3.5 py-2.5 bg-[var(--bg-paper)] transition-colors focus-within:border-[var(--link)]">
        <Search size={16} className="shrink-0 text-[var(--ink-soft)]" />
        <input
          data-testid="scholar-search-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus={autoFocus}
          placeholder="Search Anita's projects, systems, skills, or engineering themes"
          className="flex-1 min-w-0 bg-transparent outline-none text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-soft)]"
        />
        <button
          type="submit"
          className="shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--link)] hover:underline"
        >
          Search
        </button>
      </div>
    </form>
  );
}

/** Section title used above a list of ScholarResultRow items. */
export function ScholarSectionTitle({ children, count }) {
  return (
    <div className="flex items-baseline justify-between border-b border-[var(--ink)] pb-2 mb-1">
      <h2 className="font-serif text-xl text-[var(--ink)]">{children}</h2>
      {count != null && <span className="font-mono text-[12px] text-[var(--ink-soft)]">{count} indexed</span>}
    </div>
  );
}
