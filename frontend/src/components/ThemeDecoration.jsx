import React, { useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";

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

  // Archive theme - tape and stamps
  if (currentTheme === "archive") {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden" data-testid="theme-decoration-archive">
        {/* Decorative tape accents in corners */}
        {[...Array(2)].map((_, i) => (
          <div
            key={`tape-${i}`}
            className="absolute w-20 h-8 bg-gradient-to-r from-yellow-200 to-yellow-100"
            style={{
              top: `${10 + i * 80}%`,
              right: `${5 + i * 15}%`,
              transform: `rotate(${-15 + i * 25}deg)`,
              opacity: decorationIntensity * 0.3,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
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

  // Midnight theme - stars and particles
  if (currentTheme === "midnight") {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden" data-testid="theme-decoration-midnight">
        {/* Background starfield */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 rounded-full animate-star"
            style={{
              backgroundColor: `rgba(121, 192, 255, ${0.3 + Math.random() * 0.7})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
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
              backgroundColor: `rgba(139, 111, 248, ${0.2 + Math.random() * 0.3})`,
              left: `${Math.random() * 100}%`,
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
              left: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 20}px`,
              height: `${20 + Math.random() * 20}px`,
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
