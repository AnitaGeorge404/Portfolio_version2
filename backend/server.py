from __future__ import annotations

import asyncio
import json
import logging
import os
import re
import uuid
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI, Query
from pydantic import BaseModel, Field
from starlette.middleware.cors import CORSMiddleware

from knowledge_base import KnowledgeBase, clean_text, tokenize, unique

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

kb = KnowledgeBase()

app = FastAPI(
    title="Anita George - conversational semantic archive",
    description="Portfolio-specialized RAG backend for Anita George's AI Mode.",
    version="2.0.0",
)
api_router = APIRouter(prefix="/api")

ARCHIVE_ANCHORS = {
    "anita",
    "george",
    "archive",
    "portfolio",
    "project",
    "projects",
    "work",
    "works",
    "repo",
    "repos",
    "repository",
    "repositories",
    "thing",
    "things",
    "app",
    "apps",
    "system",
    "systems",
}

FOLLOW_UP_CUES = {
    "it",
    "this",
    "that",
    "those",
    "they",
    "them",
    "same",
    "different",
    "connect",
    "connected",
    "compare",
    "deeper",
    "more",
    "why",
    "how",
}

RELATED_SEARCH_POOL = [
    "humane technology",
    "adaptive interfaces",
    "graph theory systems",
    "emotionally aware UX",
    "accessibility-first engineering",
    "scalable APIs",
    "optimization systems",
    "interface psychology",
    "modular backend systems",
    "AI safety systems",
    "repository maturity",
    "NeuroBridge and VantaAI",
]

ANALYSIS_STAGES = [
    "analyzing archive intent",
    "retrieving project evidence",
    "connecting themes",
    "retrieving related repositories",
    "checking citation strength",
    "synthesizing grounded response",
]


class ChatTurn(BaseModel):
    role: str
    content: str


class SearchRequest(BaseModel):
    q: str = Field(..., min_length=1, max_length=700)
    conversationId: str | None = None
    messages: list[ChatTurn] = Field(default_factory=list)


class Source(BaseModel):
    id: str
    source: str
    title: str
    url: str
    score: float
    snippet: str


class RelatedPage(BaseModel):
    title: str
    url: str
    reason: str


class ArchiveMatch(BaseModel):
    title: str
    url: str
    reason: str


class PaaItem(BaseModel):
    q: str
    a: str
    related: list[str] = Field(default_factory=list)


class RelatedProject(BaseModel):
    slug: str
    name: str
    url: str
    tagline: str
    status: str
    reason: str
    themes: list[str] = Field(default_factory=list)
    stack: list[str] = Field(default_factory=list)


class RelatedRepository(BaseModel):
    name: str
    kind: str
    url: str
    reason: str
    themes: list[str] = Field(default_factory=list)


class SemanticConnection(BaseModel):
    source: str
    target: str
    type: str
    theme: str
    reason: str
    strength: float


class SearchResponse(BaseModel):
    query: str
    conversationId: str
    answer: str
    intent: str
    sources: list[Source] = Field(default_factory=list)
    citations: list[Source] = Field(default_factory=list)
    related_pages: list[str] = Field(default_factory=list)
    relatedPages: list[RelatedPage] = Field(default_factory=list)
    relatedProjects: list[RelatedProject] = Field(default_factory=list)
    relatedRepositories: list[RelatedRepository] = Field(default_factory=list)
    related_searches: list[str] = Field(default_factory=list)
    relatedSearches: list[str] = Field(default_factory=list)
    people_also_ask: list[PaaItem] = Field(default_factory=list)
    closest_archive: str | None = None
    closestArchive: ArchiveMatch | None = None
    concepts: list[str] = Field(default_factory=list)
    themes: list[str] = Field(default_factory=list)
    repository_relationships: list[str] = Field(default_factory=list)
    semanticConnections: list[SemanticConnection] = Field(default_factory=list)
    memoryBreadcrumbs: list[str] = Field(default_factory=list)
    analysisStages: list[str] = Field(default_factory=list)
    confidence: float = 0.0
    grounded: bool = True
    llm_available: bool = False
    synthesisEngine: str = "deterministic-archive"
    fallbackReason: str | None = None
    easter_egg: str | None = None


