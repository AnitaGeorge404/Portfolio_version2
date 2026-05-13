import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from "@/components/SearchBar";
import SearchTabs from "@/components/SearchTabs";
import ResultCard from "@/components/ResultCard";
import PeopleAlsoAskInline from "@/components/PeopleAlsoAskInline";
import { Sparkle, Squiggle, HandArrow, Sprig, Rose, Tape, Marker, HandAsterisk, Paperclip } from "@/components/Decorations";
import { Sparkles, ArrowUpRight, Bookmark, Quote } from "lucide-react";
import { profile, aiOverview, projects, peopleAlsoAsk, experience, skills, internetTraces, obsessions } from "@/data/portfolio";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fallbackPAA = peopleAlsoAsk.slice(0, 4).map((p) => ({
  q: p.q,
  a: p.a,
  related: ["/work", "/ai-mode"],
}));

export default function Home() {
  const [paa, setPaa] = useState(fallbackPAA);

  useEffect(() => {
    axios
      .get(`${API}/ai/search`, { params: { q: "anita george" } })
      .then((r) => {
        if (r.data?.people_also_ask?.length) setPaa(r.data.people_also_ask);
      })
      .catch(() => {});
  }, []);

  return (
    <div data-testid="home-page">
      {/* HERO SEARCH */}
      <section className="relative pt-16 sm:pt-24 pb-10 px-4 sm:px-6">
        {/* Floating decorations */}
        <Rose className="absolute top-10 -left-2 sm:left-10 opacity-70 hidden sm:block animate-float-slow pointer-events-none" size={130} />
        <Sprig className="absolute top-32 right-4 sm:right-16 opacity-60 hidden md:block animate-drift pointer-events-none" size={110} />
        <Sparkle className="absolute top-44 left-1/4 opacity-70 animate-float-slow delay-200 pointer-events-none" size={20} />
        <Sparkle className="absolute top-20 right-1/4 opacity-50 animate-float-slow delay-500 pointer-events-none" size={14} color="#A3B19B" />

        <div className="max-w-3xl mx-auto text-center relative">
          <div className="font-hand text-plum text-2xl sm:text-3xl rotate-[-3deg] inline-block animate-fade-up" data-testid="hero-tag">
            search results for —
          </div>
          <h1
            className="font-serif text-6xl sm:text-7xl lg:text-8xl text-ink leading-[0.95] mt-2 tracking-tight animate-fade-up delay-100"
            data-testid="hero-title"
          >
            <span className="italic">Anita</span> <span className="font-light">George</span>
          </h1>
          <div className="mt-2 flex justify-center animate-fade-up delay-200">
            <Squiggle width={260} />
          </div>
          <p className="mt-5 font-sans text-base sm:text-lg text-ink-soft max-w-xl mx-auto animate-fade-up delay-300">
            <span className="font-hand text-2xl text-plum">a search engine</span> for one person's
            engineering practice — projects, repositories, themes, and interests of a CS undergraduate
            building accessible, systems-level software.
          </p>

          <div className="mt-10 animate-fade-up delay-400">
            <SearchBar autoFocus={false} />
          </div>

          {/* AI overview pill */}
          <div className="mt-5 flex justify-center animate-fade-up delay-500">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lavender bg-white/70 backdrop-blur text-[12px] text-ink font-sans">
              <Sparkles size={12} className="text-sage" />
              <span className="text-plum">AI overview:</span>
              <span className="text-ink-soft">full-stack · graphs · accessibility-first UX</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 animate-fade-up delay-700">
            <Link to="/work" data-testid="hero-projects-btn" className="btn-soft px-5 py-2 text-sm rounded-full font-sans text-ink">
              browse work
            </Link>
            <Link to="/ai-mode" data-testid="hero-ai-btn" className="btn-soft px-5 py-2 text-sm rounded-full font-sans text-ink inline-flex items-center gap-1.5">
              <Sparkles size={12} /> i'm feeling lucky
            </Link>
          </div>
        </div>
      </section>

      <SearchTabs />

      {/* RESULTS BODY */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT COLUMN — search results */}
          <div className="lg:col-span-8 space-y-10">
            <div className="text-[11px] uppercase tracking-[0.3em] text-plum">about 4,219 results · 0.42 seconds · curated by hand</div>

            {/* AI Overview block */}
            <div className="relative bg-white/80 border border-lavender rounded-2xl p-6 sm:p-7 shadow-[0_30px_60px_-40px_rgba(138,121,134,0.4)]" data-testid="ai-overview-card">
              <div className="absolute -top-3 left-6 px-2.5 py-1 bg-paper border border-lavender rounded-full text-[10px] uppercase tracking-[0.25em] text-plum inline-flex items-center gap-1.5">
                <Sparkles size={11} className="text-sage" /> AI overview
              </div>
              <Tape className="-top-3 right-10" rotate={-12} w={70} />
              <p className="font-serif italic text-2xl sm:text-3xl text-ink leading-snug mt-1">
                "{aiOverview.answer}"
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-plum">sources</span>
                {aiOverview.citations.map((c, i) => (
                  <a key={c.url} href={c.url} target="_blank" rel="noreferrer" className="text-xs font-mono-soft text-link link-soft">
                    [{i + 1}] {c.label}
                  </a>
                ))}
              </div>
            </div>

            {/* about result */}
            <ResultCard
              url="anitageorge.vercel.app › about"
              title="Anita George — AI / Full-Stack Engineer at IIIT Kottayam"
              snippet={profile.blurb}
              meta={<><Marker n={1} /><span>about · profile</span></>}
              testid="result-about"
              footer="more from this site → projects · research · contact"
            />

            {/* featured projects (3 quick results) */}
            <div className="space-y-7">
              <div className="flex items-baseline gap-3">
                <h2 className="font-serif text-3xl text-ink">featured projects</h2>
                <span className="font-hand text-plum text-xl">— pinterest below ↘</span>
              </div>
              {projects.slice(0, 3).map((p, idx) => (
                <ResultCard
                  key={p.slug}
                  url={`anita.dev › projects › ${p.slug}`}
                  title={`${p.name} — ${p.tagline}`}
                  snippet={p.summary}
                  meta={<><Marker n={idx + 2} /><span>{p.year} · {p.tags.slice(0, 2).join(" · ")}</span></>}
                  testid={`result-project-${p.slug}`}
                  footer={<span className="font-hand text-lg text-plum">"{p.note}"</span>}
                >
                  <div className="mt-3">
                    <Link
                      to={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-1 text-sm text-link link-soft"
                    >
                      read the long version <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </ResultCard>
              ))}
              <div>
                <Link to="/work" data-testid="see-all-projects" className="btn-soft inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm">
                  see all work (search-result view) <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* People Also Ask — contextual, semantically generated */}
            <div className="border-y border-[var(--border-soft)] py-7" data-testid="paa-preview">
              <PeopleAlsoAskInline items={paa} query="anita george" />
            </div>

            {/* Experience timeline */}
            <div data-testid="experience-section">
              <div className="flex items-baseline gap-3">
                <h2 className="font-serif text-3xl text-ink">a quiet timeline</h2>
                <span className="font-hand text-plum text-xl">— how she got here</span>
              </div>
              <ol className="mt-6 relative pl-6 border-l border-dashed border-brown/70 space-y-7">
                {experience.map((e, i) => (
                  <li key={e.when} className="relative">
                    <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-pink border border-plum/40" />
                    <div className="text-[10px] uppercase tracking-[0.3em] text-plum">{e.when}</div>
                    <div className="font-serif text-xl text-ink">{e.role} · <span className="italic text-plum">{e.where}</span></div>
                    <p className="mt-1 text-sm text-ink-soft leading-relaxed max-w-xl">{e.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* RIGHT — sidebar (knowledge panel + related) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* knowledge panel */}
            <div className="relative bg-white/80 border border-[var(--border-soft)] rounded-2xl p-6" data-testid="knowledge-panel">
              <Tape className="-top-3 left-8" rotate={-7} w={64} />
              <Tape className="-top-3 right-8" rotate={9} w={48} />
              <div className="text-[10px] uppercase tracking-[0.3em] text-plum">knowledge panel</div>
              <h3 className="font-serif text-3xl text-ink mt-1 leading-tight">{profile.name}</h3>
              <div className="font-hand text-plum text-xl">{profile.tagline}</div>
              <Squiggle width={180} className="mt-3" />
              <dl className="mt-4 grid grid-cols-3 gap-y-3 text-sm">
                <dt className="col-span-1 text-plum text-[11px] uppercase tracking-[0.2em]">role</dt>
                <dd className="col-span-2 text-ink">{profile.role}</dd>
                <dt className="col-span-1 text-plum text-[11px] uppercase tracking-[0.2em]">degree</dt>
                <dd className="col-span-2 text-ink">{profile.degree}</dd>
                <dt className="col-span-1 text-plum text-[11px] uppercase tracking-[0.2em]">at</dt>
                <dd className="col-span-2 text-ink">{profile.universityShort} · {profile.years}</dd>
                <dt className="col-span-1 text-plum text-[11px] uppercase tracking-[0.2em]">gpa</dt>
                <dd className="col-span-2 text-ink font-mono">{profile.gpa}</dd>
                <dt className="col-span-1 text-plum text-[11px] uppercase tracking-[0.2em]">based</dt>
                <dd className="col-span-2 text-ink">{profile.location}</dd>
              </dl>
              <div className="mt-4 pt-4 border-t border-[var(--border-soft)] flex flex-wrap gap-2">
                {["Full-Stack", "Graphs", "Accessibility", "UI/UX"].map((t) => (
                  <span key={t} className="px-2.5 py-1 text-[11px] uppercase tracking-[0.2em] bg-tag border border-[var(--border-soft)] rounded-full text-plum">{t}</span>
                ))}
              </div>
            </div>

            {/* skills */}
            <div className="relative bg-paper border border-[var(--border-soft)] rounded-2xl p-6" data-testid="skills-panel">
              <Paperclip className="absolute -top-3 right-6 rotate-12" />
              <div className="text-[10px] uppercase tracking-[0.3em] text-plum">skills · index</div>
              <ul className="mt-3 space-y-3">
                {skills.map((g) => (
                  <li key={g.group}>
                    <div className="font-hand text-plum text-lg">{g.group}</div>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {g.items.map((it) => (
                        <span key={it} className="px-2 py-0.5 text-[11px] bg-tag border border-[var(--border-soft)] rounded-sm text-ink">{it}</span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* obsessions */}
            <div className="relative bg-warm/60 border border-[var(--border-soft)] rounded-2xl p-6 grid-paper" data-testid="obsessions-panel">
              <div className="text-[10px] uppercase tracking-[0.3em] text-plum">obsessions <span className="text-ink-soft normal-case tracking-normal">— rotating</span></div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {obsessions.map((o, i) => (
                  <li key={o} className="font-hand text-lg leading-tight" style={{ transform: `rotate(${(i % 3 - 1) * 1.5}deg)` }}>
                    <span className="text-plum">·</span> <span className="text-ink">{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* internet traces */}
            <div className="relative bg-paper border border-[var(--border-soft)] rounded-2xl p-6" data-testid="internet-traces-panel">
              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-[0.3em] text-plum">recent tabs</div>
                <span className="font-hand text-plum text-base">— learning + building</span>
              </div>
              <ul className="mt-3 divide-y divide-[var(--border-soft)] text-sm">
                {internetTraces.slice(0, 6).map((t) => (
                  <li key={t.title} className="py-2.5 flex items-baseline gap-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-plum w-24 shrink-0">{t.time}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-ink truncate">{t.title}</div>
                      <div className="text-sage text-xs font-mono-soft truncate">{t.url}</div>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-plum">{t.tag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* contact preview */}
            <div className="relative bg-white/80 border border-[var(--border-soft)] rounded-2xl p-6">
              <Rose className="absolute -top-8 -right-6 opacity-80" size={70} />
              <div className="text-[10px] uppercase tracking-[0.3em] text-plum">say hello</div>
              <p className="mt-2 font-serif italic text-xl text-ink">"the door is open."</p>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <a href={profile.github} target="_blank" rel="noreferrer" className="link-soft text-ink" data-testid="side-github">github / AnitaGeorge404 ↗</a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-soft text-ink" data-testid="side-linkedin">linkedin / anita-george ↗</a>
                <a href={profile.portfolio} target="_blank" rel="noreferrer" className="link-soft text-ink" data-testid="side-portfolio">anitageorge.vercel.app ↗</a>
              </div>
              <Link to="/contact" className="btn-soft mt-4 inline-flex items-center gap-1 px-4 py-1.5 text-xs rounded-full">
                full contact card <ArrowUpRight size={12} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* About spread — magazine-style */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 mt-14 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative">
              <Tape className="-top-3 left-10" w={90} rotate={-8} />
              <Tape className="-top-3 right-10" w={70} rotate={6} />
              <img
                src="https://images.pexels.com/photos/5040995/pexels-photo-5040995.jpeg"
                alt="moodboard placeholder"
                className="w-full h-[460px] object-cover rounded-sm border border-[var(--border-soft)] shadow-[0_30px_60px_-40px_rgba(45,42,38,0.45)]"
                data-testid="about-image"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 bg-paper border border-[var(--border-soft)] px-3 py-2 font-hand text-plum text-lg rotate-[3deg]">
              kollam · kerala
            </div>
            <Sparkle className="absolute -top-6 -left-6" size={22} />
          </div>
          <div className="lg:col-span-7">
            <div className="text-[10px] uppercase tracking-[0.3em] text-plum">field notes · about me</div>
            <h2 className="font-serif text-5xl sm:text-6xl text-ink leading-[0.95] mt-2">
              i'm <span className="italic">anita</span> —<br /> i build across the full stack.
            </h2>
            <Quote size={22} className="text-plum mt-4" />
            <p className="mt-3 font-serif italic text-xl text-ink-soft leading-relaxed max-w-xl">
              Computer Science Engineering undergraduate at IIIT Kottayam. I work across backend
              systems, frontend interfaces, and algorithmic foundations — with a particular
              interest in humane technology, accessibility-first UX, and graph-based optimization.
            </p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl">
              {[
                { k: "degree", v: "B.Tech CSE" },
                { k: "at", v: "IIIT Kottayam" },
                { k: "years", v: profile.years },
                { k: "gpa", v: profile.gpa },
                { k: "based", v: "Kollam, Kerala" },
                { k: "stack", v: "Python · React · FastAPI" },
                { k: "dsa", v: "400+ problems" },
                { k: "wins", v: "TinkHack · Girlathon" },
                { k: "certs", v: "IBM · Meta · Google" },
              ].map((m) => (
                <div key={m.k}>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-plum">{m.k}</div>
                  <div className="font-sans text-ink mt-1">{m.v}</div>
                </div>
              ))}
            </div>
            <HandArrow className="mt-6 -ml-2" />
          </div>
        </div>
      </section>
    </div>
  );
}
