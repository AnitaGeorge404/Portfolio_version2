import React, { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { THEME_NAMES } from "@/config/themeTokens";
import { THEME_ICON_SETS } from "@/components/ThemeIcons";
import { playThemeTransition } from "@/lib/themeTransition";

/**
 * The Dock — the signature interaction of the site. Four worlds, always
 * visible, fixed to the bottom center. Clicking a world switches the theme
 * immediately; there is no menu to open or close. Hover/focus magnifies the
 * targeted icon and its neighbors (macOS Dock cadence, not a copy of it —
 * spring physics via framer-motion instead of a lookup curve), and the dock's
 * own glass surface + the active icon's micro-animation change per theme.
 */

const WORLD_LABELS = {
  archive: "Digital Archive",
  search: "Google Scholar",
  midnight: "Midnight Intelligence",
  herbarium: "Living Herbarium",
};

// Restrained magnification — enough to confirm the hit target under the
// cursor without ever reading as a cartoon pop.
const HOVER_SCALE = 1.22;
const NEAR_SCALE = 1.08;
const HOVER_LIFT = -7;
const NEAR_LIFT = -2;
// Close to critically damped: it settles like a physical object coming to
// rest, not a rubber-band bounce.
const DOCK_SPRING = { type: "spring", stiffness: 300, damping: 30, mass: 1 };

export default function ThemeDock() {
  const { currentTheme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(null);
  const [focusIndex, setFocusIndex] = useState(() => Math.max(0, THEME_NAMES.indexOf(currentTheme)));
  const btnRefs = useRef([]);
  const panelRef = useRef(null);
  const sheenRafRef = useRef(null);

  const clearActive = useCallback(() => setActiveIndex(null), []);

  // A soft, pointer-following glass sheen on the panel itself — rAF-throttled
  // direct style writes (no React state per pointermove) so it stays cheap.
  const handlePanelPointerMove = useCallback(
    (event) => {
      if (reduceMotion || sheenRafRef.current) return;
      const { clientX, clientY } = event;
      sheenRafRef.current = requestAnimationFrame(() => {
        sheenRafRef.current = null;
        const el = panelRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${((clientX - rect.left) / rect.width) * 100}%`);
        el.style.setProperty("--my", `${((clientY - rect.top) / rect.height) * 100}%`);
      });
    },
    [reduceMotion]
  );

  const onKeyDown = (event) => {
    const count = THEME_NAMES.length;
    let next = focusIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (focusIndex + 1) % count;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (focusIndex - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;
    event.preventDefault();
    setFocusIndex(next);
    btnRefs.current[next]?.focus();
  };

  return (
    <nav className={`theme-dock theme-dock-${currentTheme}`} aria-label="Choose a world" data-testid="theme-dock">
      <div
        ref={panelRef}
        className="theme-dock-panel"
        role="group"
        aria-label="Theme worlds"
        onKeyDown={onKeyDown}
        onMouseMove={handlePanelPointerMove}
        onMouseLeave={clearActive}
      >
        {THEME_NAMES.map((themeName, index) => {
          const WorldIcon = THEME_ICON_SETS[themeName]?.world;
          const isActive = currentTheme === themeName;
          const distance = activeIndex === null ? null : Math.abs(index - activeIndex);
          const scale =
            reduceMotion || distance === null ? 1 : distance === 0 ? HOVER_SCALE : distance === 1 ? NEAR_SCALE : 1;
          const lift =
            reduceMotion || distance === null ? 0 : distance === 0 ? HOVER_LIFT : distance === 1 ? NEAR_LIFT : 0;

          return (
            <motion.button
              key={themeName}
              ref={(el) => {
                btnRefs.current[index] = el;
              }}
              type="button"
              className={`theme-dock-btn theme-dock-btn-${themeName} ${isActive ? "is-active" : ""}`}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => {
                setFocusIndex(index);
                setActiveIndex(index);
              }}
              onBlur={clearActive}
              onClick={(event) => {
                if (themeName === currentTheme) return;
                const rect = event.currentTarget.getBoundingClientRect();
                playThemeTransition(themeName, rect.left + rect.width / 2, rect.top + rect.height / 2, () =>
                  setTheme(themeName)
                );
              }}
              tabIndex={focusIndex === index ? 0 : -1}
              aria-label={WORLD_LABELS[themeName]}
              aria-pressed={isActive}
              data-testid={`theme-dock-${themeName}`}
              animate={{ scale, y: lift }}
              transition={reduceMotion ? { duration: 0 } : DOCK_SPRING}
            >
              <span className="theme-dock-icon">{WorldIcon && <WorldIcon size={22} color="currentColor" />}</span>
              <span className="theme-dock-tooltip" aria-hidden="true">
                {WORLD_LABELS[themeName]}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
