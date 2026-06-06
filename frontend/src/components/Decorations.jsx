import React, { useMemo } from "react";

// Four-pointed star / sparkle
export const Sparkle = ({ className = "", size = 14, color = "#C96B84", style }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    style={style}
    fill="none"
    aria-hidden
  >
    <path
      d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
      fill={color}
      opacity="0.75"
    />
  </svg>
);

// Squiggly underline divider
export const Squiggle = ({ className = "", color = "#EDAABB", width = 220 }) => (
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
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

// Hand-drawn arrow
export const HandArrow = ({ className = "", color = "#C96B84" }) => (
  <svg viewBox="0 0 80 60" width="80" height="60" className={className} fill="none" aria-hidden>
    <path
      d="M5 30 C 25 5, 50 5, 70 30"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="3 4"
    />
    <path
      d="M62 22 L70 30 L62 38"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Botanical sprig
export const Sprig = ({ className = "", color = "#A0A882", size = 60, style }) => (
  <svg
    viewBox="0 0 80 100"
    width={size}
    height={(size * 100) / 80}
    className={className}
    style={style}
    fill="none"
    aria-hidden
  >
    <path d="M40 95 C 40 70, 40 40, 40 8" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <ellipse cx="32" cy="78" rx="9" ry="3.5" fill={color} opacity="0.6" transform="rotate(-25 32 78)" />
    <ellipse cx="48" cy="68" rx="9" ry="3.5" fill={color} opacity="0.6" transform="rotate(25 48 68)" />
    <ellipse cx="30" cy="58" rx="9" ry="3.5" fill={color} opacity="0.6" transform="rotate(-25 30 58)" />
    <ellipse cx="50" cy="48" rx="9" ry="3.5" fill={color} opacity="0.6" transform="rotate(25 50 48)" />
    <ellipse cx="32" cy="38" rx="8" ry="3" fill={color} opacity="0.6" transform="rotate(-25 32 38)" />
    <ellipse cx="48" cy="28" rx="8" ry="3" fill={color} opacity="0.6" transform="rotate(25 48 28)" />
    <circle cx="40" cy="10" r="3.5" fill={color} opacity="0.75" />
  </svg>
);

// Cherry blossom flower
export const CherryBlossom = ({ className = "", size = 80, style }) => {
  const petals = [0, 72, 144, 216, 288];
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden
    >
      <g>
        {petals.map((angle) => (
          <ellipse
            key={angle}
            cx="60"
            cy="34"
            rx="10"
            ry="22"
            fill="#F2C4CE"
            opacity="0.85"
            transform={`rotate(${angle}, 60, 60)`}
          />
        ))}
        {petals.map((angle) => (
          <ellipse
            key={`inner-${angle}`}
            cx="60"
            cy="38"
            rx="7"
            ry="17"
            fill="#EDAABB"
            opacity="0.6"
            transform={`rotate(${angle}, 60, 60)`}
          />
        ))}
        <circle cx="60" cy="60" r="9" fill="#8B3A52" opacity="0.55" />
        <circle cx="60" cy="60" r="5" fill="#C96B84" opacity="0.7" />
        {/* Stamens */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
          const rad = (a * Math.PI) / 180;
          const x2 = 60 + Math.cos(rad) * 12;
          const y2 = 60 + Math.sin(rad) * 12;
          return (
            <line
              key={a}
              x1="60"
              y1="60"
              x2={x2}
              y2={y2}
              stroke="#C96B84"
              strokeWidth="0.8"
              opacity="0.5"
            />
          );
        })}
        {/* Stamen tips */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
          const rad = (a * Math.PI) / 180;
          const cx = 60 + Math.cos(rad) * 13;
          const cy = 60 + Math.sin(rad) * 13;
          return <circle key={`tip-${a}`} cx={cx} cy={cy} r="1.5" fill="#8B3A52" opacity="0.55" />;
        })}
      </g>
    </svg>
  );
};

// Single falling petal
function Petal({ delay, duration, left, size, rotate, type }) {
  const colors = ["#F2C4CE", "#EDAABB", "#FBE5EC", "#F2C4CE", "#EDAABB", "#D9939F"];
  const color = colors[type % colors.length];
  const petalStyle = {
    position: "fixed",
    left: `${left}%`,
    top: "-5vh",
    width: size,
    height: size * 0.65,
    animationName: type % 2 === 0 ? "petal-fall" : "petal-fall-2",
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationFillMode: "both",
    pointerEvents: "none",
    zIndex: 1,
    opacity: 0,
  };
  return (
    <div style={petalStyle} aria-hidden>
      <svg viewBox="0 0 40 28" width={size} height={size * 0.65} fill="none">
        <ellipse
          cx="20"
          cy="14"
          rx="18"
          ry="12"
          fill={color}
          opacity="0.75"
          transform={`rotate(${rotate}, 20, 14)`}
        />
        <ellipse
          cx="20"
          cy="14"
          rx="12"
          ry="7"
          fill={color}
          opacity="0.45"
          transform={`rotate(${rotate + 15}, 20, 14)`}
        />
        <line
          x1="20"
          y1="4"
          x2="20"
          y2="24"
          stroke="#C96B84"
          strokeWidth="0.6"
          opacity="0.4"
          transform={`rotate(${rotate}, 20, 14)`}
        />
      </svg>
    </div>
  );
}