PROJECTS_BY_SLUG = {project.get("slug"): project for project in kb.projects}
PROJECTS_BY_NAME = {clean_text(project.get("name", "")).lower(): project for project in kb.projects}


def _snippet(text: str, limit: int = 260) -> str:
    cleaned = clean_text(text)
    if len(cleaned) <= limit:
        return cleaned
    return cleaned[:limit].rsplit(" ", 1)[0] + "..."


def _project_url(project: dict[str, Any]) -> str:
    slug = project.get("slug", "")
    return project.get("url") or f"/projects/{slug}"


def _page_title(url: str, fallback: str) -> str:
    if fallback:
        return clean_text(fallback)
    if not url or url == "/":
        return "Anita George"
    return clean_text(url.strip("/").replace("-", " ").title())


def _history_text(messages: list[ChatTurn], limit: int = 8) -> str:
    turns = messages[-limit:]
    return " ".join(f"{turn.role}: {turn.content}" for turn in turns)


def _is_follow_up(query: str) -> bool:
    q_tokens = set(tokenize(query))
    return len(q_tokens) <= 7 and bool(q_tokens & FOLLOW_UP_CUES)


def _project_slugs_from_contexts(contexts: list[dict[str, Any]]) -> list[str]:
    slugs: list[str] = []
    for context in contexts:
        slug = context.get("metadata", {}).get("slug")
        if slug:
            slugs.append(slug)
    return unique(slugs)


def _project_slugs_from_concepts(concepts: list[dict[str, Any]]) -> list[str]:
    return unique([slug for concept in concepts for slug in concept.get("relatedProjects", [])])


def _project_from_slug(slug: str) -> dict[str, Any] | None:
    return PROJECTS_BY_SLUG.get(slug)


def _source_from_context(context: dict[str, Any]) -> Source:
    return Source(
        id=context["id"],
        source=context["source"],
        title=context["title"],
        url=context["url"],
        score=float(context["score"]),
        snippet=_snippet(context["text"]),
    )


def _meaningful_overlap(query: str, contexts: list[dict[str, Any]]) -> float:
    query_terms = set(tokenize(query)) - ARCHIVE_ANCHORS
    if not query_terms:
        return 1.0
    evidence_terms: set[str] = set()
    for context in contexts[:5]:
        evidence_terms |= set(tokenize(f"{context['title']} {context['text']}"))
    return len(query_terms & evidence_terms) / max(len(query_terms), 1)


def _is_out_of_scope(
    query: str,
    contexts: list[dict[str, Any]],
    concepts: list[dict[str, Any]],
    project_hits: list[str],
    history: str,
) -> bool:
    if concepts or project_hits:
        return False
    if _is_follow_up(query) and kb.project_alias_hits(history):
        return False
    if not contexts:
        return True
    top_raw = float(contexts[0].get("raw_score", 0))
    overlap = _meaningful_overlap(query, contexts)
    return top_raw < 0.18 or overlap < 0.18


def _analyze_intent(
    query: str,
    contexts: list[dict[str, Any]],
    concepts: list[dict[str, Any]],
    project_hits: list[str],
    out_of_scope: bool,
) -> str:
    if out_of_scope:
        return "outside_archive"
    q = clean_text(query).lower()
    if any(term in q for term in ["compare", "connect", "relationship", "versus", " vs ", "different"]):
        return "comparison"
    if any(term in q for term in ["repo", "repository", "github", "active experiment", "unfinished", "maturity"]):
        return "repository"
    if any(term in q for term in ["who is", "what kind of engineer", "frontend", "backend", "study", "college", "gpa"]):
        return "profile"
    if project_hits or any(context["source"] == "project" for context in contexts[:3]):
        return "project"
    if concepts or any(context["source"] == "theme" for context in contexts[:3]):
        return "theme"
    return "archive"


