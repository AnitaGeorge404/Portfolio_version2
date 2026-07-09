import React, { useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Rose, Sprig, Sparkle } from "@/components/Decorations";

/**
 * ThemeDecoration Component
 * Renders different decorative elements based on the active theme
 * Creates distinct visual atmospheres for each theme environment
 */
export function ThemeDecoration() {
  const { currentTheme, theme } = useTheme();

  const decorationIntensity = useMemo(() => {
    return theme?.decorationIntensity || 0.8;
  }, [theme]);

  // Archive theme — botanical corner blooms, washi tape, drifting stars/dots
  if (currentTheme === "archive") {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden" data-testid="theme-decoration-archive">
        {/* Botanical corner blooms — mix-blend-multiply like a pressed flower on paper */}
        <Rose
          className="absolute -top-10 -left-10"
          size={220}
          style={{ opacity: decorationIntensity * 0.5, mixBlendMode: "multiply", transform: "rotate(-8deg)" }}
        />
        <Sprig
          className="absolute -bottom-8 -right-6"
          size={200}
          style={{ opacity: decorationIntensity * 0.45, mixBlendMode: "multiply", transform: "rotate(10deg)" }}
        />

        {/* Washi tape accents in corners */}
        {[...Array(2)].map((_, i) => (
          <div
            key={`tape-${i}`}
            className="tape tape-pink absolute w-20 h-8"
            style={{
              top: `${10 + i * 80}%`,
              right: `${5 + i * 15}%`,
              transform: `rotate(${-15 + i * 25}deg)`,
              opacity: decorationIntensity * 0.6,
            }}
          />
        ))}

        {/* Drifting stars / dots, per the approved artifact's ambient atmosphere */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`drift-${i}`}
            className="absolute animate-float-slow"
            style={{
              top: `${15 + i * 22}%`,
              left: i % 2 === 0 ? `${6 + i * 3}%` : "auto",
              right: i % 2 === 1 ? `${6 + i * 3}%` : "auto",
              animationDelay: `${i * 1.3}s`,
              opacity: decorationIntensity * 0.7,
            }}
          >
            {i % 2 === 0 ? (
              <Sparkle size={16} color="var(--decoration-primary)" />
            ) : (
              <span
                className="block rounded-full"
                style={{ width: 8, height: 8, background: "var(--decoration-secondary)" }}
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  // Search theme - minimal, clean lines
  if (currentTheme === "search") {
    return (
      <div className="fixed inset-0 pointer-events-none" data-testid="theme-decoration-search">
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(74, 113, 232, 0.02) 25%, rgba(74, 113, 232, 0.02) 26%, transparent 27%, transparent 74%, rgba(74, 113, 232, 0.02) 75%, rgba(74, 113, 232, 0.02) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(74, 113, 232, 0.02) 25%, rgba(74, 113, 232, 0.02) 26%, transparent 27%, transparent 74%, rgba(74, 113, 232, 0.02) 75%, rgba(74, 113, 232, 0.02) 76%, transparent 77%, transparent)
            `,
            backgroundSize: "40px 40px",
            opacity: decorationIntensity * 0.1,
            zIndex: 0,
          }}
        />
      </div>
    );
  }

  // Midnight theme — gold/silver constellation lines + starfield
  if (currentTheme === "midnight") {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden" data-testid="theme-decoration-midnight">
        {/* Constellation — thin connecting lines with gold/silver nodes */}
        <svg width="100%" height="280" className="absolute top-0 left-0" style={{ opacity: decorationIntensity * 0.5 }}>
          <line x1="10%" y1="20%" x2="22%" y2="40%" stroke="var(--border-soft)" strokeWidth="1" className="animate-constellation" />
          <line x1="22%" y1="40%" x2="36%" y2="24%" stroke="var(--border-soft)" strokeWidth="1" className="animate-constellation" />
          <line x1="36%" y1="24%" x2="48%" y2="50%" stroke="var(--border-soft)" strokeWidth="1" className="animate-constellation" />
          <circle cx="10%" cy="20%" r="3" fill="var(--decoration-primary)" />
          <circle cx="22%" cy="40%" r="3" fill="var(--decoration-secondary)" />
          <circle cx="36%" cy="24%" r="3" fill="var(--decoration-secondary)" />
          <circle cx="48%" cy="50%" r="3" fill="var(--decoration-primary)" />
        </svg>

        {/* Background starfield */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 rounded-full animate-star"
            style={{
              backgroundColor: i % 3 === 0 ? "var(--decoration-primary)" : "var(--decoration-secondary)",
              left: `${(i * 5.3) % 100}%`,
              top: `${(i * 8.7) % 100}%`,
              animationDelay: `${i * 0.1}s`,
              opacity: decorationIntensity * 0.8,
            }}
          />
        ))}

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full animate-particle"
            style={{
              backgroundColor: "var(--decoration-primary)",
              left: `${(i * 17) % 100}%`,
              top: "100%",
              animationDelay: `${i * 2}s`,
              opacity: decorationIntensity * 0.6,
            }}
          />
        ))}
      </div>
    );
  }

  // Herbarium theme - leaves and botanical elements
  if (currentTheme === "herbarium") {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden" data-testid="theme-decoration-herbarium">
        {/* Falling leaves */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`leaf-${i}`}
            className="absolute animate-leaf"
            style={{
              left: `${(i * 12.5) % 100}%`,
              width: `${20 + ((i * 7) % 20)}px`,
              height: `${20 + ((i * 7) % 20)}px`,
              animationDelay: `${i * 1.5}s`,
              opacity: decorationIntensity * 0.6,
            }}
          >
            <svg viewBox="0 0 40 40" fill="none">
              <path
                d="M20 5 Q35 15, 30 30 Q20 35, 10 30 Q5 15, 20 5"
                fill={`hsl(${105 + i * 5}, 35%, ${40 + i * 3}%)`}
                opacity="0.8"
              />
              <path
                d="M20 10 L20 28"
                stroke={`hsl(${105 + i * 5}, 25%, ${35 + i * 2}%)`}
                strokeWidth="1"
              />
            </svg>
          </div>
        ))}

        {/* Subtle botanical watercolor overlay */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "30%",
            background: `linear-gradient(180deg, rgba(109, 181, 99, 0) 0%, rgba(109, 181, 99, ${decorationIntensity * 0.05}) 100%)`,
            pointerEvents: "none",
          }}
        />
      </div>
    );
  }

  return null;
}

export default ThemeDecoration;
