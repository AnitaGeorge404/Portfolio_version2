import React from "react";
import { motion } from "framer-motion";

// Botanical SVG Illustrations - hand-drawn inspired
export function Rose({ className = "", style = {} }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={`w-12 h-12 ${className}`}
      style={style}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.8 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <g fill="#C96B84" opacity="0.8">
        <path d="M50 10 Q65 25 65 40 Q65 60 50 70 Q35 60 35 40 Q35 25 50 10 M50 15 Q60 28 60 40 Q60 55 50 65 Q40 55 40 40 Q40 28 50 15" />
        <ellipse cx="50" cy="50" rx="8" ry="10" fill="#E8B8C2" />
      </g>
      <path d="M50 75 L50 95 M45 85 L55 85" stroke="#A0A882" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </motion.svg>
  );
}

export function Peony({ className = "", style = {} }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={`w-14 h-14 ${className}`}
      style={style}
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <g fill="#F2C4CE" opacity="0.75">
        <circle cx="50" cy="35" r="18" />
        <circle cx="35" cy="50" r="16" />
        <circle cx="65" cy="50" r="16" />
        <circle cx="45" cy="65" r="14" />
        <circle cx="55" cy="65" r="14" />
        <circle cx="50" cy="50" r="12" fill="#EDAABB" />
      </g>
      <path d="M50 80 L50 95 M48 90 L52 90" stroke="#A0A882" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </motion.svg>
  );
}

export function PressedFlower({ className = "", style = {}, delay = 0 }) {
  return (
    <motion.svg
      viewBox="0 0 60 80"
      className={`w-8 h-10 ${className}`}
      style={style}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 0.6 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <g fill="#C96B84" opacity="0.4">
        <ellipse cx="30" cy="25" rx="12" ry="14" />
        <ellipse cx="18" cy="35" rx="8" ry="10" />
        <ellipse cx="42" cy="35" rx="8" ry="10" />
        <ellipse cx="24" cy="50" rx="6" ry="8" />
        <ellipse cx="36" cy="50" rx="6" ry="8" />
      </g>
      <line x1="30" y1="55" x2="30" y2="75" stroke="#A0A882" strokeWidth="1" opacity="0.3" />
    </motion.svg>
  );
}

export function BotanicalSketch({ className = "", style = {} }) {
  return (
    <motion.svg
      viewBox="0 0 80 100"
      className={`w-10 h-12 ${className}`}
      style={style}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 0.7 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <path
        d="M40 10 Q30 30 35 50 Q20 60 10 70 M40 10 Q50 30 45 50 Q60 60 70 70 M40 50 Q35 70 40 90 Q45 70 50 50"
        stroke="#8B3A52"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
        strokeLinecap="round"
      />
      <circle cx="40" cy="50" r="3" fill="#C96B84" opacity="0.5" />
    </motion.svg>
  );
}

// Floating creatures
export function FloatingPetal({ delay = 0, duration = 8 }) {
  return (
    <motion.div
      className="fixed pointer-events-none"
      initial={{ opacity: 0, x: Math.random() * 100 - 50, y: -20 }}
      animate={{
        opacity: [0, 0.6, 0.3, 0],
        y: window.innerHeight + 20,
        x: Math.sin(Math.random() * Math.PI) * 150,
        rotate: Math.random() * 720,
      }}
      transition={{
        duration,
        delay,
        ease: "easeIn",
      }}
      style={{ zIndex: 0 }}
    >
      <div className="w-3 h-3 bg-[var(--pink)] rounded-full opacity-40" style={{ transform: "skewY(-10deg)" }} />
    </motion.div>
  );
}

export function Butterfly({ delay = 0, duration = 12 }) {
  return (
    <motion.div
      className="fixed pointer-events-none text-[var(--plum)]"
      initial={{ opacity: 0, x: Math.random() * 100, y: Math.random() * 200 }}
      animate={{
        y: [null, Math.random() * window.innerHeight],
        x: [null, Math.random() * window.innerWidth],
        opacity: [0, 0.4, 0.3, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        delay,
        ease: "linear",
        times: [0, 0.5, 0.8, 1],
      }}
      style={{ zIndex: 0 }}
    >
      <svg viewBox="0 0 40 30" className="w-5 h-4" fill="#C96B84" opacity="0.5">
        <ellipse cx="15" cy="15" rx="6" ry="8" />
        <ellipse cx="25" cy="15" rx="6" ry="8" />
        <circle cx="20" cy="15" r="2" fill="#2C1A1D" />
      </svg>
    </motion.div>
  );
}

// Scrapbook detail elements
export function HandwrittenNote({ text, className = "", style = {} }) {
  return (
    <motion.div
      className={`font-hand italic text-[var(--plum)] ${className}`}
      style={style}
      initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
      whileHover={{ scale: 1.05, rotate: 2 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {text}
    </motion.div>
  );
}

export function ScrapbookStamp({ className = "", style = {} }) {
  return (
    <motion.div
      className={`border-2 border-[var(--plum)] rounded-full px-3 py-1 text-xs font-mono text-[var(--plum)] ${className}`}
      style={style}
      whileHover={{ rotate: 3, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      ✓ COLLECTED
    </motion.div>
  );
}

export function TapeMark({ variant = "pink", style = {} }) {
  const tapeBg = {
    pink: "from-[var(--pink)]/70 to-[var(--blossom)]/60",
    yellow: "from-yellow-200/60 to-yellow-100/50",
    mint: "from-green-200/50 to-green-100/40",
  };

  return (
    <motion.div
      className={`absolute w-10 h-6 bg-gradient-to-b ${tapeBg[variant]} shadow-sm`}
      style={{
        ...style,
        borderRadius: "2px",
        border: "1px solid rgba(255,255,255,0.3)",
      }}
      whileHover={{ rotate: 2, scaleY: 0.95 }}
      transition={{ duration: 0.3 }}
    />
  );
}

export function CoffeeStain({ size = "w-16 h-16", className = "" }) {
  return (
    <motion.div
      className={`fixed pointer-events-none ${size} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.08 }}
      transition={{ duration: 2 }}
      style={{
        background: "radial-gradient(circle, rgba(139,58,82,0.4) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(8px)",
      }}
    />
  );
}

// Animation presets
export const floatingAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
