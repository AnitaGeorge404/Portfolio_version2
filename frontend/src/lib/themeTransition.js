import { themeTokens } from "@/config/themeTokens";

/**
 * A macOS-launch-style expanding circle, imperative and DOM-only (no React
 * state, no re-renders) so it stays smooth regardless of what the app is
 * doing. The circle grows from the clicked dock icon in the *incoming*
 * theme's background color; the actual theme swap happens partway through
 * the grow, hidden under the color wash, then the circle fades to reveal
 * the fully-settled new theme underneath.
 */

let current = null; // { overlay, timeoutId }

export function playThemeTransition(themeName, x, y, applyTheme) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    applyTheme();
    return;
  }

  if (current) {
    window.clearTimeout(current.timeoutId);
    current.overlay.remove();
    current = null;
  }

  const tokens = themeTokens[themeName];
  const bg = tokens ? `hsl(${tokens.background})` : "#ffffff";

  const overlay = document.createElement("div");
  overlay.setAttribute("aria-hidden", "true");
  Object.assign(overlay.style, {
    position: "fixed",
    left: `${x}px`,
    top: `${y}px`,
    width: "1px",
    height: "1px",
    marginLeft: "-0.5px",
    marginTop: "-0.5px",
    borderRadius: "50%",
    background: bg,
    zIndex: "10500",
    pointerEvents: "none",
    willChange: "transform, opacity",
  });
  document.body.appendChild(overlay);

  const diagonal = Math.hypot(window.innerWidth, window.innerHeight);
  const grow = overlay.animate(
    [
      { transform: "scale(1)" },
      { transform: `scale(${diagonal * 1.05})` },
    ],
    { duration: 480, easing: "cubic-bezier(0.4, 0, 0.2, 1)", fill: "forwards" }
  );

  const timeoutId = window.setTimeout(applyTheme, 210);
  current = { overlay, timeoutId };

  grow.onfinish = () => {
    const fade = overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 260,
      easing: "ease-out",
      fill: "forwards",
    });
    fade.onfinish = () => {
      overlay.remove();
      if (current && current.overlay === overlay) current = null;
    };
  };
}
