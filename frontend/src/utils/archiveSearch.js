import { peopleAlsoAsk, projects, repos, themes } from "@/data/portfolio";

const RELATED_SEARCH_POOL = [
  "humane technology",
  "adaptive interfaces",
  "emotionally aware systems",
  "accessibility-first UX",
  "graph theory optimization",
  "scalable backend systems",
  "modular architectures",
  "cognitive accessibility",
  "digital dignity",
  "AI safety systems",
  "frontend engineering",
  "semantic interface systems",
];

const ACCESSIBILITY_EVIDENCE = [
  "accessibility",
  "accessibility-first",
  "inclusive design",
  "screen readers",
  "usability accommodations",
  "wcag",
  "keyboard navigation",
  "assistive ux",
  "adaptive interface",
  "adaptive interfaces",
  "adaptive ux",
  "cognitive accessibility",
  "neurodivergent",
];

const norm = (value) => String(value || "").toLowerCase();

const QUERY_STOPWORDS = new Set([
  "anita",
  "george",
  "does",
  "mention",
  "what",
  "which",
  "who",
  "why",
  "how",
  "where",
  "when",
  "project",
  "projects",
  "focus",
  "focused",
  "kind",
  "type",
  "use",
  "uses",
  "using",
  "about",
  "her",
  "she",
  "the",
  "and",
  "or",
  "is",
  "are",
]);

const tokens = (value) =>
  new Set((norm(value).match(/[a-z][a-z0-9-]+/g) || []).filter((token) => !QUERY_STOPWORDS.has(token)));

const unique = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    const key = norm(typeof item === "string" ? item : item?.url || item?.title);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const projectText = (project) =>
  [
    project.name,
    project.tagline,
    project.summary,
    project.motivation,
    project.architecture,
    project.outcomes,
    project.status,
    ...(project.tags || []),
    ...(project.stack || []),
    ...(project.themes || []),
    ...(project.features || []),
  ].join(" ");

const sourceFromProject = (project, score = 0.72) => ({
  id: `project:${project.slug}`,
  source: "project",
  title: project.name,
  url: `/projects/${project.slug}`,
  score,
  snippet: project.summary,
});

const projectBrief = (project, reason = project.tagline) => ({
  slug: project.slug,
  name: project.name,
  url: `/projects/${project.slug}`,
  tagline: project.tagline,
  status: project.status || "active",
  reason,
  themes: project.themes || [],
  stack: project.stack || [],
});

const repoBrief = (repo) => ({
  name: repo.name,
  kind: repo.kind,
  url: "https://github.com/AnitaGeorge404/",
  reason: repo.note || "Repository evidence in Anita's archive.",
  themes: [],
});

const sourceFromTheme = (theme, index) => ({
  id: `theme:${theme.title}`,
  source: "theme",
  title: theme.title,
  url: "/research",
  score: Math.max(0.22, 0.46 - index * 0.05),
  snippet: theme.desc,
});

const scoreText = (queryTokens, text) => {
  const haystack = tokens(text);
  if (!queryTokens.size || !haystack.size) return 0;
  const overlap = [...queryTokens].filter((token) => haystack.has(token)).length;
  return overlap / Math.max(queryTokens.size, 1);
};

const classifyProjectQuery = (query) => {
  const q = norm(query);
  if (/(accessib|inclusive|screen reader|wcag|adaptive ux|neurodivergent)/.test(q)) return "accessibility";
  if (/(which projects use ai|ai projects|uses ai|use ai|artificial intelligence|machine learning)/.test(q)) return "ai";
  if (/(backend|api|rest|fastapi|scalable)/.test(q)) return "backend";
  if (/(graph|optimization|algorithm|routing)/.test(q)) return "graph";
  if (/(humane|emotional|safety|dignity|protective|harm)/.test(q)) return "humane";
  return "";
};

const matchingProjects = (query) => {
  const mode = classifyProjectQuery(query);
  if (!mode) return { mode, matches: [] };

  const matches = projects.filter((project) => {
    const blob = norm(projectText(project));
    if (mode === "accessibility") {
      return ACCESSIBILITY_EVIDENCE.some((term) => blob.includes(term));
    }
    if (mode === "ai") {
      return /( ai|machine learning| ml|computer vision|nlp|classification)/.test(blob);
    }
    if (mode === "backend") {
      return /(backend|rest api|rest apis|fastapi|node|express|service)/.test(blob);
    }
    if (mode === "graph") {
      return /(graph|optimization|shortest-path|routing|algorithm)/.test(blob);
    }
    if (mode === "humane") {
      return /(humane|emotional|safety|dignity|protective|harm|trust|accessibility)/.test(blob);
    }
    return false;
  });

  if (mode === "accessibility") {
    matches.sort((a, b) => (a.name === "NeuroBridge" ? -1 : b.name === "NeuroBridge" ? 1 : 0));
  }

  return { mode, matches };
};

