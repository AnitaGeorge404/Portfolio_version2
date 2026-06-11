import React from "react";
import { motion } from "framer-motion";
import { OverlapFlower, ProminentRose, ProminentPeony, PressedFlowers, WashiTape } from "@/components/ProminentFlowers";

export default function ResultCard({ url, title, snippet, meta, children, footer, testid }) {
  const randomFlowerSide = Math.random() > 0.5 ? "top-right" : "top-left";
  const randomFlowerSize = Math.random() > 0.6 ? "medium" : "small";
  const showFlower = Math.random() > 0.4; // 60% of cards show prominent flowers
  const showTape = Math.random() > 0.7; // 30% show tape
  
  return (
    <motion.article
      className="group max-w-2xl relative page-texture"
      data-testid={testid}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* PROMINENT OVERLAPPING FLOWERS - Visible and beautiful */}
      {showFlower && (
        <OverlapFlower size={randomFlowerSize} position={randomFlowerSide} delay={0.2} />
      )}

      {/* Washi tape accent - occasionally visible */}
      {showTape && (
        <WashiTape
          className="absolute top-4 right-6 pointer-events-none"
          position="absolute"
          rotation={Math.random() > 0.5 ? 12 : -12}
          delay={0.3}
        />
      )}

      {/* Handwritten annotation */}
      {Math.random() > 0.6 && (
        <motion.div
          className="absolute -right-8 -top-6 font-hand text-[var(--plum)] text-sm opacity-60 italic font-bold"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          ✓ saved
        </motion.div>
      )}
      {meta && (
        <motion.div
          className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[var(--plum)] mb-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {meta}
        </motion.div>
      )}
      {url && (
        <motion.div
          className="flex items-center gap-2 text-xs text-[var(--sage)] font-mono"
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <span className="w-4 h-4 rounded-full bg-[var(--bg-petal)] border border-[var(--border-soft)] inline-block" />
          <span className="truncate">{url}</span>
        </motion.div>
      )}
      {title && (
        <motion.h3
          className="mt-1 text-xl sm:text-2xl font-sans font-medium text-[var(--link)] hover:underline underline-offset-4 decoration-[var(--blossom)]/60 cursor-default transition-colors group-hover:text-[var(--plum)]"
          whileHover={{ color: "var(--plum)" }}
        >
          {title}
        </motion.h3>
      )}
      {snippet && (
        <motion.p
          className="mt-1.5 text-[15px] leading-relaxed text-ink-soft font-sans"
          initial={{ opacity: 0.5 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {snippet}
        </motion.p>
      )}
      {children}
      {footer && (
        <motion.div
          className="mt-2 text-[12px] text-[var(--plum)] font-sans"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
        >
          {footer}
        </motion.div>
      )}
    </motion.article>
  );
}
