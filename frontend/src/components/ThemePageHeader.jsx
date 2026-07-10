import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import SearchBar from "@/components/SearchBar";
import SearchTabs from "@/components/SearchTabs";
import { ScholarSearchBar } from "@/components/ScholarPrimitives";
import { MidnightQuerySurface } from "@/components/MidnightPrimitives";
import { Sparkle } from "@/components/Decorations";
import { Github, Linkedin, Globe } from "lucide-react";
import { profile } from "@/data/portfolio";

/**
 * ThemePageHeader — the top identity strip + sticky search/logo/tabs row,
 * mounted once by Layout.jsx. Each theme gets its own composition rather
 * than one fixed structure recolored by CSS vars:
 *   archive   handwritten top strip + rose "A.g" wordmark + search pill
 *   search    plain "Indexed Record" bar, no handwriting, no decoration
 *   midnight  centered identity, calmer top strip
 *   herbarium "FIELD INDEX" mono strip + specimen-tag wordmark chip
 *
 * `showSticky` controls whether the sticky search/logo/tabs row renders
 * (Layout decides this based on scroll position / route).
 */
export default function ThemePageHeader({ showSticky }) {
  const { currentTheme } = useTheme();

  if (currentTheme === "search") {
    return (
      <>
        <div
          className="relative z-20 border-b border-[var(--border-soft)] bg-[var(--bg-paper)]"
          data-testid="theme-page-header-search"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between text-[11px] tracking-[0.1em] text-[var(--ink-soft)] font-mono">
            <Link to="/" data-testid="brand-link" className="link-soft">
              Anita George — Indexed Record
            </Link>
            <div className="hidden sm:flex items-center gap-5">
              <a href={profile.github} target="_blank" rel="noreferrer" data-testid="top-github" className="link-soft">GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" data-testid="top-linkedin" className="link-soft">LinkedIn</a>
              <a href={profile.portfolio} target="_blank" rel="noreferrer" data-testid="top-portfolio" className="link-soft">Portfolio</a>
            </div>
            <span className="hidden sm:inline">Kerala, IN · {new Date().getFullYear()}</span>
          </div>
        </div>
        {showSticky && (
          <header className="sticky top-0 z-20 bg-[var(--bg-paper)] border-b border-[var(--border-soft)]" data-testid="sticky-search-header">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
              <Link to="/" className="shrink-0 font-serif text-lg text-[var(--ink)] whitespace-nowrap" data-testid="logo-link" aria-label="Home">
                Anita Index
              </Link>
              <div className="flex-1"><ScholarSearchBar compact defaultValue="anita george" /></div>
            </div>
            <SearchTabs />
          </header>
        )}
      </>
    );
  }

  if (currentTheme === "midnight") {
    return (
      <>
        <div
          className="relative z-20 border-b border-[var(--border-soft)]"
          style={{ background: "linear-gradient(180deg, var(--bg-warm) 0%, var(--bg-paper) 100%)" }}
          data-testid="theme-page-header-midnight"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between text-[11px] font-mono tracking-[0.15em] text-[var(--ink-soft)]">
            <Link to="/" data-testid="brand-link" className="link-soft">ANITA / MIDNIGHT</Link>
            <div className="hidden sm:flex items-center gap-5">
              <a href={profile.github} target="_blank" rel="noreferrer" data-testid="top-github" className="link-soft">GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" data-testid="top-linkedin" className="link-soft">LinkedIn</a>
              <a href={profile.portfolio} target="_blank" rel="noreferrer" data-testid="top-portfolio" className="link-soft">Portfolio</a>
            </div>
            <span className="hidden sm:inline">Kerala · {new Date().getFullYear()}</span>
          </div>
        </div>
        {showSticky && (
          <header
            className="sticky top-0 z-20 border-b border-[var(--border-soft)] backdrop-blur-md"
            style={{ background: "rgba(10,11,13,0.85)" }}
            data-testid="sticky-search-header"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
              <Link to="/" className="shrink-0 font-serif italic text-xl text-[var(--ink)]" data-testid="logo-link" aria-label="Home">Anita</Link>
              <div className="flex-1"><MidnightQuerySurface compact defaultValue="" /></div>
            </div>
            <SearchTabs />
          </header>
        )}
      </>
    );
  }

  if (currentTheme === "herbarium") {
    return (
      <>
        <div
          className="relative z-20 border-b border-[var(--border-soft)]"
          data-testid="theme-page-header-herbarium"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between text-[11px] uppercase tracking-[0.15em] text-[var(--decoration-primary)] font-mono">
            <Link to="/" data-testid="brand-link" className="link-soft">Field Index · Anita&apos;s Archive</Link>
            <div className="hidden sm:flex items-center gap-5 normal-case">
              <a href={profile.github} target="_blank" rel="noreferrer" data-testid="top-github" className="link-soft">GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" data-testid="top-linkedin" className="link-soft">LinkedIn</a>
              <a href={profile.portfolio} target="_blank" rel="noreferrer" data-testid="top-portfolio" className="link-soft">Portfolio</a>
            </div>
            <span className="hidden sm:inline">Kerala · {new Date().getFullYear()}</span>
          </div>
        </div>
        {showSticky && (
          <header className="sticky top-0 z-20 bg-[var(--bg-paper)]/92 backdrop-blur-md border-b border-[var(--border-soft)]" data-testid="sticky-search-header">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
              <Link
                to="/"
                className="shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] px-2 py-1 bg-[var(--decoration-primary)] text-[var(--bg-paper)]"
                data-testid="logo-link"
                aria-label="Home"
              >
                A.G
              </Link>
              <div className="flex-1"><SearchBar compact defaultValue="anita george" /></div>
            </div>
            <SearchTabs />
          </header>
        )}
      </>
    );
  }

  // archive (default) — handwritten top strip + rose "A.g" wordmark
  return (
    <>
      <motion.div
        className="relative z-20 border-b border-[var(--border-soft)] bg-[var(--bg-petal)]/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        data-testid="theme-page-header-archive"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between text-[11px] tracking-[0.18em] uppercase font-sans text-[var(--plum)]">
          <Link to="/" data-testid="brand-link" className="flex items-center gap-2 link-soft">
            <Sparkle size={12} color="var(--decoration-primary)" />
            <span className="font-hand text-base normal-case tracking-normal">search · anita&apos;s universe</span>
          </Link>
          <div className="hidden sm:flex items-center gap-5">
            <a href={profile.github} target="_blank" rel="noreferrer" data-testid="top-github" className="link-soft inline-flex items-center gap-1.5">
              <Github size={12} /> github
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" data-testid="top-linkedin" className="link-soft inline-flex items-center gap-1.5">
              <Linkedin size={12} /> linkedin
            </a>
            <a href={profile.portfolio} target="_blank" rel="noreferrer" data-testid="top-portfolio" className="link-soft inline-flex items-center gap-1.5">
              <Globe size={12} /> portfolio
            </a>
          </div>
          <span className="hidden sm:inline font-hand text-base normal-case tracking-normal text-[var(--rose)]/80">
            kerala · {new Date().getFullYear()}
          </span>
        </div>
      </motion.div>

      {showSticky && (
        <motion.header
          className="sticky top-0 z-20 bg-[var(--bg-paper)]/92 backdrop-blur-md border-b border-[var(--border-soft)]"
          data-testid="sticky-search-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
            <Link to="/" className="shrink-0" data-testid="logo-link" aria-label="Home">
              <span className="font-serif text-2xl leading-none text-[var(--decoration-primary)]">
                <span className="italic">A</span>
              </span>
              <span className="font-serif text-2xl leading-none text-[var(--plum)]">.</span>
              <span className="font-serif text-2xl leading-none text-ink">g</span>
            </Link>
            <div className="flex-1">
              <SearchBar compact defaultValue="anita george" />
            </div>
          </div>
          <SearchTabs />
        </motion.header>
      )}
    </>
  );
}
