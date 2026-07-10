import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  CornerDownLeft,
  FileSearch,
  GitBranch,
  History,
  Layers,
  MessageSquareText,
  Network,
  Search,
  SendHorizontal,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Marker, Rose, Sparkle, Sprig, Squiggle, Tape } from "@/components/Decorations";
import { BotanicalSketch, HandwrittenNote, ScrapbookStamp } from "@/components/BotanicalElements";
import PeopleAlsoAskInline from "@/components/PeopleAlsoAskInline";
import { buildLocalArchiveResponse, normalizeArchiveResponse } from "@/utils/archiveSearch";
import { useTheme } from "@/context/ThemeContext";
import { ThemeIcon } from "@/components/ThemeIcons";
import { ScholarMetaLine } from "@/components/ScholarPrimitives";
import { MidnightMetaLine, MidnightGlassSurface, MidnightQuerySurface } from "@/components/MidnightPrimitives";
import { HerbariumFieldLabel, HerbariumSpecimenSheet, SpecimenFieldLabel, HerbariumSearchSurface } from "@/components/HerbariumPrimitives";

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/$/, "");
const API = BACKEND_URL ? `${BACKEND_URL}/api` : "/api";

const STARTER_QUESTIONS = [
  "Tell me about NeuroBridge.",
  "How does accessibility connect across her projects?",
  "Compare VantaAI and NeuroBridge.",
  "Which repositories are active experiments?",
  "Why does graph theory matter in her work?",
  "Is Anita more backend or frontend focused?",
];

const DEFAULT_STAGES = [
  "analyzing archive intent",
  "retrieving project evidence",
  "connecting themes",
  "retrieving related repositories",
  "checking citation strength",
  "synthesizing grounded response",
];

function makeId(prefix) {
  if (window.crypto?.randomUUID) return `${prefix}-${window.crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * Theme-specific loading signature — flower-bloom / index-scan / facet-resolve /
 * fern-unfurl per themeInteractions.js's `loader` field. One component so every
 * call site (pending message, submit button) gets the right glyph for free.
 */
function TypingDots() {
  const { currentTheme } = useTheme();

  if (currentTheme === "search") {
    return (
      <span className="theme-loader theme-loader-scholar" aria-label="loading">
        <span className="scholar-loader-tick" />
        <span className="scholar-loader-tick" />
        <span className="scholar-loader-tick" />
        <span className="scholar-loader-sweep" />
      </span>
    );
  }

  if (currentTheme === "midnight") {
    return (
      <span className="theme-loader theme-loader-midnight" aria-label="loading">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <polygon points="8,1 14,6 11,15 5,15 2,6" stroke="var(--decoration-primary)" strokeWidth="1" fill="var(--decoration-primary)" fillOpacity="0.18" />
          <polygon points="8,1 14,6 8,8" fill="var(--decoration-primary)" fillOpacity="0.5" className="midnight-loader-facet" />
        </svg>
      </span>
    );
  }

  if (currentTheme === "herbarium") {
    return (
      <span className="theme-loader theme-loader-herbarium" aria-label="loading">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 14 C2 8 4 3 8 2 C7 6 6 9 3 13"
            stroke="var(--burgundy)"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
            className="herbarium-loader-frond"
            pathLength="1"
          />
        </svg>
      </span>
    );
  }

  return (
    <span className="theme-loader theme-loader-archive" aria-label="loading">
      <span className="archive-loader-petal" />
      <span className="archive-loader-petal" style={{ animationDelay: "0.15s" }} />
      <span className="archive-loader-petal" style={{ animationDelay: "0.3s" }} />
    </span>
  );
}

function ArchiveLink({ page, className = "" }) {
  if (!page?.url) return null;
  const content = (
    <>
      <span className="truncate">{page.title || page.url}</span>
      <ThemeIcon role={page.url.startsWith("http") ? "external" : "reference"} size={12} />
    </>
  );

  if (page.url.startsWith("http")) {
    return (
      <a href={page.url} target="_blank" rel="noreferrer" className={`inline-flex min-w-0 items-center gap-1 link-soft ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <Link to={page.url} className={`inline-flex min-w-0 items-center gap-1 link-soft ${className}`}>
      {content}
    </Link>
  );
}

function SignalStrip({ stats }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.26em] text-[var(--plum)]">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--sage)] animate-pulse" />
        {stats?.chunks ?? 65} archive passages
      </span>
      <span>{stats?.projects ?? 6} projects</span>
      <span>{stats?.repositories ?? 7} repositories</span>
      <span>{stats?.mode || "conversational-rag"}</span>
    </div>
  );
}

function StageRail({ loading, activeStage, result }) {
  const stages = result?.analysisStages?.length ? result.analysisStages : DEFAULT_STAGES;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-2" data-testid="semantic-analysis-states">
      {stages.slice(0, 6).map((stage, index) => {
        const isActive = loading && stage === activeStage;
        return (
          <div key={`${stage}-${index}`} className="border border-[var(--border-soft)] bg-white/65 px-3 py-2 min-h-[68px]">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--plum)]">
              <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-[var(--decoration-primary)] animate-pulse" : "bg-[var(--brown)]"}`} />
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="mt-2 text-xs leading-snug text-ink-soft">{stage}</div>
          </div>
        );
      })}
    </div>
  );
}