def _related_projects(
    query: str,
    contexts: list[dict[str, Any]],
    concepts: list[dict[str, Any]],
    history: str,
) -> list[RelatedProject]:
    slugs = []
    slugs.extend(kb.project_alias_hits(query))
    if _is_follow_up(query):
        slugs.extend(kb.project_alias_hits(history))
    slugs.extend(_project_slugs_from_contexts(contexts))
    slugs.extend(_project_slugs_from_concepts(concepts))

    for relation in kb.relationships:
        if relation.get("source") in slugs:
            slugs.append(relation.get("target"))
        if relation.get("target") in slugs:
            slugs.append(relation.get("source"))

    projects: list[RelatedProject] = []
    for slug in unique([slug for slug in slugs if slug in PROJECTS_BY_SLUG]):
        project = PROJECTS_BY_SLUG[slug]
        reason = project.get("tagline") or "Matched retrieved archive evidence."
        for relation in kb.relationships:
            if relation.get("source") == slug or relation.get("target") == slug:
                reason = relation.get("reason", reason)
                break
        projects.append(
            RelatedProject(
                slug=slug,
                name=clean_text(project.get("name", slug)),
                url=_project_url(project),
                tagline=clean_text(project.get("tagline", "")),
                status=clean_text(project.get("status", "")),
                reason=clean_text(reason),
                themes=[clean_text(theme) for theme in project.get("themes", [])],
                stack=[clean_text(item) for item in project.get("stack", [])],
            )
        )
    return projects[:6]


def _related_repositories(
    contexts: list[dict[str, Any]],
    themes: list[str],
    related_projects: list[RelatedProject],
) -> list[RelatedRepository]:
    names: list[str] = []
    for context in contexts:
        repo = context.get("metadata", {}).get("repository")
        if repo:
            names.append(repo.get("name", ""))

    related_slugs = {project.slug for project in related_projects}
    theme_set = {theme.lower() for theme in themes}
    for repo in kb.repositories:
        repo_themes = {clean_text(theme).lower() for theme in repo.get("themes", [])}
        repo_projects = set(repo.get("relatedProjects", []))
        if repo_themes & theme_set or repo_projects & related_slugs:
            names.append(repo.get("name", ""))

    repositories: list[RelatedRepository] = []
    for name in unique(names):
        repo = next((item for item in kb.repositories if item.get("name") == name), None)
        if not repo:
            continue
        repositories.append(
            RelatedRepository(
                name=clean_text(repo.get("name", "")),
                kind=clean_text(repo.get("kind", "repository")),
                url=repo.get("url", "https://github.com/AnitaGeorge404/"),
                reason=clean_text(repo.get("description") or repo.get("note") or "Related repository evidence."),
                themes=[clean_text(theme) for theme in repo.get("themes", [])],
            )
        )
    return repositories[:5]


def _semantic_connections(
    query: str,
    themes: list[str],
    related_projects: list[RelatedProject],
) -> list[SemanticConnection]:
    q = clean_text(query).lower()
    slugs = {project.slug for project in related_projects}
    theme_set = {theme.lower() for theme in themes}
    connections: list[SemanticConnection] = []
    for relation in kb.relationships:
        relation_theme = clean_text(relation.get("theme", "")).lower()
        source = clean_text(relation.get("source", "")).lower()
        target = clean_text(relation.get("target", "")).lower()
        relevant = (
            relation.get("source") in slugs
            or relation.get("target") in slugs
            or relation_theme in theme_set
            or source in q
            or target in q
        )
        if relevant:
            connections.append(
                SemanticConnection(
                    source=clean_text(relation.get("source", "")),
                    target=clean_text(relation.get("target", "")),
                    type=clean_text(relation.get("type", "relationship")),
                    theme=clean_text(relation.get("theme", "")),
                    reason=clean_text(relation.get("reason", "")),
                    strength=float(relation.get("strength", 0.7)),
                )
            )
    project_slugs = set(PROJECTS_BY_SLUG)
    connections.sort(
        key=lambda item: (
            item.source in project_slugs and item.target in project_slugs,
            item.strength,
        ),
        reverse=True,
    )
    return connections[:5]