const projectReason = (project, mode) => {
  if (mode === "accessibility") {
    if (project.name === "NeuroBridge") {
      return "explicitly archived as accessibility-first, adaptive, and built for neurodivergent users.";
    }
    if (project.name === "fAImer") {
      return "uses multilingual and offline-first design for low-connectivity rural contexts.";
    }
    return "contains explicit accessibility or adaptive-interface evidence.";
  }
  if (mode === "ai") return "uses AI/ML, computer vision, NLP, or classification in the archived system.";
  if (mode === "backend") return "mentions REST APIs, backend services, inference paths, or modular service architecture.";
  if (mode === "graph") return "is grounded in graph theory, optimization, algorithms, or routing systems.";
  if (mode === "humane") return "centers safety, dignity, accessibility, emotional support, or harm reduction.";
  return project.tagline;
};

const answerForProjects = (mode, matches) => {
  if (!matches.length) {
    return "The indexed archive does not directly mention projects that match this request. Nothing in the retrieved passages is strong enough to answer without stretching the evidence.";
  }

  const intro = {
    accessibility: "The archive explicitly points to these accessibility or adaptive-UX systems:",
    ai: "The archive identifies these AI-adjacent projects:",
    backend: "The clearest backend/API evidence appears in these projects:",
    graph: "Graph theory and optimization show up most directly here:",
    humane: "The recurring humane-technology thread is strongest in these systems:",
  }[mode] || "The strongest project matches are:";

  return [
    intro,
    ...matches.slice(0, 5).map((project) => `${project.name} - ${projectReason(project, mode)}`),
  ].join("\n");
};

const faqMatch = (query) => {
  const queryTokens = tokens(query);
  return peopleAlsoAsk
    .map((item) => ({
      item,
      score: scoreText(queryTokens, `${item.q} ${item.a} ${item.note || ""}`),
    }))
    .sort((a, b) => b.score - a.score)[0];
};

const repoAnswer = () =>
  [
    "The repository archive treats several builds honestly as experiments, evolving systems, or interface studies rather than finished production apps.",
    ...repos.slice(0, 6).map((repo) => `${repo.name} - ${repo.kind}; ${repo.note || "repository evidence in the archive"}.`),
  ].join("\n");