function UserMessage({ message, index }) {
  const { currentTheme } = useTheme();

  if (currentTheme === "search") {
    return (
      <article className="pt-2" data-testid="ai-user-message">
        <ScholarMetaLine>Query {index != null ? index + 1 : ""}</ScholarMetaLine>
        <p className="mt-0.5 font-serif text-xl text-[var(--ink)]">{message.content}</p>
      </article>
    );
  }

  if (currentTheme === "midnight") {
    return (
      <article className="pt-4" data-testid="ai-user-message">
        <MidnightMetaLine signal>Query {String((index ?? 0) + 1).padStart(2, "0")}</MidnightMetaLine>
        <p className="mt-1 font-serif italic text-xl sm:text-2xl text-[var(--ink)]">{message.content}</p>
      </article>
    );
  }

  if (currentTheme === "herbarium") {
    return (
      <article className="pt-4" data-testid="ai-user-message">
        <HerbariumFieldLabel>Field inquiry {String((index ?? 0) + 1).padStart(2, "0")}</HerbariumFieldLabel>
        <p className="mt-1 font-serif italic text-xl sm:text-2xl text-[var(--ink)]">{message.content}</p>
      </article>
    );
  }

  return (
    <article className="flex justify-end" data-testid="ai-user-message">
      <div
        className="relative max-w-[86%] sm:max-w-[72%] bg-[var(--bg-tag)] border border-[var(--border-soft)] px-4 py-3 shadow-[0_10px_24px_-18px_rgba(45,42,38,0.4)]"
        style={{ transform: "rotate(0.6deg)" }}
      >
        <Tape className="-top-3 right-6" rotate={6} w={44} h={16} variant="mint" />
        <div className="mb-1 flex items-center justify-end gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[var(--plum)]">
          <UserRound size={11} /> asked
        </div>
        <p className="font-hand text-xl leading-snug text-ink">{message.content}</p>
      </div>
    </article>
  );
}