def _themes_from(
    contexts: list[dict[str, Any]],
    concepts: list[dict[str, Any]],
    related_projects: list[RelatedProject],
) -> list[str]:
    themes: list[str] = []
    themes.extend(clean_text(concept.get("label", "")) for concept in concepts)
    for project in related_projects:
        themes.extend(project.themes)
    for context in contexts:
        theme = context.get("metadata", {}).get("theme")
        if theme:
            themes.append(theme.get("label", ""))
    return unique([theme for theme in themes if theme])[:8]


def _related_pages(
    contexts: list[dict[str, Any]],
    related_projects: list[RelatedProject],
    related_repositories: list[RelatedRepository],
) -> list[RelatedPage]:
    pages: list[RelatedPage] = []
    for project in related_projects:
        pages.append(RelatedPage(title=project.name, url=project.url, reason=project.reason))
    for repo in related_repositories:
        pages.append(RelatedPage(title=repo.name, url=repo.url, reason=repo.reason))
    for context in contexts:
        pages.append(
            RelatedPage(
                title=_page_title(context["url"], context["title"]),
                url=context["url"],
                reason=f"Retrieved {context['source']} evidence.",
            )
        )

    unique_pages: list[RelatedPage] = []
    seen: set[str] = set()
    for page in pages:
        if not page.url or page.url in seen:
            continue
        seen.add(page.url)
        unique_pages.append(page)
    return unique_pages[:5]


def _closest_archive(contexts: list[dict[str, Any]], pages: list[RelatedPage]) -> ArchiveMatch | None:
    if contexts:
        top = contexts[0]
        return ArchiveMatch(
            title=_page_title(top["url"], top["title"]),
            url=top["url"],
            reason=f"Highest-scoring {top['source']} evidence in the archive.",
        )
    if pages:
        return ArchiveMatch(
            title=pages[0].title,
            url=pages[0].url,
            reason="Nearest linked archive surface.",
        )
    return None


def _memory_breadcrumbs(messages: list[ChatTurn], related_projects: list[RelatedProject], themes: list[str]) -> list[str]:
    crumbs: list[str] = []
    if related_projects:
        crumbs.append("projects: " + ", ".join(project.name for project in related_projects[:3]))
    if themes:
        crumbs.append("themes: " + ", ".join(themes[:3]))
    recent_user_turns = [clean_text(turn.content) for turn in messages if turn.role == "user"][-2:]
    crumbs.extend(f"earlier: {turn[:70]}" for turn in recent_user_turns)
    return crumbs[:5]


def _related_searches(query: str, themes: list[str], related_projects: list[RelatedProject]) -> list[str]:
    q = clean_text(query).lower()
    candidates: list[str] = []
    candidates.extend(themes)
    candidates.extend(project.name for project in related_projects)
    candidates.extend(RELATED_SEARCH_POOL)
    return unique([item for item in candidates if item and item.lower() not in q])[:7]


def _repository_relationship_labels(repositories: list[RelatedRepository]) -> list[str]:
    return [f"{repo.name} - {repo.kind}" for repo in repositories]