// Rain of petals — ambient background
export const PetalRain = () => {
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        delay: (i * 1.3) % 8,
        duration: 7 + (i * 0.9) % 6,
        left: (i * 7.3) % 95,
        size: 12 + (i * 3) % 16,
        rotate: (i * 37) % 180,
        type: i,
      })),
    []
  );

  return (
    <>
      {petals.map((p) => (
        <Petal key={p.id} {...p} />
      ))}
    </>
  );
};

// Pressed rose / botanical flower
export const Rose = ({ className = "", color = "#F2C4CE", size = 70, style }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    className={className}
    style={style}
    aria-hidden
  >
    <g opacity="0.85">
      <circle cx="50" cy="50" r="20" fill={color} opacity="0.65" />
      <circle cx="43" cy="45" r="14" fill="#EDAABB" opacity="0.7" />
      <circle cx="57" cy="47" r="12" fill="#F2C4CE" opacity="0.9" />
      <circle cx="50" cy="55" r="10" fill="#8B3A52" opacity="0.40" />
      <ellipse cx="36" cy="65" rx="8" ry="3" fill="#A0A882" opacity="0.55" transform="rotate(-30 36 65)" />
      <ellipse cx="65" cy="68" rx="8" ry="3" fill="#A0A882" opacity="0.55" transform="rotate(30 65 68)" />
      {/* Petals */}
      <ellipse cx="50" cy="32" rx="7" ry="12" fill={color} opacity="0.55" />
      <ellipse cx="68" cy="42" rx="7" ry="12" fill={color} opacity="0.50" transform="rotate(72, 68, 42)" />
      <ellipse cx="62" cy="64" rx="7" ry="12" fill={color} opacity="0.50" transform="rotate(144, 62, 64)" />
      <ellipse cx="38" cy="64" rx="7" ry="12" fill={color} opacity="0.50" transform="rotate(216, 38, 64)" />
      <ellipse cx="32" cy="42" rx="7" ry="12" fill={color} opacity="0.50" transform="rotate(288, 32, 42)" />
    </g>
  </svg>
);

// Washi tape strip
export const Tape = ({ className = "", rotate = -8, w = 80, h = 22, variant = "pink" }) => {
  const variantClass = variant === "yellow" ? "tape-yellow" : variant === "mint" ? "tape-mint" : "tape-pink";
  return (
    <span
      className={`tape ${variantClass} ${className}`}
      style={{
        width: w,
        height: h,
        transform: `rotate(${rotate}deg)`,
      }}
      aria-hidden
    />
  );
};

// Paperclip
export const Paperclip = ({ className = "", color = "#C96B84", size = 26 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" aria-hidden>
    <path
      d="M9 4 L9 16 a3 3 0 0 0 6 0 L15 6 a4 4 0 0 0 -8 0 L7 17 a5 5 0 0 0 10 0 L17 6"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Asterisk (hand-drawn)
export const HandAsterisk = ({ className = "", color = "#C96B84", size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" aria-hidden>
    <path d="M12 4 L12 20 M5 7 L19 17 M19 7 L5 17" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

// Numbered marker
export const Marker = ({ n, className = "" }) => (
  <span
    className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-mono text-[10px] tracking-wider text-ink bg-[var(--bg-petal)] border border-[var(--border-soft)] ${className}`}
  >
    {String(n).padStart(2, "0")}
  </span>
);

// Floating background flora
export const FloatingFlora = () => (
  <>
    <CherryBlossom className="absolute -top-6 -left-6 opacity-70 hidden md:block animate-float-slow" size={120} />
    <Sprig className="absolute top-24 right-6 opacity-60 hidden md:block animate-drift" size={90} />
    <Sparkle className="absolute top-40 left-1/3 opacity-70 animate-float-slow delay-300" size={18} color="#C96B84" />
  </>
);

export default {
  Sparkle,
  Squiggle,
  HandArrow,
  Sprig,
  CherryBlossom,
  Rose,
  Tape,
  Paperclip,
  HandAsterisk,
  Marker,
  FloatingFlora,
  PetalRain,
};
