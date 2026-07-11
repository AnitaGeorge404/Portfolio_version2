import React from "react";
import { useTheme } from "@/context/ThemeContext";

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

// ── ARCHIVE — a recognizable cabbage-rose bloom: stem, leaf, three layered
// petal rings resolving to a center bud, not an abstract four-lobed cross ──

export function ArchiveWorldIcon({ size = 24, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <path d="M12 13.2 C10.9 16 11.1 18.8 12.3 21.3" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
      <path d="M11.6 16.6 C9.5 16.1 8 16.9 7.5 18.6 C9.6 18.9 11.2 18.2 11.6 16.6 Z" fill={color} opacity="0.5" />
      <path d="M12 3.6 C15.3 4.3 17.3 7.1 16.7 10.1 C16.1 12.9 13.3 14.7 10.3 14.1 C7.5 13.6 5.6 11 6.2 8.1 C6.8 5.3 9.3 3.1 12 3.6 Z" fill={color} opacity="0.92" />
      <path d="M12 5.9 C13.8 6.3 15 7.9 14.6 9.6 C14.2 11.2 12.6 12.2 10.9 11.9 C9.3 11.5 8.2 9.9 8.6 8.2 C9 6.6 10.5 5.6 12 5.9 Z" fill={color} opacity="0.7" />
      <path d="M12.1 8.1 C13 8.3 13.5 9.1 13.3 9.9 C13.1 10.6 12.2 11 11.4 10.8 C10.6 10.6 10.1 9.8 10.3 9 C10.5 8.3 11.3 7.9 12.1 8.1 Z" fill={color} />
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

/** Ink sparkle cluster — Archive's AI/synthesis mark, an annotated star, not a robot glyph */
export function ArchiveAiGlyph({ size = 16, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <path d="M12 3.5 C12.6 8 13.8 9.6 18.5 10.5 C13.8 11.4 12.6 13 12 17.5 C11.4 13 10.2 11.4 5.5 10.5 C10.2 9.6 11.4 8 12 3.5 Z" fill={color} opacity="0.92" />
      <circle cx="18.8" cy="17.2" r="1.3" fill={color} opacity="0.7" />
      <circle cx="5.2" cy="5.6" r="0.9" fill={color} opacity="0.55" />
    </svg>
  );
}

/** Hand-drawn outward arrow, slightly imperfect line */
export function ArchiveExternalGlyph({ size = 14, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <path d="M8.5 15.5 C12 12.3 15.3 9 18.3 6.2" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12.3 5.6 C14.8 5.1 16.6 5.2 18.6 6 C19.3 8 19.3 9.8 18.8 12.2" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Soft ink arrow — back/return */
export function ArchiveBackGlyph({ size = 16, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <path d="M19 12.3 C14.5 12 10.5 12 5.7 12.1" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M10.3 7 C8.2 8.8 6.6 10.2 5.5 12 C6.7 13.7 8.3 15.1 10.5 16.8" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Crossed archive notation — a struck-through mark, not a harsh red X */
export function ArchiveErrorGlyph({ size = 16, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <path d="M6 6.5 C10.5 10.5 14 14.5 18.3 17.8" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M17.8 6.8 C14 10 10.8 13 6.4 17.3" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

/** Tiny paper/reference slip — a folded-corner note */
export function ArchiveReferenceGlyph({ size = 14, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <path d="M6 4.5 L15 4.5 L18.5 8 L18.5 19.5 L6 19.5 Z" fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M15 4.5 L15 8 L18.5 8" fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9 12.3 L15.3 12.3 M9 15.5 L13.5 15.5" stroke={color} strokeWidth="1.1" opacity="0.6" strokeLinecap="round" />
    </svg>
  );
}

// ── SCHOLAR — geometric, precise, indexed ──

// ── SCHOLAR — a precision reticle-lens: crosshair + center point read as
// "indexed search," not a generic magnifying glass ──

export function ScholarWorldIcon({ size = 24, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <circle cx="10.5" cy="10.5" r="6.3" fill="none" stroke={color} strokeWidth="1.7" />
      <line x1="10.5" y1="6.7" x2="10.5" y2="8.3" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
      <line x1="10.5" y1="12.7" x2="10.5" y2="14.3" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
      <line x1="6.7" y1="10.5" x2="8.3" y2="10.5" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
      <line x1="12.7" y1="10.5" x2="14.3" y2="10.5" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
      <circle cx="10.5" cy="10.5" r="1.15" fill={color} />
      <line x1="15" y1="15" x2="20.3" y2="20.3" stroke={color} strokeWidth="1.9" strokeLinecap="round" />
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

/** Structured synthesis nodes — three linked points, geometric not organic */
export function ScholarAiGlyph({ size = 16, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <line x1="6" y1="18" x2="12" y2="6" stroke={color} strokeWidth="1.3" opacity="0.6" />
      <line x1="12" y1="6" x2="18" y2="14" stroke={color} strokeWidth="1.3" opacity="0.6" />
      <line x1="6" y1="18" x2="18" y2="14" stroke={color} strokeWidth="1.3" opacity="0.6" />
      <circle cx="12" cy="6" r="2" fill={color} />
      <circle cx="6" cy="18" r="2" fill={color} opacity="0.8" />
      <circle cx="18" cy="14" r="2" fill={color} opacity="0.8" />
    </svg>
  );
}

/** Precise outward vector — sharp arrowhead, straight line */
export function ScholarExternalGlyph({ size = 14, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <line x1="6.5" y1="17.5" x2="17.5" y2="6.5" stroke={color} strokeWidth="1.6" strokeLinecap="square" />
      <path d="M10 6.5 L17.5 6.5 L17.5 14" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

/** Sharp chevron — back/return */
export function ScholarBackGlyph({ size = 16, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <path d="M15 5 L8 12 L15 19" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

/** Unresolved record marker — square with a broken corner, no organic curve */
export function ScholarErrorGlyph({ size = 16, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <rect x="4.5" y="4.5" width="15" height="15" fill="none" stroke={color} strokeWidth="1.4" opacity="0.75" />
      <line x1="9" y1="9" x2="15" y2="15" stroke={color} strokeWidth="1.6" strokeLinecap="square" />
      <line x1="15" y1="9" x2="9" y2="15" stroke={color} strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}

/** Numbered reference marker — bracketed index tick, like [1] */
export function ScholarReferenceGlyph({ size = 14, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <path d="M8 4.5 L5 4.5 L5 19.5 L8 19.5" fill="none" stroke={color} strokeWidth="1.4" />
      <path d="M16 4.5 L19 4.5 L19 19.5 L16 19.5" fill="none" stroke={color} strokeWidth="1.4" />
      <line x1="10.5" y1="12" x2="13.5" y2="12" stroke={color} strokeWidth="1.4" opacity="0.7" />
    </svg>
  );
}

// ── MIDNIGHT — faceted, machined, refractive ──

// ── MIDNIGHT — a premium emerald-cut gem: flat table, crown facets, a
// pavilion tapering to a point, read as "intelligence core" ──

export function MidnightWorldIcon({ size = 24, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <polygon points="8,4 16,4 20,9 4,9" fill={color} opacity="0.9" />
      <polygon points="4,9 8,4 12,9" fill={color} opacity="0.55" />
      <polygon points="20,9 16,4 12,9" fill={color} opacity="0.38" />
      <polygon points="4,9 12,9 12,21" fill={color} opacity="0.68" />
      <polygon points="20,9 12,9 12,21" fill={color} opacity="0.32" />
      <line x1="12" y1="9" x2="12" y2="21" stroke="var(--bg-paper, #0A0B0D)" strokeWidth="0.4" opacity="0.35" />
      <line x1="8" y1="4" x2="16" y2="4" stroke="var(--bg-paper, #0A0B0D)" strokeWidth="0.4" opacity="0.3" />
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

/** Intelligence core — a small semantic diamond, machined not organic */
export function MidnightAiGlyph({ size = 16, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <polygon points="12,3 20,9.5 16.5,20 7.5,20 4,9.5" fill="none" stroke={color} strokeWidth="1.3" opacity="0.85" />
      <polygon points="12,3 12,20 4,9.5" fill={color} opacity="0.22" />
      <polygon points="12,3 12,20 20,9.5" fill={color} opacity="0.12" />
      <circle cx="12" cy="11" r="1.6" fill={color} />
    </svg>
  );
}

/** Diagonal signal vector — arrow with a faint trailing signal */
export function MidnightExternalGlyph({ size = 14, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <line x1="5.5" y1="18.5" x2="18" y2="6" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <line x1="10" y1="14" x2="18" y2="6" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M11.5 6 L18 6 L18 12.5" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Angular precision return */
export function MidnightBackGlyph({ size = 16, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <path d="M16 5 L8.5 12 L16 19" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8.5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="1.1" opacity="0.4" />
    </svg>
  );
}

/** Fractured signal geometry — a diamond outline with one broken facet */
export function MidnightErrorGlyph({ size = 16, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <polygon points="12,3.5 19,8.5 16.5,19 8,19 5,8.5" fill="none" stroke={color} strokeWidth="1.3" opacity="0.55" />
      <path d="M9 10 L13 12.5 L10.5 15.5 L15 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Evidence facet — small hexagon with an indexed tick */
export function MidnightReferenceGlyph({ size = 14, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <polygon points="12,4 18.5,8 18.5,16 12,20 5.5,16 5.5,8" fill="none" stroke={color} strokeWidth="1.3" opacity="0.75" />
      <line x1="9" y1="12" x2="15" y2="12" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}

// ── HERBARIUM — botanical, observational ──

// ── HERBARIUM — a single pressed leaf with a visible midrib and side veins,
// matching the FieldLeaf specimen illustrations elsewhere in the app, rather
// than an abstract four-lobed clover ──

export function HerbariumWorldIcon({ size = 24, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <path d="M12 3.4 C17.3 7.1 18.4 13.8 12 20.6 C5.6 13.8 6.7 7.1 12 3.4 Z" fill={color} opacity="0.88" />
      <path d="M12 5.6 L12 18.3" stroke="var(--specimen-ink, #2A2418)" strokeWidth="0.9" opacity="0.32" strokeLinecap="round" />
      <path
        d="M12 8.2 L8.9 11.1 M12 8.2 L15.1 11.1 M12 12.1 L9.2 15.2 M12 12.1 L14.8 15.2"
        stroke="var(--specimen-ink, #2A2418)"
        strokeWidth="0.6"
        opacity="0.28"
        strokeLinecap="round"
      />
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

/** Branching relationship stem — a small stem with two leaf nodes, not a robot */
export function HerbariumAiGlyph({ size = 16, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <path d="M12 20.5 L12 8" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 13 C12 9.5 14.5 8 17.5 7.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M12 16 C12 13 9.5 11.8 6.8 11.3" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.85" />
      <circle cx="12" cy="6.5" r="2" fill={color} />
      <circle cx="17.8" cy="6.8" r="1.4" fill={color} opacity="0.75" />
      <circle cx="6.3" cy="10.5" r="1.4" fill={color} opacity="0.75" />
    </svg>
  );
}

/** Outward archive marker — leaf-tipped arrow */
export function HerbariumExternalGlyph({ size = 14, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <path d="M7 17 C10.5 13.5 14 10 17.5 6.5" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M17.5 6.5 C17.9 8.6 17.3 9.9 15.8 11 C16.5 9.4 16.3 8.4 15.2 7.2 C16 6.6 16.7 6.4 17.5 6.5 Z" fill={color} opacity="0.85" />
      <path d="M11 6.8 L17.5 6.5 L17.2 13" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
}

/** Organic but readable return arrow — a curved stem */
export function HerbariumBackGlyph({ size = 16, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <path d="M19 15 C15 17.5 10 17.3 6 14" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9.3 10 C7.8 11.3 6.7 12.5 6 14 C7.1 15 8.3 15.7 10 16.6" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Incomplete specimen marker — leaf outline, part unfilled/dashed */
export function HerbariumErrorGlyph({ size = 16, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <path d="M12 4.5 C16 6.5 17.5 10.5 15.5 15 C13.8 12.5 12.8 9.5 12 4.5 Z" fill={color} opacity="0.75" />
      <path d="M12 4.5 C8 6.5 6.5 10.5 8.5 15 C10.2 12.5 11.2 9.5 12 4.5 Z" fill="none" stroke={color} strokeWidth="1.2" strokeDasharray="2.2 2.2" opacity="0.6" />
      <path d="M12 15 L12 20" stroke={color} strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
    </svg>
  );
}

/** Field record marker — a small tag with a leaf accent */
export function HerbariumReferenceGlyph({ size = 14, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
      <path d="M5 6.5 L14 6.5 L19.5 12 L14 17.5 L5 17.5 Z" fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="9" cy="12" r="1.3" fill={color} opacity="0.8" />
    </svg>
  );
}

export const THEME_ICON_SETS = {
  archive: {
    world: ArchiveWorldIcon, search: ArchiveSearchGlyph, success: ArchiveCheckGlyph,
    ai: ArchiveAiGlyph, external: ArchiveExternalGlyph, back: ArchiveBackGlyph,
    error: ArchiveErrorGlyph, reference: ArchiveReferenceGlyph,
  },
  search: {
    world: ScholarWorldIcon, search: ScholarSearchGlyph, success: ScholarCheckGlyph,
    ai: ScholarAiGlyph, external: ScholarExternalGlyph, back: ScholarBackGlyph,
    error: ScholarErrorGlyph, reference: ScholarReferenceGlyph,
  },
  midnight: {
    world: MidnightWorldIcon, search: MidnightSearchGlyph, success: MidnightCheckGlyph,
    ai: MidnightAiGlyph, external: MidnightExternalGlyph, back: MidnightBackGlyph,
    error: MidnightErrorGlyph, reference: MidnightReferenceGlyph,
  },
  herbarium: {
    world: HerbariumWorldIcon, search: HerbariumSearchGlyph, success: HerbariumCheckGlyph,
    ai: HerbariumAiGlyph, external: HerbariumExternalGlyph, back: HerbariumBackGlyph,
    error: HerbariumErrorGlyph, reference: HerbariumReferenceGlyph,
  },
};

/**
 * Semantic icon resolver — components ask for a ROLE ("search", "ai",
 * "external", "back", "success", "error", "reference", "world"); the active
 * theme decides the visual language. This is the intended call site for new
 * icon usage instead of sprinkling `if (currentTheme === "x")` per page.
 * Falls back to Archive if an unknown role/theme is passed rather than
 * rendering nothing, so a typo degrades gracefully instead of vanishing.
 */
export function ThemeIcon({ role, size, color = "currentColor", className }) {
  const { currentTheme } = useTheme();
  const set = THEME_ICON_SETS[currentTheme] || THEME_ICON_SETS.archive;
  const Comp = set[role] || THEME_ICON_SETS.archive[role];
  if (!Comp) return null;
  // Icon primitives don't take className directly (they're plain SVGs) — wrap
  // so Tailwind color/hover utilities on className still work via currentColor.
  if (className) {
    return (
      <span className={className} style={{ display: "inline-flex", lineHeight: 0 }}>
        <Comp size={size} color={color} />
      </span>
    );
  }
  return <Comp size={size} color={color} />;
}