def _archive_payload_for_llm(
    query: str,
    history: str,
    contexts: list[dict[str, Any]],
    related_projects: list[RelatedProject],
    related_repositories: list[RelatedRepository],
    themes: list[str],
    connections: list[SemanticConnection],
) -> dict[str, Any]:
    return {
        "query": query,
        "conversationHistory": history,
        "retrievedPassages": [
            {
                "id": context["id"],
                "source": context["source"],
                "title": context["title"],
                "url": context["url"],
                "score": context["score"],
                "text": _snippet(context["text"], 900),
            }
            for context in contexts[:8]
        ],
        "relatedProjects": [project.model_dump() for project in related_projects],
        "relatedRepositories": [repo.model_dump() for repo in related_repositories],
        "themes": themes,
        "semanticConnections": [connection.model_dump() for connection in connections],
        "rules": [
            "Answer only from the retrieved Anita George archive data.",
            "Do not answer general internet questions.",
            "Do not invent deployments, internships, users, publications, adoption metrics, medical claims, or startup claims.",
            "Frame verified work positively and technically, but keep maturity/status honest.",
            "Use a conversational, editorial, technically-aware tone.",
            "Return strict JSON with answer and optionally relatedSearches.",
        ],
    }


async def _gemini_answer(payload: dict[str, Any]) -> dict[str, Any] | None:
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        return None

    model = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
    system_prompt = """
You are Anita George's conversational semantic archive engine.

You are not a general assistant. You answer only from the provided archive payload
about Anita George's projects, repositories, technical themes, design thinking,
and verified portfolio data.

Write like a thoughtful portfolio research system: grounded, optimistic,
technically specific, conversational, and concise. Never use fake-deep,
mystical, exaggerated, or generic motivational phrasing.

If the user asks something outside the archive, say that the archive does not
contain verified evidence for it and redirect to a useful Anita-archive thread.
""".strip()

    def call_gemini() -> dict[str, Any] | None:
        try:
            from google import genai
            from google.genai import types
        except Exception as exc:  # noqa: BLE001
            logging.info("google-genai is unavailable: %s", exc)
            return None

        client = genai.Client(api_key=api_key)
        prompt = (
            f"{system_prompt}\n\n"
            "Archive payload:\n"
            f"{json.dumps(payload, ensure_ascii=False)}\n\n"
            "Return JSON only in this shape: "
            '{"answer":"...","relatedSearches":["..."],"confidenceNote":"..."}'
        )
        response = client.models.generate_content(
            model=model,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.35,
                max_output_tokens=2048,
                response_mime_type="application/json",
            ),
        )
        raw = (getattr(response, "text", "") or "").strip()
        if not raw:
            return None
        if raw.startswith("```"):
            raw = re.sub(r"^```(?:json)?", "", raw).strip()
            raw = raw.removesuffix("```").strip()
        try:
            parsed = json.loads(raw)
        except json.JSONDecodeError:
            # Best-effort recovery for truncated JSON: extract the "answer" field.
            m = re.search(r'"answer"\s*:\s*"((?:[^"\\]|\\.)*)"', raw, re.DOTALL)
            if not m:
                return None
            answer_text = m.group(1).encode("utf-8").decode("unicode_escape", errors="ignore")
            related = re.findall(r'"([^"\\]{2,80})"', raw.split('"relatedSearches"', 1)[-1]) if '"relatedSearches"' in raw else []
            parsed = {"answer": answer_text, "relatedSearches": related[:5]}
        return parsed if isinstance(parsed, dict) and parsed.get("answer") else None

    try:
        return await asyncio.to_thread(call_gemini)
    except Exception as exc:  # noqa: BLE001
        logging.exception("Gemini archive synthesis failed: %s", exc)
        return None


def _outside_answer(query: str, themes: list[str]) -> str:
    redirect = themes[0] if themes else "humane technology, accessibility, graph systems, or Anita's verified projects"
    return (
        "I do not have verified archive evidence for that. "
        "This AI Mode is scoped to Anita George's portfolio, repositories, projects, and engineering themes, "
        f"so the useful direction inside the archive would be {redirect}."
    )


