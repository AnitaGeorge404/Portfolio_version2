import React from "react";

export default function ResultCard({ url, title, snippet, meta, children, footer, testid }) {
  return (
    <article
      className="group max-w-2xl"
      data-testid={testid}
    >
      {meta && (
        <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-plum mb-1">
          {meta}
        </div>
      )}
      {url && (
        <div className="flex items-center gap-2 text-xs text-sage font-mono-soft">
          <span className="w-4 h-4 rounded-full bg-tag border border-[var(--border-soft)] inline-block" />
          <span className="truncate">{url}</span>
        </div>
      )}
      {title && (
        <h3 className="mt-1 text-xl sm:text-2xl font-sans font-medium text-ink hover:underline underline-offset-4 decoration-plum/40 cursor-default">
          {title}
        </h3>
      )}
      {snippet && (
        <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft font-sans">
          {snippet}
        </p>
      )}
      {children}
      {footer && <div className="mt-2 text-[12px] text-plum font-sans">{footer}</div>}
    </article>
  );
}
