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
  archive: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 6.4C9.7 5 7.3 4.6 4.8 5.4L4.8 17.6C7.3 16.8 9.7 17.2 12 18.6Z" fill="%23C96B84"/><path d="M12 6.4C14.3 5 16.7 4.6 19.2 5.4L19.2 17.6C16.7 16.8 14.3 17.2 12 18.6Z" fill="%23C96B84" opacity=".7"/><path d="M10.7 3 L13.3 3 L13.3 8.4 L12 7.3 L10.7 8.4Z" fill="%236B1E35"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.3 10.4L6.3 14C6.3 16.3 8.9 18 12 18C15.1 18 17.7 16.3 17.7 14L17.7 10.4" fill="none" stroke="%231558D6" stroke-width="1.6" stroke-linecap="round" opacity=".7"/><polygon points="12,4 21.5,8.6 12,13.2 2.5,8.6" fill="%231558D6"/><line x1="20.3" y1="9.2" x2="20.3" y2="14.4" stroke="%231558D6" stroke-width="1.6" stroke-linecap="round"/><circle cx="20.3" cy="15.6" r="1.3" fill="%231558D6"/></svg>`,
  midnight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.3 4C10.3 4 6.3 8.1 6.3 13C6.3 17.9 10.3 22 15.3 22C11.7 20.4 9.3 16.9 9.3 13C9.3 9.1 11.7 5.6 15.3 4Z" fill="%23D4AF37"/><path d="M18.7 2.7C19 4.6 19.5 5.3 21.2 5.6 19.5 5.9 19 6.6 18.7 8.5 18.4 6.6 17.9 5.9 16.2 5.6 17.9 5.3 18.4 4.6 18.7 2.7Z" fill="%23D4AF37" opacity=".85"/></svg>`,
  herbarium: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.5L12 13.5" stroke="%235E9A50" stroke-width="1.6" stroke-linecap="round"/><path d="M12 13.5C16.6 10.4 17.6 5.6 12 2.5 6.4 5.6 7.4 10.4 12 13.5Z" fill="%237EC66F"/></svg>`,
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
