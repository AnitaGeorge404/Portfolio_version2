import React, { useEffect, useRef, useState } from "react";
import { Search, Sparkles, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { searchSuggestions } from "@/data/portfolio";

export default function SearchBar({ defaultValue = "anita george", autoFocus = false, compact = false }) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const wrapRef = useRef(null);
  const navigate = useNavigate();

  // Typewriter for placeholder cycle
  useEffect(() => {
    if (compact) return;
    let i = 0;
    let charIdx = 0;
    let dir = 1;
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      const word = searchSuggestions[i];
      if (dir === 1) {
        charIdx += 1;
        setTyped(word.slice(0, charIdx));
        if (charIdx >= word.length) {
          dir = -1;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        charIdx -= 1;
        setTyped(word.slice(0, charIdx));
        if (charIdx <= 0) {
          dir = 1;
          i = (i + 1) % searchSuggestions.length;
        }
      }
      setTimeout(tick, dir === 1 ? 70 : 35);
    };
    const t = setTimeout(tick, 1200);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [compact]);

  // Click outside
  useEffect(() => {
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const submit = (e) => {
    e?.preventDefault?.();
    const q = (value || "").toLowerCase().trim();
    if (q.includes("work") || q.includes("project") || q.includes("vanta") || q.includes("studybee") || q.includes("faimer") || q.includes("lawgorithm") || q.includes("delai")) navigate("/work");
    else if (q.includes("ai")) navigate("/ai-mode");
    else if (q.includes("contact") || q.includes("email")) navigate("/contact");
    else if (q.includes("research") || q.includes("paper")) navigate("/research");
    else if (q.includes("image") || q.includes("photo")) navigate("/images");
    else if (q.includes("ask") || q.includes("why") || q.includes("what")) navigate("/ai-mode");
    else navigate("/ai-mode");
  };

  return (
    <div ref={wrapRef} className={`relative w-full ${compact ? "max-w-2xl" : "max-w-3xl"} mx-auto`} data-testid="search-bar-wrap">
      <form onSubmit={submit}>
        <div
          className={`search-glow flex items-center gap-3 bg-white border border-[var(--border-soft)] ${
            compact ? "py-2.5 px-4" : "py-4 px-6"
          } rounded-full shadow-[0_2px_30px_-12px_rgba(138,121,134,0.25)]`}
        >
          <Search size={compact ? 16 : 20} className="text-plum shrink-0" />
          <input
            data-testid="search-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setOpen(true)}
            autoFocus={autoFocus}
            placeholder={typed ? typed + "…" : "search anita george"}
            className={`flex-1 bg-transparent outline-none placeholder:text-plum/70 text-ink font-sans ${
              compact ? "text-sm" : "text-lg"
            }`}
          />
          <Sparkles size={compact ? 14 : 18} className="text-sage shrink-0 opacity-80" />
          <Mic size={compact ? 14 : 18} className="text-plum shrink-0 opacity-70" />
        </div>
      </form>

      {open && !compact && (
        <div
          className="absolute left-0 right-0 mt-2 bg-white border border-[var(--border-soft)] rounded-2xl shadow-[0_30px_60px_-30px_rgba(45,42,38,0.25)] overflow-hidden animate-fade-up z-30"
          data-testid="search-suggestions"
        >
          <div className="px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-plum border-b border-[var(--border-soft)] flex items-center gap-2">
            <Sparkles size={12} /> related searches
          </div>
          <ul className="divide-y divide-[var(--border-soft)]">
            {searchSuggestions.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  data-testid={`suggestion-${s.replace(/\s+/g, "-")}`}
                  onClick={() => {
                    setValue(s);
                    setOpen(false);
                    setTimeout(submit, 60);
                  }}
                  className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-warm/60 transition group"
                >
                  <Search size={14} className="text-plum opacity-60 group-hover:opacity-100" />
                  <span className="font-sans text-ink text-[15px]">{s}</span>
                  <span className="ml-auto font-hand text-plum/70 text-base">↗</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
