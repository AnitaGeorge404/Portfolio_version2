import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import SearchTabs from "@/components/SearchTabs";
import { Sparkle } from "@/components/Decorations";
import { Github, Linkedin, Globe } from "lucide-react";
import { profile } from "@/data/portfolio";

export default function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 220);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [location.pathname]);

  return (
    <div className="relative" data-testid="layout-root">
      {/* Top thin info bar */}
      <div className="relative z-20 border-b border-[var(--border-soft)]/70 bg-paper/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between text-[11px] tracking-[0.18em] uppercase font-sans text-plum">
          <Link to="/" data-testid="brand-link" className="flex items-center gap-2 link-soft">
            <Sparkle size={12} />
            <span>search · anita george</span>
          </Link>
          <div className="hidden sm:flex items-center gap-5">
            <a href={profile.github} target="_blank" rel="noreferrer" data-testid="top-github" className="link-soft inline-flex items-center gap-1.5">
              <Github size={12} /> github
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" data-testid="top-linkedin" className="link-soft inline-flex items-center gap-1.5">
              <Linkedin size={12} /> linkedin
            </a>
            <a href={profile.portfolio} target="_blank" rel="noreferrer" data-testid="top-portfolio" className="link-soft inline-flex items-center gap-1.5">
              <Globe size={12} /> v0
            </a>
          </div>
          <span className="hidden sm:inline font-hand text-base normal-case tracking-normal text-plum/80">
            kerala · {new Date().getFullYear()}
          </span>
        </div>
      </div>

      {/* Sticky search header — appears on scroll for non-home, always for inner pages */}
      {(!isHome || scrolled) && (
        <header
          className="sticky top-0 z-20 bg-paper/85 backdrop-blur-md border-b border-[var(--border-soft)]/70"
          data-testid="sticky-search-header"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
            <Link to="/" className="font-serif text-2xl text-ink leading-none shrink-0" data-testid="logo-link">
              <span className="italic">A</span>
              <span className="text-plum">.</span>g
            </Link>
            <div className="flex-1">
              <SearchBar compact defaultValue="anita george" />
            </div>
          </div>
          <SearchTabs />
        </header>
      )}

      <main className="relative z-10">{children}</main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-[var(--border-soft)] bg-warm/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-serif text-3xl text-ink leading-none">Anita George</div>
            <div className="font-hand text-plum text-xl mt-2">— a slow corner of the internet</div>
            <p className="mt-4 font-sans text-sm text-ink-soft leading-relaxed max-w-sm">
              {profile.blurb}
            </p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-plum">elsewhere</div>
            <ul className="mt-3 space-y-2 font-sans text-sm text-ink">
              <li><a className="link-soft" data-testid="footer-github" href={profile.github} target="_blank" rel="noreferrer">github / AnitaGeorge404</a></li>
              <li><a className="link-soft" data-testid="footer-linkedin" href={profile.linkedin} target="_blank" rel="noreferrer">linkedin / anita-george</a></li>
              <li><a className="link-soft" data-testid="footer-portfolio" href={profile.portfolio} target="_blank" rel="noreferrer">anitageorge.vercel.app</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-plum">colophon</div>
            <p className="mt-3 font-sans text-sm text-ink-soft">
              Set in <span className="font-serif italic">Cormorant Garamond</span>,{" "}
              <span className="font-sans">Outfit</span>, and{" "}
              <span className="font-hand text-base">Caveat</span>. Hand-assembled. No analytics. No popups.
            </p>
            <p className="font-hand text-plum mt-4 text-lg">made with quiet attention.</p>
          </div>
        </div>
        <div className="border-t border-[var(--border-soft)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between text-[11px] tracking-[0.2em] uppercase text-plum">
            <span>© {new Date().getFullYear()} a.george</span>
            <span className="font-hand text-base normal-case tracking-normal">— end of page —</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
