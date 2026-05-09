import React, { useState } from "react";
import { peopleAlsoAsk } from "@/data/portfolio";
import { ChevronDown } from "lucide-react";
import { Squiggle, Sparkle, Marker, HandArrow } from "@/components/Decorations";

export default function PeopleAlsoAsk() {
  const [open, setOpen] = useState(0);
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12" data-testid="paa-page">
      <div className="text-[11px] uppercase tracking-[0.3em] text-plum">/ people also ask</div>
      <h1 className="font-serif text-6xl sm:text-7xl text-ink leading-[0.95] mt-2">
        the <span className="italic">human</span> questions.
      </h1>
      <Squiggle width={220} className="mt-3" />
      <p className="mt-4 font-serif italic text-xl text-ink-soft max-w-2xl">
        most search engines ask "what". this one tries to ask "why".
      </p>

      <ul className="mt-10 border-y border-[var(--border-soft)] divide-y divide-[var(--border-soft)]">
        {peopleAlsoAsk.map((q, i) => {
          const isOpen = open === i;
          return (
            <li key={q.q} data-testid={`paa-item-${i}`}>
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full flex items-start gap-4 py-5 text-left group"
                aria-expanded={isOpen}
              >
                <Marker n={i + 1} className="mt-1 shrink-0" />
                <span className="flex-1 font-serif text-2xl text-ink leading-snug group-hover:text-plum transition-colors">
                  {q.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-plum mt-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <div className="pl-12 pb-6 pr-2 max-w-2xl">
                    <p className="text-[15px] leading-relaxed text-ink-soft">{q.a}</p>
                    <div className="mt-3 font-hand text-plum text-xl">— {q.note}</div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-12 max-w-xl">
        <HandArrow className="rotate-[-25deg]" />
        <p className="font-hand text-plum text-2xl">
          — these answers change a little every year. read them again later.
        </p>
      </div>
    </div>
  );
}
