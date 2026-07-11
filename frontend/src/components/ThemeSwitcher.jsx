import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "@/context/ThemeContext";
import { themeTokens, THEME_NAMES } from "@/config/themeTokens";
import { THEME_ICON_SETS } from "@/components/ThemeIcons";

/**
 * The World Selector — not a themed dropdown, a portal into one of four
 * alternate readings of the same archive. Closed state is a small, always-
 * present "WORLD · <name>" tab that structurally (not just chromatically)
 * belongs to the active theme. Opening it doesn't reveal a menu; it opens a
 * four-world overlay where each card is a small taste of that world's own
 * visual language, navigable by mouse, keyboard, or touch.
 */

const WORLD_META = {
  archive: { index: "01", tagline: "A romantic digital scrapbook." },
  search: { index: "02", tagline: "An indexed academic record." },
  midnight: { index: "03", tagline: "A private intelligence interface." },
  herbarium: { index: "04", tagline: "A living digital specimen." },
};

const EXIT_MS = 220;

export default function ThemeSwitcher() {
  const { currentTheme, setTheme } = useTheme();
  // `mounted` keeps the overlay in the DOM for EXIT_MS after `isOpen` goes
  // false so the CSS close transition can actually play, then unmounts it —
  // deliberately plain state + setTimeout rather than an animation library's
  // exit-tracking, which turned out to silently never unmount through the
  // document.body portal in testing.
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);
  const cardRefs = useRef([]);
  const closeTimerRef = useRef(null);

  const openSelector = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setFocusIndex(Math.max(0, THEME_NAMES.indexOf(currentTheme)));
    setMounted(true);
    // Mount first, open on the next frame so the CSS transition has a
    // starting state to animate from instead of snapping straight to open.
    requestAnimationFrame(() => setIsOpen(true));
  }, [currentTheme]);

  const close = useCallback(() => {
    setIsOpen(false);
    closeTimerRef.current = setTimeout(() => setMounted(false), EXIT_MS);
    // Return focus to the control that opened the selector, not wherever the
    // pointer happened to land — keyboard and screen-reader users depend on this.
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => () => closeTimerRef.current && clearTimeout(closeTimerRef.current), []);

  const select = useCallback(
    (themeName) => {
      setTheme(themeName);
      close();
    },
    [setTheme, close]
  );

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => cardRefs.current[focusIndex]?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onKeyDown = (event) => {
    const count = THEME_NAMES.length;
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      if (document.activeElement === closeRef.current) return;
      event.preventDefault();
      select(THEME_NAMES[focusIndex]);
      return;
    }
    if (event.key === "Tab") {
      // Minimal focus trap: cards <-> close button, wrapping both directions.
      const onClose = document.activeElement === closeRef.current;
      if (event.shiftKey && onClose) {
        event.preventDefault();
        cardRefs.current[focusIndex]?.focus();
      } else if (!event.shiftKey && !onClose) {
        event.preventDefault();
        closeRef.current?.focus();
      }
      return;
    }
    let next = focusIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (focusIndex + 1) % count;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (focusIndex - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;
    event.preventDefault();
    setFocusIndex(next);
    cardRefs.current[next]?.focus();
  };

  const ActiveWorldIcon = THEME_ICON_SETS[currentTheme]?.world;
  const activeTokens = themeTokens[currentTheme];

  const overlay = mounted && (
    <div
      className={`world-selector-scrim ${isOpen ? "is-open" : ""}`}
      onClick={close}
      data-testid="theme-menu"
    >
      <div
        className={`world-selector world-selector-${currentTheme} ${isOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Choose a world"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="world-selector-header">
          <span className="world-selector-eyebrow">Select a world</span>
          <button
            ref={closeRef}
            type="button"
            className="world-selector-close"
            onClick={close}
            aria-label="Close world selector"
          >
            Esc
          </button>
        </div>

        <div className="world-selector-grid" role="listbox" aria-label="Worlds" aria-activedescendant={`world-card-${THEME_NAMES[focusIndex]}`}>
          {THEME_NAMES.map((themeName, index) => {
            const tokens = themeTokens[themeName];
            const meta = WORLD_META[themeName];
            const WorldIcon = THEME_ICON_SETS[themeName]?.world;
            const isActive = currentTheme === themeName;
            return (
              <button
                key={themeName}
                id={`world-card-${themeName}`}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                type="button"
                className={`world-card world-card-${themeName} ${isActive ? "is-active" : ""}`}
                onClick={() => select(themeName)}
                onFocus={() => setFocusIndex(index)}
                tabIndex={focusIndex === index ? 0 : -1}
                role="option"
                aria-selected={isActive}
                data-testid={`theme-option-${themeName}`}
              >
                <span className="world-card-index">{meta.index}</span>
                <span className="world-card-icon">{WorldIcon && <WorldIcon size={30} color="currentColor" />}</span>
                <span className="world-card-name">{tokens.name}</span>
                <span className="world-card-tagline">{meta.tagline}</span>
                {isActive && <span className="world-card-current">current world</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openSelector}
        className={`world-indicator world-indicator-${currentTheme}`}
        data-testid="theme-switcher-button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className="world-indicator-icon">{ActiveWorldIcon && <ActiveWorldIcon size={16} color="currentColor" />}</span>
        <span className="world-indicator-label">
          <span className="world-indicator-kicker">World</span>
          <span className="world-indicator-name">{activeTokens.name}</span>
        </span>
      </button>

      {typeof document !== "undefined" && overlay && createPortal(overlay, document.body)}
    </>
  );
}
