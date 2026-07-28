import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { PressedFlower } from "@/components/BotanicalElements";

const TAPE_VARIANTS = ["tape-pink", "tape-yellow", "tape-mint"];

// A tiny, stable hash from the card's own identity — so a given card always
// gets the same tilt/tape/decoration instead of re-rolling (and visibly
// flickering) on every re-render, while different cards still look distinct
// from each other rather than uniform.
function seedFrom(key) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export default function ResultCard({ url, title, snippet, meta, children, footer, testid }) {
  const seed = useMemo(() => seedFrom(testid || title || "card"), [testid, title]);
  const tilt = ((seed % 7) - 3) * 0.4; // -1.2deg..1.2deg, stable per card
  const tape = TAPE_VARIANTS[seed % TAPE_VARIANTS.length];
  const showFlower = seed % 2 === 0;

  return (
    <motion.article
      className="group max-w-2xl relative page-texture torn-top rounded-b-sm"
      data-testid={testid}
      style={{
        rotate: tilt,
        boxShadow: "0 14px 30px -22px rgba(107, 30, 53, 0.35)",
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ rotate: 0, y: -3 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* A pinned strip of washi tape — every card gets one, color varies by card */}
      <span
        className={`tape ${tape} absolute -top-2.5 left-8 pointer-events-none`}
        style={{ width: 64, height: 18, transform: `rotate(${tilt > 0 ? -8 : 8}deg)`, zIndex: 3 }}
        aria-hidden
      />

      {/* Subtle decorative pressed flower */}
      {showFlower && (
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

      {/* A handwritten note, hidden until hover — like pulling a pinned
          note out from behind the card to read it. group-hover (not
          framer's whileHover, which only fires on the note itself) is what
          actually reacts to hovering the card. */}
      <div className="absolute -right-3 -top-6 font-hand text-[var(--plum)] text-sm italic pointer-events-none opacity-0 translate-y-1 rotate-6 group-hover:opacity-90 group-hover:-translate-y-1.5 group-hover:rotate-3 transition-all duration-300 ease-out">
        ✓ read this
      </div>
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
