import React from "react";
import { Link } from "react-router-dom";
import { themes, dsa, achievements, certifications, research } from "@/data/portfolio";
import ResultCard from "@/components/ResultCard";
import { Squiggle, Sparkle, Marker, Tape, Sprig } from "@/components/Decorations";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { ScholarMetaLine, ScholarStatLine } from "@/components/ScholarPrimitives";
import { MidnightMetaLine, MidnightGlassSurface, MidnightStatLine } from "@/components/MidnightPrimitives";
import { HerbariumFieldLabel, HerbariumSpecimenSheet, SpecimenFieldLabel, HerbariumStatLine } from "@/components/HerbariumPrimitives";

function HerbariumResearch() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14" data-testid="research-page">
      <HerbariumFieldLabel>Field notes</HerbariumFieldLabel>
      <h1 className="mt-2 font-serif italic text-4xl sm:text-5xl text-[var(--ink)]">Research</h1>
      <p className="mt-2 text-[15px] text-[var(--ink-soft)] max-w-xl">
        Two research internships and a presented paper, plus the technical patterns that recur across her shipped systems.
      </p>

      <div className="mt-8 space-y-5" data-testid="research-papers">
        {research.map((r) => (
          <HerbariumSpecimenSheet key={r.slug} id={r.status} title={r.venue} className="">
            <h2 className="font-serif italic text-xl text-[var(--specimen-ink)] leading-snug">{r.title}</h2>
            <div className="mt-1 text-[13px] text-[var(--specimen-ink-soft)]">{r.org}</div>
            <div className="mt-4 space-y-2.5 text-[14px] leading-relaxed text-[var(--specimen-ink)]">
              <p><span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--burgundy)]">Problem — </span>{r.problem}</p>
              <p><span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--burgundy)]">Method — </span>{r.method}</p>
              <p><span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--burgundy)]">Evaluation — </span>{r.evaluation}</p>
              <p><span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--burgundy)]">Result — </span>{r.result}</p>
              <p className="italic text-[var(--specimen-ink-soft)]"><span className="font-mono text-[11px] uppercase tracking-[0.08em] not-italic text-[var(--burgundy)]">Limitation — </span>{r.limitation}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {r.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] border border-[var(--specimen-border)] text-[var(--specimen-ink-soft)]">{t}</span>
              ))}
            </div>
          </HerbariumSpecimenSheet>
        ))}
      </div>

      <HerbariumSpecimenSheet title="Algorithmic foundation" className="mt-8">
        <HerbariumStatLine
          items={[
            ["problems solved", dsa.total],
            ["LeetCode", dsa.leetcode],
            ["Codeforces", dsa.codeforces],
          ]}
        />
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--specimen-ink-soft)]">
          {dsa.focus.map((f) => <span key={f}>{f}</span>)}
        </div>
      </HerbariumSpecimenSheet>

      <div className="mt-8 space-y-4">
        {themes.map((t) => (
          <HerbariumSpecimenSheet key={t.title} title={t.venue}>
            <h2 className="font-serif italic text-xl text-[var(--specimen-ink)]">{t.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--specimen-ink)] max-w-2xl">{t.desc}</p>
          </HerbariumSpecimenSheet>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <HerbariumSpecimenSheet title="Milestones">
          <ul className="space-y-2">
            {achievements.map((a) => (
              <li key={a.title}>
                <div className="text-[15px] text-[var(--specimen-ink)]">{a.result}</div>
                <div className="text-[13px] text-[var(--specimen-ink-soft)]">{a.title} · {a.year}</div>
              </li>
            ))}
          </ul>
        </HerbariumSpecimenSheet>
        <HerbariumSpecimenSheet title="Certifications">
          <ul className="space-y-2">
            {certifications.map((c) => (
              <li key={c.title}>
                <div className="text-[15px] text-[var(--specimen-ink)]">{c.title}</div>
                <div className="text-[13px] text-[var(--specimen-ink-soft)]">{c.issuer}</div>
              </li>
            ))}
          </ul>
        </HerbariumSpecimenSheet>
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--border-soft)]">
        <Link to="/work" className="text-sm text-[var(--decoration-primary)] hover:underline underline-offset-4">
          See the systems these patterns show up in →
        </Link>
      </div>
    </div>
  );
}

