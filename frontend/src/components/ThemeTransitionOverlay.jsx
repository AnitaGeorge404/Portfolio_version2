import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

/**
 * A brief (≈600ms), destination-specific wash that plays once when the
 * active theme changes — "switching into Archive" reads differently from
 * "switching into Midnight" even in the transition itself. Purely CSS
 * keyframe driven (see .theme-transition-* in index.css); this component
 * only toggles the class window. No-ops on the very first mount (there's
 * no "switching into" on initial load) and is skipped entirely under
 * prefers-reduced-motion via the CSS itself.
 */
export default function ThemeTransitionOverlay() {
  const { currentTheme, isLoaded } = useTheme();
  const [active, setActive] = useState(false);
  const prevTheme = useRef(currentTheme);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!hasMounted.current) {
      hasMounted.current = true;
      prevTheme.current = currentTheme;
      return;
    }
    if (prevTheme.current === currentTheme) return;
    prevTheme.current = currentTheme;
    setActive(true);
    const t = window.setTimeout(() => setActive(false), 650);
    return () => window.clearTimeout(t);
  }, [currentTheme, isLoaded]);

  const destinationClass =
    currentTheme === "search" ? "theme-transition-scholar" : `theme-transition-${currentTheme}`;

  return (
    <div
      aria-hidden="true"
      className={`theme-transition-overlay ${destinationClass} ${active ? "is-active" : ""}`}
    />
  );
}