def _project_answer(project: RelatedProject, connections: list[SemanticConnection]) -> str:
    data = PROJECTS_BY_SLUG.get(project.slug, {})
    parts = [
        f"{project.name} is archived as {project.tagline}.",
        clean_text(data.get("summary", "")),
    ]
    if data.get("architecture"):
        parts.append(f"Technically, it is framed around {clean_text(data['architecture'])}")
    if data.get("motivation"):
        parts.append(f"The motivation is {clean_text(data['motivation'])}")
    if data.get("status") or data.get("outcomes"):
        parts.append(
            f"Maturity-wise, the archive marks it as {clean_text(data.get('status', 'active'))}; {clean_text(data.get('outcomes', 'the project is still evolving'))}"
        )
    if connections:
        parts.append(f"The larger pattern is {connections[0].theme}: {connections[0].reason}")
    return "\n\n".join(part for part in parts if part)


def _comparison_answer(query: str, projects: list[RelatedProject], connections: list[SemanticConnection]) -> str:
    q = clean_text(query).lower()
    if "productivity" in q and any(project.slug == "neurobridge" for project in projects):
        neurobridge = next(project for project in projects if project.slug == "neurobridge")
        return (
            "NeuroBridge is different from a typical productivity app because the archive does not frame it around output, streaks, or task throughput. "
            "It is framed as adaptive support for neurodivergent users: routines, sensory regulation, emotional check-ins, focus sessions, social stories, and visual timelines.\n\n"
            f"That makes the engineering direction closer to cognitive accessibility and humane technology than conventional productivity software. Its current maturity is also honest: {neurobridge.status}, not a medically certified or deployed-at-scale product."
        )
    if len(projects) >= 2:
        names = " and ".join(project.name for project in projects[:2])
        connection = connections[0].reason if connections else "they sit in the same archive pattern of systems thinking and intentional interface design."
        return (
            f"{names} connect through a real engineering pattern, not just a shared label. "
            f"{connection}\n\n"
            f"{projects[0].name} is strongest as {projects[0].tagline}; {projects[1].name} is strongest as {projects[1].tagline}. "
            "Read together, they make Anita's work feel less like isolated builds and more like a set of experiments around systems that reduce friction, harm, or cognitive load."
        )
    if projects:
        return _project_answer(projects[0], connections)
    return "The archive does not surface enough connected project evidence to make that comparison responsibly."


def _repository_answer(repositories: list[RelatedRepository]) -> str:
    if not repositories:
        repositories = [
            RelatedRepository(
                name=clean_text(repo.get("name", "")),
                kind=clean_text(repo.get("kind", "repository")),
                url=repo.get("url", "https://github.com/AnitaGeorge404/"),
                reason=clean_text(repo.get("description") or repo.get("note") or ""),
                themes=[clean_text(theme) for theme in repo.get("themes", [])],
            )
            for repo in kb.repositories[:5]
        ]
    lines = [
        f"{repo.name}: {repo.kind}. {repo.reason}"
        for repo in repositories[:5]
    ]
    return (
        "The repository layer is intentionally mixed: some entries are polished project surfaces, while others are active experiments, interface studies, or architecture explorations. "
        "That distinction matters because the archive should show initiative and range without pretending every repo is a finished production system.\n\n"
        + "\n".join(lines)
    )


def _profile_answer() -> str:
    profile = kb.profile
    dsa = profile.get("dsa", {})
    return (
        f"Anita George is a {clean_text(profile.get('role', 'Computer Science undergraduate'))} at {clean_text(profile.get('university', 'IIIT Kottayam'))} "
        f"({clean_text(profile.get('years', '2024-2028'))}, GPA {clean_text(profile.get('gpa', '9.03 / 10'))}). "
        "The archive frames her as full-stack and systems-minded: backend APIs and modular services on one side, React/Next.js/Tailwind interface work on the other, with a strong algorithmic base. "
        f"Her DSA record is listed as {clean_text(dsa.get('total_problems', '400+'))} problems, including {clean_text(dsa.get('leetcode', '230+'))} LeetCode and {clean_text(dsa.get('codeforces', '170+'))} Codeforces, with graph theory and optimization as recurring focus areas."
    )


