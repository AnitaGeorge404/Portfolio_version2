import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import SearchBar from "@/components/SearchBar";
import SearchTabs from "@/components/SearchTabs";
import ResultCard from "@/components/ResultCard";
import PeopleAlsoAskInline from "@/components/PeopleAlsoAskInline";
import { RevealOnScroll, containerVariants, itemVariants } from "@/components/MotionFramework";
import { FloatingPetal, Butterfly, PressedFlower, BotanicalSketch } from "@/components/BotanicalElements";
import {
  Sparkle, Squiggle, HandArrow, Sprig, CherryBlossom,
  Tape, Marker, Paperclip, PetalRain
} from "@/components/Decorations";
import { Sparkles, ArrowUpRight, Bookmark, Quote } from "lucide-react";
import { profile, aiOverview, projects, peopleAlsoAsk, experience, skills, internetTraces, obsessions, themes, dsa, achievements, repos } from "@/data/portfolio";
import { useTheme } from "@/context/ThemeContext";
import { ScholarSearchBar, ScholarResultRow, ScholarStatLine, ScholarSectionTitle, ScholarProfileIndex, ScholarMetaLine } from "@/components/ScholarPrimitives";
import { MidnightMetaLine, MidnightGlassSurface, MidnightSystemRecord, MidnightQuerySurface, MidnightStatLine } from "@/components/MidnightPrimitives";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
const API = BACKEND_URL ? `${BACKEND_URL}/api` : "/api";

const fallbackPAA = peopleAlsoAsk.slice(0, 4).map((p) => ({
  q: p.q,
  a: p.a,
  related: ["/work", "/ai-mode"],
}));

// Google-style colored dots logo - theme-aware
function AnitaLogo({ large = false }) {
  return (
    <div className={`font-serif leading-none tracking-tight text-ink select-none ${large ? "text-8xl sm:text-9xl lg:text-[140px]" : "text-5xl"}`}>
      <span className="italic" style={{ color: "var(--rose)" }}>A</span>
      <span style={{ color: "var(--plum)" }}>n</span>
      <span style={{ color: "var(--blossom)" }}>i</span>
      <span style={{ color: "var(--rose)" }}>t</span>
      <span style={{ color: "var(--dusty)" }}>a</span>
    </div>
  );
}

