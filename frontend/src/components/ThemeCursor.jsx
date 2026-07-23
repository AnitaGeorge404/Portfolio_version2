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

const OUTER_PETAL_ANGLES = [0, 72, 144, 216, 288];
const INNER_PETAL_ANGLES = [36, 108, 180, 252, 324];

function ArchiveMark() {
  return (
    <svg viewBox="0 0 40 46" width="34" height="39" aria-hidden focusable="false">
      <defs>
        <radialGradient id="cursorRosePetalOuter" cx="35%" cy="20%" r="85%">
          <stop offset="0%" stopColor="var(--rose, #F0BAC8)" />
          <stop offset="55%" stopColor="var(--decoration-primary, #C96B84)" />
          <stop offset="100%" stopColor="var(--burgundy, #6B1E35)" />
        </radialGradient>
        <radialGradient id="cursorRosePetalInner" cx="40%" cy="15%" r="90%">
          <stop offset="0%" stopColor="#FBE6EC" />
          <stop offset="60%" stopColor="var(--rose, #EDAABB)" />
          <stop offset="100%" stopColor="var(--decoration-primary, #C96B84)" />
        </radialGradient>
        <linearGradient id="cursorRoseLeaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--sage, #8DA379)" />
          <stop offset="100%" stopColor="#4E6339" />
        </linearGradient>
      </defs>

      <path d="M20 26 C18.3 32 17.8 37.5 18.9 44" stroke="#5E7248" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.85" />

      <g className="cursor-rose-leaf">
        <path d="M18.6 34.5 C13 33.3 9.2 36.6 9.6 41.2 C14.7 41.9 18.5 38.4 18.6 34.5 Z" fill="url(#cursorRoseLeaf)" stroke="#3E4E30" strokeWidth="0.4" opacity="0.95" />
        <path d="M18.5 34.9 C15.2 35.3 12.2 37.1 10.4 40.2" stroke="#33421F" strokeWidth="0.35" fill="none" opacity="0.55" />
      </g>

      {/* Positioning (translate to the hub) is baked into each petal's own
          attribute transform, never on the animated group — an SVG element
          that carries both an attribute transform and a CSS transform does
          not reliably combine the two, so the group itself stays attribute-free
          and receives only the CSS scale/rotate for bloom. */}
      <g className="cursor-rose-outer">
        {OUTER_PETAL_ANGLES.map((a) => (
          <path
            key={a}
            transform={`translate(20 22) rotate(${a})`}
            d="M0,0 C-7,-5 -8,-14.5 0,-21 C8,-14.5 7,-5 0,0 Z"
            fill="url(#cursorRosePetalOuter)"
            stroke="var(--burgundy, #6B1E35)"
            strokeWidth="0.35"
            opacity="0.93"
          />
        ))}
      </g>
      <g className="cursor-rose-inner">
        {INNER_PETAL_ANGLES.map((a) => (
          <path
            key={a}
            transform={`translate(20 22) rotate(${a})`}
            d="M0,0 C-4.5,-3 -5,-9.8 0,-14 C5,-9.8 4.5,-3 0,0 Z"
            fill="url(#cursorRosePetalInner)"
            stroke="var(--burgundy, #6B1E35)"
            strokeWidth="0.3"
            opacity="0.97"
          />
        ))}
      </g>
      <circle cx="20" cy="22" r="1.7" fill="#5B1428" />
    </svg>
  );
}

function ScholarMark() {
  return (
    <svg viewBox="0 0 32 34" width="30" height="32" aria-hidden focusable="false">
      <g className="cursor-scholar-frame">
        <path d="M5 11 V6 H10" fill="none" stroke="var(--link, #1558D6)" strokeWidth="1.4" strokeLinecap="square" />
        <path d="M22 6 H27 V11" fill="none" stroke="var(--link, #1558D6)" strokeWidth="1.4" strokeLinecap="square" />
        <path d="M27 21 V26 H22" fill="none" stroke="var(--link, #1558D6)" strokeWidth="1.4" strokeLinecap="square" />
        <path d="M10 26 H5 V21" fill="none" stroke="var(--link, #1558D6)" strokeWidth="1.4" strokeLinecap="square" />
      </g>
      <circle cx="16" cy="16" r="1.1" fill="var(--link, #1558D6)" />
      <text className="cursor-scholar-index" x="17" y="33" fontSize="7" fontFamily="ui-monospace, 'SF Mono', monospace" fill="var(--link, #1558D6)">[n]</text>
    </svg>
  );
}

function MidnightMark() {
  return (
    <svg viewBox="0 0 34 34" width="30" height="30" aria-hidden focusable="false">
      <defs>
        <linearGradient id="cursorCrystalBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4F5F7" stopOpacity="0.88" />
          <stop offset="45%" stopColor="#C9CDD4" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#767B84" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="cursorCrystalEdge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--decoration-primary, #D4AF37)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#EFE0B0" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <polygon points="17,3 27,13 22,29 12,29 7,13" fill="url(#cursorCrystalBody)" stroke="url(#cursorCrystalEdge)" strokeWidth="0.8" />
      <polygon className="cursor-crystal-facet-a" points="17,3 27,13 17,16" fill="#fff" opacity="0.32" />
      <polygon className="cursor-crystal-facet-b" points="7,13 17,3 17,16" fill="#fff" opacity="0.14" />
      <polygon points="27,13 22,29 17,16" fill="#000" opacity="0.18" />
      <polygon points="7,13 17,16 12,29" fill="#000" opacity="0.1" />
      <circle className="cursor-crystal-glint" cx="17" cy="9" r="1.1" fill="#fff" opacity="0.9" />
    </svg>
  );
}

function HerbariumMark() {
  return (
    <svg viewBox="0 0 34 42" width="30" height="37" aria-hidden focusable="false">
      <defs>
        <linearGradient id="cursorLeafBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--sage, #8FAE73)" />
          <stop offset="100%" stopColor="var(--decoration-primary, #4F7A3D)" />
        </linearGradient>
      </defs>
      <g className="cursor-leaf-blade">
        <path
          d="M17 8 C17 8 30 14.5 27 24.5 C24.3 33.5 17 37 17 37 C17 37 9.7 33.5 7 24.5 C4 14.5 17 8 17 8 Z"
          fill="url(#cursorLeafBody)"
          stroke="var(--specimen-ink, #3B4A2C)"
          strokeWidth="0.5"
          opacity="0.95"
        />
        <g className="cursor-leaf-veins" stroke="var(--specimen-ink, #3B4A2C)" strokeWidth="0.4" fill="none" opacity="0.55">
          <path d="M17 10.5 L17 35" />
          <path d="M17 15.5 L10.5 12.5" />
          <path d="M17 15.5 L23.5 12.5" />
          <path d="M17 20.5 L9.5 18.5" />
          <path d="M17 20.5 L24.5 18.5" />
          <path d="M17 25.5 L10.5 25.5" />
          <path d="M17 25.5 L23.5 25.5" />
          <path d="M17 30.5 L12.5 31.5" />
          <path d="M17 30.5 L21.5 31.5" />
        </g>
      </g>
      <path d="M17 37 C17 37 16.6 39.5 17.4 41" stroke="var(--specimen-border, #6B7F5A)" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.85" />
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
