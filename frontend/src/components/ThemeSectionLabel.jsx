import React from "react";
import { useTheme } from "@/context/ThemeContext";

/**
 * ThemeSectionLabel — the small eyebrow/kicker label used above section
 * headings across every page (e.g. "/ WORK · SEARCH CATEGORY"). Grammar
 * differs per theme:
 *   archive   "/ label · descriptor" in body sans, plum
 *   search    plain mono breadcrumb, no slash decoration
 *   midnight  spaced mono caps with a gold dot
 *   herbarium mono caps on a moss chip, like a specimen tag
 */
export default function ThemeSectionLabel({ children, className = "" }) {
  const { currentTheme } = useTheme();

  if (currentTheme === "search") {
    return (
      <div className={`font-mono text-[11px] tracking-[0.2em] text-[var(--ink-soft)] ${className}`}>
        {children}
      </div>
    );
  }

  if (currentTheme === "midnight") {
    return (
      <div className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--ink-soft)] ${className}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--decoration-primary)]" />
        {children}
      </div>
    );
  }

  if (currentTheme === "herbarium") {
    return (
      <div
        className={`inline-block font-mono text-[10px] uppercase tracking-[0.22em] px-2 py-1 bg-[var(--decoration-primary)] text-[var(--bg-paper)] ${className}`}
      >
        {children}
      </div>
    );
  }

  // archive (default)
  return (
    <div className={`text-[11px] uppercase tracking-[0.3em] text-[var(--plum)] ${className}`}>
      {children}
    </div>
  );
}