function ProjectCards({ projects = [], onAsk }) {
  if (!projects.length) return null;
  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3" data-testid="related-project-cards">
      {projects.slice(0, 4).map((project) => (
        <div key={project.slug} className="bg-paper/80 border border-[var(--border-soft)] p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <ArchiveLink page={{ title: project.name, url: project.url }} className="font-serif text-xl text-ink" />
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--plum)]">{project.status}</p>
            </div>
            <button type="button" onClick={() => onAsk(`Go deeper on ${project.name}.`)} className="btn-soft shrink-0 p-2" aria-label={`Go deeper on ${project.name}`}>
              <ArrowUpRight size={14} />
            </button>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{project.reason}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {(project.themes || []).slice(0, 3).map((theme) => (
              <span key={theme} className="bg-white/75 border border-[var(--border-soft)] px-2 py-0.5 text-[11px] text-[var(--plum)]">
                {theme}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SemanticGraph({ connections = [] }) {
  if (!connections.length) return null;
  return (
    <div className="mt-5 border border-[var(--border-soft)] bg-[var(--bg-warm)]/45 p-4 grid-paper" data-testid="semantic-graph">
      <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-[var(--plum)]">
        <Network size={12} /> semantic graph
      </div>
      <div className="space-y-3">
        {connections.slice(0, 4).map((connection, index) => (
          <div key={`${connection.source}-${connection.target}-${index}`} className="grid grid-cols-[minmax(0,1fr)_46px_minmax(0,1fr)] items-center gap-2">
            <div className="truncate border border-[var(--border-soft)] bg-white/70 px-3 py-2 text-sm text-ink">{connection.source}</div>
            <div className="relative h-px bg-[var(--brown)]">
              <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--sage)]" />
            </div>
            <div className="truncate border border-[var(--border-soft)] bg-white/70 px-3 py-2 text-sm text-ink">{connection.target}</div>
            <div className="col-span-3 text-xs leading-relaxed text-ink-soft">
              <span className="font-medium text-[var(--plum)]">{connection.theme}</span>: {connection.reason}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CitationList({ citations = [] }) {
  if (!citations.length) return null;
  return (
    <details className="mt-5 border border-[var(--border-soft)] bg-white/70 p-4" data-testid="ai-citations">
      <summary className="cursor-pointer list-none text-[10px] uppercase tracking-[0.26em] text-[var(--plum)] inline-flex items-center gap-2">
        <BookOpen size={12} /> citations from archive
      </summary>
      <ol className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {citations.slice(0, 6).map((source, index) => (
          <li key={`${source.id}-${index}`} className="flex min-w-0 gap-3">
            <Marker n={index + 1} className="mt-1 shrink-0" />
            <div className="min-w-0">
              <ArchiveLink page={{ title: source.title, url: source.url }} className="font-medium text-link" />
              <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-[var(--plum)]">
                {source.source} . relevance {Math.round((source.score || 0) * 100)}%
              </div>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{source.snippet}</p>
            </div>
          </li>
        ))}
      </ol>
    </details>
  );
}

function ScholarAssistantMessage({ message, isLatest, displayedAnswer, onAsk }) {
  const result = message.result || {};
  const answer = isLatest ? displayedAnswer || "" : message.content;
  const engineLabel = result.llm_available ? "AI synthesis · Gemini 2.5 Flash" : result.client_fallback ? "Local indexed archive response" : "AI synthesis · indexed archive";

  return (
    <article className="py-5 border-t border-[var(--border-soft)]" data-testid="ai-assistant-message">
      <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.06em] text-[var(--ink-soft)] font-mono">
        {engineLabel}
        {result.grounded !== false && (
          <span className="inline-flex items-center gap-1 text-[var(--link)]"><ThemeIcon role="success" size={11} /> grounded</span>
        )}
      </div>

      <p className="mt-3 font-serif text-xl sm:text-2xl leading-relaxed text-[var(--ink)] whitespace-pre-line max-w-2xl min-h-[56px]">
        {answer}
        {isLatest && displayedAnswer && displayedAnswer.length < message.content.length && <span className="caret" />}
      </p>

      {result.fallbackReason && !result.client_fallback && (
        <div className="mt-2 text-xs text-[var(--ink-soft)]">{result.fallbackReason}</div>
      )}

      {!!result.relatedProjects?.length && (
        <div className="mt-5">
          <ScholarMetaLine>Indexed evidence</ScholarMetaLine>
          <div className="mt-2 space-y-3" data-testid="related-project-cards">
            {result.relatedProjects.slice(0, 4).map((project) => (
              <div key={project.slug}>
                <ArchiveLink page={{ title: project.name, url: project.url }} className="font-serif text-lg text-[var(--link)]" />
                <span className="ml-2 text-xs uppercase tracking-[0.06em] text-[var(--ink-soft)]">{project.status}</span>
                <p className="text-sm text-[var(--ink)] leading-relaxed">{project.reason}</p>
                <button type="button" onClick={() => onAsk(`Go deeper on ${project.name}.`)} className="text-sm text-[var(--link)] hover:underline underline-offset-4">
                  Go deeper →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!!result.semanticConnections?.length && (
        <div className="mt-5" data-testid="semantic-graph">
          <ScholarMetaLine>Related concepts</ScholarMetaLine>
          <div className="mt-2 space-y-2">
            {result.semanticConnections.slice(0, 4).map((c, i) => (
              <div key={`${c.source}-${c.target}-${i}`} className="text-sm">
                <span className="text-[var(--ink)]">{c.source}</span>
                <span className="mx-2 text-[var(--link)]">→</span>
                <span className="text-[var(--ink)]">{c.target}</span>
                <span className="ml-2 text-[var(--ink-soft)]">— {c.reason}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!!(result.citations || result.sources)?.length && (
        <details className="mt-5" data-testid="ai-citations">
          <summary className="cursor-pointer list-none font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--ink-soft)]">
            Indexed references
          </summary>
          <ol className="mt-2 space-y-2">
            {(result.citations || result.sources).slice(0, 6).map((source, index) => (
              <li key={`${source.id}-${index}`} className="text-sm">
                <span className="font-mono text-[var(--ink-soft)] mr-1.5">[{index + 1}]</span>
                <ArchiveLink page={{ title: source.title, url: source.url }} className="text-[var(--link)]" />
                <span className="ml-2 text-xs text-[var(--ink-soft)]">{source.source} · {Math.round((source.score || 0) * 100)}%</span>
                <p className="mt-0.5 text-[var(--ink-soft)]">{source.snippet}</p>
              </li>
            ))}
          </ol>
        </details>
      )}

      {!!result.relatedSearches?.length && (
        <div className="mt-5">
          <ScholarMetaLine>Related queries</ScholarMetaLine>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
            {result.relatedSearches.slice(0, 7).map((search) => (
              <button
                key={search}
                type="button"
                onClick={() => onAsk(search)}
                className="text-sm text-[var(--link)] hover:underline underline-offset-4"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function MidnightAssistantMessage({ message, isLatest, displayedAnswer, onAsk }) {
  const result = message.result || {};
  const answer = isLatest ? displayedAnswer || "" : message.content;
  const engineLabel = result.llm_available ? "Gemini 2.5 Flash synthesis" : result.client_fallback ? "local archive mode" : "archive synthesis";
  const citations = result.citations || result.sources || [];

  return (
    <MidnightGlassSurface level={4} className="p-6 sm:p-8" as="article">
      <div data-testid="ai-assistant-message">
        <MidnightMetaLine signal>
          {engineLabel}
          {result.grounded !== false && <span className="ml-2 text-[var(--sage)]">· grounded</span>}
        </MidnightMetaLine>

        <p className="mt-4 font-serif italic text-2xl sm:text-[28px] leading-snug text-[var(--ink)] whitespace-pre-line min-h-[64px]">
          {answer}
          {isLatest && displayedAnswer && displayedAnswer.length < message.content.length && <span className="caret" />}
        </p>

        {result.fallbackReason && !result.client_fallback && (
          <div className="mt-3 text-xs text-[var(--ink-soft)]">{result.fallbackReason}</div>
        )}

        {!!result.relatedProjects?.length && (
          <div className="mt-6" data-testid="related-project-cards">
            <MidnightMetaLine>Indexed evidence</MidnightMetaLine>
            <div className="mt-2 space-y-3">
              {result.relatedProjects.slice(0, 4).map((project) => (
                <div key={project.slug} className="border-t border-[var(--border-soft)] pt-3">
                  <ArchiveLink page={{ title: project.name, url: project.url }} className="font-serif italic text-lg text-[var(--ink)]" />
                  <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--sage)]">{project.status}</span>
                  <p className="mt-1 text-sm text-[var(--ink-soft)] leading-relaxed">{project.reason}</p>
                  <button type="button" onClick={() => onAsk(`Go deeper on ${project.name}.`)} className="mt-1 text-sm text-[var(--decoration-primary)] hover:underline underline-offset-4">
                    Go deeper →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {!!result.semanticConnections?.length && (
          <div className="mt-6" data-testid="semantic-graph">
            <MidnightMetaLine>Concept relationships</MidnightMetaLine>
            <div className="mt-2 space-y-2">
              {result.semanticConnections.slice(0, 4).map((c, i) => (
                <div key={`${c.source}-${c.target}-${i}`} className="text-sm">
                  <span className="text-[var(--ink)]">{c.source}</span>
                  <span className="mx-2 text-[var(--decoration-primary)]">—</span>
                  <span className="text-[var(--ink)]">{c.target}</span>
                  <div className="text-[var(--ink-soft)] text-xs mt-0.5">{c.reason}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!!citations.length && (
          <details className="mt-6" data-testid="ai-citations">
            <summary className="cursor-pointer list-none">
              <MidnightMetaLine>Evidence records</MidnightMetaLine>
            </summary>
            <ol className="mt-2 space-y-2">
              {citations.slice(0, 6).map((source, index) => (
                <li key={`${source.id}-${index}`} className="text-sm border-t border-[var(--border-soft)] pt-2">
                  <span className="font-mono text-[var(--decoration-primary)] mr-1.5">{String(index + 1).padStart(2, "0")} /</span>
                  <ArchiveLink page={{ title: source.title, url: source.url }} className="text-[var(--ink)]" />
                  <span className="ml-2 text-xs text-[var(--sage)]">{Math.round((source.score || 0) * 100)}%</span>
                  <p className="mt-0.5 text-[var(--ink-soft)]">{source.snippet}</p>
                </li>
              ))}
            </ol>
          </details>
        )}

        {!!result.relatedSearches?.length && (
          <div className="mt-6 pt-4 border-t border-[var(--border-soft)]">
            <MidnightMetaLine>Continue investigation</MidnightMetaLine>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
              {result.relatedSearches.slice(0, 7).map((search) => (
                <button key={search} type="button" onClick={() => onAsk(search)} className="text-sm text-[var(--decoration-primary)] hover:underline underline-offset-4">
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </MidnightGlassSurface>
  );
}

function HerbariumAssistantMessage({ message, isLatest, displayedAnswer, onAsk }) {
  const result = message.result || {};
  const answer = isLatest ? displayedAnswer || "" : message.content;
  const engineLabel = result.llm_available ? "Gemini 2.5 field synthesis" : result.client_fallback ? "local field archive" : "archive synthesis";
  const citations = result.citations || result.sources || [];

  return (
    <HerbariumSpecimenSheet id="FIELD SYNTHESIS" title={engineLabel} as="article">
      <div data-testid="ai-assistant-message">
        {result.grounded !== false && <SpecimenFieldLabel className="mb-2">Observed &amp; grounded</SpecimenFieldLabel>}

        <p className="font-serif italic text-2xl sm:text-[28px] leading-snug text-[var(--specimen-ink)] whitespace-pre-line min-h-[64px]">
          {answer}
          {isLatest && displayedAnswer && displayedAnswer.length < message.content.length && <span className="caret" />}
        </p>

        {result.fallbackReason && !result.client_fallback && (
          <div className="mt-3 text-xs text-[var(--specimen-ink-soft)]">{result.fallbackReason}</div>
        )}

        {!!result.relatedProjects?.length && (
          <div className="mt-6" data-testid="related-project-cards">
            <SpecimenFieldLabel>Related specimens</SpecimenFieldLabel>
            <div className="mt-2 space-y-3">
              {result.relatedProjects.slice(0, 4).map((project) => (
                <div key={project.slug} className="border-t border-[var(--specimen-border)] pt-3">
                  <ArchiveLink page={{ title: project.name, url: project.url }} className="font-serif italic text-lg text-[var(--specimen-ink)]" />
                  <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--specimen-ink-soft)]">{project.status}</span>
                  <p className="mt-1 text-sm text-[var(--specimen-ink-soft)] leading-relaxed">{project.reason}</p>
                  <button type="button" onClick={() => onAsk(`Go deeper on ${project.name}.`)} className="mt-1 text-sm text-[var(--burgundy)] hover:underline underline-offset-4">
                    Go deeper →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {!!result.semanticConnections?.length && (
          <div className="mt-6" data-testid="semantic-graph">
            <SpecimenFieldLabel>System ecology</SpecimenFieldLabel>
            <div className="mt-2 space-y-2">
              {result.semanticConnections.slice(0, 4).map((c, i) => (
                <div key={`${c.source}-${c.target}-${i}`} className="text-sm">
                  <span className="text-[var(--specimen-ink)]">{c.source}</span>
                  <span className="mx-2 text-[var(--burgundy)]">↝</span>
                  <span className="text-[var(--specimen-ink)]">{c.target}</span>
                  <div className="text-[var(--specimen-ink-soft)] text-xs mt-0.5">{c.reason}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!!citations.length && (
          <details className="mt-6" data-testid="ai-citations">
            <summary className="cursor-pointer list-none">
              <SpecimenFieldLabel>Archive references</SpecimenFieldLabel>
            </summary>
            <ol className="mt-2 space-y-2">
              {citations.slice(0, 6).map((source, index) => (
                <li key={`${source.id}-${index}`} className="text-sm border-t border-[var(--specimen-border)] pt-2">
                  <span className="font-mono text-[var(--burgundy)] mr-1.5">[{String(index + 1).padStart(2, "0")}]</span>
                  <ArchiveLink page={{ title: source.title, url: source.url }} className="text-[var(--specimen-ink)]" />
                  <span className="ml-2 text-xs text-[var(--specimen-ink-soft)]">{Math.round((source.score || 0) * 100)}%</span>
                  <p className="mt-0.5 text-[var(--specimen-ink-soft)]">{source.snippet}</p>
                </li>
              ))}
            </ol>
          </details>
        )}

        {!!result.relatedSearches?.length && (
          <div className="mt-6 pt-4 border-t border-[var(--specimen-border)]">
            <SpecimenFieldLabel>Continue exploring</SpecimenFieldLabel>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
              {result.relatedSearches.slice(0, 7).map((search) => (
                <button key={search} type="button" onClick={() => onAsk(search)} className="text-sm text-[var(--burgundy)] hover:underline underline-offset-4">
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </HerbariumSpecimenSheet>
  );
}

function AssistantMessage({ message, isLatest, displayedAnswer, onAsk }) {
  const { currentTheme } = useTheme();
  const result = message.result || {};
  const answer = isLatest ? displayedAnswer || "" : message.content;
  const engineLabel = result.llm_available ? "Gemini 2.5 Flash RAG" : result.client_fallback ? "local archive fallback" : "archive RAG";

  if (currentTheme === "search") {
    return <ScholarAssistantMessage message={message} isLatest={isLatest} displayedAnswer={displayedAnswer} onAsk={onAsk} />;
  }

  if (currentTheme === "midnight") {
    return <MidnightAssistantMessage message={message} isLatest={isLatest} displayedAnswer={displayedAnswer} onAsk={onAsk} />;
  }

  if (currentTheme === "herbarium") {
    return <HerbariumAssistantMessage message={message} isLatest={isLatest} displayedAnswer={displayedAnswer} onAsk={onAsk} />;
  }

  return (
    <motion.article 
      className="relative pressed-paper archive-folder journal-shadow p-5 sm:p-6 border-l-4 border-[var(--rose)]"
      data-testid="ai-assistant-message"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Tape className="-top-3 right-8" rotate={-8} w={64} variant="pink" />
      
      {/* Botanical sketch decorating the corner */}
      <motion.div
        className="absolute top-4 right-6 opacity-30 hidden sm:block"
        animate={{ rotate: [0, 2, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <BotanicalSketch className="w-8 h-8" />
      </motion.div>

      <motion.div 
        className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[var(--plum)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Sparkles size={11} className="text-[var(--sage)]" />
        {engineLabel}
        <span className="text-[var(--brown)]">.</span>
        <span className="font-hand normal-case text-xs">{result.intent || "archive"}</span>
        {result.grounded !== false && (
          <>
            <span className="text-[var(--brown)]">.</span>
            <span className="inline-flex items-center gap-1"><ThemeIcon role="success" size={11} /> grounded</span>
          </>
        )}
      </motion.div>

      <motion.p 
        className="mt-4 font-serif text-2xl sm:text-[29px] leading-snug text-ink whitespace-pre-line min-h-[72px]"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        {answer}
        {isLatest && displayedAnswer && displayedAnswer.length < message.content.length && <span className="caret" />}
      </motion.p>

      {result.fallbackReason && !result.client_fallback && (
        <div className="mt-3 text-xs text-ink-soft">{result.fallbackReason}</div>
      )}

      <ProjectCards projects={result.relatedProjects} onAsk={onAsk} />
      <SemanticGraph connections={result.semanticConnections} />
      <CitationList citations={result.citations || result.sources} />

      {!!result.relatedSearches?.length && (
        <motion.div 
          className="mt-5 border-t border-[var(--border-soft)] pt-4 delicate-divider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.26em] text-[var(--plum)]">
            <Layers size={12} /> follow-up searches
          </div>
          <motion.div 
            className="flex flex-wrap gap-2"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {result.relatedSearches.slice(0, 7).map((search) => (
              <motion.button
                key={search}
                type="button"
                onClick={() => onAsk(search)}
                className="sticky-note bg-[var(--bg-tag)] border border-[var(--border-soft)] px-3 py-1.5 text-sm text-ink hover:bg-[var(--bg-warm)] transition handwritten"
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
              >
                {search}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.article>
  );
}

function PendingMessage({ activeStage }) {
  const { currentTheme } = useTheme();

  if (currentTheme === "search") {
    return (
      <article className="py-5 border-t border-[var(--border-soft)]" data-testid="ai-pending-message">
        <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--link)]">
          {activeStage || "retrieving indexed evidence"}
        </div>
        <div className="mt-2 inline-flex items-center gap-2 text-[15px] text-[var(--ink-soft)]">
          Synthesizing <TypingDots />
        </div>
      </article>
    );
  }

  if (currentTheme === "midnight") {
    return (
      <MidnightGlassSurface level={3} className="p-6 sm:p-8" as="article">
        <div data-testid="ai-pending-message">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--decoration-primary)]">
            {activeStage || "connecting indexed evidence"}
          </div>
          <div className="mt-3 inline-flex items-center gap-2 font-serif italic text-xl text-[var(--ink-soft)]">
            Synthesizing <TypingDots />
          </div>
        </div>
      </MidnightGlassSurface>
    );
  }

  if (currentTheme === "herbarium") {
    return (
      <HerbariumSpecimenSheet title="Connecting observations">
        <div data-testid="ai-pending-message">
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--burgundy)]">
            {activeStage || "connecting field records"}
          </div>
          <div className="mt-3 inline-flex items-center gap-2 font-serif italic text-xl text-[var(--specimen-ink-soft)]">
            Synthesizing <TypingDots />
          </div>
        </div>
      </HerbariumSpecimenSheet>
    );
  }

  return (
    <article className="bg-white/80 border border-[var(--border-medium)] p-5 sm:p-6" data-testid="ai-pending-message">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[var(--plum)]">
        <BrainCircuit size={12} className="text-[var(--sage)]" /> {activeStage || "retrieving archive evidence"}
      </div>
      <div className="mt-4 font-serif italic text-2xl text-ink-soft">
        synthesizing from Anita's archive <TypingDots />
      </div>
    </article>
  );
}

function MemoryPanel({ messages, latestResult, stats, onAsk }) {
  const { currentTheme } = useTheme();
  const isScholar = currentTheme === "search";
  const isMidnight = currentTheme === "midnight";
  const isHerbarium = currentTheme === "herbarium";
  const breadcrumbs = latestResult?.memoryBreadcrumbs || [];
  const projects = latestResult?.relatedProjects || [];
  const repos = latestResult?.relatedRepositories || [];

  return (
    <aside className="space-y-4 lg:sticky lg:top-24 self-start">
      <section className={`border border-[var(--border-soft)] bg-[var(--bg-paper)]/75 p-5 ${isScholar || isMidnight || isHerbarium ? "" : "grid-paper"}`}>
        <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--plum)] inline-flex items-center gap-2">
          <FileSearch size={12} /> {isScholar ? "indexed corpus" : isMidnight ? "system index" : isHerbarium ? "field index" : "archive index"}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            ["passages", stats?.chunks ?? 65],
            ["projects", stats?.projects ?? 6],
            ["repos", stats?.repositories ?? 7],
            ["themes", stats?.themes ?? 6],
          ].map(([label, value]) => (
            <div key={label} className="bg-[var(--bg-tag)]/70 border border-[var(--border-soft)] px-3 py-2">
              <div className="font-serif text-2xl text-ink">{value}</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--plum)]">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border border-[var(--border-soft)] bg-[var(--bg-tag)]/60 p-5">
        <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--plum)] inline-flex items-center gap-2">
          <History size={12} /> {isMidnight ? "context memory" : isHerbarium ? "field context" : "memory"}
        </div>
        <div className="mt-3 space-y-2">
          {breadcrumbs.length ? (
            breadcrumbs.map((crumb) => (
              <div key={crumb} className="text-sm leading-relaxed text-ink-soft">{crumb}</div>
            ))
          ) : (
            <div className="font-serif italic text-xl text-ink-soft">new thread</div>
          )}
        </div>
        {messages.filter((message) => message.role === "user").length > 1 && (
          <div className="mt-4 border-t border-[var(--border-soft)] pt-3 space-y-2">
            {messages.filter((message) => message.role === "user").slice(-3).map((message) => (
              <button key={message.id} type="button" onClick={() => onAsk(message.content)} className="block w-full truncate text-left text-sm text-link link-soft">
                {message.content}
              </button>
            ))}
          </div>
        )}
      </section>

      {!!repos.length && (
        <section className="border border-[var(--border-soft)] bg-[var(--bg-warm)]/60 p-5">
          <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--plum)] inline-flex items-center gap-2">
            <GitBranch size={12} /> repository layer
          </div>
          <div className="mt-3 space-y-3">
            {repos.slice(0, 4).map((repo) => (
              <div key={repo.name}>
                <a href={repo.url} target="_blank" rel="noreferrer" className="font-serif text-lg text-ink link-soft">
                  {repo.name}
                </a>
                <div className="text-xs uppercase tracking-[0.18em] text-[var(--plum)]">{repo.kind}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {!!projects.length && (
        <section className="border border-[var(--border-soft)] bg-[var(--bg-paper)]/80 p-5">
          <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--plum)]">project trail</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {projects.slice(0, 5).map((project) => (
              <button key={project.slug} type="button" onClick={() => onAsk(`How does ${project.name} connect to Anita's broader engineering direction?`)} className="bg-[var(--bg-tag)]/75 border border-[var(--border-soft)] px-2.5 py-1 text-xs text-ink hover:bg-[var(--bg-warm)] transition">
                {project.name}
              </button>
            ))}
          </div>
        </section>
      )}
    </aside>
  );
}

export default function AIMode() {
  const [searchParams] = useSearchParams();
  const [conversationId, setConversationId] = useState(() => makeId("archive"));
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeStage, setActiveStage] = useState(DEFAULT_STAGES[0]);
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);
  const paramHandledRef = useRef(false);
  const { currentTheme } = useTheme();

  const assistantMessages = useMemo(() => messages.filter((message) => message.role === "assistant"), [messages]);
  const latestAssistant = assistantMessages[assistantMessages.length - 1] || null;
  const latestResult = latestAssistant?.result || null;

  useEffect(() => {
    axios
      .get(`${API}/ai/stats`, { timeout: 6000 })
      .then((response) => setStats(response.data))
      .catch(() => setStats({ chunks: 65, projects: 6, repositories: 7, themes: 6, mode: "local-ready" }));
  }, []);

  useEffect(() => {
    const qParam = searchParams.get("q");
    if (qParam && !paramHandledRef.current) {
      paramHandledRef.current = true;
      setQuery(qParam);
      runSearch(qParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (!latestAssistant?.content) {
      setDisplayedAnswer("");
      return undefined;
    }

    const units = latestAssistant.content.split(/(\s+)/);
    let index = 0;
    setDisplayedAnswer("");
    const timer = window.setInterval(() => {
      index += 2;
      setDisplayedAnswer(units.slice(0, index).join(""));
      if (index >= units.length) window.clearInterval(timer);
    }, 18);

    return () => window.clearInterval(timer);
  }, [latestAssistant?.id, latestAssistant?.content]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, activeStage]);

  const runSearch = async (value) => {
    const cleaned = String(value || "").trim();
    if (!cleaned || loading) return;

    const userMessage = {
      id: makeId("user"),
      role: "user",
      content: cleaned,
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setQuery("");
    setLoading(true);
    setError("");

    let stageIndex = 0;
    setActiveStage(DEFAULT_STAGES[0]);
    const stageTimer = window.setInterval(() => {
      stageIndex = (stageIndex + 1) % DEFAULT_STAGES.length;
      setActiveStage(DEFAULT_STAGES[stageIndex]);
    }, 780);

    try {
      const response = await axios.post(
        `${API}/ai/search`,
        {
          q: cleaned,
          conversationId,
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        },
        { timeout: 14000 }
      );
      const normalized = normalizeArchiveResponse(response.data, cleaned);
      setConversationId(normalized.conversationId || conversationId);
      setMessages((items) => [
        ...items,
        {
          id: makeId("assistant"),
          role: "assistant",
          content: normalized.answer,
          result: normalized,
        },
      ]);
    } catch (requestError) {
      const fallback = buildLocalArchiveResponse(cleaned);
      setError("backend unavailable - local archive fallback");
      setMessages((items) => [
        ...items,
        {
          id: makeId("assistant"),
          role: "assistant",
          content: fallback.answer,
          result: fallback,
        },
      ]);
    } finally {
      window.clearInterval(stageTimer);
      setLoading(false);
      setActiveStage(DEFAULT_STAGES[0]);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    runSearch(query);
  };

  const isScholar = currentTheme === "search";
  const isMidnight = currentTheme === "midnight";
  const isHerbarium = currentTheme === "herbarium";
  let queryIndex = -1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-7 pb-24" data-testid="ai-mode-page">
      <section className="relative border-b border-[var(--border-soft)] pb-6">
        {!isScholar && !isMidnight && !isHerbarium && (
          <>
            <Rose className="absolute -top-10 -left-8 opacity-60 hidden md:block" size={100} />
            <Sparkle className="absolute top-2 right-4 opacity-70 animate-float-slow" size={18} />
          </>
        )}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className={`text-[11px] uppercase tracking-[0.3em] text-[var(--plum)] inline-flex items-center gap-2 ${isScholar || isMidnight || isHerbarium ? "font-mono" : ""}`}>
              <BrainCircuit size={13} className="text-[var(--sage)]" />
              {isScholar ? "AI synthesis over indexed engineering work" : isMidnight ? "Private intelligence interface" : isHerbarium ? "The living archive responds" : "Anita George archive intelligence"}
            </div>
            <h1 className={`mt-2 font-serif text-ink leading-[0.9] ${isScholar ? "text-4xl sm:text-5xl" : isMidnight || isHerbarium ? "italic text-4xl sm:text-6xl" : "text-5xl sm:text-7xl lg:text-[84px]"}`}>
              AI Mode
            </h1>
            {!isScholar && !isMidnight && !isHerbarium && <Squiggle width={230} className="mt-2" />}
          </div>
          <div className="lg:max-w-xl">
            <SignalStrip stats={stats} />
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-ink-soft">
              {isScholar
                ? "A synthesis layer over Anita's indexed engineering corpus — projects, repositories, technical themes, and design direction."
                : isMidnight
                ? "A private synthesis layer over Anita's indexed engineering archive — projects, repositories, technical themes, and design direction."
                : isHerbarium
                ? "A field archive connecting observations across Anita's engineering systems — projects, repositories, technical themes, and design direction."
                : "A conversational research layer over Anita's verified projects, repositories, technical themes, and design direction."}
            </p>
          </div>
        </div>
      </section>

      <div className="mt-6">
        <StageRail loading={loading} activeStage={activeStage} result={latestResult} />
      </div>

      <div className="mt-7 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_330px] gap-6">
        <main className="min-w-0">
          <section className="min-h-[460px] border border-[var(--border-soft)] bg-[var(--bg-paper)]/60 p-3 sm:p-5" data-testid="ai-conversation-thread">
            {messages.length === 0 && !loading ? (
              isScholar ? (
                <div className="p-5 sm:p-8 min-h-[360px]">
                  <ScholarMetaLine>Search entrance</ScholarMetaLine>
                  <p className="mt-4 max-w-2xl font-serif text-2xl sm:text-3xl leading-snug text-[var(--ink)]">
                    Ask about the shape of Anita's engineering work, then keep going.
                  </p>
                  <div className="mt-6" data-testid="starter-questions">
                    <ScholarMetaLine>Suggested queries</ScholarMetaLine>
                    <div className="mt-2 flex flex-col divide-y divide-[var(--border-soft)]">
                      {STARTER_QUESTIONS.map((starter) => (
                        <button
                          key={starter}
                          type="button"
                          onClick={() => runSearch(starter)}
                          className="py-2.5 text-left text-[15px] text-[var(--link)] hover:underline underline-offset-4"
                        >
                          {starter}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : isMidnight ? (
                <div className="p-5 sm:p-8 min-h-[360px]">
                  <MidnightMetaLine signal>Midnight intelligence</MidnightMetaLine>
                  <p className="mt-4 max-w-2xl font-serif italic text-2xl sm:text-3xl leading-snug text-[var(--ink)]">
                    Ask about Anita's work.
                  </p>
                  <div className="mt-8" data-testid="starter-questions">
                    <MidnightMetaLine>Suggested queries</MidnightMetaLine>
                    <div className="mt-2 flex flex-col divide-y divide-[var(--border-soft)]">
                      {STARTER_QUESTIONS.map((starter) => (
                        <button
                          key={starter}
                          type="button"
                          onClick={() => runSearch(starter)}
                          className="py-2.5 text-left text-[15px] text-[var(--ink-soft)] hover:text-[var(--decoration-primary)] transition-colors"
                        >
                          {starter}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : isHerbarium ? (
                <HerbariumSpecimenSheet id="LIVING ARCHIVE" title="Field entrance" className="min-h-[360px]">
                  <p className="max-w-2xl font-serif italic text-2xl sm:text-3xl leading-snug text-[var(--specimen-ink)]">
                    Ask about Anita's systems.
                  </p>
                  <div className="mt-8" data-testid="starter-questions">
                    <SpecimenFieldLabel>Field questions</SpecimenFieldLabel>
                    <div className="mt-2 flex flex-col divide-y divide-[var(--specimen-border)]">
                      {STARTER_QUESTIONS.map((starter) => (
                        <button
                          key={starter}
                          type="button"
                          onClick={() => runSearch(starter)}
                          className="py-2.5 text-left text-[15px] text-[var(--specimen-ink-soft)] hover:text-[var(--burgundy)] transition-colors"
                        >
                          {starter}
                        </button>
                      ))}
                    </div>
                  </div>
                </HerbariumSpecimenSheet>
              ) : (
                <div className="relative overflow-hidden bg-white/72 border border-[var(--border-medium)] p-5 sm:p-8 min-h-[360px]">
                  <Tape className="-top-3 right-12" rotate={7} w={72} variant="pink" />
                  <Sprig className="absolute -bottom-10 -right-4 opacity-55" size={110} />
                  <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--plum)] inline-flex items-center gap-2">
                    <MessageSquareText size={12} /> live archive thread
                  </div>
                  <p className="mt-5 max-w-3xl font-serif text-3xl sm:text-[42px] leading-tight text-ink">
                    Ask about the shape of Anita's engineering work, then keep going.
                  </p>
                  <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-2" data-testid="starter-questions">
                    {STARTER_QUESTIONS.map((starter) => (
                      <button
                        key={starter}
                        type="button"
                        onClick={() => runSearch(starter)}
                        className="group flex items-center justify-between gap-3 border border-[var(--border-soft)] bg-[var(--bg-tag)] px-4 py-3 text-left text-sm text-ink hover:bg-[var(--bg-warm)] transition"
                      >
                        <span className="leading-snug">{starter}</span>
                        <ArrowUpRight size={14} className="shrink-0 text-[var(--plum)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    ))}
                  </div>
                </div>
              )
            ) : (
              <div className="space-y-5">
                {messages.map((message) => {
                  if (message.role === "user") {
                    queryIndex += 1;
                    return <UserMessage key={message.id} message={message} index={queryIndex} />;
                  }
                  return (
                    <AssistantMessage
                      key={message.id}
                      message={message}
                      isLatest={message.id === latestAssistant?.id}
                      displayedAnswer={displayedAnswer}
                      onAsk={runSearch}
                    />
                  );
                })}
                {loading && <PendingMessage activeStage={activeStage} />}
                <div ref={bottomRef} />
              </div>
            )}
          </section>

          {latestResult?.people_also_ask?.length > 0 && !loading && (
            <div className="mt-8" data-testid="ai-paa-block">
              <PeopleAlsoAskInline items={latestResult.people_also_ask} query={latestResult.query} variant="compact" />
            </div>
          )}

          {error && (
            <div className="mt-4 text-xs uppercase tracking-[0.22em] text-[var(--plum)]" data-testid="ai-fallback-notice">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="sticky bottom-4 z-10 mt-6" data-testid="ai-search-form">
            <div className="search-glow flex items-center gap-3 bg-white/95 backdrop-blur border border-[var(--border-soft)] px-4 py-3 shadow-[0_18px_55px_-35px_rgba(45,42,38,0.4)]">
              <Search size={18} className="text-[var(--plum)] shrink-0" />
              <input
                data-testid="ai-search-input"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ask a follow-up about Anita's work..."
                className="min-w-0 flex-1 bg-transparent outline-none text-base text-ink placeholder:text-[var(--plum)]/65"
              />
              <button
                data-testid="ai-search-submit"
                type="submit"
                disabled={loading || !query.trim()}
                className="btn-soft inline-flex shrink-0 items-center gap-2 px-3 sm:px-4 py-2 text-xs uppercase tracking-[0.18em] disabled:opacity-50"
              >
                <span className="hidden sm:inline">send</span>
                {loading ? <TypingDots /> : <SendHorizontal size={14} />}
              </button>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--plum)]">
              <CornerDownLeft size={11} /> continuous thread
              {latestResult?.confidence != null && (
                <>
                  <span className="text-[var(--brown)]">.</span>
                  <span>confidence {Math.round((latestResult.confidence || 0) * 100)}%</span>
                </>
              )}
            </div>
          </form>
        </main>

        <MemoryPanel messages={messages} latestResult={latestResult} stats={stats} onAsk={runSearch} />
      </div>
    </div>
  );
}
