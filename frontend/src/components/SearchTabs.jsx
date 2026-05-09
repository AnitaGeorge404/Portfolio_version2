import React from "react";
import { NavLink } from "react-router-dom";
import { tabs } from "@/data/portfolio";
import { Sparkles } from "lucide-react";

export default function SearchTabs() {
  return (
    <nav
      className="border-b border-[var(--border-soft)]/80"
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
                  ${isActive ? "text-ink" : "text-ink-soft hover:text-ink"}`
                }
              >
                {({ isActive }) => (
                  <>
                    {t.sparkle && <Sparkles size={12} className="text-sage" />}
                    {t.label}
                    {isActive && (
                      <span className="absolute left-3 right-3 -bottom-px h-[2px] bg-plum rounded-full" />
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