// Scholar — index entrance: identity, search, indexed interests, selected records
function ScholarHome({ paa }) {
  const suggestedQueries = ["NeuroBridge accessibility", "graph optimization", "full-stack development", "AI safety"];
  const featured = projects.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 pb-20" data-testid="home-page">
      <div className="text-center">
        <ScholarMetaLine className="justify-center inline-block">Anita George — Indexed Record</ScholarMetaLine>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl text-[var(--ink)]">Anita George</h1>
        <p className="mt-1.5 text-[15px] text-[var(--ink-soft)]">
          {profile.role} &middot; {profile.universityShort}
        </p>
        <div className="mt-6 flex justify-center">
          <ScholarSearchBar autoFocus={false} />
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-sm">
          {suggestedQueries.map((q) => (
            <Link key={q} to={`/ai-mode?q=${encodeURIComponent(q)}`} className="text-[var(--link)] hover:underline underline-offset-4">
              {q}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-[var(--border-soft)]">
        <ScholarStatLine
          items={[
            ["projects indexed", projects.length],
            ["repositories", repos.length],
            ["problems solved", dsa.total],
            ["hackathon placements", achievements.length],
          ]}
        />
      </div>

      <div className="mt-8">
        <ScholarMetaLine>Engineering interests</ScholarMetaLine>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-[15px] text-[var(--ink)]">
          {themes.map((t) => (
            <Link key={t.title} to={`/research`} className="hover:underline underline-offset-4">
              {t.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <ScholarSectionTitle count={projects.length}>Selected indexed records</ScholarSectionTitle>
        {featured.map((p) => (
          <ScholarResultRow
            key={p.slug}
            testid={`scholar-home-result-${p.slug}`}
            eyebrow={`Anita George · Project · ${p.year}`}
            title={p.name}
            href={`/projects/${p.slug}`}
            meta={p.tagline}
            description={p.summary}
            tags={p.tags.slice(0, 4)}
            actions={[
              { label: "View project", to: `/projects/${p.slug}` },
              { label: "Explore with AI", to: `/ai-mode?q=${encodeURIComponent(p.name)}` },
            ]}
          />
        ))}
        <div className="mt-4">
          <Link to="/work" className="text-sm text-[var(--link)] hover:underline underline-offset-4">
            View the full project index →
          </Link>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-[var(--border-soft)]">
        <ScholarProfileIndex profile={profile} interests={themes.map((t) => t.title)} />
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)] max-w-2xl">{profile.blurb}</p>
      </div>

      {paa.length > 0 && (
        <div className="mt-10 pt-8 border-t border-[var(--border-soft)]" data-testid="paa-preview">
          <PeopleAlsoAskInline items={paa} query="anita george" variant="compact" />
        </div>
      )}
    </div>
  );
}

// Midnight — the intelligence system entrance
function MidnightHome() {
  const featured = projects.slice(0, 3);
  const categories = ["Full-Stack", "AI Systems", "Accessibility", "Adaptive UX"];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-24" data-testid="home-page">
      <MidnightMetaLine signal>Private engineering intelligence</MidnightMetaLine>
      <h1 className="mt-4 font-serif italic text-4xl sm:text-6xl leading-[1.08] text-[var(--ink)] max-w-3xl">
        {profile.tagline}
      </h1>
      <p className="mt-4 text-[15px] sm:text-base text-[var(--ink-soft)] max-w-xl leading-relaxed">
        {profile.role} &middot; {profile.universityShort}
      </p>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
        {categories.map((c) => (
          <span key={c} className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--sage)] border border-[var(--border-soft)] px-2 py-1">
            {c}
          </span>
        ))}
      </div>

      <div className="mt-8 max-w-xl">
        <MidnightQuerySurface autoFocus={false} />
      </div>

      <div className="mt-6 pt-6 border-t border-[var(--border-soft)]">
        <MidnightStatLine
          items={[
            ["systems indexed", projects.length],
            ["repositories", repos.length],
            ["problems solved", dsa.total],
          ]}
        />
      </div>

      <div className="mt-12">
        <MidnightMetaLine className="mb-4">Selected systems</MidnightMetaLine>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featured.map((p, i) => (
            <MidnightSystemRecord
              key={p.slug}
              testid={`midnight-home-result-${p.slug}`}
              wide={i === 0}
              eyebrow={`System · ${p.year}`}
              title={p.name}
              href={`/projects/${p.slug}`}
              meta={p.tagline}
              description={p.summary}
              tags={p.tags.slice(0, 3)}
              actions={[
                { label: "View system", to: `/projects/${p.slug}` },
                { label: "Explore with AI", to: `/ai-mode?q=${encodeURIComponent(p.name)}` },
              ]}
            />
          ))}
        </div>
        <div className="mt-6">
          <Link to="/work" className="text-sm text-[var(--decoration-primary)] hover:underline underline-offset-4">
            View the full system index →
          </Link>
        </div>
      </div>

      <MidnightGlassSurface level={4} className="mt-12 p-6 sm:p-8">
        <MidnightMetaLine signal>AI Mode</MidnightMetaLine>
        <p className="mt-2 font-serif italic text-xl sm:text-2xl text-[var(--ink)] max-w-2xl">
          A synthesis layer over Anita's indexed engineering archive.
        </p>
        <Link to="/ai-mode" className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--decoration-primary)] hover:underline underline-offset-4">
          Query the system →
        </Link>
      </MidnightGlassSurface>

      <MidnightGlassSurface level={2} className="mt-8 p-6 sm:p-8">
        <MidnightMetaLine>Profile</MidnightMetaLine>
        <h2 className="mt-2 font-serif text-2xl text-[var(--ink)]">{profile.name}</h2>
        <p className="mt-1 text-sm text-[var(--ink-soft)]">{profile.degree} &middot; {profile.universityShort}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)] max-w-2xl">{profile.blurb}</p>
      </MidnightGlassSurface>
    </div>
  );
}

