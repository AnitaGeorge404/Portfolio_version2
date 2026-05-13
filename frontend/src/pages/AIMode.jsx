import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Sparkles, Search, ArrowUpRight, ExternalLink, Bookmark, BookOpen, Quote } from "lucide-react";
import { Squiggle, Sparkle, Rose, Tape, Sprig, HandArrow, Marker } from "@/components/Decorations";
import PeopleAlsoAskInline from "@/components/PeopleAlsoAskInline";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const STARTER_QUESTIONS = [
  "What kind of engineer is Anita?",
  "What is NeuroBridge?",
  "Why does graph theory appear in her work?",
  "Is she more backend or frontend focused?",
  "What technologies does she use?",
  "Which projects focus on accessibility?",
  "Which projects are hackathon builds?",
];

const EGG_HINTS = ["best project", "favorite project", "github", "linkedin", "future"];

function IndexingBar({ stats }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.3em] text-plum">
      <span className="inline-flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
        indexed {stats?.chunks ?? 20} archive passages
      </span>
      <span className="text-brown">·</span>
      <span>{stats?.vocab ?? 532} tokens</span>
      <span className="text-brown">·</span>
      <span>grounded retrieval · no hallucinations</span>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1 items-end" aria-label="loading">
      <span className="w-1.5 h-1.5 bg-plum/70 rounded-full animate-pulse" />
      <span className="w-1.5 h-1.5 bg-plum/70 rounded-full animate-pulse" style={{ animationDelay: "0.18s" }} />
      <span className="w-1.5 h-1.5 bg-plum/70 rounded-full animate-pulse" style={{ animationDelay: "0.36s" }} />
    </span>
  );
}

