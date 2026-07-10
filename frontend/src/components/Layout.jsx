import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import ThemeDecoration from "@/components/ThemeDecoration";
import ThemePageHeader from "@/components/ThemePageHeader";
import { CherryBlossom } from "@/components/Decorations";
import { AmbientParticles, PageTransition } from "@/components/MotionFramework";
import { FloatingPetal, Butterfly } from "@/components/BotanicalElements";
import { profile } from "@/data/portfolio";
import { useTheme } from "@/context/ThemeContext";

export default function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const { currentTheme } = useTheme();
  const isScholar = currentTheme === "search";
  const isMidnight = currentTheme === "midnight";
  const isArchive = currentTheme === "archive";

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

      {/* Ambient particle atmosphere — only Archive's botanical decoration; Scholar is
          deliberately bare, Midnight uses its own restrained semantic-node ambience
          (ThemeDecoration) instead of generic pink petals/particles */}
      {isArchive && <AmbientParticles count={30} className="opacity-40" />}
      {isArchive && Math.random() > 0.7 && <FloatingPetal delay={0} duration={10} />}
      {isArchive && Math.random() > 0.7 && <FloatingPetal delay={1.5} duration={12} />}
      {isArchive && Math.random() > 0.6 && <Butterfly delay={2} duration={14} />}

      {/* Theme-branching page header — identity strip + sticky search/logo/tabs */}
      <ThemePageHeader showSticky={!isHome || scrolled} />

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
            {isArchive && <CherryBlossom className="absolute -top-6 -right-4 opacity-60" size={64} />}
            <div className={`font-serif text-3xl leading-none ${isMidnight ? "" : "text-ink"}`} style={isMidnight ? { color: "var(--ink)" } : undefined}>
              <span className={isScholar || isMidnight ? "" : "italic"} style={isScholar || isMidnight ? undefined : { color: "#C96B84" }}>Anita</span>{" "}
              <span className="text-[var(--plum)]">George</span>
            </div>
            {isScholar ? (
              <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--ink-soft)] mt-2">Indexed engineering profile</div>
            ) : isMidnight ? (
              <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--decoration-primary)] mt-2">Private archive · after midnight</div>
            ) : (
              <div className="font-hand text-[var(--rose)] text-xl mt-2">— a slow corner of the internet</div>
            )}
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
            {isScholar ? (
              <p className="font-sans text-sm text-ink-soft leading-relaxed">
                Set in Source Serif 4, IBM Plex Sans, and IBM Plex Mono. No analytics. No popups.
              </p>
            ) : isMidnight ? (
              <p className="font-sans text-sm text-ink-soft leading-relaxed">
                Set in Instrument Serif and Manrope. No analytics. No popups.
              </p>
            ) : (
              <p className="font-sans text-sm text-ink-soft leading-relaxed">
                Set in{" "}
                <span className="font-serif italic">Cormorant Garamond</span>,{" "}
                <span className="font-sans">Outfit</span>, and{" "}
                <span className="font-hand text-base">Caveat</span>. Hand-assembled. No analytics. No popups.
              </p>
            )}
            {isArchive && <p className="font-hand text-[var(--rose)] mt-4 text-xl">made with quiet attention.</p>}
          </div>
        </div>
        <div className="border-t border-[var(--border-soft)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between text-[11px] tracking-[0.2em] uppercase text-[var(--plum)]">
            <span>© {new Date().getFullYear()} a.george</span>
            {isArchive && <span className="font-hand text-base normal-case tracking-normal text-[var(--rose)]">— end of page —</span>}
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