export default function Home() {
  const [paa, setPaa] = useState(fallbackPAA);
  const [searched, setSearched] = useState(false);
  const { currentTheme } = useTheme();

  useEffect(() => {
    axios
      .get(`${API}/ai/search`, { params: { q: "anita george" } })
      .then((r) => {
        if (r.data?.people_also_ask?.length) setPaa(r.data.people_also_ask);
      })
      .catch(() => {});
  }, []);

  if (currentTheme === "search") {
    return <ScholarHome paa={paa} />;
  }

  if (currentTheme === "midnight") {
    return <MidnightHome />;
  }

  return (
    <div data-testid="home-page">
      {/* ── HERO — Centered Search (Google-inspired) ── */}
      <section className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-8 pb-16 overflow-hidden">
        {/* Petal rain in background */}
        <PetalRain />

        {/* Floating botanical decorations with motion */}
        <motion.div
          className="absolute top-8 left-4 sm:left-14 hidden sm:block pointer-events-none"
          animate={{ y: [0, -20, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <CherryBlossom
            className="opacity-75 animate-float-slow"
            size={140}
          />
        </motion.div>
        <motion.div
          className="absolute top-16 right-4 sm:right-16 opacity-65 hidden md:block pointer-events-none"
          animate={{ y: [0, 15, 0], x: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sprig size={100} />
        </motion.div>
        <motion.div
          className="absolute bottom-12 left-1/4 opacity-40 hidden lg:block pointer-events-none"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <CherryBlossom size={80} />
        </motion.div>
        <motion.div
          className="absolute bottom-8 right-1/4 opacity-45 hidden md:block pointer-events-none"
          animate={{ y: [0, 12, 0], x: [0, -6, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        >
          <Sprig size={70} />
        </motion.div>

        {/* Sparkle accents */}
        <motion.div
          className="absolute top-1/3 left-[10%] opacity-60 pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkle size={16} color="#C96B84" />
        </motion.div>
        <motion.div
          className="absolute top-1/4 right-[12%] opacity-50 pointer-events-none"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Sparkle size={12} color="#EDAABB" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 right-[8%] opacity-40 pointer-events-none"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Sparkle size={10} color="#8B3A52" />
        </motion.div>

        {/* Floating petals - create living atmosphere */}
        {[0, 1.2, 2.4, 3.6, 4.8].map((delay, i) => (
          <FloatingPetal key={`petal-${i}`} delay={delay} duration={8 + i} />
        ))}

        {/* Subtle butterflies */}
        {[0, 2, 4].map((delay, i) => (
          <Butterfly key={`butterfly-${i}`} delay={delay} duration={12 + i * 2} />
        ))}

        {/* Center content */}
        <div className="max-w-2xl w-full mx-auto text-center relative z-10">
          {/* Handwritten tagline */}
          <motion.div
            className="font-hand text-[var(--rose)] text-xl sm:text-2xl rotate-[-2deg] inline-block mb-3"
            data-testid="hero-tag"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            — searching anita&apos;s universe —
          </motion.div>

          {/* Google-style colored name logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="mb-2"
          >
            <AnitaLogo large />
          </motion.div>

          {/* Squiggle underline */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
          >
            <Squiggle width={200} color="#EDAABB" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="font-hand text-[var(--plum)] text-xl sm:text-2xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.7 }}
          >
            full-stack engineer · accessibility-first · girl in STEM
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          >
            <SearchBar autoFocus={false} />
          </motion.div>

          {/* Quick search pills — like Google suggestions below search */}
          <motion.div
            className="mt-6 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
          >
            {[
              { label: "Who is Anita?", to: "/ai-mode" },
              { label: "Her Projects", to: "/work" },
              { label: "Experience", to: "/work" },
              { label: "Contact", to: "/contact" },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  to={item.to}
                  className="btn-soft px-4 py-2 text-sm rounded-full font-sans text-ink inline-flex items-center gap-1.5 border-[var(--border-soft)]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* I'm feeling lucky */}
          <div className="mt-4 flex justify-center gap-3 animate-fade-up delay-700">
            <Link
              to="/ai-mode"
              data-testid="hero-ai-btn"
              className="btn-soft px-5 py-2 text-sm rounded-full font-sans text-[var(--plum)] inline-flex items-center gap-1.5"
            >
              <Sparkles size={13} className="text-rose" /> I&apos;m feeling lucky
            </Link>
          </div>
        </div>
      </section>

      {/* Search tabs */}
      <SearchTabs />

      {/* ── RESULTS BODY ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT COLUMN — search results */}
          <div className="lg:col-span-8 space-y-10">
            {/* Results meta */}
            <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--plum)]">
              about 4,219 results · 0.42 seconds · curated by hand
            </div>

            {/* AI Overview block */}
            <div
              className="relative bg-white/80 border border-[var(--border-soft)] rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_-30px_rgba(139,58,82,0.20)]"
              data-testid="ai-overview-card"
            >
              {/* Washi tape */}
              <span
                className="tape tape-pink absolute -top-3 left-10"
                style={{ width: 80, height: 20, transform: "rotate(-9deg)" }}
                aria-hidden
              />
              <span
                className="tape tape-yellow absolute -top-3 right-12"
                style={{ width: 56, height: 20, transform: "rotate(7deg)" }}
                aria-hidden
              />
              <div className="absolute -top-3 left-6 px-3 py-1 bg-[var(--bg-petal)] border border-[var(--border-soft)] rounded-full text-[10px] uppercase tracking-[0.25em] text-[var(--plum)] inline-flex items-center gap-1.5">
                <Sparkles size={11} className="text-rose" /> AI overview
              </div>
              <p className="font-serif italic text-xl sm:text-2xl text-ink leading-snug mt-3">
                &ldquo;{aiOverview.answer.slice(0, 180)}...&rdquo;
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--plum)]">sources</span>
                {aiOverview.citations.map((c, i) => (
                  <a
                    key={c.url}
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-[var(--link)] link-soft"
                  >
                    [{i + 1}] {c.label}
                  </a>
                ))}
              </div>
            </div>

            {/* About result */}
            <ResultCard
              url="anitageorge.vercel.app › about"
              title="Anita George — AI / Full-Stack Engineer at IIIT Kottayam"
              snippet={profile.blurb}
              meta={<><Marker n={1} /><span>about · profile</span></>}
              testid="result-about"
              footer="more from this site → projects · research · contact"
            />

            {/* Featured projects */}
            <div className="space-y-7">
              <div className="flex items-baseline gap-3">
                <h2 className="font-serif text-3xl text-ink">featured projects</h2>
                <span className="font-hand text-[var(--rose)] text-xl">— scrapbook below ↘</span>
              </div>
              {projects.slice(0, 3).map((p, idx) => (
                <ResultCard
                  key={p.slug}
                  url={`anita.dev › projects › ${p.slug}`}
                  title={`${p.name} — ${p.tagline}`}
                  snippet={p.summary}
                  meta={<><Marker n={idx + 2} /><span>{p.year} · {p.tags.slice(0, 2).join(" · ")}</span></>}
                  testid={`result-project-${p.slug}`}
                  footer={<span className="font-hand text-lg text-[var(--rose)]">&ldquo;{p.note}&rdquo;</span>}
                >
                  <div className="mt-3">
                    <Link
                      to={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-1 text-sm text-[var(--link)] link-soft"
                    >
                      read the long version <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </ResultCard>
              ))}
              <div>
                <Link
                  to="/work"
                  data-testid="see-all-projects"
                  className="btn-soft inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                >
                  see all work <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* People Also Ask */}
            <div className="border-y border-[var(--border-soft)] py-7" data-testid="paa-preview">
              <PeopleAlsoAskInline items={paa} query="anita george" />
            </div>

            {/* Experience timeline — journal entries */}
            <div data-testid="experience-section">
              <div className="flex items-baseline gap-3">
                <h2 className="font-serif text-3xl text-ink">journal entries</h2>
                <span className="font-hand text-[var(--rose)] text-xl">— how she got here</span>
              </div>
              <ol className="mt-6 relative pl-6 border-l border-dashed border-[var(--blossom)]/70 space-y-7">
                {experience.map((e, i) => (
                  <li key={`${e.when}-${e.where}`} className="relative">
                    <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[var(--pink)] border border-[var(--rose)]/40" />
                    <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--plum)]">{e.when}</div>
                    <div className="font-serif text-xl text-ink">
                      {e.role} · <span className="italic text-[var(--rose)]">{e.where}</span>
                    </div>
                    <p className="mt-1 text-sm text-ink-soft leading-relaxed max-w-xl">{e.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* RIGHT — knowledge panel sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Knowledge panel */}
            <div
              className="relative bg-white/85 border border-[var(--border-soft)] rounded-3xl p-6"
              data-testid="knowledge-panel"
            >
              {/* Washi tapes */}
              <span
                className="tape tape-pink absolute -top-3 left-8"
                style={{ width: 72, height: 20, transform: "rotate(-8deg)" }}
                aria-hidden
              />
              <span
                className="tape tape-mint absolute -top-3 right-8"
                style={{ width: 52, height: 20, transform: "rotate(10deg)" }}
                aria-hidden
              />
              <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--plum)]">knowledge panel</div>
              <h3 className="font-serif text-3xl text-ink mt-1 leading-tight">{profile.name}</h3>
              <div className="font-hand text-[var(--rose)] text-xl">{profile.tagline}</div>
              <Squiggle width={170} className="mt-3" color="#EDAABB" />
              <dl className="mt-4 grid grid-cols-3 gap-y-3 text-sm">
                {[
                  { k: "role", v: profile.role.split(" · ")[0] },
                  { k: "degree", v: profile.degree },
                  { k: "at", v: `${profile.universityShort} · ${profile.years}` },
                  { k: "gpa", v: profile.gpa },
                  { k: "based", v: profile.location },
                ].map(({ k, v }) => (
                  <React.Fragment key={k}>
                    <dt className="col-span-1 text-[var(--plum)] text-[11px] uppercase tracking-[0.2em]">{k}</dt>
                    <dd className="col-span-2 text-ink">{v}</dd>
                  </React.Fragment>
                ))}
              </dl>
              <div className="mt-4 pt-4 border-t border-[var(--border-soft)] flex flex-wrap gap-2">
                {["Full-Stack", "Graphs", "Accessibility", "UI/UX"].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-[11px] uppercase tracking-[0.2em] bg-[var(--bg-petal)] border border-[var(--border-soft)] rounded-full text-[var(--plum)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Knowledge Garden — skills as flowers */}
            <div
              className="relative bg-[var(--bg-petal)] border border-[var(--border-soft)] rounded-3xl p-6"
              data-testid="skills-panel"
            >
              <Paperclip className="absolute -top-3 right-6 rotate-12" color="#C96B84" />
              <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--plum)] mb-1">knowledge garden</div>
              <div className="font-hand text-[var(--rose)] text-lg mb-3">— skills as flowers</div>
              <ul className="space-y-3">
                {skills.map((g) => (
                  <li key={g.group}>
                    <div className="font-hand text-[var(--plum)] text-lg">{g.group}</div>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {g.items.map((it) => (
                        <span
                          key={it}
                          className="px-2 py-0.5 text-[11px] bg-white/70 border border-[var(--border-soft)] rounded-sm text-ink hover:bg-[var(--pink)]/30 transition-colors"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Obsessions */}
            <div
              className="relative bg-[var(--bg-warm)] border border-[var(--border-soft)] rounded-3xl p-6 notebook-lines"
              data-testid="obsessions-panel"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--plum)]">
                collected obsessions
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {obsessions.map((o, i) => (
                  <li
                    key={o}
                    className="font-hand text-lg leading-tight"
                    style={{ transform: `rotate(${(i % 3 - 1) * 1.5}deg)` }}
                  >
                    <span className="text-[var(--blossom)]">·</span>{" "}
                    <span className="text-ink">{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Internet traces */}
            <div
              className="relative bg-white/85 border border-[var(--border-soft)] rounded-3xl p-6"
              data-testid="internet-traces-panel"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--plum)]">recent tabs</div>
                <span className="font-hand text-[var(--rose)] text-base">— learning</span>
              </div>
              <ul className="divide-y divide-[var(--border-soft)] text-sm">
                {internetTraces.slice(0, 5).map((t) => (
                  <li key={t.title} className="py-2.5 flex items-baseline gap-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--plum)] w-20 shrink-0">{t.time}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-ink truncate text-xs">{t.title}</div>
                      <div className="text-[var(--sage)] text-[11px] font-mono truncate">{t.url}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact preview */}
            <div className="relative bg-white/85 border border-[var(--border-soft)] rounded-3xl p-6">
              <CherryBlossom className="absolute -top-8 -right-4 opacity-70" size={72} />
              <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--plum)]">say hello</div>
              <p className="mt-2 font-serif italic text-xl text-ink">&ldquo;the door is open.&rdquo;</p>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <a href={profile.github} target="_blank" rel="noreferrer" className="link-soft text-ink">
                  github / AnitaGeorge404 ↗
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-soft text-ink">
                  linkedin / anita-george ↗
                </a>
              </div>
              <Link
                to="/contact"
                className="btn-soft mt-4 inline-flex items-center gap-1 px-4 py-1.5 text-xs rounded-full"
              >
                full contact card <ArrowUpRight size={12} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ── ABOUT SPREAD — scrapbook magazine style ── */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 mt-14 mb-20 torn-top">
        <div className="bg-[var(--bg-petal)]/40 rounded-3xl p-8 sm:p-12 border border-[var(--border-soft)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 relative">
              {/* Polaroid frame */}
              <div className="polaroid relative inline-block w-full">
                <span
                  className="tape tape-pink absolute -top-3 left-12"
                  style={{ width: 80, height: 20, transform: "rotate(-8deg)" }}
                  aria-hidden
                />
                <span
                  className="tape tape-mint absolute -top-3 right-10"
                  style={{ width: 60, height: 20, transform: "rotate(7deg)" }}
                  aria-hidden
                />
                <img
                  src="https://images.pexels.com/photos/5040995/pexels-photo-5040995.jpeg"
                  alt="Anita George — profile"
                  className="w-full h-[420px] object-cover"
                  data-testid="about-image"
                />
                <div className="text-center pt-3 font-hand text-[var(--plum)] text-lg">
                  — kollam · kerala · 2024 —
                </div>
              </div>
              <Sparkle className="absolute -top-6 -left-4" size={20} color="#C96B84" />
            </div>

            <div className="lg:col-span-7">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--plum)]">field notes · about me</div>
              <h2 className="font-serif text-5xl sm:text-6xl text-ink leading-[0.95] mt-2">
                i&apos;m <span className="italic text-[var(--rose)]">anita</span> —<br />
                i build across the full stack.
              </h2>
              <Squiggle width={220} className="mt-3" color="#EDAABB" />
              <Quote size={22} className="text-[var(--rose)] mt-4" />
              <p className="mt-3 font-serif italic text-lg text-ink-soft leading-relaxed max-w-xl">
                Computer Science Engineering undergraduate at IIIT Kottayam. I work across backend
                systems, frontend interfaces, and algorithmic foundations — with a particular
                interest in humane technology, accessibility-first UX, and graph-based optimization.
              </p>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl">
                {[
                  { k: "degree", v: "B.Tech CSE" },
                  { k: "at", v: "IIIT Kottayam" },
                  { k: "gpa", v: profile.gpa },
                  { k: "dsa", v: "400+ problems" },
                  { k: "wins", v: "TinkHack · Girlathon" },
                  { k: "stack", v: "Python · React · FastAPI" },
                ].map((m) => (
                  <div key={m.k}>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--plum)]">{m.k}</div>
                    <div className="font-sans text-ink mt-1 text-sm">{m.v}</div>
                  </div>
                ))}
              </div>
              <HandArrow className="mt-6 -ml-2" color="#C96B84" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
