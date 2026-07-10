import React from "react";
import { NavLink } from "react-router-dom";
import { tabs } from "@/data/portfolio";
import { Sparkles } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const NAV_MARK_CLASS = {
  archive: "nav-mark-archive",
  search: "nav-mark-scholar",
  midnight: "nav-mark-midnight",
  herbarium: "nav-mark-herbarium",
};

export default function SearchTabs() {
  const { currentTheme } = useTheme();
  const markClass = NAV_MARK_CLASS[currentTheme] || NAV_MARK_CLASS.archive;

  return (
    <nav
      className="border-b border-[var(--border-soft)]/80 bg-[var(--bg-paper)]/60"
      aria-label="Search categories"
      data-testid="search-tabs"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 overflow-x-auto">
        <ul className="flex items-center gap-1 sm:gap-2 min-w-max">
          {tabs.map((t) => (
            <li key={t.key}>
              <NavLink
                end={t.path === "/"}
                to={t.path}
                data-testid={`tab-${t.key}`}
                className={({ isActive }) =>
                  `relative inline-flex items-center gap-1.5 px-3 sm:px-4 py-3 text-[13px] font-sans tracking-tight transition-colors whitespace-nowrap
                  ${isActive ? "text-[var(--plum)]" : "text-ink-soft hover:text-[var(--plum)]"}`
                }
              >
                {({ isActive }) => (
                  <>
                    {t.sparkle && <Sparkles size={12} className="text-rose" />}
                    {t.label}
                    {isActive && (
                      <span className={`nav-active-mark ${markClass} absolute left-3 right-3 -bottom-px h-[2px] bg-[var(--rose)] rounded-full`} />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
