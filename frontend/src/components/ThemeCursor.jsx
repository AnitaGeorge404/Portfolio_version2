import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Flower2, Search, Gem, Leaf } from "lucide-react";

/**
 * Signature custom-cursor system — one persistent DOM overlay, four distinct
 * physical objects. Position tracking runs entirely on refs + a single
 * requestAnimationFrame loop; nothing here ever triggers a React re-render
 * on pointer movement. Context (default/interactive/card/text/reference/
 * disabled) is classified via a single delegated `pointerover` listener
 * (fires only on element-boundary crossings, not per pixel) and applied as
 * a DOM attribute so CSS drives the per-context visual response.
 *
 * Never enabled on coarse/touch pointers — the native cursor stays untouched
 * there, and `html.has-theme-cursor` (which hides the native cursor) is
 * never applied.
 */

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], summary, [data-testid*="card"], [data-testid*="record"], .midnight-glass, .pin-card';
const CARD_SELECTOR =
  '[data-testid*="card"], [data-testid*="record"], .midnight-glass, .pin-card, [data-testid="theme-menu"] [data-testid^="world-card-"], img';
const TEXT_SELECTOR = 'input, textarea, [contenteditable="true"]';
const REFERENCE_SELECTOR = '[data-testid*="citation"], [data-testid*="reference"], [data-testid*="source"]';
const DISABLED_SELECTOR = '[disabled], [aria-disabled="true"]';

// Battle-tested Lucide line icons instead of hand-drawn shapes — the same
// icon set already used everywhere else in the app (every ui/* component),
// so the cursor stops being a one-off custom asset and starts being visually
// consistent with the rest of the interface. Bumped stroke width over the
// library default since a 2px stroke reads thin at cursor scale.

function ArchiveMark() {
  return (
    <span className="cursor-object" style={{ color: "var(--decoration-primary, #C96B84)" }}>
      <Flower2 size={32} strokeWidth={2.25} />
    </span>
  );
}

function ScholarMark() {
  return (
    <span className="cursor-object" style={{ color: "var(--link, #1558D6)" }}>
      <Search size={28} strokeWidth={2.5} />
    </span>
  );
}

function MidnightMark() {
  return (
    <span className="cursor-object" style={{ color: "var(--decoration-primary, #D4AF37)" }}>
      <Gem size={30} strokeWidth={2.25} />
    </span>
  );
}

function HerbariumMark() {
  return (
    <span className="cursor-object" style={{ color: "var(--decoration-primary, #4F7A3D)" }}>
      <Leaf size={30} strokeWidth={2.25} />
    </span>
  );
}

export default function ThemeCursor() {
  const { currentTheme } = useTheme();
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  const pointerRef = useRef({ x: -100, y: -100 });
  const themeRef = useRef(currentTheme);
  themeRef.current = currentTheme;

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return undefined;
    setEnabled(true);
    document.documentElement.classList.add("has-theme-cursor");
    return () => document.documentElement.classList.remove("has-theme-cursor");
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { x: -100, y: -100, angle: 0, lastX: -100, lastY: -100 };
    let rafId;

    const onMove = (event) => {
      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;
    };

    const classify = (target) => {
      if (!target || !target.closest) return "default";
      if (target.closest(DISABLED_SELECTOR)) return "disabled";
      if (target.closest(TEXT_SELECTOR)) return "text";
      if (target.closest(REFERENCE_SELECTOR)) return "reference";
      if (target.closest(CARD_SELECTOR)) return "card";
      if (target.closest(INTERACTIVE_SELECTOR)) return "interactive";
      return "default";
    };

    const onOver = (event) => {
      const ctx = classify(event.target);
      if (wrapRef.current && wrapRef.current.getAttribute("data-cursor-context") !== ctx) {
        wrapRef.current.setAttribute("data-cursor-context", ctx);
      }
    };
    const onDown = () => wrapRef.current && wrapRef.current.setAttribute("data-cursor-press", "true");
    const onUp = () => wrapRef.current && wrapRef.current.setAttribute("data-cursor-press", "false");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    // Position smoothing per theme — how "held" vs "instrument-precise" the
    // object feels. Scholar/midnight track near-instantly (precision tools);
    // archive/herbarium carry a touch of organic follow (a held object).
    const POSITION_LERP = { archive: 0.42, search: 1, midnight: 0.78, herbarium: 0.6 };

    const tick = () => {
      const theme = themeRef.current;
      const p = pointerRef.current;
      const lerp = POSITION_LERP[theme] ?? 1;

      state.x += (p.x - state.x) * lerp;
      state.y += (p.y - state.y) * lerp;

      const vx = p.x - state.lastX;
      const vy = p.y - state.lastY;
      state.lastX = p.x;
      state.lastY = p.y;

      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
      }

      if (!reduced && innerRef.current) {
        if (theme === "archive" || theme === "herbarium") {
          // A held stem/leaf sways with horizontal velocity — a bounded
          // pendulum tilt, never a full compass spin toward travel direction.
          const targetAngle = Math.max(-12, Math.min(12, vx * (theme === "archive" ? 0.9 : 0.7)));
          state.angle += (targetAngle - state.angle) * 0.12;
          innerRef.current.style.transform = `translate(-50%, -50%) rotate(${state.angle}deg)`;
        } else if (theme === "midnight") {
          const ox = Math.max(-5, Math.min(5, vx * 0.7));
          const oy = Math.max(-5, Math.min(5, vy * 0.7));
          innerRef.current.style.setProperty("--facet-x", `${ox}px`);
          innerRef.current.style.setProperty("--facet-y", `${oy}px`);
          innerRef.current.style.transform = "translate(-50%, -50%)";
        } else {
          innerRef.current.style.transform = "translate(-50%, -50%)";
        }
      } else if (innerRef.current) {
        innerRef.current.style.transform = "translate(-50%, -50%)";
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={wrapRef} className={`theme-cursor theme-cursor-${currentTheme}`} data-cursor-context="default" data-cursor-press="false" aria-hidden="true">
      <div ref={innerRef} className="theme-cursor-inner">
        {currentTheme === "archive" && <ArchiveMark />}
        {currentTheme === "search" && <ScholarMark />}
        {currentTheme === "midnight" && <MidnightMark />}
        {currentTheme === "herbarium" && <HerbariumMark />}
      </div>
    </div>
  );
}
