import React from "react";
import { motion } from "framer-motion";

// High-impact flower and scrapbook elements that are VISIBLE and PROMINENT

export function ProminentRose({ className = "", size = "large", position = "static", delay = 0 }) {
  const sizeMap = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32",
    xlarge: "w-40 h-40",
  };

  return (
    <motion.img
      src="/flowers/rose-bloom.png"
      alt="Decorative rose"
      className={`${sizeMap[size]} ${className} ${
        position === "absolute" ? "absolute" : "relative"
      } object-contain drop-shadow-lg`}
      initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      animate={position === "floating" ? { y: [0, -8, 0] } : {}}
      whileHover={{ scale: 1.08 }}
    />
  );
}

export function ProminentPeony({ className = "", size = "large", position = "static", delay = 0 }) {
  const sizeMap = {
    small: "w-20 h-20",
    medium: "w-28 h-28",
    large: "w-36 h-36",
    xlarge: "w-48 h-48",
  };

  return (
    <motion.img
      src="/flowers/peony-pink.png"
      alt="Decorative peony"
      className={`${sizeMap[size]} ${className} ${
        position === "absolute" ? "absolute" : "relative"
      } object-contain drop-shadow-lg`}
      initial={{ opacity: 0, scale: 0.8, rotate: 12 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      animate={position === "floating" ? { y: [0, 6, 0], x: [0, 2, 0] } : {}}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      whileHover={{ scale: 1.08 }}
    />
  );
}

export function PressedFlowers({ className = "", size = "medium", delay = 0 }) {
  const sizeMap = {
    small: "w-20 h-20",
    medium: "w-32 h-32",
    large: "w-44 h-44",
  };

  return (
    <motion.img
      src="/flowers/pressed-flower-set.png"
      alt="Pressed flowers"
      className={`${sizeMap[size]} ${className} object-contain opacity-90`}
      initial={{ opacity: 0, rotate: -8 }}
      whileInView={{ opacity: 0.9, rotate: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      whileHover={{ opacity: 1, scale: 1.05 }}
    />
  );
}

export function BotanicalSketch({ className = "", size = "medium", delay = 0 }) {
  const sizeMap = {
    small: "w-24 h-24",
    medium: "w-36 h-36",
    large: "w-48 h-48",
  };

  return (
    <motion.img
      src="/flowers/botanical-sketch.png"
      alt="Botanical illustration"
      className={`${sizeMap[size]} ${className} object-contain opacity-85`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 0.85, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    />
  );
}

export function WashiTape({ className = "", position = "absolute", rotation = 0, delay = 0 }) {
  return (
    <motion.img
      src="/scrapbook/washi-tape.png"
      alt="Washi tape"
      className={`${className} w-32 h-auto object-contain ${position}`}
      initial={{ opacity: 0, rotate: rotation - 15 }}
      whileInView={{ opacity: 1, rotate: rotation }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    />
  );
}

export function HandwrittenNote({ className = "", delay = 0 }) {
  return (
    <motion.img
      src="/scrapbook/handwritten-note.png"
      alt="Handwritten note"
      className={`${className} w-40 h-auto object-contain drop-shadow-md`}
      initial={{ opacity: 0, y: 20, rotate: -8 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      whileHover={{ rotate: 2 }}
    />
  );
}

export function Bookmark({ className = "", delay = 0 }) {
  return (
    <motion.img
      src="/scrapbook/bookmark.png"
      alt="Bookmark"
      className={`${className} w-10 h-32 object-contain`}
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// Flower that overlaps cards beautifully
export function OverlapFlower({ size = "large", position = "top-right", delay = 0 }) {
  const positions = {
    "top-left": "-top-8 -left-12",
    "top-right": "-top-8 -right-12",
    "bottom-left": "-bottom-12 -left-12",
    "bottom-right": "-bottom-12 -right-12",
  };

  return Math.random() > 0.5 ? (
    <ProminentRose
      className={`absolute ${positions[position]} pointer-events-none z-20`}
      size={size}
      delay={delay}
    />
  ) : (
    <ProminentPeony
      className={`absolute ${positions[position]} pointer-events-none z-20`}
      size={size}
      delay={delay}
    />
  );
}
