import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

/**
 * Signature custom-cursor system — one persistent DOM overlay, four distinct
 * interaction personalities. Position tracking runs entirely on refs + a
 * single requestAnimationFrame loop; nothing here ever triggers a React
 * re-render on pointer movement. Context (default/interactive/card/text) is
 * classified via a single delegated `pointerover` listener (fires only on
 * element-boundary crossings, not per pixel) and applied as a DOM attribute
 * so CSS drives the per-context visual response.
 *
 * Never enabled on coarse/touch pointers — the native cursor stays untouched
 * there, and `html.has-theme-cursor` (which hides the native cursor) is
 * never applied.
 */

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], summary, [data-testid*="card"], [data-testid*="record"], .midnight-glass, .pin-card';
const CARD_SELECTOR =
  '[data-testid*="card"], [data-testid*="record"], .midnight-glass, .pin-card, [data-testid="theme-menu"] [data-testid^="world-card-"]';
const TEXT_SELECTOR = 'input, textarea, [contenteditable="true"]';
const REFERENCE_SELECTOR = '[data-testid*="citation"], [data-testid*="reference"], [data-testid*="source"]';

function ArchiveMark() {
  return (
    <svg viewBox="0 0 36 36" width="30" height="30" aria-hidden focusable="false">
      <g className="cursor-archive-petals">
        <path d="M18 18 C15.5 13 16.5 8.5 19.5 5.5 C23 8 23 13 18 18 Z" fill="var(--decoration-primary, #C96B84)" opacity="0.95" />
        <path d="M18 18 C23.5 16.5 27.5 18.8 29 22.8 C25 24.6 20.5 23 18 18 Z" fill="var(--decoration-primary, #C96B84)" opacity="0.85" />
        <path d="M18 18 C20.5 23.3 19 27.8 15.3 30.2 C12.3 27.2 13 22.5 18 18 Z" fill="var(--decoration-primary, #C96B84)" opacity="0.85" />
        <path d="M18 18 C12.7 19 8.7 16.3 7.5 12.2 C11.7 10.7 15.8 12.8 18 18 Z" fill="var(--decoration-primary, #C96B84)" opacity="0.85" />
        <path d="M18 18 C13.4 15 12.4 10.3 14.6 6 C18.5 7.7 19.5 12.5 18 18 Z" fill="var(--rose, #EDAABB)" opacity="0.9" />
      </g>
      <circle cx="18" cy="18" r="2.1" fill="var(--burgundy, #6B1E35)" />
      <path d="M18 20.5 C17 24 16.4 26.6 16.9 29.5" stroke="var(--sage, #7A8F6C)" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function ScholarMark() {
  return (
    <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden focusable="false">
      <circle className="cursor-scholar-ring" cx="14" cy="14" r="9" fill="none" stroke="var(--link, #1558D6)" strokeWidth="1.6" />
      <line x1="14" y1="6.5" x2="14" y2="9.5" stroke="var(--link, #1558D6)" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="14" y1="18.5" x2="14" y2="21.5" stroke="var(--link, #1558D6)" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="6.5" y1="14" x2="9.5" y2="14" stroke="var(--link, #1558D6)" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="18.5" y1="14" x2="21.5" y2="14" stroke="var(--link, #1558D6)" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="14" cy="14" r="1.3" fill="var(--link, #1558D6)" />
      <path className="cursor-scholar-arrow" d="M19.5 8.5 L26 2 M20.5 2 L26 2 L26 7.5" stroke="var(--link, #1558D6)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text className="cursor-scholar-index" x="20" y="26" fontSize="8" fontFamily="monospace" fill="var(--link, #1558D6)">[n]</text>
    </svg>
  );
}

function MidnightMark() {
  return (
    <svg viewBox="0 0 32 32" width="27" height="27" aria-hidden focusable="false">
      <circle className="cursor-midnight-ring" cx="16" cy="16" r="13" fill="none" stroke="var(--decoration-primary, #D4AF37)" strokeWidth="1" opacity="0" />
      <polygon points="16,5 24,10 21,25 11,25 8,10" fill="var(--bg-tag, #22252B)" stroke="var(--border-medium, #4A4E56)" strokeWidth="0.75" />
      <polygon className="cursor-midnight-facet" points="16,5 24,10 16,14" fill="var(--plum, #B9C0C6)" opacity="0.55" />
      <polygon points="8,10 16,5 16,14" fill="var(--ink, #E9E7E2)" opacity="0.28" />
      <polygon points="24,10 21,25 16,14" fill="#000" opacity="0.22" />
      <polygon points="8,10 16,14 11,25" fill="#000" opacity="0.12" />
      <circle cx="16" cy="14" r="1.4" fill="var(--decoration-primary, #D4AF37)" />
    </svg>
  );
}

function HerbariumMark() {
  return (
    <svg viewBox="0 0 32 32" width="27" height="27" aria-hidden focusable="false">
      <path d="M16 18 L16 27" stroke="var(--specimen-border, #6B7F5A)" strokeWidth="1.3" strokeLinecap="round" />
      <g className="cursor-herbarium-leaves">
        <path d="M16 18 C16 12 12 8.5 8.5 11 C5.5 13.5 9.5 18 16 18 Z" fill="var(--decoration-primary, #5E9A50)" opacity="0.92" />
        <path d="M16 18 C22.5 18 26.5 13.5 23.5 11 C20 8.5 16 12 16 18 Z" fill="var(--sage, #7EC66F)" opacity="0.92" />
        <path d="M16 18 C10.5 18.5 7 22.5 10 25.3 C12.8 27.9 16 23.5 16 18 Z" fill="var(--sage, #7EC66F)" opacity="0.85" />
        <path d="M16 18 C21.5 18.5 25 22.5 22 25.3 C19.2 27.9 16 23.5 16 18 Z" fill="var(--decoration-primary, #5E9A50)" opacity="0.85" />
      </g>
      <circle cx="16" cy="18" r="1.5" fill="var(--specimen-ink, #2A2418)" opacity="0.6" />
    </svg>
  );
}

export default function ThemeCursor() {
  const { currentTheme } = useTheme();
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const trailRef = useRef(null);
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
    const trail = { x: -100, y: -100 };
    let rafId;

    const onMove = (event) => {
      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;
    };

    const classify = (target) => {
      if (!target || !target.closest) return "default";
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

    const POSITION_LERP = { archive: 0.5, search: 1, midnight: 0.55, herbarium: 1 };

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
          const moving = Math.abs(vx) > 0.6 || Math.abs(vy) > 0.6;
          if (moving) {
            const targetAngle = Math.atan2(vy, vx) * (180 / Math.PI) + 90;
            let diff = targetAngle - state.angle;
            while (diff > 180) diff -= 360;
            while (diff < -180) diff += 360;
            state.angle += diff * (theme === "herbarium" ? 0.12 : 0.1);
          } else {
            state.angle *= 0.92;
          }
          innerRef.current.style.transform = `translate(-50%, -50%) rotate(${state.angle}deg)`;
        } else if (theme === "midnight") {
          const ox = Math.max(-6, Math.min(6, vx * 0.8));
          const oy = Math.max(-6, Math.min(6, vy * 0.8));
          innerRef.current.style.setProperty("--facet-x", `${ox}px`);
          innerRef.current.style.setProperty("--facet-y", `${oy}px`);
          innerRef.current.style.transform = "translate(-50%, -50%)";
        } else {
          innerRef.current.style.transform = "translate(-50%, -50%)";
        }
      } else if (innerRef.current) {
        innerRef.current.style.transform = "translate(-50%, -50%)";
      }

      if (theme === "archive" && trailRef.current) {
        trail.x += (p.x - trail.x) * 0.14;
        trail.y += (p.y - trail.y) * 0.14;
        trailRef.current.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%)`;
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
    <>
      {currentTheme === "archive" && (
        <div ref={trailRef} className="theme-cursor-trail" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="9" height="9">
            <path d="M8 8 C6.5 5.5 7 3 9 1.5 C11 3.5 11 6 8 8 Z" fill="var(--rose, #EDAABB)" opacity="0.55" />
          </svg>
        </div>
      )}
      <div ref={wrapRef} className={`theme-cursor theme-cursor-${currentTheme}`} data-cursor-context="default" data-cursor-press="false" aria-hidden="true">
        <div ref={innerRef} className="theme-cursor-inner">
          {currentTheme === "archive" && <ArchiveMark />}
          {currentTheme === "search" && <ScholarMark />}
          {currentTheme === "midnight" && <MidnightMark />}
          {currentTheme === "herbarium" && <HerbariumMark />}
        </div>
      </div>
    </>
  );
}
