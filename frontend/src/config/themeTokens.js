/**
 * Premium Multi-Theme Design System
 * Each theme is a complete environment/experience, not just colors
 */

export const themeTokens = {
  archive: {
    name: "Archive",
    description: "Warm, artistic, nostalgic scrapbook aesthetic",
    emoji: "🌹",
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
    name: "Search",
    description: "Google-inspired: pure white, minimal, functional research",
    emoji: "🔍",
    // Pure white background like Google homepage
    bgPaper: "#FFFFFF",
    bgWarm: "#FFFFFF",
    bgCard: "#F8F8F8",
    bgTag: "#F5F5F5",
    bgPetal: "#FFFFFF",
    // Google-style gray text
    ink: "#202124",
    inkSoft: "#5F6368",
    // Minimal accent colors (only for subtle highlights)
    plum: "#1F2937",
    pink: "#F3F3F3",
    blossom: "#E8E8E8",
    rose: "#3C4043",
    burgundy: "#1A1A1A",
    cream: "#FFFFFF",
    dusty: "#DADCE0",
    sage: "#DADCE0",
    brown: "#D2D3D4",
    // Borders - very subtle
    borderSoft: "#DADCE0",
    borderMedium: "#D2D3D4",
    // Decorations - none (like Google)
    decorationPrimary: "#1F2937",
    decorationSecondary: "#E8E8E8",
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
    description: "Luxury dark mode: black & cream with subtle gold accents",
    emoji: "🌙",
    // Pure black luxury background
    bgPaper: "#000000",
    bgWarm: "#0D0D0D",
    bgCard: "#0A0A0A",
    bgTag: "#1A1A1A",
    bgPetal: "#050505",
    // Cream text for luxury readability (AAA contrast on black)
    ink: "#F5F3F0",
    inkSoft: "#D4D0C8",
    // Subtle luxury accents: gold, silver, refined neutrals
    plum: "#D4AF37",
    pink: "#E8E4D8",
    blossom: "#C9B896",
    rose: "#B8956A",
    burgundy: "#8B7355",
    cream: "#F5F3F0",
    dusty: "#A89968",
    sage: "#8B8680",
    brown: "#9B8F7E",
    // Borders - refined gray
    borderSoft: "#2A2A2A",
    borderMedium: "#1F1F1F",
    // Decorations - subtle gold + silver
    decorationPrimary: "#D4AF37",
    decorationSecondary: "#E8E4D8",
    // Theme-specific experience tokens
    animationDuration: "2s",
    particleDensity: 20,
    textureOpacity: 0.01,
    decorationIntensity: 0.3,
    cardShadowStyle: "luxury-shadow",
    // Semantic colors (HSL for shadcn compatibility)
    background: "0 0% 0%",
    foreground: "28 10% 96%",
    primary: "43 100% 51%",
    primaryForeground: "0 0% 0%",
    secondary: "43 30% 40%",
    secondaryForeground: "28 10% 96%",
    muted: "0 0% 15%",
    mutedForeground: "28 8% 84%",
    accent: "43 100% 51%",
    accentForeground: "0 0% 0%",
    destructive: "0 60% 50%",
    destructiveForeground: "0 0% 98%",
    border: "0 0% 15%",
    input: "0 0% 15%",
    ring: "43 100% 51%",
  },

  herbarium: {
    name: "Herbarium",
    description: "Botanical research archive, dark & luxe",
    emoji: "🌿",
    // FIXED: DARK moss green (completely redesigned from light)
    bgPaper: "#0F2419",
    bgWarm: "#163325",
    bgCard: "#0E2317",
    bgTag: "#1A3B2F",
    bgPetal: "#0D2216",
    // Light cream text on dark green (AAA contrast)
    ink: "#E8E6E0",
    inkSoft: "#C0B8AE",
    // Bright botanical greens (visible on dark)
    plum: "#6DB563",
    pink: "#A8D5AA",
    blossom: "#B8D5AA",
    rose: "#5FA050",
    burgundy: "#4A7C3A",
    cream: "#E8E6E0",
    dusty: "#8BA57A",
    sage: "#7A9B6F",
    brown: "#8B9E7A",
    // Borders - subtle on dark
    borderSoft: "#2B4838",
    borderMedium: "#1F3A2E",
    // Decorations - bright botanicals
    decorationPrimary: "#6DB563",
    decorationSecondary: "#A8D5AA",
    // Theme-specific experience tokens
    animationDuration: "6s",
    particleDensity: 20,
    textureOpacity: 0.08,
    decorationIntensity: 0.85,
    cardShadowStyle: "aged-paper-shadow",
    // Semantic colors (HSL for shadcn compatibility)
    background: "145 42% 12%",
    foreground: "28 12% 90%",
    primary: "105 35% 42%",
    primaryForeground: "28 12% 90%",
    secondary: "105 30% 55%",
    secondaryForeground: "145 42% 12%",
    muted: "145 30% 25%",
    mutedForeground: "28 10% 75%",
    accent: "105 45% 50%",
    accentForeground: "145 42% 12%",
    destructive: "0 60% 50%",
    destructiveForeground: "0 0% 98%",
    border: "145 30% 25%",
    input: "145 30% 25%",
    ring: "105 35% 42%",
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
    "--decoration-primary": tokens.decorationPrimary,
    "--decoration-secondary": tokens.decorationSecondary,
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
