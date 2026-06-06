import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, MessageSquareText, ArrowUpRight } from "lucide-react";

/**
 * Inline, contextual "People also ask" block.
 *
 * NOT a page — it lives between search results, exactly like Google Search.
 * Pass either `items` (an array of {q, a, related[]}) or it renders nothing.
 *
 * Variants:
 *   - "default"  → full editorial block with section heading
 *   - "compact"  → no big heading, smaller spacing (for use inside answer pages)
 */
export default function PeopleAlsoAskInline({
  items = [],
  query,
  variant = "default",
  className = "",
}) {
  const [open, setOpen] = useState(0);

  if (!items || items.length === 0) return null;

  const compact = variant === "compact";

  return (
    <section
      className={`relative ${compact ? "" : "my-4"} ${className}`}
      data-testid="paa-inline"
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <MessageSquareText
            size={compact ? 13 : 15}
            className="text-[var(--plum)] shrink-0"
          />
          <h3
            className={`font-serif text-ink ${
              compact ? "text-xl" : "text-2xl sm:text-3xl"
            } leading-tight`}
          >
            People also ask
          </h3>
        </div>
        {query && !compact && (
          <span className="font-hand text-[var(--rose)] text-lg rotate-[-1.5deg] hidden sm:inline">
            — semantic expansion of &ldquo;{query}&rdquo;
          </span>
        )}
      </div>

      <ul className="mt-4 border-y border-[var(--border-soft)] divide-y divide-[var(--border-soft)]">
        {items.map((q, i) => {
          const isOpen = open === i;
          return (
            <li key={`${q.q}-${i}`} data-testid={`paa-inline-item-${i}`}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="w-full flex items-start gap-4 py-4 text-left group hover:bg-[var(--bg-petal)]/50 transition-colors px-1"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--plum)] mt-1 shrink-0 w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-serif text-lg sm:text-xl text-ink leading-snug group-hover:text-[var(--plum)] transition-colors">
                  {q.q}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-[var(--rose)] mt-1.5 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pl-12 pr-2 pb-5 max-w-2xl">
                    <p className="text-[15px] leading-relaxed text-ink-soft">
                      {q.a}
                    </p>
                    {q.related && q.related.length > 0 && (
                      <div className="mt-3">
                        <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--plum)]">
                          related archives
                        </div>
                        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1.5">
                          {q.related.map((r) => (
                            <Link
                              key={r}
                              to={r}
                              className="inline-flex items-center gap-1 text-sm text-[var(--link)] link-soft"
                            >
                              → {r} <ArrowUpRight size={11} />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {!compact && (
      <div className="mt-3 font-hand text-[var(--rose)] text-base">
        — these change with the search query.
      </div>
      )}
    </section>
  );
}