def _theme_answer(themes: list[str], projects: list[RelatedProject], connections: list[SemanticConnection]) -> str:
    if not themes and projects:
        themes = projects[0].themes
    main = themes[0] if themes else "systems thinking"
    project_names = ", ".join(project.name for project in projects[:4]) or "the verified project archive"
    connection_text = f" {connections[0].reason}" if connections else ""
    return (
        f"{main} shows up as a practical engineering thread across {project_names}.{connection_text} "
        "The important pattern is that Anita's projects often pair structured technical systems with careful product judgement: APIs, models, or algorithms are usually tied to usability, safety, access, or cognitive load rather than treated as standalone demos."
    )


def _archive_answer(contexts: list[dict[str, Any]], projects: list[RelatedProject], themes: list[str]) -> str:
    if projects:
        return _theme_answer(themes, projects, [])
    if contexts:
        top = contexts[0]
        return (
            f"The closest archive evidence is {top['title']}. "
            f"It connects to the query through this verified thread: {_snippet(top['text'], 520)}"
        )
    return "The archive does not contain enough verified evidence to answer that responsibly."


def _deterministic_answer(
    intent: str,
    query: str,
    contexts: list[dict[str, Any]],
    related_projects: list[RelatedProject],
    related_repositories: list[RelatedRepository],
    themes: list[str],
    connections: list[SemanticConnection],
) -> str:
    if intent == "outside_archive":
        return _outside_answer(query, themes)
    if intent == "comparison":
        return _comparison_answer(query, related_projects, connections)
    if intent == "repository":
        return _repository_answer(related_repositories)
    if intent == "profile":
        return _profile_answer()
    if intent == "project" and related_projects:
        return _project_answer(related_projects[0], connections)
    if intent == "theme":
        return _theme_answer(themes, related_projects, connections)
    return _archive_answer(contexts, related_projects, themes)