const searchCorpus = (query) => {
  const queryTokens = tokens(query);
  const projectSources = projects
    .map((project) => ({
      source: sourceFromProject(project, scoreText(queryTokens, projectText(project))),
    }))
    .filter(({ source }) => source.score > 0)
    .sort((a, b) => b.source.score - a.source.score)
    .map(({ source }) => source);

  const themeSources = themes
    .map((theme, index) => ({
      source: sourceFromTheme(theme, index),
      score: scoreText(queryTokens, `${theme.title} ${theme.venue} ${theme.desc}`),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => ({ ...item.source, score: item.score }));

  return unique([...projectSources, ...themeSources]).slice(0, 5);
};

const relatedPagesFrom = (matches, sources) =>
  unique(
    matches.length
      ? matches.map((project) => ({
          title: project.name,
          url: `/projects/${project.slug}`,
          reason: project.tagline,
        }))
      : sources.map((source) => ({
          title: source.title,
          url: source.url,
          reason: `Matched ${source.source} evidence.`,
        }))
  ).slice(0, 3);

const conceptsFrom = (matches, sources) =>
  unique([
    ...matches.flatMap((project) => [...(project.themes || []), ...(project.tags || [])]),
    ...sources.flatMap((source) => [source.source, source.title]),
  ]).slice(0, 8);

const relatedSearchesFrom = (query, concepts) =>
  unique([...concepts, ...RELATED_SEARCH_POOL])
    .filter((item) => !norm(query).includes(norm(item)))
    .slice(0, 5);

const contextualAnswer = (query, sources, faq) => {
  const q = norm(query);
  if (faq?.score >= 0.35) return faq.item.a;

  if (/what kind of engineer/.test(q)) {
    return "Anita reads as a full-stack, systems-minded engineer with a strong design instinct. The archive repeatedly connects backend APIs, React/Next.js interfaces, graph-theory practice, and accessibility-focused product thinking.";
  }

  if (/frontend/.test(q) && /backend/.test(q)) {
    return "The archive does not place her neatly on one side. It shows backend work through REST APIs, FastAPI-style services, NLP/ML pipelines, and graph optimization, while the frontend thread is equally visible through React, Next.js, Tailwind, component architecture, and UI/UX systems.";
  }

  if (!sources.length || sources[0].score < 0.12) {
    return "The indexed archive does not directly mention this. The nearest retrieved thread is weak, so the honest answer is that there is not enough grounded evidence to make a stronger claim.";
  }

  return `The archive points most strongly to ${sources[0].title}. It connects the question to ${sources[0].snippet}`;
};

export function buildLocalArchiveResponse(query) {
  const cleaned = String(query || "").trim();
  const { mode, matches } = matchingProjects(cleaned);
  const sources = searchCorpus(cleaned);
  const faq = faqMatch(cleaned);
  const isRepoQuery = /(repo|repository|github|active experiment|maturity)/.test(norm(cleaned));

  let answer = "";
  if (isRepoQuery) answer = repoAnswer();
  else if (matches.length) answer = answerForProjects(mode, matches);
  else answer = contextualAnswer(cleaned, sources, faq);

  const relatedPages = relatedPagesFrom(matches, sources);
  const hasNoDirectEvidence = answer.startsWith("The indexed archive does not directly mention");
  const shownSources = hasNoDirectEvidence ? [] : sources;
  const shownRelatedPages = hasNoDirectEvidence ? [] : relatedPages;
  const closestArchive = hasNoDirectEvidence
    ? null
    : shownRelatedPages[0] ||
    (sources[0]
      ? {
          title: sources[0].title,
          url: sources[0].url,
          reason: `Highest local semantic match from ${sources[0].source} evidence.`,
        }
      : null);

  const concepts = conceptsFrom(matches, shownSources);
  const relatedSearches = relatedSearchesFrom(cleaned, concepts);
  const relatedProjects = (matches.length ? matches : sources
    .map((source) => projects.find((project) => project.name === source.title))
    .filter(Boolean))
    .map((project) => projectBrief(project, projectReason(project, mode)))
    .slice(0, 6);
  const relatedRepositories = isRepoQuery ? repos.slice(0, 5).map(repoBrief) : [];
  const semanticConnections = relatedProjects.slice(0, 4).map((project) => ({
    source: project.name,
    target: project.themes?.[0] || "archive theme",
    type: "local-fallback",
    theme: project.themes?.[0] || "portfolio evidence",
    reason: project.reason,
    strength: 0.72,
  }));
  const paa = peopleAlsoAsk
    .map((item) => ({
      q: item.q,
      a: item.a,
      related: item.related || ["/work", "/ai-mode"],
      score: scoreText(tokens(cleaned), `${item.q} ${item.a} ${item.note || ""}`),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ score, ...item }) => item);

  return {
    query: cleaned,
    answer: answer || "The indexed archive does not directly mention this.",
    sources: shownSources,
    citations: shownSources,
    related_pages: shownRelatedPages.map((page) => page.url),
    relatedPages: shownRelatedPages,
    relatedProjects,
    relatedRepositories,
    related_searches: relatedSearches,
    relatedSearches,
    people_also_ask: paa,
    closest_archive: closestArchive?.url || null,
    closestArchive,
    concepts,
    themes: concepts.filter((item) => /technology|accessibility|systems|interfaces|safety|optimization|dignity/i.test(item)),
    repository_relationships: isRepoQuery
      ? repos.slice(0, 5).map((repo) => `${repo.name} - ${repo.kind}`)
      : [],
    semanticConnections,
    memoryBreadcrumbs: relatedProjects.length
      ? [`projects: ${relatedProjects.map((project) => project.name).slice(0, 3).join(", ")}`]
      : [],
    analysisStages: [
      "checking local archive",
      "matching projects",
      "connecting themes",
      "building fallback response",
    ],
    confidence: sources[0]?.score || (matches.length ? 0.72 : 0),
    grounded: Boolean(matches.length || sources.length || faq?.score > 0),
    llm_available: false,
    synthesisEngine: "local-semantic-fallback",
    intent: isRepoQuery ? "repository" : matches.length ? "project" : "archive",
    conversationId: `local-${Date.now()}`,
    client_fallback: true,
  };
}

export function normalizeArchiveResponse(data, query) {
  if (!data || !String(data.answer || "").trim()) {
    return buildLocalArchiveResponse(query);
  }

  const relatedPages =
    data.relatedPages ||
    (data.related_pages || []).map((url) => ({
      title: String(url).replace(/^\/projects\//, "").replace(/-/g, " ") || "Related page",
      url,
      reason: "Linked from archive retrieval.",
    }));

  const closestArchive =
    data.closestArchive ||
    (data.closest_archive
      ? {
          title: String(data.closest_archive).replace(/^\/projects\//, "").replace(/-/g, " "),
          url: data.closest_archive,
          reason: "Nearest archive match.",
        }
      : null);

  return {
    ...data,
    answer: String(data.answer).trim(),
    citations: data.citations || data.sources || [],
    relatedPages,
    related_pages: relatedPages.map((page) => page.url),
    relatedProjects: data.relatedProjects || [],
    relatedRepositories: data.relatedRepositories || [],
    closestArchive,
    closest_archive: closestArchive?.url || data.closest_archive || null,
    relatedSearches: data.relatedSearches || data.related_searches || [],
    related_searches: data.related_searches || data.relatedSearches || [],
    concepts: data.concepts || [],
    themes: data.themes || [],
    repository_relationships: data.repository_relationships || [],
    semanticConnections: data.semanticConnections || [],
    memoryBreadcrumbs: data.memoryBreadcrumbs || [],
    analysisStages: data.analysisStages || [],
    synthesisEngine: data.synthesisEngine || (data.llm_available ? "gemini" : "semantic-archive"),
    intent: data.intent || "archive",
  };
}
