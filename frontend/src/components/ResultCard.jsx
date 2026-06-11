import React from "react";
import { motion } from "framer-motion";
import { PressedFlower, BotanicalSketch } from "@/components/BotanicalElements";

export default function ResultCard({ url, title, snippet, meta, children, footer, testid }) {
  return (
    <motion.article
      className="group max-w-2xl relative page-texture"
      data-testid={testid}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Subtle decorative pressed flower */}
      {Math.random() > 0.5 && (
        <motion.div
          className="absolute -left-12 top-4 opacity-30"
          initial={{ opacity: 0, rotate: -20 }}
          whileInView={{ opacity: 0.4, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <PressedFlower />
        </motion.div>
      )}

      {/* Handwritten annotation occasionally */}
      {Math.random() > 0.7 && (
        <motion.div
          className="absolute -right-8 -top-6 font-hand text-[var(--plum)] text-sm opacity-40 italic"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 0.4, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          ✓ read this
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
