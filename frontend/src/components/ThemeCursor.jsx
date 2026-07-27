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

const ROSE_PETAL_ANGLES = [0, 72, 144, 216, 288];

// Flat color, one clean outline, at most one highlight shape per mark — no
// gradients, no vein clutter. At a 30px render size, faked photorealism
// (multi-stop gradients, 8-line vein maps, stacked translucency) turns to
// mud; a confident flat silhouette reads instantly instead.

function ArchiveMark() {
  return (
    <svg viewBox="0 0 40 46" width="34" height="39" aria-hidden focusable="false">
      <path d="M20 26 C18.5 31.5 18.1 37 19 44" stroke="var(--burgundy, #6B1E35)" strokeWidth="1.4" fill="none" strokeLinecap="round" />

      <path
        className="cursor-rose-leaf-shape"
        d="M18.8 34 C13.2 32.6 9.2 35.8 9.6 40.5 C14.9 41.3 18.8 37.9 18.8 34 Z"
        fill="var(--sage, #6E8259)"
        stroke="var(--burgundy, #6B1E35)"
        strokeWidth="0.6"
      />

      {/* Five identical petals in a flat pinwheel — the shape a rose emblem
          reduces to when you stop trying to shade it and just draw it. */}
      <g className="cursor-rose-petals">
        {ROSE_PETAL_ANGLES.map((a) => (
          <path
            key={a}
            transform={`translate(20 22) rotate(${a})`}
            d="M0,0 C-7.5,-3.5 -9,-12.5 0,-19 C9,-12.5 7.5,-3.5 0,0 Z"
            fill="var(--decoration-primary, #C96B84)"
            stroke="var(--burgundy, #6B1E35)"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
        ))}
      </g>
      {/* Single highlight petal for depth — one shape, not ten. */}
      <path
        transform="translate(20 22) rotate(0)"
        d="M0,0 C-4,-3 -5,-9 0,-14 C1.6,-9.5 1.6,-3.5 0,0 Z"
        fill="var(--rose, #EDAABB)"
        opacity="0.85"
      />
      <circle cx="20" cy="22" r="2" fill="var(--burgundy, #6B1E35)" />
    </svg>
  );
}

function ScholarMark() {
  return (
    <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden focusable="false">
      <g className="cursor-scholar-frame">
        <path d="M4 10 V4 H10" fill="none" stroke="var(--link, #1558D6)" strokeWidth="1.8" strokeLinecap="square" />
        <path d="M22 4 H28 V10" fill="none" stroke="var(--link, #1558D6)" strokeWidth="1.8" strokeLinecap="square" />
        <path d="M28 22 V28 H22" fill="none" stroke="var(--link, #1558D6)" strokeWidth="1.8" strokeLinecap="square" />
        <path d="M10 28 H4 V22" fill="none" stroke="var(--link, #1558D6)" strokeWidth="1.8" strokeLinecap="square" />
      </g>
      <circle cx="16" cy="16" r="1.4" fill="var(--link, #1558D6)" />
      <text className="cursor-scholar-index" x="18" y="31" fontSize="7.5" fontFamily="ui-monospace, 'SF Mono', monospace" fontWeight="600" fill="var(--link, #1558D6)">[n]</text>
    </svg>
  );
}

function MidnightMark() {
  return (
    <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden focusable="false">
      <polygon
        points="16,3 26,12 21,28 11,28 6,12"
        fill="#1C1E24"
        stroke="var(--decoration-primary, #D4AF37)"
        strokeWidth="1"
      />
      <polygon className="cursor-crystal-facet-a" points="16,3 26,12 16,14" fill="#EDEFF3" opacity="0.85" />
      <polygon points="6,12 16,3 16,14" fill="#9AA0AA" opacity="0.55" />
      <polygon points="26,12 21,28 16,14" fill="#0B0C10" opacity="0.5" />
      <polygon points="6,12 16,14 11,28" fill="#3A3D46" opacity="0.4" />
      <circle className="cursor-crystal-glint" cx="16" cy="9" r="1.3" fill="#fff" />
    </svg>
  );
}

function HerbariumMark() {
  return (
    <svg viewBox="0 0 32 40" width="30" height="37" aria-hidden focusable="false">
      <g className="cursor-leaf-blade">
        <path
          d="M16 7 C16 7 28 13.5 25.5 23.5 C23.2 32.5 16 36 16 36 L16 7 Z"
          fill="var(--decoration-primary, #4F7A3D)"
          stroke="var(--specimen-ink, #2A3420)"
          strokeWidth="0.9"
        />
        <path
          d="M16 7 C16 7 4 13.5 6.5 23.5 C8.8 32.5 16 36 16 36 L16 7 Z"
          fill="var(--sage, #7EA363)"
          stroke="var(--specimen-ink, #2A3420)"
          strokeWidth="0.9"
        />
        <path d="M16 9 L16 35" stroke="var(--specimen-ink, #2A3420)" strokeWidth="0.7" opacity="0.7" />
      </g>
      <path d="M16 36 C16 36 15.7 38.3 16.4 40" stroke="var(--specimen-border, #6B7F5A)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
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
