import React from "react";

// Subtle four-pointed star / sparkle
export const Sparkle = ({ className = "", size = 14, color = "#8A7986" }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="none"
    aria-hidden
  >
    <path
      d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
      fill={color}
      opacity="0.7"
    />
  </svg>
);

// Squiggly underline divider
export const Squiggle = ({ className = "", color = "#D1BFAE", width = 220 }) => (
  <svg
    viewBox={`0 0 ${width} 14`}
    width={width}
    height={14}
    className={className}
    fill="none"
    aria-hidden
  >
    <path
      d={`M2 7 Q ${width / 8} 0, ${width / 4} 7 T ${width / 2} 7 T ${(width * 3) / 4} 7 T ${width - 2} 7`}
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

// Hand-drawn arrow
export const HandArrow = ({ className = "", color = "#8A7986" }) => (
  <svg viewBox="0 0 80 60" width="80" height="60" className={className} fill="none" aria-hidden>
    <path
      d="M5 30 C 25 5, 50 5, 70 30"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeDasharray="3 4"
    />
    <path
      d="M62 22 L70 30 L62 38"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Tiny botanical sprig
export const Sprig = ({ className = "", color = "#A3B19B", size = 60 }) => (
  <svg viewBox="0 0 80 100" width={size} height={(size * 100) / 80} className={className} fill="none" aria-hidden>
    <path d="M40 95 C 40 70, 40 40, 40 8" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <ellipse cx="32" cy="78" rx="9" ry="3.5" fill={color} opacity="0.55" transform="rotate(-25 32 78)" />
    <ellipse cx="48" cy="68" rx="9" ry="3.5" fill={color} opacity="0.55" transform="rotate(25 48 68)" />
    <ellipse cx="30" cy="58" rx="9" ry="3.5" fill={color} opacity="0.55" transform="rotate(-25 30 58)" />
    <ellipse cx="50" cy="48" rx="9" ry="3.5" fill={color} opacity="0.55" transform="rotate(25 50 48)" />
    <ellipse cx="32" cy="38" rx="8" ry="3" fill={color} opacity="0.55" transform="rotate(-25 32 38)" />
    <ellipse cx="48" cy="28" rx="8" ry="3" fill={color} opacity="0.55" transform="rotate(25 48 28)" />
    <circle cx="40" cy="10" r="3.5" fill={color} opacity="0.7" />
  </svg>
);

// Pressed flower / rose
export const Rose = ({ className = "", color = "#E0D4D6", size = 70 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden>
    <g opacity="0.8">
      <circle cx="50" cy="50" r="20" fill={color} opacity="0.6" />
      <circle cx="42" cy="44" r="14" fill="#D6CEDA" opacity="0.7" />
      <circle cx="58" cy="46" r="12" fill="#E0D4D6" opacity="0.85" />
      <circle cx="50" cy="55" r="10" fill="#8A7986" opacity="0.45" />
      <ellipse cx="35" cy="65" rx="8" ry="3" fill="#A3B19B" opacity="0.55" transform="rotate(-30 35 65)" />
      <ellipse cx="65" cy="68" rx="8" ry="3" fill="#A3B19B" opacity="0.55" transform="rotate(30 65 68)" />
    </g>
  </svg>
);

// Tape strip
export const Tape = ({ className = "", rotate = -8, w = 80, h = 22 }) => (
  <span
    className={`tape ${className}`}
    style={{
      width: w,
      height: h,
      transform: `rotate(${rotate}deg)`,
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%)",
      borderLeft: "1px dashed rgba(45,42,38,0.06)",
      borderRight: "1px dashed rgba(45,42,38,0.06)",
    }}
    aria-hidden
  />
);

// Paperclip
export const Paperclip = ({ className = "", color = "#8A7986", size = 26 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" aria-hidden>
    <path
      d="M9 4 L9 16 a3 3 0 0 0 6 0 L15 6 a4 4 0 0 0 -8 0 L7 17 a5 5 0 0 0 10 0 L17 6"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Asterisk (handdrawn)
export const HandAsterisk = ({ className = "", color = "#8A7986", size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" aria-hidden>
    <path d="M12 4 L12 20 M5 7 L19 17 M19 7 L5 17" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// Numbered marker — circular
export const Marker = ({ n, className = "" }) => (
  <span
    className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-mono text-[10px] tracking-wider text-ink bg-tag border border-[var(--border-soft)] ${className}`}
  >
    {String(n).padStart(2, "0")}
  </span>
);

// Floating background flora — to be placed at section level
export const FloatingFlora = () => (
  <>
    <Rose className="absolute -top-6 -left-6 opacity-70 hidden md:block animate-float-slow" size={120} />
    <Sprig
      className="absolute top-24 right-6 opacity-60 hidden md:block animate-drift"
      size={90}
    />
    <Sparkle className="absolute top-40 left-1/3 opacity-70 animate-float-slow delay-300" size={18} />
  </>
);

export default {
  Sparkle,
  Squiggle,
  HandArrow,
  Sprig,
  Rose,
  Tape,
  Paperclip,
  HandAsterisk,
  Marker,
  FloatingFlora,
};
