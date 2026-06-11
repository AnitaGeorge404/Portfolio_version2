import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import SearchTabs from "@/components/SearchTabs";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import ThemeDecoration from "@/components/ThemeDecoration";
import { Sparkle, CherryBlossom } from "@/components/Decorations";
import { AmbientParticles, PageTransition } from "@/components/MotionFramework";
import { FloatingPetal, Butterfly } from "@/components/BotanicalElements";
import { Github, Linkedin, Globe } from "lucide-react";
import { profile } from "@/data/portfolio";

export default function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [location.pathname]);

  return (
    <div className="relative" data-testid="layout-root">
      {/* Theme Switcher */}
      <ThemeSwitcher />

      {/* Theme-Specific Decorations */}
      <ThemeDecoration />

      {/* Ambient particle atmosphere */}
      <AmbientParticles count={30} className="opacity-40" />

      {/* Occasional floating petals for life */}
      {Math.random() > 0.7 && <FloatingPetal delay={0} duration={10} />}
      {Math.random() > 0.7 && <FloatingPetal delay={1.5} duration={12} />}
      {Math.random() > 0.6 && <Butterfly delay={2} duration={14} />}

      {/* Top info bar */}
      <motion.div
        className="relative z-20 border-b border-[var(--border-soft)] bg-[var(--bg-petal)]/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between text-[11px] tracking-[0.18em] uppercase font-sans text-[var(--plum)]">
          <Link to="/" data-testid="brand-link" className="flex items-center gap-2 link-soft">
            <Sparkle size={12} color="#C96B84" />
            <span className="font-hand text-base normal-case tracking-normal">search · anita&apos;s universe</span>
          </Link>
          <div className="hidden sm:flex items-center gap-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              data-testid="top-github"
              className="link-soft inline-flex items-center gap-1.5"
            >
              <Github size={12} /> github
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              data-testid="top-linkedin"
              className="link-soft inline-flex items-center gap-1.5"
            >
              <Linkedin size={12} /> linkedin
            </a>
            <a
              href={profile.portfolio}
              target="_blank"
              rel="noreferrer"
              data-testid="top-portfolio"
              className="link-soft inline-flex items-center gap-1.5"
            >
              <Globe size={12} /> portfolio
            </a>
          </div>
          <span className="hidden sm:inline font-hand text-base normal-case tracking-normal text-[var(--rose)]/80">
            kerala · {new Date().getFullYear()}
          </span>
        </div>
      </motion.div>

      {/* Sticky search header — appears on scroll for home, always for inner pages */}
      {(!isHome || scrolled) && (
        <motion.header
          className="sticky top-0 z-20 bg-[var(--bg-paper)]/92 backdrop-blur-md border-b border-[var(--border-soft)]"
          data-testid="sticky-search-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
            <Link to="/" className="shrink-0" data-testid="logo-link" aria-label="Home">
              <span className="font-serif text-2xl leading-none" style={{ color: "#C96B84" }}>
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

      <motion.main
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {children}
      </motion.main>

      {/* Footer */}
      <motion.footer
        className="relative z-10 mt-20 border-t border-[var(--border-soft)] bg-[var(--bg-petal)]/40"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="relative">
            <CherryBlossom className="absolute -top-6 -right-4 opacity-60" size={64} />
            <div className="font-serif text-3xl text-ink leading-none">
              <span className="italic" style={{ color: "#C96B84" }}>Anita</span>{" "}
              <span className="text-[var(--plum)]">George</span>
            </div>
            <div className="font-hand text-[var(--rose)] text-xl mt-2">— a slow corner of the internet</div>
            <p className="mt-4 font-sans text-sm text-ink-soft leading-relaxed max-w-sm">
              {profile.blurb.slice(0, 140)}...
            </p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--plum)] mb-3">elsewhere</div>
            <ul className="space-y-2 font-sans text-sm text-ink">
              <li>
                <a className="link-soft" data-testid="footer-github" href={profile.github} target="_blank" rel="noreferrer">
                  github / AnitaGeorge404
                </a>
              </li>
              <li>
                <a className="link-soft" data-testid="footer-linkedin" href={profile.linkedin} target="_blank" rel="noreferrer">
                  linkedin / anita-george
                </a>
              </li>
              <li>
                <a className="link-soft" data-testid="footer-portfolio" href={profile.portfolio} target="_blank" rel="noreferrer">
                  anitageorge.vercel.app
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--plum)] mb-3">colophon</div>
            <p className="font-sans text-sm text-ink-soft leading-relaxed">
              Set in{" "}
              <span className="font-serif italic">Cormorant Garamond</span>,{" "}
              <span className="font-sans">Outfit</span>, and{" "}
              <span className="font-hand text-base">Caveat</span>. Hand-assembled. No analytics. No popups.
            </p>
            <p className="font-hand text-[var(--rose)] mt-4 text-xl">made with quiet attention.</p>
          </div>
        </div>
        <div className="border-t border-[var(--border-soft)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between text-[11px] tracking-[0.2em] uppercase text-[var(--plum)]">
            <span>© {new Date().getFullYear()} a.george</span>
            <span className="font-hand text-base normal-case tracking-normal text-[var(--rose)]">— end of page —</span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
