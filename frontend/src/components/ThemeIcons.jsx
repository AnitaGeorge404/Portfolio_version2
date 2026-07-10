import React from "react";

/**
 * Four coherent icon languages, one per theme. These are the identity-bearing
 * icons used at the highest-visibility touchpoints (theme switcher, favicon,
 * each theme's own search surface, AI Mode's grounded/status badge) — not a
 * wholesale replacement of every Lucide icon in the app. Neutral utility
 * icons (mail, github, chevrons, etc.) stay as Lucide; these four sets exist
 * specifically where an icon carries theme identity.
 *
 * Each icon accepts `size` and `color` (defaults to currentColor so it
 * inherits theme text color where used inline). Checked visually at
 * 16/20/24/32/48px — kept to bold, simple shapes so nothing degrades at
 * favicon scale.
 */

// ── ARCHIVE — hand-inked, four-petal pressed-rose mark ──

export function ArchiveWorldIcon({ size = 24, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <path d="M12 3.2 C14.6 5.8 14.7 8.8 12 12 C9.3 8.8 9.4 5.8 12 3.2 Z" fill={color} opacity="0.95" />
      <path d="M12 12 C15.2 9.4 18.2 9.5 20.8 12 C18.2 14.6 15.2 14.7 12 12 Z" fill={color} opacity="0.8" />
      <path d="M12 12 C9.4 15.2 9.5 18.2 12 20.8 C14.6 18.2 14.7 15.2 12 12 Z" fill={color} opacity="0.8" />
      <path d="M12 12 C8.8 9.4 5.8 9.5 3.2 12 C5.8 14.6 8.8 14.7 12 12 Z" fill={color} opacity="0.8" />
      <circle cx="12" cy="12" r="1.8" fill={color} />
    </svg>
  );
}

export function ArchiveSearchGlyph({ size = 16, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <path d="M11 4.3 C15 3.9 18.2 6.8 18.4 10.6 C18.6 14.1 16 17.1 12.4 17.6 C8.7 18.1 5.4 15.3 5 11.6 C4.7 8.2 7.2 4.9 11 4.3 Z" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16.6 16.2 L20.5 20.2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function ArchiveCheckGlyph({ size = 14, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <path d="M12 4 C15 4 17 6 17.5 8.5 C18 11.5 16 15 12.5 16.5 C9 15.5 6.5 12.5 6.8 9 C7.1 6 9 4.2 12 4 Z" fill="none" stroke={color} strokeWidth="1.3" opacity="0.85" />
      <path d="M9 12 L11 14.2 L15.3 9" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── SCHOLAR — geometric, precise, indexed ──

export function ScholarWorldIcon({ size = 24, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <circle cx="10" cy="10" r="6.2" fill="none" stroke={color} strokeWidth="1.8" />
      <line x1="14.4" y1="14.4" x2="20.5" y2="20.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="6" y1="9.4" x2="13.4" y2="9.4" stroke={color} strokeWidth="1.1" opacity="0.55" />
      <line x1="6" y1="12" x2="11.6" y2="12" stroke={color} strokeWidth="1.1" opacity="0.4" />
    </svg>
  );
}

export function ScholarSearchGlyph({ size = 16, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke={color} strokeWidth="1.8" />
      <line x1="15.2" y1="15.2" x2="20.5" y2="20.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function ScholarCheckGlyph({ size = 14, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <rect x="4.5" y="4.5" width="15" height="15" rx="1" fill="none" stroke={color} strokeWidth="1.3" opacity="0.7" />
      <path d="M8 12 L10.6 14.6 L16 9" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── MIDNIGHT — faceted, machined, refractive ──

export function MidnightWorldIcon({ size = 24, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <polygon points="7,3.5 17,3.5 20.5,9 3.5,9" fill={color} opacity="0.95" />
      <polygon points="3.5,9 7,3.5 12,12" fill={color} opacity="0.78" />
      <polygon points="20.5,9 17,3.5 12,12" fill={color} opacity="0.6" />
      <polygon points="3.5,9 12,12 12,21" fill={color} opacity="0.42" />
      <polygon points="20.5,9 12,12 12,21" fill={color} opacity="0.28" />
      <line x1="12" y1="4.6" x2="12" y2="11.4" stroke="var(--bg-paper, #0A0B0D)" strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}

export function MidnightSearchGlyph({ size = 16, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke={color} strokeWidth="1.6" />
      <path d="M6.5 8 A5 5 0 0 1 13.5 5.5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.55" strokeLinecap="round" />
      <line x1="15.2" y1="15.2" x2="20.5" y2="20.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function MidnightCheckGlyph({ size = 14, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <polygon points="12,3.5 19,8 19,16 12,20.5 5,16 5,8" fill="none" stroke={color} strokeWidth="1.3" opacity="0.8" />
      <path d="M8.5 12 L11 14.5 L16 9" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── HERBARIUM — botanical, observational ──

export function HerbariumWorldIcon({ size = 24, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <path d="M12 12 C12 6 7.5 2.5 3.5 6.5 C-0.5 10.5 5.5 12 12 12 Z" fill={color} opacity="0.92" />
      <path d="M12 12 C18 12 21.5 7.5 17.5 3.5 C13.5 -0.5 12 5.5 12 12 Z" fill={color} opacity="0.72" />
      <path d="M12 12 C6 12 2.5 16.5 6.5 20.5 C10.5 24.5 12 18.5 12 12 Z" fill={color} opacity="0.72" />
      <path d="M12 12 C12 18 16.5 21.5 20.5 17.5 C24.5 13.5 18.5 12 12 12 Z" fill={color} opacity="0.92" />
      <path d="M12 13.5 L12 22" stroke={color} strokeWidth="1.2" opacity="0.55" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.6" fill="var(--specimen-ink, #2A2418)" opacity="0.5" />
    </svg>
  );
}

export function HerbariumSearchGlyph({ size = 16, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <circle cx="10" cy="10.5" r="6" fill="none" stroke={color} strokeWidth="1.6" />
      <path d="M17.2 6.3 C18.6 6.1 19.3 5.1 19.1 3.9 C17.9 3.7 16.9 4.4 16.7 5.8 C16.5 6.4 16.8 6.4 17.2 6.3 Z" fill={color} opacity="0.85" />
      <line x1="14.7" y1="14.7" x2="20.5" y2="20.5" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function HerbariumCheckGlyph({ size = 14, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <path d="M12 4 C14.6 6.6 14.7 9.6 12 12 C9.3 9.6 9.4 6.6 12 4 Z" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <path d="M8.5 13 L10.8 15.3 L16 10" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const THEME_ICON_SETS = {
  archive: { World: ArchiveWorldIcon, Search: ArchiveSearchGlyph, Check: ArchiveCheckGlyph },
  search: { World: ScholarWorldIcon, Search: ScholarSearchGlyph, Check: ScholarCheckGlyph },
  midnight: { World: MidnightWorldIcon, Search: MidnightSearchGlyph, Check: MidnightCheckGlyph },
  herbarium: { World: HerbariumWorldIcon, Search: HerbariumSearchGlyph, Check: HerbariumCheckGlyph },
};