export default function AIMode() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const answerRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${API}/ai/stats`)
      .then((r) => setStats(r.data))
      .catch(() => {});
  }, []);

  // Deep-link: /ai-mode?q=...
  useEffect(() => {
    const qParam = searchParams.get("q");
    if (qParam && qParam !== submitted) {
      setQuery(qParam);
      runSearch(qParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const runSearch = async (q) => {
    const cleaned = (q || "").trim();
    if (!cleaned) return;
    setSubmitted(cleaned);
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const r = await axios.get(`${API}/ai/search`, { params: { q: cleaned } });
      setResult(r.data);
      setHistory((h) => [{ q: cleaned, at: new Date() }, ...h].slice(0, 6));
      setTimeout(() => answerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (e) {
      setError("the archive is taking a breath — try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    runSearch(query);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-20" data-testid="ai-mode-page">
      {/* header */}
      <div className="relative">
        <Rose className="absolute -top-10 -left-10 opacity-70 hidden sm:block" size={100} />
        <Sparkle className="absolute top-2 right-1 opacity-70 animate-float-slow" size={20} />
        <div className="text-[11px] uppercase tracking-[0.3em] text-plum inline-flex items-center gap-2">
          <Sparkles size={12} className="text-sage" /> ai mode · grounded search
        </div>
        <h1 className="font-serif text-6xl sm:text-7xl lg:text-[88px] text-ink leading-[0.92] mt-2">
          ask <span className="italic">anita</span> anything.
        </h1>
        <Squiggle width={240} className="mt-3" />
        <p className="mt-4 font-serif italic text-xl text-ink-soft max-w-2xl">
          a small AI grounded in her curated archive. it will not invent things.
          if it doesn't know, it will say so — and quietly point you somewhere close.
        </p>
      </div>

      {/* indexing bar */}
      <div className="mt-8 pb-4 border-b border-[var(--border-soft)]">
        <IndexingBar stats={stats} />
      </div>

      {/* search */}
      <form onSubmit={onSubmit} className="mt-8" data-testid="ai-search-form">
        <div className="search-glow flex items-center gap-3 bg-white border border-[var(--border-soft)] rounded-full px-5 py-3 shadow-[0_2px_30px_-14px_rgba(138,121,134,0.3)]">
          <Search size={18} className="text-plum shrink-0" />
          <input
            data-testid="ai-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="why does anita romanticize coding?"
            className="flex-1 bg-transparent outline-none placeholder:text-plum/70 text-ink text-base"
          />
          <button
            data-testid="ai-search-submit"
            type="submit"
            disabled={loading || !query.trim()}
            className="btn-soft inline-flex items-center gap-1.5 px-4 py-1.5 text-xs rounded-full disabled:opacity-50"
          >
            {loading ? "asking…" : "ask"}
            <Sparkles size={12} className="text-sage" />
          </button>
        </div>

        {/* starter chips */}
        {!submitted && (
          <div className="mt-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-plum">try asking</div>
            <div className="mt-3 flex flex-wrap gap-2" data-testid="starter-questions">
              {STARTER_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  data-testid={`starter-${q.toLowerCase().replace(/[^a-z]+/g, "-").slice(0, 24)}`}
                  onClick={() => {
                    setQuery(q);
                    runSearch(q);
                  }}
                  className="px-3 py-1.5 text-sm bg-tag border border-[var(--border-soft)] rounded-full text-ink hover:bg-warm transition"
                >
                  ↗ {q}
                </button>
              ))}
            </div>
            <div className="mt-4 text-[10px] uppercase tracking-[0.3em] text-plum">hidden searches</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {EGG_HINTS.map((q) => (
                <button
                  key={q}
                  type="button"
                  data-testid={`egg-${q.replace(/\s+/g, "-")}`}
                  onClick={() => {
                    setQuery(q);
                    runSearch(q);
                  }}
                  className="px-2.5 py-1 text-xs bg-pink/40 border border-pink rounded-full text-plum hover:bg-pink/60 italic transition"
                >
                  · {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>

      {/* answer + sources */}
      {(loading || result || error) && (
        <div ref={answerRef} className="mt-10 scroll-mt-32" data-testid="ai-answer-block">
          <div className="text-[10px] uppercase tracking-[0.3em] text-plum">
            search result · "{submitted}"
            {result?.easter_egg && <span className="ml-2 text-pink-700/90">· hidden archive matched</span>}
          </div>

          {/* main answer card */}
          <div className="relative bg-white/85 border border-lavender rounded-2xl p-6 sm:p-8 mt-3 shadow-[0_30px_60px_-40px_rgba(138,121,134,0.4)]" data-testid="ai-answer-card">
            <div className="absolute -top-3 left-6 px-2.5 py-1 bg-paper border border-lavender rounded-full text-[10px] uppercase tracking-[0.25em] text-plum inline-flex items-center gap-1.5">
              <Sparkles size={11} className="text-sage" /> generated answer
            </div>
            <Tape className="-top-3 right-10" rotate={-10} w={70} />

            {loading && (
              <div className="font-serif italic text-xl text-ink-soft">
                anita.ai is reading the archive <TypingDots />
              </div>
            )}

            {error && !loading && (
              <div className="font-serif italic text-xl text-plum">{error}</div>
            )}

            {result && !loading && (
              <>
                <Quote size={22} className="text-plum mb-2" />
                <p className="font-serif text-2xl sm:text-[28px] text-ink leading-snug whitespace-pre-line">
                  {result.answer}
                </p>

                {/* citations */}
                {result.sources?.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-[var(--border-soft)]" data-testid="ai-sources">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-plum">sources from the archive</div>
                    <ol className="mt-3 space-y-3">
                      {result.sources.map((s, i) => (
                        <li key={s.id} className="flex items-start gap-3" data-testid={`ai-source-${i}`}>
                          <Marker n={i + 1} className="mt-1 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <Link to={s.url} className="text-link font-medium link-soft inline-flex items-center gap-1">
                              {s.title} <ArrowUpRight size={12} />
                            </Link>
                            <div className="text-[11px] uppercase tracking-[0.2em] text-plum mt-0.5">
                              {s.source} · relevance {Math.round(s.score * 100)}%
                            </div>
                            <p className="text-sm text-ink-soft mt-1 leading-relaxed">{s.snippet}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </>
            )}
          </div>

          {/* People also ask — inline, contextual */}
          {result && !loading && result.people_also_ask?.length > 0 && (
            <div className="mt-10" data-testid="ai-paa-block">
              <PeopleAlsoAskInline
                items={result.people_also_ask}
                query={submitted}
                variant="compact"
              />
            </div>
          )}

          {/* related pages + closest archive + related searches */}
          {result && !loading && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* related pages */}
              <div className="relative bg-paper border border-[var(--border-soft)] rounded-2xl p-5">
                <Sprig className="absolute -top-10 -right-4 opacity-60" size={70} />
                <div className="text-[10px] uppercase tracking-[0.3em] text-plum inline-flex items-center gap-2">
                  <BookOpen size={12} /> related pages
                </div>
                <ul className="mt-3 space-y-2">
                  {(result.related_pages || []).map((p) => (
                    <li key={p}>
                      <Link to={p} className="inline-flex items-center gap-1 text-ink link-soft font-sans">
                        → {p}
                      </Link>
                    </li>
                  ))}
                  {(!result.related_pages || result.related_pages.length === 0) && (
                    <li className="text-sm text-ink-soft italic">— none directly linked</li>
                  )}
                </ul>
              </div>

              {/* closest archive */}
              <div className="relative bg-white/80 border border-[var(--border-soft)] rounded-2xl p-5">
                <Tape className="-top-3 left-8" rotate={-7} w={60} />
                <div className="text-[10px] uppercase tracking-[0.3em] text-plum inline-flex items-center gap-2">
                  <Bookmark size={12} /> closest archive
                </div>
                {result.closest_archive ? (
                  <Link
                    to={result.closest_archive}
                    data-testid="ai-closest-archive"
                    className="mt-2 inline-flex items-center gap-1.5 font-serif italic text-2xl text-ink hover:text-plum transition"
                  >
                    → {result.closest_archive}
                  </Link>
                ) : (
                  <div className="mt-2 font-serif italic text-xl text-ink-soft">— nothing close enough.</div>
                )}
                <p className="mt-3 text-sm text-ink-soft">
                  if the answer above wasn't enough, this is the nearest page in anita's archive.
                </p>
              </div>

              {/* related searches */}
              <div className="relative bg-warm/50 border border-[var(--border-soft)] rounded-2xl p-5 grid-paper">
                <div className="text-[10px] uppercase tracking-[0.3em] text-plum">related searches</div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {(result.related_searches || []).map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        data-testid={`related-${s.replace(/\s+/g, "-").slice(0, 24)}`}
                        onClick={() => {
                          setQuery(s);
                          runSearch(s);
                        }}
                        className="px-3 py-1 text-sm bg-tag border border-[var(--border-soft)] rounded-full text-ink hover:bg-warm transition font-hand text-base"
                      >
                        ↗ {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* search history */}
      {history.length > 1 && (
        <div className="mt-14 border-t border-[var(--border-soft)] pt-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-plum">recent searches · this session</div>
          <ul className="mt-3 divide-y divide-[var(--border-soft)] text-sm">
            {history.map((h, i) => (
              <li key={i} className="py-2 flex items-baseline gap-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-plum w-28 shrink-0">
                  {h.at.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
                <button
                  onClick={() => {
                    setQuery(h.q);
                    runSearch(h.q);
                  }}
                  className="text-ink link-soft text-left"
                >
                  {h.q}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* footnote */}
      <div className="mt-14 max-w-2xl flex items-start gap-4">
        <HandArrow className="rotate-[-25deg] shrink-0" />
        <p className="font-hand text-plum text-2xl leading-snug">
          — grounded retrieval over a small handwritten archive. it will say "I don't know"
          when it should. that's the whole point.
        </p>
      </div>
    </div>
  );
}
