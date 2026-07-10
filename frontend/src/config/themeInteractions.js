/**
 * Theme interaction registry — the single place that maps a theme key to its
 * interaction identity (favicon mark, browser chrome color, and the CSS hook
 * names used by the signature-animation system in index.css). Components
 * read from here instead of scattering `currentTheme === "x"` checks.
 *
 * Visual/content tokens live in themeTokens.js. This file is specifically
 * about *behavior*: what favicon shows, what color the browser chrome takes,
 * and which class names each theme's CSS block in index.css responds to.
 */

// Minimal favicon marks — simplified variants of ThemeIcons' World icons,
// flattened to a single fill so they read correctly at 16-32px favicon size.
const FAVICON_SVG = {
  archive: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3.2C14.6 5.8 14.7 8.8 12 12 9.3 8.8 9.4 5.8 12 3.2Z" fill="%23C96B84"/><path d="M12 12c3.2-2.6 6.2-2.5 8.8 0-2.6 2.6-5.6 2.7-8.8 0Z" fill="%23C96B84" opacity=".8"/><path d="M12 12c-2.6 3.2-2.5 6.2 0 8.8 2.6-2.6 2.7-5.6 0-8.8Z" fill="%23C96B84" opacity=".8"/><path d="M12 12c-2.6-2.6-5.6-2.5-8.8 0 2.6 2.6 5.6 2.7 8.8 0Z" fill="%23C96B84" opacity=".8"/><circle cx="12" cy="12" r="1.8" fill="%236B1E35"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="10" cy="10" r="6.2" fill="none" stroke="%231558D6" stroke-width="2"/><line x1="14.4" y1="14.4" x2="20.5" y2="20.5" stroke="%231558D6" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  midnight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="7,3.5 17,3.5 20.5,9 3.5,9" fill="%23D4AF37"/><polygon points="3.5,9 7,3.5 12,12" fill="%23B9C0C6"/><polygon points="20.5,9 17,3.5 12,12" fill="%238A9099"/><polygon points="3.5,9 12,12 12,21" fill="%235A5F66"/><polygon points="20.5,9 12,12 12,21" fill="%233A3E46"/></svg>`,
  herbarium: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 12C12 6 7.5 2.5 3.5 6.5-0.5 10.5 5.5 12 12 12Z" fill="%237EC66F"/><path d="M12 12c6 0 9.5-4.5 5.5-8.5S12 5.5 12 12Z" fill="%235E9A50"/><path d="M12 12c-6 0-9.5 4.5-5.5 8.5S12 18.5 12 12Z" fill="%235E9A50"/><path d="M12 12c0 6 4.5 9.5 8.5 5.5S18.5 12 12 12Z" fill="%237EC66F"/><circle cx="12" cy="12" r="1.6" fill="%232A2418"/></svg>`,
};

export const themeInteractions = {
  archive: {
    themeColor: "#FBF1EC",
    favicon: FAVICON_SVG.archive,
    loader: "flower-bloom",
    transitionClass: "theme-transition-archive",
    linkStyle: "ink-underline",
    cardEnter: "card-enter-archive",
  },
  search: {
    themeColor: "#FFFFFF",
    favicon: FAVICON_SVG.search,
    loader: "index-scan",
    transitionClass: "theme-transition-scholar",
    linkStyle: "precision-underline",
    cardEnter: "card-enter-scholar",
  },
  midnight: {
    themeColor: "#0A0B0D",
    favicon: FAVICON_SVG.midnight,
    loader: "facet-resolve",
    transitionClass: "theme-transition-midnight",
    linkStyle: "signal-underline",
    cardEnter: "card-enter-midnight",
  },
  herbarium: {
    themeColor: "#0D1F17",
    favicon: FAVICON_SVG.herbarium,
    loader: "fern-unfurl",
    transitionClass: "theme-transition-herbarium",
    linkStyle: "botanical-underline",
    cardEnter: "card-enter-herbarium",
  },
};

export function applyFaviconAndChrome(themeName) {
  const entry = themeInteractions[themeName] || themeInteractions.archive;

  let link = document.querySelector('link[rel="icon"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.type = "image/svg+xml";
  link.href = `data:image/svg+xml,${entry.favicon}`;

  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }
  meta.content = entry.themeColor;
}