async def _compose_response(request: SearchRequest) -> SearchResponse:
    query = clean_text(request.q)
    conversation_id = request.conversationId or f"archive-{uuid.uuid4().hex[:10]}"
    history = _history_text(request.messages)
    context_for_retrieval = history if _is_follow_up(query) else ""

    egg = kb.easter_egg(query)
    contexts = kb.search(query, k=10, context=context_for_retrieval)
    concepts = kb.concept_hits(f"{query} {context_for_retrieval}")
    project_hits = kb.project_alias_hits(f"{query} {context_for_retrieval}")
    out_of_scope = _is_out_of_scope(query, contexts, concepts, project_hits, history) if not egg else False
    intent = _analyze_intent(query, contexts, concepts, project_hits, out_of_scope)

    if out_of_scope:
        contexts = []

    related_projects = _related_projects(query, contexts, concepts, history)
    themes = _themes_from(contexts, concepts, related_projects)
    related_repositories = _related_repositories(contexts, themes, related_projects)
    connections = _semantic_connections(query, themes, related_projects)
    pages = _related_pages(contexts, related_projects, related_repositories)
    closest = _closest_archive(contexts, pages)
    related_searches = _related_searches(query, themes, related_projects)

    llm_payload = None
    llm_available = False
    synthesis_engine = "deterministic-archive"
    fallback_reason = None

    if egg:
        answer = clean_text(egg.get("answer", ""))
        pages = [
            RelatedPage(title=_page_title(url, url), url=url, reason="Linked from the archive shortcut.")
            for url in egg.get("related", [])[:4]
        ]
        closest = _closest_archive(contexts, pages)
        intent = "archive_shortcut"
    elif intent == "outside_archive":
        answer = _outside_answer(query, themes)
    else:
        llm_payload = await _gemini_answer(
            _archive_payload_for_llm(
                query,
                history,
                contexts,
                related_projects,
                related_repositories,
                themes,
                connections,
            )
        )
        if llm_payload and clean_text(llm_payload.get("answer")):
            answer = clean_text(llm_payload["answer"])
            llm_available = True
            synthesis_engine = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
            if isinstance(llm_payload.get("relatedSearches"), list):
                related_searches = unique([clean_text(item) for item in llm_payload["relatedSearches"]])[:7] or related_searches
        else:
            answer = _deterministic_answer(
                intent,
                query,
                contexts,
                related_projects,
                related_repositories,
                themes,
                connections,
            )
            fallback_reason = "Gemini unavailable; used deterministic archive synthesis."

    citations = [] if intent == "outside_archive" else [_source_from_context(context) for context in contexts[:6]]
    top_score = citations[0].score if citations else 0.0
    confidence = 0.06 if intent == "outside_archive" else round(min(0.96, 0.42 + top_score * 0.38 + min(len(citations), 4) * 0.035), 3)
    grounded = intent != "outside_archive"

    if not grounded:
        related_projects = []
        related_repositories = []
        connections = []
        pages = []
        closest = None
        themes = []

    return SearchResponse(
        query=query,
        conversationId=conversation_id,
        answer=answer,
        intent=intent,
        sources=citations,
        citations=citations,
        related_pages=[page.url for page in pages],
        relatedPages=pages,
        relatedProjects=related_projects,
        relatedRepositories=related_repositories,
        related_searches=related_searches,
        relatedSearches=related_searches,
        people_also_ask=[PaaItem(**item) for item in kb.people_also_ask(query, k=4)],
        closest_archive=closest.url if closest else None,
        closestArchive=closest,
        concepts=unique([clean_text(concept.get("label", "")) for concept in concepts] + themes),
        themes=themes,
        repository_relationships=_repository_relationship_labels(related_repositories),
        semanticConnections=connections,
        memoryBreadcrumbs=_memory_breadcrumbs(request.messages, related_projects, themes),
        analysisStages=ANALYSIS_STAGES,
        confidence=confidence,
        grounded=grounded,
        llm_available=llm_available,
        synthesisEngine=synthesis_engine,
        fallbackReason=fallback_reason,
        easter_egg=egg.get("key") if egg else None,
    )


@api_router.get("/")
async def root() -> dict[str, Any]:
    return {
        "message": "Anita George semantic archive is online",
        "mode": "conversational-rag",
        "kb": kb.stats(),
    }


@app.get("/health")
async def health() -> dict[str, Any]:
    return {"status": "ok", "mode": "conversational-rag", "kb": kb.stats()}


@api_router.get("/health")
async def api_health() -> dict[str, Any]:
    return {"status": "ok", "mode": "conversational-rag", "kb": kb.stats()}


@api_router.get("/ai/stats")
async def ai_stats() -> dict[str, Any]:
    gemini_configured = bool(os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY"))
    return {
        **kb.stats(),
        "mode": "conversational-rag",
        "primary_model": os.environ.get("GEMINI_MODEL", "gemini-2.5-flash"),
        "gemini_configured": gemini_configured,
    }


@api_router.get("/ai/search", response_model=SearchResponse)
async def ai_search_get(q: str = Query(..., min_length=1, max_length=700)) -> SearchResponse:
    return await _compose_response(SearchRequest(q=q))


@api_router.post("/ai/search", response_model=SearchResponse)
async def ai_search_post(request: SearchRequest) -> SearchResponse:
    return await _compose_response(request)


@api_router.post("/ai/chat", response_model=SearchResponse)
async def ai_chat(request: SearchRequest) -> SearchResponse:
    return await _compose_response(request)


app.include_router(api_router)

cors_origins = [
    origin.strip()
    for origin in os.environ.get("CORS_ORIGINS", "*").split(",")
    if origin.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_credentials="*" not in cors_origins,
    allow_origins=cors_origins or ["*"],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
    max_age=86400,
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
