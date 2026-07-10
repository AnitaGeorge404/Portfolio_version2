import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { themeTokens, THEME_NAMES } from "@/config/themeTokens";
import { THEME_ICON_SETS } from "@/components/ThemeIcons";

export default function ThemeSwitcher() {
  const { currentTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const ActiveWorldIcon = THEME_ICON_SETS[currentTheme]?.world;

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(event) {
      if (!isOpen) return;

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  const handleSelectTheme = (themeName) => {
    setTheme(themeName);
    setIsOpen(false);
  };

  return (
    <div
      ref={menuRef}
      className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-3"
      data-testid="theme-switcher"
    >
      {/* Floating Button — shows the active world's own icon, not a generic emoji */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-shadow
          bg-[var(--bg-card)] border-2 border-[var(--border-soft)]
          flex items-center justify-center
          text-[var(--decoration-primary)]
          focus:outline-none focus:ring-2 focus:ring-[var(--rose)] focus:ring-offset-2"
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme switcher"
        aria-expanded={isOpen}
        data-testid="theme-switcher-button"
      >
        {ActiveWorldIcon && <ActiveWorldIcon size={26} color="currentColor" />}
      </motion.button>

      {/* Theme Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2 bg-[var(--bg-paper)]/95 backdrop-blur-md
              rounded-2xl p-4 shadow-2xl border border-[var(--border-soft)]"
            data-testid="theme-menu"
          >
            <div className="text-xs uppercase tracking-widest text-[var(--plum)]/60 font-sans font-semibold px-3 py-1">
              Themes
            </div>

            {THEME_NAMES.map((themeName, index) => {
              const theme = themeTokens[themeName];
              const isActive = currentTheme === themeName;
              const WorldIcon = THEME_ICON_SETS[themeName]?.world;

              return (
                <motion.button
                  key={themeName}
                  onClick={() => handleSelectTheme(themeName)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`switcher-option-btn relative px-4 py-3 rounded-lg transition-all duration-200
                    flex items-center gap-3 text-left
                    ${isActive
                      ? "bg-[var(--bg-petal)] border-2 border-[var(--rose)] shadow-md"
                      : "border-2 border-transparent hover:bg-[var(--bg-warm)]"
                    }
                  `}
                  data-testid={`theme-option-${themeName}`}
                >
                  {/* World icon — each theme's hover personality lives in index.css
                      under .switcher-world-icon-{themeName} */}
                  <span
                    className={`switcher-world-icon switcher-world-icon-${themeName} shrink-0 flex items-center justify-center w-8 h-8 rounded-full border`}
                    style={{ color: theme.decorationPrimary, borderColor: "var(--border-soft)" }}
                  >
                    {WorldIcon && <WorldIcon size={18} color="currentColor" />}
                  </span>

                  {/* Theme info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-serif font-semibold text-[var(--ink)]">
                      {theme.name}
                    </div>
                    <div className="text-xs text-[var(--ink-soft)] truncate">
                      {theme.description}
                    </div>
                  </div>

                  {/* Active checkmark */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-[var(--rose)] font-bold flex-shrink-0"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
