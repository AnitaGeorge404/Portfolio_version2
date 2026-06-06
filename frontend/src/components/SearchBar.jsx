import React, { useEffect, useRef, useState } from "react";
import { Search, Sparkles, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { searchSuggestions } from "@/data/portfolio";

const quickSearches = [
  { label: "Who is Anita?", icon: "✦" },
  { label: "Show me her projects", icon: "✦" },
  { label: "What is VantaAI?", icon: "✦" },
  { label: "What hackathons has she won?", icon: "✦" },
  { label: "What technologies does she use?", icon: "✦" },
  { label: "Anita George Resume", icon: "✦" },
];

export default function SearchBar({ defaultValue = "", autoFocus = false, compact = false }) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const wrapRef = useRef(null);
  const navigate = useNavigate();

  // Typewriter for placeholder
  useEffect(() => {
    if (compact) return;
    let i = 0;
    let charIdx = 0;
    let dir = 1;
    let cancelled = false;
    const phrases = [
      "Search Anita's universe...",
      "What would you like to know about Anita?",
      "Try: Who is Anita George?",
      "Try: Show me her projects",
      "Try: What is VantaAI?",
    ];
    const tick = () => {
      if (cancelled) return;
      const word = phrases[i];
      if (dir === 1) {
        charIdx += 1;
        setTyped(word.slice(0, charIdx));
        if (charIdx >= word.length) {
          dir = -1;
          setTimeout(tick, 2200);
          return;
        }
      } else {
        charIdx -= 1;
        setTyped(word.slice(0, charIdx));
        if (charIdx <= 0) {
          dir = 1;
          i = (i + 1) % phrases.length;
        }
      }
      setTimeout(tick, dir === 1 ? 60 : 28);
    };
    const t = setTimeout(tick, 1000);
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

  const submit = (e, overrideQuery) => {
    e?.preventDefault?.();
    const q = (overrideQuery || value || "").toLowerCase().trim();
    setOpen(false);
    if (
      q.includes("work") || q.includes("project") || q.includes("vanta") ||
      q.includes("studybee") || q.includes("faimer") || q.includes("lawgorithm") ||
      q.includes("delai") || q.includes("neurobridge")
    ) navigate("/work");
    else if (q.includes("contact") || q.includes("email") || q.includes("hello")) navigate("/contact");
    else if (q.includes("research") || q.includes("paper")) navigate("/research");
    else if (q.includes("image") || q.includes("photo") || q.includes("gallery")) navigate("/images");
    else navigate("/ai-mode");
  };

  return (
    <div
      ref={wrapRef}
      className={`relative w-full ${compact ? "max-w-2xl" : "max-w-2xl"} mx-auto`}
      data-testid="search-bar-wrap"
    >
      <form onSubmit={submit}>
        <div
          className={`search-glow flex items-center gap-3 bg-white/90 border border-[var(--border-soft)] ${
            compact ? "py-2.5 px-4" : "py-4 px-6"
          } rounded-full shadow-[0_4px_40px_-10px_rgba(139,58,82,0.18)]`}
        >
          {compact ? (
            <Search size={15} className="text-rose shrink-0" />
          ) : (
            /* Google-style colored G dots */
            <span className="shrink-0 flex gap-[2px] items-center" aria-hidden>
              <span className="w-2 h-2 rounded-full" style={{ background: "#C96B84" }} />
              <span className="w-2 h-2 rounded-full" style={{ background: "#EDAABB" }} />
              <span className="w-2 h-2 rounded-full" style={{ background: "#8B3A52" }} />
              <span className="w-2 h-2 rounded-full" style={{ background: "#F2C4CE" }} />
            </span>
          )}
          <input
            data-testid="search-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setOpen(true)}
            autoFocus={autoFocus}
            placeholder={
              compact ? "search anita's universe" : (typed ? typed : "Search Anita's universe...")
            }
            className={`flex-1 bg-transparent outline-none placeholder:text-[var(--dusty)]/70 text-ink font-sans ${
              compact ? "text-sm" : "text-lg"
            }`}
          />
          {!compact && (
            <Mic size={18} className="text-[var(--dusty)] shrink-0 opacity-80 cursor-pointer hover:text-rose transition-colors" />
          )}
          <button
            type="submit"
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all hover:bg-[var(--bg-petal)]"
            aria-label="Search"
          >
            <Search size={compact ? 14 : 17} className="text-rose" />
          </button>
        </div>
      </form>

      {/* Suggestions dropdown */}
      {open && !compact && (
        <div
          className="absolute left-0 right-0 mt-3 bg-white/95 border border-[var(--border-soft)] rounded-3xl shadow-[0_24px_60px_-20px_rgba(139,58,82,0.22)] overflow-hidden animate-fade-up z-30 backdrop-blur-sm"
          data-testid="search-suggestions"
        >
          {/* Quick searches */}
          <div className="px-5 pt-4 pb-2">
            <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--plum)] mb-3 flex items-center gap-2">
              <Sparkles size={11} className="text-rose" />
              <span>search suggestions</span>
            </div>
            <ul className="space-y-0.5">
              {quickSearches.map((s) => (
                <li key={s.label}>
                  <button
                    type="button"
                    data-testid={`suggestion-${s.label.replace(/\s+/g, "-").toLowerCase()}`}
                    onClick={() => {
                      setValue(s.label);
                      setOpen(false);
                      submit(null, s.label);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left hover:bg-[var(--bg-petal)] transition-all group"
                  >
                    <Search size={14} className="text-[var(--blossom)] group-hover:text-rose transition-colors shrink-0" />
                    <span className="font-sans text-ink text-[14px] group-hover:text-[var(--plum)] transition-colors">{s.label}</span>
                    <span className="ml-auto font-hand text-[var(--blossom)] text-base group-hover:text-rose transition-colors">↗</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="mx-5 border-t border-[var(--border-soft)] my-1" />

          {/* Related interests */}
          <div className="px-5 pb-4 pt-2">
            <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--plum)] mb-3">related interests</div>
            <div className="flex flex-wrap gap-2">
              {searchSuggestions.slice(0, 8).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setValue(s);
                    setOpen(false);
                    setTimeout(() => submit(null, s), 60);
                  }}
                  className="px-3 py-1.5 text-[12px] font-sans text-[var(--plum)] bg-[var(--bg-petal)] border border-[var(--border-soft)] rounded-full hover:bg-pink/30 hover:border-[var(--blossom)] transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
