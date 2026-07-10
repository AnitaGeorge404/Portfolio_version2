import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { projects, peopleAlsoAsk } from "@/data/portfolio";
import ResultCard from "@/components/ResultCard";
import PeopleAlsoAskInline from "@/components/PeopleAlsoAskInline";
import { Sparkle, Squiggle, Tape, Marker, Sprig, CherryBlossom } from "@/components/Decorations";
import { Sparkles, ArrowUpRight, Github, Globe } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { ScholarMetaLine } from "@/components/ScholarPrimitives";
import { MidnightMetaLine, MidnightGlassSurface } from "@/components/MidnightPrimitives";
import { HerbariumFieldLabel, HerbariumSpecimenSheet, SpecimenFieldLabel, FernFrond } from "@/components/HerbariumPrimitives";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
const API = BACKEND_URL ? `${BACKEND_URL}/api` : "/api";

function ScholarProjectDetail({ project, others, paa }) {
  const sections = [
    ["Overview", project.summary],
    ["Problem / motivation", project.motivation],
    ["System / architecture", project.architecture],
    ["Outcomes / current status", project.outcomes],
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12" data-testid={`project-detail-${project.slug}`}>
      <ScholarMetaLine>Record type: Project</ScholarMetaLine>
      <h1 className="mt-1 font-serif text-3xl sm:text-4xl text-[var(--ink)]">{project.name}</h1>
      <p className="mt-1.5 text-[15px] text-[var(--ink-soft)]">{project.tagline}</p>

      <dl className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm py-4 border-y border-[var(--border-soft)]">
        <div><dt className="font-mono text-[11px] text-[var(--ink-soft)]">Creator</dt><dd className="text-[var(--ink)]">Anita George</dd></div>
        <div><dt className="font-mono text-[11px] text-[var(--ink-soft)]">Year</dt><dd className="text-[var(--ink)]">{project.year}</dd></div>
        <div><dt className="font-mono text-[11px] text-[var(--ink-soft)]">Status</dt><dd className="text-[var(--ink)]">{project.status || "active"}</dd></div>
        <div><dt className="font-mono text-[11px] text-[var(--ink-soft)]">Technical areas</dt><dd className="text-[var(--ink)]">{project.tags.slice(0, 2).join(", ")}</dd></div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-x-5 text-sm">
        <a href="https://github.com/AnitaGeorge404/" target="_blank" rel="noreferrer" className="text-[var(--link)] hover:underline underline-offset-4">
          Repository
        </a>
        <Link to={`/ai-mode?q=${encodeURIComponent(project.name)}`} className="text-[var(--link)] hover:underline underline-offset-4">
          Explore this project with AI
        </Link>
      </div>

      {sections.map(([title, body]) =>
        body ? (
          <div key={title} className="mt-8 pt-6 border-t border-[var(--border-soft)]">
            <h2 className="font-serif text-xl text-[var(--ink)]">{title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink)] max-w-2xl">{body}</p>
          </div>
        ) : null
      )}

      {project.features?.length > 0 && (
        <div className="mt-8 pt-6 border-t border-[var(--border-soft)]">
          <h2 className="font-serif text-xl text-[var(--ink)]">Key features</h2>
          <ul className="mt-2 space-y-1 text-[15px] text-[var(--ink)] list-disc list-inside">
            {project.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-[var(--border-soft)]">
        <h2 className="font-serif text-xl text-[var(--ink)]">Technologies</h2>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {project.stack.map((s) => (
            <span key={s} className="font-mono text-[12px] text-[var(--ink-soft)] border border-[var(--border-soft)] px-1.5 py-0.5">
              {s}
            </span>
          ))}
        </div>
      </div>

      {paa.length > 0 && (
        <div className="mt-8 pt-6 border-t border-[var(--border-soft)]" data-testid="paa-on-detail">
          <PeopleAlsoAskInline items={paa} query={project.name} variant="compact" />
        </div>
      )}

      <div className="mt-10 pt-6 border-t border-[var(--border-soft)]">
        <h2 className="font-serif text-xl text-[var(--ink)]">Related indexed work</h2>
        <div className="mt-2">
          {others.map((o) => (
            <Link
              key={o.slug}
              to={`/projects/${o.slug}`}
              data-testid={`other-project-${o.slug}`}
              className="block py-3 border-b border-[var(--border-soft)]"
            >
              <span className="text-lg font-serif text-[var(--link)] hover:underline underline-offset-4">{o.name}</span>
              <span className="ml-2 text-sm text-[var(--ink-soft)]">{o.tagline}</span>
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Link to="/projects" className="text-sm text-[var(--link)] hover:underline underline-offset-4">
            ← Full project index
          </Link>
        </div>
      </div>
    </div>
  );
}

function MidnightProjectDetail({ project, others }) {
  const sections = [
    ["Overview", project.summary],
    ["System model", project.architecture],
    ["Human context", project.motivation],
    ["Outcomes", project.outcomes],
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14" data-testid={`project-detail-${project.slug}`}>
      <MidnightMetaLine signal>System identity</MidnightMetaLine>
      <h1 className="mt-2 font-serif italic text-4xl sm:text-5xl text-[var(--ink)]">{project.name}</h1>
      <p className="mt-2 text-[15px] text-[var(--ink-soft)]">{project.tagline}</p>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-[var(--border-soft)] text-sm">
        <div><MidnightMetaLine>Year</MidnightMetaLine><div className="mt-1 text-[var(--ink)]">{project.year}</div></div>
        <div><MidnightMetaLine>Status</MidnightMetaLine><div className="mt-1 text-[var(--ink)]">{project.status || "active"}</div></div>
        <div><MidnightMetaLine>Domains</MidnightMetaLine><div className="mt-1 text-[var(--ink)]">{project.tags.slice(0, 2).join(", ")}</div></div>
        <div><MidnightMetaLine>Creator</MidnightMetaLine><div className="mt-1 text-[var(--ink)]">Anita George</div></div>
      </div>

      <div className="mt-5">
        <Link to={`/ai-mode?q=${encodeURIComponent(project.name)}`} className="text-sm text-[var(--decoration-primary)] hover:underline underline-offset-4">
          Query this system with AI →
        </Link>
      </div>

      {sections.map(([title, body]) =>
        body ? (
          <MidnightGlassSurface key={title} level={2} className="mt-6 p-6">
            <MidnightMetaLine>{title}</MidnightMetaLine>
            <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink)] max-w-2xl">{body}</p>
          </MidnightGlassSurface>
        ) : null
      )}

      <MidnightGlassSurface level={2} className="mt-6 p-6">
        <MidnightMetaLine>Technical layer</MidnightMetaLine>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {project.stack.map((s) => (
            <span key={s} className="font-mono text-[11px] text-[var(--sage)] border border-[var(--border-soft)] px-1.5 py-0.5">
              {s}
            </span>
          ))}
        </div>
      </MidnightGlassSurface>

      <div className="mt-10">
        <MidnightMetaLine className="mb-3">Related intelligence</MidnightMetaLine>
        {others.map((o) => (
          <Link key={o.slug} to={`/projects/${o.slug}`} data-testid={`other-project-${o.slug}`} className="block py-3 border-b border-[var(--border-soft)] group">
            <span className="font-serif italic text-lg text-[var(--ink)] group-hover:text-[var(--decoration-primary)] transition-colors">{o.name}</span>
            <span className="ml-2 text-sm text-[var(--ink-soft)]">{o.tagline}</span>
          </Link>
        ))}
        <div className="mt-4">
          <Link to="/projects" className="text-sm text-[var(--decoration-primary)] hover:underline underline-offset-4">← Full system catalog</Link>
        </div>
      </div>
    </div>
  );
}

function HerbariumProjectDetail({ project, others }) {
  const sections = [
    ["Overview", project.summary],
    ["Observed problem", project.motivation],
    ["System response", project.architecture],
    ["Outcomes", project.outcomes],
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14" data-testid={`project-detail-${project.slug}`}>
      <HerbariumFieldLabel>Field record</HerbariumFieldLabel>
      <h1 className="mt-2 font-serif italic text-4xl sm:text-5xl text-[var(--ink)]">{project.name}</h1>
      <p className="mt-2 text-[15px] text-[var(--ink-soft)]">{project.tagline}</p>

      <HerbariumSpecimenSheet id={`FIELD RECORD · ${project.year}`} title={project.status || "active"} className="mt-6">
        <div className="relative">
          <FernFrond className="absolute -top-2 -right-2 opacity-30 hidden sm:block" size={50} color="var(--burgundy)" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div><SpecimenFieldLabel>System class</SpecimenFieldLabel><div className="mt-1 text-[var(--specimen-ink)]">{project.tags[0]}</div></div>
            <div><SpecimenFieldLabel>Technical themes</SpecimenFieldLabel><div className="mt-1 text-[var(--specimen-ink)]">{project.tags.slice(0, 2).join(", ")}</div></div>
            <div><SpecimenFieldLabel>Creator</SpecimenFieldLabel><div className="mt-1 text-[var(--specimen-ink)]">Anita George</div></div>
          </div>
          <div className="mt-4">
            <Link to={`/ai-mode?q=${encodeURIComponent(project.name)}`} className="text-sm text-[var(--burgundy)] hover:underline underline-offset-4">
              Explore this specimen with AI →
            </Link>
          </div>
        </div>
      </HerbariumSpecimenSheet>

      {sections.map(([title, body]) =>
        body ? (
          <HerbariumSpecimenSheet key={title} title={title} className="mt-5">
            <p className="text-[15px] leading-relaxed text-[var(--specimen-ink)] max-w-2xl">{body}</p>
          </HerbariumSpecimenSheet>
        ) : null
      )}

      {project.features?.length > 0 && (
        <HerbariumSpecimenSheet title="Key features" className="mt-5">
          <ul className="space-y-1 text-[15px] text-[var(--specimen-ink)] list-disc list-inside">
            {project.features.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </HerbariumSpecimenSheet>
      )}

      <HerbariumSpecimenSheet title="Technical structure" className="mt-5">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {project.stack.map((s) => (
            <span key={s} className="font-mono text-[11px] text-[var(--specimen-ink-soft)] border border-[var(--specimen-border)] px-1.5 py-0.5">
              {s}
            </span>
          ))}
        </div>
      </HerbariumSpecimenSheet>

      <div className="mt-10">
        <HerbariumFieldLabel className="mb-3">Related specimens</HerbariumFieldLabel>
        {others.map((o) => (
          <Link key={o.slug} to={`/projects/${o.slug}`} data-testid={`other-project-${o.slug}`} className="block py-3 border-b border-[var(--border-soft)] group">
            <span className="font-serif italic text-lg text-[var(--ink)] group-hover:text-[var(--decoration-primary)] transition-colors">{o.name}</span>
            <span className="ml-2 text-sm text-[var(--ink-soft)]">{o.tagline}</span>
          </Link>
        ))}
        <div className="mt-4">
          <Link to="/projects" className="text-sm text-[var(--decoration-primary)] hover:underline underline-offset-4">← Full specimen catalog</Link>
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const others = projects.filter((p) => p.slug !== slug).slice(0, 3);
  const [paa, setPaa] = useState([]);
  const { currentTheme } = useTheme();

  useEffect(() => {
    if (!project) return;
    axios
      .get(`${API}/ai/search`, { params: { q: project.name } })
      .then((r) => setPaa(r.data?.people_also_ask || []))
      .catch(() => {});
  }, [project]);

  if (!project) {
    if (currentTheme === "search") {
      return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20" data-testid="project-not-found">
          <ScholarMetaLine>No matching record</ScholarMetaLine>
          <h1 className="mt-1 font-serif text-3xl text-[var(--ink)]">This project isn&apos;t indexed</h1>
          <p className="mt-3 text-[15px] text-[var(--ink-soft)]">
            Try the <Link className="text-[var(--link)] hover:underline" to="/projects">full project index</Link>.
          </p>
        </div>
      );
    }
    if (currentTheme === "midnight") {
      return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20" data-testid="project-not-found">
          <MidnightMetaLine signal>No matching signal</MidnightMetaLine>
          <h1 className="mt-2 font-serif italic text-3xl text-[var(--ink)]">This system isn&apos;t indexed.</h1>
          <p className="mt-3 text-[15px] text-[var(--ink-soft)]">
            Try the <Link className="text-[var(--decoration-primary)] hover:underline" to="/projects">full system catalog</Link>.
          </p>
        </div>
      );
    }
    if (currentTheme === "herbarium") {
      return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20" data-testid="project-not-found">
          <HerbariumFieldLabel>No field record found</HerbariumFieldLabel>
          <h1 className="mt-2 font-serif italic text-3xl text-[var(--ink)]">This specimen isn&apos;t catalogued.</h1>
          <p className="mt-3 text-[15px] text-[var(--ink-soft)]">
            Try the <Link className="text-[var(--decoration-primary)] hover:underline" to="/projects">full specimen catalog</Link>.
          </p>
        </div>
      );
    }
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20" data-testid="project-not-found">
        <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--plum)]">404 · no result</div>
        <h1 className="font-serif text-5xl text-ink mt-2">we couldn&apos;t find that project</h1>
        <p className="mt-3 font-serif italic text-xl text-ink-soft">
          maybe try the <Link className="link-soft text-[var(--link)]" to="/projects">full archive</Link>?
        </p>
      </div>
    );
  }

  if (currentTheme === "search") {
    return <ScholarProjectDetail project={project} others={others} paa={paa} />;
  }

  if (currentTheme === "midnight") {
    return <MidnightProjectDetail project={project} others={others} />;
  }

  if (currentTheme === "herbarium") {
    return <HerbariumProjectDetail project={project} others={others} />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12" data-testid={`project-detail-${slug}`}>
      <div className="text-[11px] tracking-[0.2em] uppercase text-[var(--plum)]">
        about 1 result · projects · {project.year}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-4">
        {/* MAIN */}
        <div className="lg:col-span-8 space-y-10">
          {/* Hero result */}
          <article>
            <div className="flex items-center gap-2 text-xs text-[var(--sage)] font-mono">
              <span className="w-4 h-4 rounded-full bg-[var(--bg-petal)] border border-[var(--border-soft)] inline-block" />
              <span>anita.dev › projects › {project.slug}</span>
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl text-ink mt-2 leading-[0.95]">
              <span className="italic" style={{ color: "#C96B84" }}>{project.name}</span>
              <span className="font-light text-[var(--plum)]"> — {project.tagline}</span>
            </h1>
            <Squiggle width={220} className="mt-3" color="#EDAABB" />
            <p className="mt-4 text-lg text-ink-soft leading-relaxed max-w-2xl">{project.summary}</p>
            <div className="mt-2 font-hand text-[var(--rose)] text-xl">&ldquo;{project.note}&rdquo;</div>
          </article>

          {/* AI summary */}
          <div className="relative bg-white/85 border border-[var(--border-soft)] rounded-3xl p-6 shadow-[0_12px_40px_-20px_rgba(139,58,82,0.15)]">
            <span
              className="tape tape-pink absolute -top-3 left-8"
              style={{ width: 80, height: 20, transform: "rotate(-8deg)" }}
              aria-hidden
            />
            <div className="absolute -top-3 left-6 px-2.5 py-1 bg-[var(--bg-petal)] border border-[var(--border-soft)] rounded-full text-[10px] uppercase tracking-[0.25em] text-[var(--plum)] inline-flex items-center gap-1.5">
              <Sparkles size={11} className="text-rose" /> AI summary
            </div>
            <p className="font-serif italic text-xl text-ink leading-snug mt-3">
              &ldquo;{project.name} is a {project.tagline}. {project.summary.split(".")[0]}.&rdquo;
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] bg-[var(--bg-petal)] border border-[var(--border-soft)] text-[var(--plum)] rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Polaroid hero image */}
          <div className="polaroid relative">
            <span
              className="tape tape-pink absolute -top-3 left-10"
              style={{ width: 88, height: 20, transform: "rotate(-8deg)" }}
              aria-hidden
            />
            <span
              className="tape tape-yellow absolute -top-3 right-10"
              style={{ width: 64, height: 20, transform: "rotate(6deg)" }}
              aria-hidden
            />
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-[380px] object-cover"
            />
            <div className="absolute -bottom-2 right-4 bg-[var(--bg-petal)] border border-[var(--border-soft)] px-3 py-1 font-hand text-[var(--plum)] text-lg rotate-[2deg]">
              {project.name} · {project.year}
            </div>
          </div>

          {/* Scrapbook sections */}
          <ResultCard
            url={`anita.dev › projects › ${project.slug} › motivation`}
            title="why i built it"
            snippet={project.motivation}
            meta={<><Marker n={1} /><span>chapter 1 · motivation</span></>}
          />
          <ResultCard
            url={`anita.dev › projects › ${project.slug} › architecture`}
            title="how it works under the hood"
            snippet={project.architecture}
            meta={<><Marker n={2} /><span>chapter 2 · architecture</span></>}
          >
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 text-[11px] bg-[var(--bg-petal)] border border-[var(--border-soft)] text-ink rounded-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </ResultCard>
          <ResultCard
            url={`anita.dev › projects › ${project.slug} › outcomes`}
            title="what came out of it"
            snippet={project.outcomes || ""}
            meta={<><Marker n={3} /><span>chapter 3 · outcomes &amp; status</span></>}
            footer={project.status ? `status: ${project.status}` : undefined}
          />

          {/* Related searches */}
          <div className="border-y border-[var(--border-soft)] py-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--plum)]">related searches</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["humane technology", "graph theory", "soft software", "feminine internet", project.tagline].map((t) => (
                <Link
                  to={`/ai-mode?q=${encodeURIComponent(t)}`}
                  key={t}
                  className="px-3 py-1.5 text-sm bg-[var(--bg-petal)] border border-[var(--border-soft)] rounded-full text-ink hover:bg-[var(--pink)]/30 transition"
                >
                  ↗ {t}
                </Link>
              ))}
            </div>
          </div>

          {paa.length > 0 && (
            <div data-testid="paa-on-detail">
              <PeopleAlsoAskInline items={paa} query={project.name} />
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="relative bg-white/85 border border-[var(--border-soft)] rounded-3xl p-6">
            <span
              className="tape tape-pink absolute -top-3 left-8"
              style={{ width: 64, height: 20, transform: "rotate(-8deg)" }}
              aria-hidden
            />
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--plum)]">project card</div>
            <h3 className="font-serif text-3xl text-ink mt-1 leading-tight">{project.name}</h3>
            <div className="font-hand text-[var(--rose)] text-lg">— {project.year}</div>
            <Squiggle width={150} className="mt-2" color="#EDAABB" />
            <dl className="mt-3 grid grid-cols-3 gap-y-2 text-sm">
              <dt className="col-span-1 text-[var(--plum)] text-[11px] uppercase tracking-[0.2em]">stack</dt>
              <dd className="col-span-2 text-ink">{project.stack.join(", ")}</dd>
              <dt className="col-span-1 text-[var(--plum)] text-[11px] uppercase tracking-[0.2em]">tags</dt>
              <dd className="col-span-2 text-ink">{project.tags.join(", ")}</dd>
              <dt className="col-span-1 text-[var(--plum)] text-[11px] uppercase tracking-[0.2em]">status</dt>
              <dd className="col-span-2 text-ink-soft italic">{project.status || "active"}</dd>
            </dl>
            <div className="mt-4 flex flex-col gap-2">
              <a
                className="btn-soft inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm"
                href="https://github.com/AnitaGeorge404/"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={14} /> source on github
              </a>
              <a
                className="btn-soft inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm"
                href="https://anitageorge.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                <Globe size={14} /> portfolio
              </a>
            </div>
          </div>

          {/* Themes */}
          <div className="relative bg-[var(--bg-petal)] border border-[var(--border-soft)] rounded-3xl p-6 notebook-lines">
            <CherryBlossom className="absolute -top-10 -right-3 opacity-60" size={72} />
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--plum)]">themes in this project</div>
            <ul className="mt-3 space-y-2 font-hand text-xl text-ink leading-tight">
              {(project.themes || []).map((t) => (
                <li key={t}>· {t}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Other projects */}
      <div className="mt-16">
        <div className="flex items-baseline gap-3">
          <h2 className="font-serif text-3xl text-ink">other things i made</h2>
          <span className="font-hand text-[var(--rose)] text-lg">— softer when read together</span>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {others.map((o) => (
            <Link
              to={`/projects/${o.slug}`}
              key={o.slug}
              data-testid={`other-project-${o.slug}`}
              className="pin-card group bg-white border border-[var(--border-soft)] overflow-hidden p-2.5"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={o.image}
                  alt={o.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-2 px-1">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-xl text-ink">{o.name}</h3>
                  <ArrowUpRight size={14} className="text-[var(--plum)]" />
                </div>
                <div className="font-hand text-[var(--rose)] text-base">— {o.tagline}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link to="/projects" className="btn-soft inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm">
            ← back to all projects
          </Link>
        </div>
      </div>
    </div>
  );
}
