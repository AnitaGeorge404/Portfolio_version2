import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { projects, peopleAlsoAsk } from "@/data/portfolio";
import ResultCard from "@/components/ResultCard";
import PeopleAlsoAskInline from "@/components/PeopleAlsoAskInline";
import { Sparkle, Squiggle, Tape, Marker, Sprig } from "@/components/Decorations";
import { Sparkles, ArrowUpRight, Github, Globe } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const others = projects.filter((p) => p.slug !== slug).slice(0, 3);
  const [paa, setPaa] = useState([]);

  useEffect(() => {
    if (!project) return;
    axios
      .get(`${API}/ai/search`, { params: { q: project.name } })
      .then((r) => setPaa(r.data?.people_also_ask || []))
      .catch(() => {});
  }, [project]);

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20" data-testid="project-not-found">
        <div className="text-[11px] uppercase tracking-[0.3em] text-plum">404 · no result</div>
        <h1 className="font-serif text-5xl text-ink mt-2">we couldn't find that project</h1>
        <p className="mt-3 font-serif italic text-xl text-ink-soft">
          maybe try the <Link className="link-soft text-link" to="/projects">pinterest view</Link>?
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12" data-testid={`project-detail-${slug}`}>
      <div className="text-[11px] tracking-[0.2em] uppercase text-plum">
        about 1 result · projects · {project.year}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-4">
        {/* MAIN */}
        <div className="lg:col-span-8 space-y-10">
          {/* hero result */}
          <article>
            <div className="flex items-center gap-2 text-xs text-sage font-mono-soft">
              <span className="w-4 h-4 rounded-full bg-tag border border-[var(--border-soft)] inline-block" />
              <span>anita.dev › projects › {project.slug}</span>
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl text-ink mt-2 leading-[0.95]">
              <span className="italic">{project.name}</span>
              <span className="font-light text-plum"> — {project.tagline}</span>
            </h1>
            <Squiggle width={220} className="mt-3" />
            <p className="mt-4 text-lg text-ink-soft leading-relaxed max-w-2xl">{project.summary}</p>
            <div className="mt-2 font-hand text-plum text-xl">"{project.note}"</div>
          </article>

          {/* AI summary */}
          <div className="relative bg-white/80 border border-lavender rounded-2xl p-6">
            <div className="absolute -top-3 left-6 px-2.5 py-1 bg-paper border border-lavender rounded-full text-[10px] uppercase tracking-[0.25em] text-plum inline-flex items-center gap-1.5">
              <Sparkles size={11} className="text-sage" /> AI summary
            </div>
            <p className="font-serif italic text-2xl text-ink leading-snug mt-1">
              "{project.name} is a {project.tagline}. {project.summary.split(".")[0]}."
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] bg-tag border border-[var(--border-soft)] text-plum rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* image / hero */}
          <div className="relative">
            <Tape className="-top-3 left-10" w={90} rotate={-8} />
            <Tape className="-top-3 right-10" w={70} rotate={6} />
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-[420px] object-cover rounded-sm border border-[var(--border-soft)] shadow-[0_30px_60px_-40px_rgba(45,42,38,0.45)]"
            />
            <div className="absolute -bottom-4 right-4 bg-paper border border-[var(--border-soft)] px-3 py-1 font-hand text-plum text-lg rotate-[2deg]">
              process screenshot · placeholder
            </div>
          </div>

          {/* sections — Google-style result cards */}
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
                <span key={s} className="px-2 py-0.5 text-[11px] bg-tag border border-[var(--border-soft)] text-ink rounded-sm">{s}</span>
              ))}
            </div>
          </ResultCard>
          <ResultCard
            url={`anita.dev › projects › ${project.slug} › outcomes`}
            title="what came out of it"
            snippet={project.outcomes || project.failures || ""}
            meta={<><Marker n={3} /><span>chapter 3 · outcomes & status</span></>}
            footer={project.status ? `status: ${project.status}` : undefined}
          />

          {/* related searches */}
          <div className="border-y border-[var(--border-soft)] py-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-plum">related searches</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "humane technology",
                "graph theory beauty",
                "soft software",
                "feminine internet",
                project.tagline,
              ].map((t) => (
                <Link
                  to={`/ai-mode?q=${encodeURIComponent(t)}`}
                  key={t}
                  className="px-3 py-1.5 text-sm bg-tag border border-[var(--border-soft)] rounded-full text-ink hover:bg-warm transition"
                >
                  ↗ {t}
                </Link>
              ))}
            </div>
          </div>

          {/* people also ask — contextual, semantic */}
          {paa.length > 0 && (
            <div data-testid="paa-on-detail">
              <PeopleAlsoAskInline items={paa} query={project.name} />
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="relative bg-white/80 border border-[var(--border-soft)] rounded-2xl p-6">
            <Tape className="-top-3 left-8" rotate={-8} />
            <div className="text-[10px] uppercase tracking-[0.3em] text-plum">project card</div>
            <h3 className="font-serif text-3xl text-ink mt-1 leading-tight">{project.name}</h3>
            <div className="font-hand text-plum text-lg">— {project.year}</div>
            <Squiggle width={150} className="mt-2" />
            <dl className="mt-3 grid grid-cols-3 gap-y-2 text-sm">
              <dt className="col-span-1 text-plum text-[11px] uppercase tracking-[0.2em]">stack</dt>
              <dd className="col-span-2 text-ink">{project.stack.join(", ")}</dd>
              <dt className="col-span-1 text-plum text-[11px] uppercase tracking-[0.2em]">tags</dt>
              <dd className="col-span-2 text-ink">{project.tags.join(", ")}</dd>
              <dt className="col-span-1 text-plum text-[11px] uppercase tracking-[0.2em]">status</dt>
              <dd className="col-span-2 text-ink-soft italic">{project.status || "active"}</dd>
            </dl>
            <div className="mt-4 flex flex-col gap-2">
              <a className="btn-soft inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm" href="https://github.com/AnitaGeorge404/" target="_blank" rel="noreferrer">
                <Github size={14} /> source on github
              </a>
              <a className="btn-soft inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm" href="https://anitageorge.vercel.app/" target="_blank" rel="noreferrer">
                <Globe size={14} /> portfolio
              </a>
            </div>
          </div>

          {/* themes */}
          <div className="relative bg-paper border border-[var(--border-soft)] rounded-2xl p-6 grid-paper">
            <Sprig className="absolute -top-12 -right-3 opacity-70" size={70} />
            <div className="text-[10px] uppercase tracking-[0.3em] text-plum">themes in this project</div>
            <ul className="mt-3 space-y-2 font-hand text-xl text-ink leading-tight">
              {(project.themes || []).map((t) => (
                <li key={t}>· {t}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* other projects */}
      <div className="mt-16">
        <div className="flex items-baseline gap-3">
          <h2 className="font-serif text-3xl text-ink">other things i made</h2>
          <span className="font-hand text-plum text-lg">— softer when read together</span>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {others.map((o) => (
            <Link
              to={`/projects/${o.slug}`}
              key={o.slug}
              data-testid={`other-project-${o.slug}`}
              className="pin-card group bg-white border border-[var(--border-soft)] rounded-sm overflow-hidden p-2.5"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={o.image} alt={o.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-2 px-1">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-xl text-ink">{o.name}</h3>
                  <ArrowUpRight size={14} className="text-plum" />
                </div>
                <div className="font-hand text-plum text-base">— {o.tagline}</div>
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