function MidnightResearch() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14" data-testid="research-page">
      <MidnightMetaLine signal>Research index</MidnightMetaLine>
      <h1 className="mt-2 font-serif italic text-4xl sm:text-5xl text-[var(--ink)]">Research</h1>
      <p className="mt-2 text-[15px] text-[var(--ink-soft)] max-w-xl">
        Two research internships and a presented paper, plus the technical patterns that recur across her shipped systems.
      </p>

      <div className="mt-8 space-y-4" data-testid="research-papers">
        {research.map((r) => (
          <MidnightGlassSurface key={r.slug} level={3} className="p-6">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <MidnightMetaLine>{r.venue}</MidnightMetaLine>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 border border-[var(--border-soft)] text-[var(--decoration-primary)]">{r.status}</span>
            </div>
            <h2 className="mt-2 font-serif italic text-xl text-[var(--ink)] leading-snug">{r.title}</h2>
            <div className="mt-1 text-[13px] text-[var(--ink-soft)]">{r.org}</div>
            <div className="mt-4 space-y-2.5 text-[14px] leading-relaxed text-[var(--ink)]">
              <p><span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--sage)]">Problem — </span>{r.problem}</p>
              <p><span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--sage)]">Method — </span>{r.method}</p>
              <p><span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--sage)]">Evaluation — </span>{r.evaluation}</p>
              <p><span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--sage)]">Result — </span>{r.result}</p>
              <p className="text-[var(--ink-soft)]"><span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--sage)]">Limitation — </span>{r.limitation}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {r.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] border border-[var(--border-soft)] text-[var(--ink-soft)]">{t}</span>
              ))}
            </div>
          </MidnightGlassSurface>
        ))}
      </div>

      <MidnightGlassSurface level={2} className="mt-8 p-6">
        <MidnightStatLine
          items={[
            ["problems solved", dsa.total],
            ["LeetCode", dsa.leetcode],
            ["Codeforces", dsa.codeforces],
          ]}
        />
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--sage)]">
          {dsa.focus.map((f) => (
            <span key={f}>{f}</span>
          ))}
        </div>
      </MidnightGlassSurface>

      <div className="mt-8">
        <MidnightMetaLine className="mb-3">Analysis areas</MidnightMetaLine>
        {themes.map((t) => (
          <div key={t.title} className="py-5 border-t border-[var(--border-soft)]">
            <MidnightMetaLine>{t.venue}</MidnightMetaLine>
            <h2 className="mt-1 font-serif italic text-xl text-[var(--ink)]">{t.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-soft)] max-w-2xl">{t.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MidnightGlassSurface level={2} className="p-5">
          <MidnightMetaLine>Hackathon placements</MidnightMetaLine>
          <ul className="mt-2 space-y-2">
            {achievements.map((a) => (
              <li key={a.title}>
                <div className="text-[15px] text-[var(--ink)]">{a.result}</div>
                <div className="text-[13px] text-[var(--ink-soft)]">{a.title} · {a.year}</div>
              </li>
            ))}
          </ul>
        </MidnightGlassSurface>
        <MidnightGlassSurface level={2} className="p-5">
          <MidnightMetaLine>Certifications</MidnightMetaLine>
          <ul className="mt-2 space-y-2">
            {certifications.map((c) => (
              <li key={c.title}>
                <div className="text-[15px] text-[var(--ink)]">{c.title}</div>
                <div className="text-[13px] text-[var(--ink-soft)]">{c.issuer}</div>
              </li>
            ))}
          </ul>
        </MidnightGlassSurface>
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--border-soft)]">
        <Link to="/work" className="text-sm text-[var(--decoration-primary)] hover:underline underline-offset-4">
          See the systems these patterns show up in →
        </Link>
      </div>
    </div>
  );
}

