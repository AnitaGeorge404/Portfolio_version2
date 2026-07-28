import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

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

// An icon (however well-drawn) is a symbol *for* an object. These are
// attempts at the material itself: wax and engraving, ground glass and
// specular light, a pressed leaf's asymmetry — rendered with the technique
// each material actually needs (gradients/blur for glass, hairline strokes
// for engraving) rather than a single flat glyph standing in for all of it.

// Archive — a wax letter-seal stamped with a rose: a solid disc (the wax)
// with fine engraved hairlines on top (the die-stamp), a ribbon-like stem
// and leaf hanging below. "Vintage stationery" is a much more honest target
// for hand-coded vector art than "botanical illustration plate" — a seal is
// *supposed* to read as small, dense, and pressed.
function ArchiveMark() {
  return (
    <span className="cursor-object">
      <svg viewBox="0 0 32 40" width="32" height="40" aria-hidden focusable="false">
        <path d="M16 24 C15 29 14.7 33.5 15.5 38.5" stroke="var(--burgundy, #6B1E35)" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.7" />
        <path
          d="M15.4 30.5 C11.5 29.4 8.4 31.8 8.6 35.3 C12.6 36 15.4 33.4 15.4 30.5 Z"
          fill="var(--sage, #6E8259)"
          opacity="0.85"
        />
        <circle className="cursor-seal-wax" cx="16" cy="15" r="12.5" fill="var(--decoration-primary, #C96B84)" stroke="var(--burgundy, #6B1E35)" strokeWidth="0.6" />
        <g className="cursor-seal-engraving" stroke="var(--burgundy, #6B1E35)" strokeWidth="0.55" fill="none" opacity="0.75" strokeLinecap="round">
          <path d="M16 9 C13 9.6 11.4 12 12 14.6 C12.6 17 15 18.5 17.5 17.9" />
          <path d="M16 9 C19 9.6 20.6 12 20 14.6 C19.4 17 17 18.5 14.5 17.9" />
          <path d="M16 9.6 C16 9.6 14.8 12 16 15 C17.2 12 16 9.6 16 9.6 Z" fill="var(--burgundy, #6B1E35)" opacity="0.9" />
          <circle cx="16" cy="15.4" r="1.15" fill="var(--burgundy, #6B1E35)" stroke="none" opacity="0.9" />
        </g>
      </svg>
    </span>
  );
}

// Scholar — no object at all, just an optical reticle: a hairline ring and a
// center point, the way a rangefinder or a microscope's focus indicator
// looks. Citation brackets are separate hairlines that appear either side.
function ScholarMark() {
  return (
    <span className="cursor-object cursor-reticle">
      <span className="cursor-reticle-bracket cursor-reticle-bracket-l" />
      <span className="cursor-reticle-ring" />
      <span className="cursor-reticle-dot" />
      <span className="cursor-reticle-bracket cursor-reticle-bracket-r" />
    </span>
  );
}

// Midnight — real ground glass: a translucent, blurred disc with a bright
// specular highlight and a dark rim shadow, built entirely from gradients
// and backdrop-blur. The object barely moves; the highlight drifts across
// it with pointer velocity, standing in for light sliding over a cut facet.
function MidnightMark() {
  return (
    <span className="cursor-object cursor-glass">
      <span className="cursor-glass-body" />
      <span className="cursor-glass-specular" />
    </span>
  );
}

// Herbarium — a single pressed leaf: deliberately asymmetric (one lobe
// broader than the other, the way a real leaf never mirrors itself), two
// tones for the pressed-flat/backlit halves, four hairline veins.
function HerbariumMark() {
  return (
    <span className="cursor-object">
      <svg viewBox="0 0 34 42" width="34" height="42" aria-hidden focusable="false">
        <g className="cursor-leaf-blade">
          <path
            d="M17 6 C24 10 27 17 24 25 C22 31 19 35.5 17.5 37.5 L17.5 6.3 Z"
            fill="var(--decoration-primary, #4F7A3D)"
            stroke="var(--specimen-ink, #2A3420)"
            strokeWidth="0.7"
          />
          <path
            d="M17 6 C11 9.5 7.5 16 9.5 24 C11 30 14.5 34.8 16.5 37.2 L16.5 6.3 Z"
            fill="var(--sage, #6B9153)"
            stroke="var(--specimen-ink, #2A3420)"
            strokeWidth="0.7"
          />
          <path d="M17 8 L17 36.5" stroke="var(--specimen-ink, #2A3420)" strokeWidth="0.6" opacity="0.65" />
          <path d="M17 13 L22 16.5 M17 19 L23 22 M17 25 L21.5 28 M17 12.5 L12.5 15.5 M17 18.5 L11.5 21 M17 24.5 L12.5 27" stroke="var(--specimen-ink, #2A3420)" strokeWidth="0.45" opacity="0.5" />
        </g>
      </svg>
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
    const POSITION_LERP = { archive: 0.42, search: 1, midnight: 0.88, herbarium: 0.6 };

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
