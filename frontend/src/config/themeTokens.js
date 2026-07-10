/**
 * Premium Multi-Theme Design System
 * Each theme is a complete environment/experience, not just colors
 */

export const themeTokens = {
  archive: {
    name: "Archive",
    description: "Warm, artistic, nostalgic scrapbook aesthetic",
    emoji: "🌹",
    // Typography & composition grammar
    fontHeading: '"Cormorant Garamond", Georgia, serif',
    fontBody: '"Outfit", -apple-system, sans-serif',
    fontLabel: '"Outfit", -apple-system, sans-serif',
    fontHand: '"Caveat", cursive',
    motionPreset: "paper",
    cardStyle: "tape",
    // Background colors
    bgPaper: "#FDF6F0",
    bgWarm: "#F9EDE8",
    bgCard: "#FBF2EE",
    bgTag: "#FEF5F2",
    bgPetal: "#FCEEF2",
    // Text colors
    ink: "#2C1A1D",
    inkSoft: "#7A5A60",
    // Accent colors
    plum: "#8B3A52",
    pink: "#F2C4CE",
    blossom: "#EDAABB",
    rose: "#C96B84",
    burgundy: "#6B1E35",
    cream: "#FDF6F0",
    dusty: "#D9939F",
    sage: "#A0A882",
    brown: "#C9A89C",
    // Borders
    borderSoft: "#F0D8DC",
    borderMedium: "#E8B8C2",
    link: "#8B3A52",
    // Decorations
    decorationPrimary: "#C96B84",
    decorationSecondary: "#EDAABB",
    // Theme-specific experience tokens
    animationDuration: "8s",
    particleDensity: 15,
    textureOpacity: 0.03,
    decorationIntensity: 0.9,
    cardShadowStyle: "layered-paper",
    // Semantic colors (HSL for shadcn compatibility)
    background: "20 60% 97%",
    foreground: "345 30% 14%",
    primary: "345 40% 39%",
    primaryForeground: "20 60% 97%",
    secondary: "350 40% 92%",
    secondaryForeground: "345 30% 14%",
    muted: "350 30% 93%",
    mutedForeground: "345 20% 45%",
    accent: "345 50% 78%",
    accentForeground: "345 30% 14%",
    destructive: "0 60% 50%",
    destructiveForeground: "0 0% 98%",
    border: "350 45% 87%",
    input: "350 45% 87%",
    ring: "345 35% 55%",
  },

  search: {
    name: "Scholar",
    description: "Indexed-record research index: pure white, precise, citation-led",
    emoji: "🔍",
    // Typography & composition grammar
    fontHeading: '"Source Serif 4", Georgia, serif',
    fontBody: '"IBM Plex Sans", -apple-system, sans-serif',
    fontLabel: '"IBM Plex Mono", ui-monospace, monospace',
    fontHand: null,
    motionPreset: "precise",
    cardStyle: "index-row",
    // Pure white background like Google homepage
    bgPaper: "#FFFFFF",
    bgWarm: "#FFFFFF",
    bgCard: "#F8F8F8",
    bgTag: "#F5F5F5",
    bgPetal: "#FFFFFF",
    // Academic gray text
    ink: "#202124",
    inkSoft: "#5F6368",
    // Restrained academic blue — the one accent color in Scholar
    plum: "#1558D6",
    pink: "#F3F3F3",
    blossom: "#8AB4F8",
    rose: "#1558D6",
    burgundy: "#0B3D91",
    cream: "#FFFFFF",
    dusty: "#5F6368",
    sage: "#5F6368",
    brown: "#DADCE0",
    // Borders - very subtle
    borderSoft: "#DADCE0",
    borderMedium: "#D2D3D4",
    link: "#1558D6",
    // Decorations - none (like Google)
    decorationPrimary: "#1558D6",
    decorationSecondary: "#8AB4F8",
    // Theme-specific experience tokens
    animationDuration: "0.2s",
    particleDensity: 0,
    textureOpacity: 0,
    decorationIntensity: 0,
    cardShadowStyle: "none",
    // Semantic colors (HSL for shadcn compatibility)
    background: "0 0% 100%",
    foreground: "0 0% 13%",
    primary: "210 40% 45%",
    primaryForeground: "0 0% 100%",
    secondary: "0 0% 98%",
    secondaryForeground: "0 0% 13%",
    muted: "0 0% 97%",
    mutedForeground: "0 0% 37%",
    accent: "210 40% 45%",
    accentForeground: "0 0% 100%",
    destructive: "0 60% 50%",
    destructiveForeground: "0 0% 98%",
    border: "0 0% 86%",
    input: "0 0% 86%",
    ring: "210 40% 45%",
  },

  midnight: {
    name: "Midnight",
    description: "Private intelligence system, not dark mode: layered charcoal, selective gold, moonlight silver",
    emoji: "🌙",
    // Typography & composition grammar
    fontHeading: '"Instrument Serif", Georgia, serif',
    fontBody: '"Manrope", -apple-system, sans-serif',
    fontLabel: '"IBM Plex Mono", ui-monospace, monospace',
    fontHand: null,
    motionPreset: "inertial",
    cardStyle: "glass",
    // Layered darkness — never pure #000, four readable depth levels
    bgPaper: "#0A0B0D",   // level 0 — void
    bgWarm: "#121317",    // level 1 — atmosphere
    bgCard: "#1A1C21",    // level 2 — surface (glass panel fill)
    bgTag: "#22252B",     // level 3 — active surface (elevated glass)
    bgPetal: "#1C1812",   // level 4 — intelligence (warm-dark, gold-adjacent surfaces)
    // Moonlight/platinum text — white used sparingly, not everywhere
    ink: "#E9E7E2",
    inkSoft: "#9CA2AA",
    // Silver is structure (default accent); gold is reserved as a signal
    plum: "#B9C0C6",
    pink: "#E9E7E2",
    blossom: "#C7CBD1",
    rose: "#D4AF37",
    burgundy: "#C9A86B",
    cream: "#E9E7E2",
    dusty: "#8A9099",
    sage: "#7C828A",
    brown: "#4A4E56",
    // Borders - refined graphite, not gray-on-black
    borderSoft: "#2A2D33",
    borderMedium: "#3A3E46",
    link: "#D4AF37",
    // Decorations - gold signal + silver structure
    decorationPrimary: "#D4AF37",
    decorationSecondary: "#B9C0C6",
    // Theme-specific experience tokens
    animationDuration: "3s",
    particleDensity: 4,
    textureOpacity: 0.02,
    decorationIntensity: 0.35,
    cardShadowStyle: "luxury-shadow",
    // Semantic colors (HSL for shadcn compatibility)
    background: "220 15% 4%",
    foreground: "40 8% 91%",
    primary: "45 65% 55%",
    primaryForeground: "220 15% 4%",
    secondary: "210 8% 65%",
    secondaryForeground: "40 8% 91%",
    muted: "220 10% 15%",
    mutedForeground: "210 8% 62%",
    accent: "45 65% 55%",
    accentForeground: "220 15% 4%",
    destructive: "0 60% 50%",
    destructiveForeground: "0 0% 98%",
    border: "220 10% 18%",
    input: "220 10% 18%",
    ring: "45 65% 55%",
  },

  herbarium: {
    name: "Herbarium",
    description: "Botanical field research archive — deep forest environment, ivory specimen sheets",
    emoji: "🌿",
    // Typography & composition grammar
    fontHeading: '"Spectral", Georgia, serif',
    fontBody: '"Spectral", Georgia, serif',
    fontLabel: '"Space Mono", ui-monospace, monospace',
    fontHand: null,
    motionPreset: "environmental",
    cardStyle: "specimen",
    // Deep forest environment — the viewport itself, layered dark greens
    bgPaper: "#0D1F17",
    bgWarm: "#132A1F",
    bgCard: "#0B1B14",
    bgTag: "#1C3728",
    bgPetal: "#0A1810",
    // Ivory/ink used ON the forest environment itself (nav, labels, body copy)
    ink: "#EAE4D3",
    inkSoft: "#A8B79C",
    // Living green signal + muted sage secondary — NO pink/blue/gold
    plum: "#7EC66F",
    pink: "#EAE4D3",
    blossom: "#C8D9C0",
    rose: "#7EC66F",
    // Darker than the environment green on purpose — this is the color used
    // for action links ON the ivory specimen sheet, and needs 4.5:1+ contrast
    // against --specimen-bg (#5A9B52 only cleared 2.86:1, failing AA).
    burgundy: "#3D6B36",
    cream: "#EAE4D3",
    dusty: "#8FAE7A",
    sage: "#7C9268",
    brown: "#5C6E4F",
    // Borders - subtle on dark
    borderSoft: "#26402F",
    borderMedium: "#345239",
    link: "#8FCB7A",
    // Decorations - living fern green + warm parchment ivory
    decorationPrimary: "#7EC66F",
    decorationSecondary: "#E8DCC0",
    // The specimen sheet — the one surface that breaks from the forest palette
    specimenBg: "#F3ECDD",
    specimenBgAlt: "#EAE1CC",
    specimenInk: "#2A2418",
    specimenInkSoft: "#5C6E4F",
    specimenBorder: "#9CAE84",
    // Theme-specific experience tokens
    animationDuration: "10s",
    particleDensity: 3,
    textureOpacity: 0.05,
    decorationIntensity: 0.4,
    cardShadowStyle: "aged-paper-shadow",
    // Semantic colors (HSL for shadcn compatibility)
    background: "145 42% 12%",
    foreground: "28 12% 93%",
    primary: "105 35% 45%",
    primaryForeground: "28 12% 93%",
    secondary: "105 30% 55%",
    secondaryForeground: "145 42% 12%",
    muted: "145 30% 25%",
    mutedForeground: "28 10% 82%",
    accent: "105 45% 50%",
    accentForeground: "145 42% 12%",
    destructive: "0 60% 50%",
    destructiveForeground: "0 0% 98%",
    border: "145 30% 25%",
    input: "145 30% 25%",
    ring: "105 35% 45%",
  },
};