function ScholarResearch() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12" data-testid="research-page">
      <ScholarMetaLine>Anita George · Research index</ScholarMetaLine>
      <h1 className="mt-1 font-serif text-3xl sm:text-4xl text-[var(--ink)]">Research</h1>
      <p className="mt-2 text-[15px] text-[var(--ink-soft)] max-w-2xl">
        Two research internships and a presented conference paper, plus the technical themes that recur across her shipped projects.
      </p>

      <div className="mt-8 space-y-6" data-testid="research-papers">
        {research.map((r, i) => (
          <article
            key={r.slug}
            className="card-enter-scholar pt-6 border-t border-[var(--border-soft)]"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <ScholarMetaLine>{r.venue}</ScholarMetaLine>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 border border-[var(--border-soft)] text-[var(--link)]">{r.status}</span>
            </div>
            <h2 className="mt-2 font-serif text-xl text-[var(--ink)] leading-snug">{r.title}</h2>
            <div className="mt-1 text-[13px] text-[var(--ink-soft)]">{r.org}</div>
            <dl className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-[var(--ink)]">
              <div><dt className="inline font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--ink-soft)]">Problem — </dt><dd className="inline">{r.problem}</dd></div>
              <div><dt className="inline font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--ink-soft)]">Method — </dt><dd className="inline">{r.method}</dd></div>
              <div><dt className="inline font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--ink-soft)]">Evaluation — </dt><dd className="inline">{r.evaluation}</dd></div>
              <div><dt className="inline font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--ink-soft)]">Result — </dt><dd className="inline">{r.result}</dd></div>
              <div><dt className="inline font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--ink-soft)]">Limitation — </dt><dd className="inline text-[var(--ink-soft)]">{r.limitation}</dd></div>
            </dl>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {r.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] border border-[var(--border-soft)] text-[var(--ink-soft)]">{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-[var(--border-soft)]">
        <ScholarStatLine
          items={[
            ["problems solved", dsa.total],
            ["LeetCode", dsa.leetcode],
            ["Codeforces", dsa.codeforces],
          ]}
        />
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-[var(--ink-soft)]">
          {dsa.focus.map((f) => (
            <span key={f}>{f}</span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {themes.map((t, i) => (
          <article key={t.title} className="py-5 border-t border-[var(--border-soft)]">
            <ScholarMetaLine>{t.venue}</ScholarMetaLine>
            <h2 className="mt-1 font-serif text-xl text-[var(--ink)]">{t.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink)] max-w-2xl">{t.desc}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--border-soft)] grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <ScholarMetaLine>Hackathon placements (verified)</ScholarMetaLine>
          <ul className="mt-2 space-y-2">
            {achievements.map((a) => (
              <li key={a.title}>
                <div className="text-[15px] text-[var(--ink)]">{a.result}</div>
                <div className="text-[13px] text-[var(--ink-soft)]">{a.title} · {a.year}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ScholarMetaLine>Certifications</ScholarMetaLine>
          <ul className="mt-2 space-y-2">
            {certifications.map((c) => (
              <li key={c.title}>
                <div className="text-[15px] text-[var(--ink)]">{c.title}</div>
                <div className="text-[13px] text-[var(--ink-soft)]">{c.issuer}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--border-soft)]">
        <Link to="/work" className="text-sm text-[var(--link)] hover:underline underline-offset-4">
          See the projects these themes show up in →
        </Link>
      </div>
    </div>
  );
}

export default function Research() {
  const { currentTheme } = useTheme();
  if (currentTheme === "search") {
    return <ScholarResearch />;
  }
  if (currentTheme === "midnight") {
    return <MidnightResearch />;
  }
  if (currentTheme === "herbarium") {
    return <HerbariumResearch />;
  }
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12" data-testid="research-page">
      <div className="relative">
        <Sprig className="absolute -top-8 -right-2 opacity-60 hidden sm:block" size={70} />
        <div className="text-[10px] uppercase tracking-[0.3em] text-plum">/ research</div>
        <h1 className="font-serif text-6xl sm:text-7xl text-ink leading-[0.95] mt-2">
          papers, <span className="italic">and the patterns</span> underneath.
        </h1>
        <Squiggle width={220} className="mt-3" />
        <p className="mt-4 font-serif italic text-xl text-ink-soft max-w-2xl">
          two research internships and a presented conference paper, plus the technical themes that recur across her shipped work.
        </p>
      </div>

      {/* Research papers */}
      <div className="mt-10 space-y-8" data-testid="research-papers">
        {research.map((r, i) => (
          <div key={r.slug} className="relative bg-white/85 border border-[var(--border-soft)] rounded-2xl p-6" data-testid={`research-paper-${r.slug}`}>
            <Tape className="-top-3 left-10" rotate={i % 2 ? 6 : -7} w={70} />
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="text-[10px] uppercase tracking-[0.3em] text-plum">{r.venue}</div>
              <span className="font-hand text-[var(--rose)] text-lg">— {r.status}</span>
            </div>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl text-ink leading-snug">{r.title}</h2>
            <div className="mt-1 text-sm text-ink-soft">{r.org}</div>
            <div className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-ink">
              <p><span className="font-mono text-[11px] uppercase tracking-[0.08em] text-plum">Problem — </span>{r.problem}</p>
              <p><span className="font-mono text-[11px] uppercase tracking-[0.08em] text-plum">Method — </span>{r.method}</p>
              <p><span className="font-mono text-[11px] uppercase tracking-[0.08em] text-plum">Evaluation — </span>{r.evaluation}</p>
              <p><span className="font-mono text-[11px] uppercase tracking-[0.08em] text-plum">Result — </span>{r.result}</p>
              <p className="text-ink-soft italic"><span className="font-mono text-[11px] not-italic uppercase tracking-[0.08em] text-plum">Limitation — </span>{r.limitation}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {r.tags.map((t) => (
                <span key={t} className="px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] bg-tag border border-[var(--border-soft)] text-plum rounded-full">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* DSA panel */}
      <div className="mt-10 relative bg-white/85 border border-[var(--border-soft)] rounded-2xl p-6" data-testid="dsa-panel">
        <Tape className="-top-3 left-10" rotate={-7} w={70} />
        <div className="text-[10px] uppercase tracking-[0.3em] text-plum inline-flex items-center gap-2">
          <BookOpen size={12} /> algorithmic foundation
        </div>
        <div className="mt-3 grid grid-cols-3 gap-4 max-w-2xl">
          <div>
            <div className="font-serif text-4xl text-ink">{dsa.total}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-plum">DSA problems</div>
          </div>
          <div>
            <div className="font-serif text-4xl text-ink">{dsa.leetcode}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-plum">LeetCode</div>
          </div>
          <div>
            <div className="font-serif text-4xl text-ink">{dsa.codeforces}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-plum">Codeforces</div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {dsa.focus.map((f) => (
            <span key={f} className="px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] bg-tag border border-[var(--border-soft)] text-plum rounded-full">{f}</span>
          ))}
        </div>
      </div>

      {/* Themes */}
      <div className="mt-12 space-y-9 border-t border-[var(--border-soft)] pt-8">
        {themes.map((t, i) => (
          <ResultCard
            key={t.title}
            url={`anita.dev › themes › ${t.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            title={t.title}
            snippet={t.desc}
            meta={<><Marker n={i + 1} /><span>{t.year} · {t.venue}</span></>}
          />
        ))}
      </div>

      {/* Achievements + certifications */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-paper border border-[var(--border-soft)] rounded-2xl p-6" data-testid="achievements-panel">
          <div className="text-[10px] uppercase tracking-[0.3em] text-plum">achievements</div>
          <ul className="mt-3 space-y-3">
            {achievements.map((a) => (
              <li key={a.title}>
                <div className="font-serif text-xl text-ink">{a.result}</div>
                <div className="text-sm text-ink-soft">{a.title} · {a.year}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-paper border border-[var(--border-soft)] rounded-2xl p-6" data-testid="certifications-panel">
          <div className="text-[10px] uppercase tracking-[0.3em] text-plum">certifications</div>
          <ul className="mt-3 space-y-2">
            {certifications.map((c) => (
              <li key={c.title} className="text-sm">
                <div className="font-serif text-lg text-ink leading-tight">{c.title}</div>
                <div className="text-xs text-plum uppercase tracking-[0.2em] mt-0.5">{c.issuer}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* footer */}
      <div className="mt-12 border-t border-[var(--border-soft)] pt-6">
        <Link to="/work" className="btn-soft inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm">
          see the projects these themes show up in <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}