/**
 * Convert theme tokens to CSS variables
 * Used by ThemeContext to apply theme to document root
 */
export function getThemeCSSVariables(theme) {
  const tokens = themeTokens[theme];
  if (!tokens) return {};

  return {
    "--font-heading": tokens.fontHeading,
    "--font-body": tokens.fontBody,
    "--font-label": tokens.fontLabel,
    "--font-hand": tokens.fontHand || tokens.fontBody,
    "--bg-paper": tokens.bgPaper,
    "--bg-warm": tokens.bgWarm,
    "--bg-card": tokens.bgCard,
    "--bg-tag": tokens.bgTag,
    "--bg-petal": tokens.bgPetal,
    "--ink": tokens.ink,
    "--ink-soft": tokens.inkSoft,
    "--plum": tokens.plum,
    "--pink": tokens.pink,
    "--blossom": tokens.blossom,
    "--rose": tokens.rose,
    "--burgundy": tokens.burgundy,
    "--cream": tokens.cream,
    "--dusty": tokens.dusty,
    "--sage": tokens.sage,
    "--brown": tokens.brown,
    "--border-soft": tokens.borderSoft,
    "--border-medium": tokens.borderMedium,
    "--link": tokens.link,
    "--decoration-primary": tokens.decorationPrimary,
    "--decoration-secondary": tokens.decorationSecondary,
    // Specimen-sheet surface (Herbarium only — falls back to the card surface
    // for other themes so components referencing it never resolve to "undefined")
    "--specimen-bg": tokens.specimenBg || tokens.bgCard,
    "--specimen-bg-alt": tokens.specimenBgAlt || tokens.bgTag,
    "--specimen-ink": tokens.specimenInk || tokens.ink,
    "--specimen-ink-soft": tokens.specimenInkSoft || tokens.inkSoft,
    "--specimen-border": tokens.specimenBorder || tokens.borderMedium,
    // Experience tokens for theme-specific behavior
    "--animation-duration": tokens.animationDuration,
    "--particle-density": tokens.particleDensity,
    "--texture-opacity": tokens.textureOpacity,
    "--decoration-intensity": tokens.decorationIntensity,
    "--card-shadow-style": tokens.cardShadowStyle,
    // Semantic HSL colors
    "--background": tokens.background,
    "--foreground": tokens.foreground,
    "--primary": tokens.primary,
    "--primary-foreground": tokens.primaryForeground,
    "--secondary": tokens.secondary,
    "--secondary-foreground": tokens.secondaryForeground,
    "--muted": tokens.muted,
    "--muted-foreground": tokens.mutedForeground,
    "--accent": tokens.accent,
    "--accent-foreground": tokens.accentForeground,
    "--destructive": tokens.destructive,
    "--destructive-foreground": tokens.destructiveForeground,
    "--border": tokens.border,
    "--input": tokens.input,
    "--ring": tokens.ring,
  };
}

export const THEME_NAMES = Object.keys(themeTokens);
