// Verified data for Anita George — luxury editorial search portfolio.
// All entries cross-checked against the supplied verified information.

export const profile = {
  name: "Anita George",
  handle: "anita.george",
  pronouns: "she / her",
  role: "Computer Science Undergraduate · Full-Stack Developer · UI/UX Enthusiast",
  degree: "B.Tech in Computer Science Engineering",
  university: "Indian Institute of Information Technology Kottayam",
  universityShort: "IIIT Kottayam",
  years: "2024 – 2028",
  gpa: "9.03 / 10",
  location: "Kollam, Kerala, India",
  tagline: "systems-oriented, design-aware, accessibility-focused",
  blurb:
    "Anita George is a Computer Science Engineering undergraduate at IIIT Kottayam (2024–2028, GPA 9.03/10). She works across the full stack — from algorithmic backends and graph-theoretic optimization to accessibility-focused UI/UX. Her projects sit at the intersection of scalable systems, humane technology, and emotionally aware design, with a particular interest in safety, accessibility, and adaptive interfaces.",
  github: "https://github.com/AnitaGeorge404/",
  linkedin: "https://www.linkedin.com/in/anita-george-8b8334326/",
  portfolio: "https://anitageorge.vercel.app/",
  email: "anitageorge1806@gmail.com",
};

export const searchSuggestions = [
  "humane technology",
  "graph theory projects",
  "emotionally aware systems",
  "adaptive interfaces",
  "scalable APIs",
  "accessibility-focused UX",
  "backend systems",
  "AI safety",
  "optimization systems",
  "interface psychology",
  "digital dignity",
  "modular systems",
  "cognitive accessibility",
];

export const tabs = [
  { key: "all", label: "All", path: "/" },
  { key: "ai", label: "AI Mode", path: "/ai-mode", sparkle: true },
  { key: "work", label: "Work", path: "/work" },
  { key: "images", label: "Images", path: "/images" },
  { key: "videos", label: "Videos", path: "/videos" },
  { key: "research", label: "Research", path: "/research" },
  { key: "shopping", label: "Shopping", path: "/shopping" },
  { key: "contact", label: "Contact", path: "/contact" },
  { key: "more", label: "More", path: "/more" },
];

// ──────────────────────────────────────────────────────────────
// PROJECTS — verified
// ──────────────────────────────────────────────────────────────
export const projects = [
  {
    slug: "vantaai",
    name: "VantaAI",
    year: "2024",
    tagline: "image-based abuse & deepfake detection platform",
    summary:
      "An image-based abuse and deepfake detection platform that combines computer-vision and NLP pipelines for media ingestion and classification. Built on scalable REST APIs with optimized inference paths that improved end-to-end latency by approximately 30%. Hackathon-recognized.",
    note: "30% inference latency improvement",
    status: "hackathon-recognized",
    tags: ["AI", "Computer Vision", "NLP", "Safety", "REST APIs"],
    stack: ["Python", "Computer Vision", "NLP", "REST APIs"],
    themes: ["digital dignity", "online safety", "ethical AI"],
    color: "lavender",
    height: "tall",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
    motivation:
      "Built to explore how protective AI systems can reduce online harm — focused on digital dignity, ethical AI, and proactive detection rather than after-the-fact moderation.",
    architecture:
      "Computer-vision and NLP classification pipelines behind a REST API surface, with optimized inference paths and modular ingestion services.",
    outcomes:
      "Approximately 30% latency reduction across the inference pipeline; hackathon recognition.",
  },
  {
    slug: "delai",
    name: "DelAI",
    year: "2024",
    tagline: "graph-based route optimization system",
    summary:
      "A route optimization system built on weighted graph modeling and shortest-path algorithms. By tuning the constraint model and routing heuristics, the system achieved approximately 20% improvement in route efficiency over baseline approaches. Hackathon-winning.",
    note: "graph optimization · 20% efficiency gain",
    status: "hackathon winner",
    tags: ["Graphs", "Optimization", "Algorithms"],
    stack: ["Python", "Graph Algorithms", "Optimization"],
    themes: ["graph theory", "optimization", "systems engineering"],
    color: "sage",
    height: "medium",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
    motivation:
      "An applied take on graph theory and combinatorial optimization — exploring how classical algorithms, retuned carefully, can make a measurable difference in real logistics.",
    architecture:
      "Weighted-graph modeling layer, shortest-path engine, and a routing heuristic optimized against a multi-objective cost function.",
    outcomes:
      "Approximately 20% improvement in route efficiency; hackathon-winning entry.",
  },
  {
    slug: "faimer",
    name: "fAImer",
    year: "2025",
    tagline: "smart farming assistant",
    summary:
      "A smart farming assistant with ML-based crop disease detection, expense tracking, and market insights — multilingual, with offline-first support for low-connectivity rural contexts.",
    note: "offline-first · multilingual",
    status: "active project",
    tags: ["AI", "Computer Vision", "Accessibility", "Multilingual", "Offline-first"],
    stack: ["ML", "Computer Vision", "Mobile", "Offline-first"],
    themes: ["accessible technology", "practical AI"],
    color: "sage",
    height: "tall",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
    motivation:
      "Designed around accessible technology and practical AI — making image classification and farm-management tooling usable in low-connectivity contexts and multiple languages.",
    architecture:
      "ML image-classification model for crop disease detection, plus expense-tracking and market-insight modules, packaged with offline-first sync and multilingual UI.",
    outcomes:
      "Working offline-first prototype with multilingual UI and crop-disease classification.",
  },
  {
    slug: "lawgorithm",
    name: "LawGorithm",
    year: "2024",
    tagline: "scam detection & risk analysis platform",
    summary:
      "A scam-detection and risk-analysis platform using NLP-based classification and algorithmic risk scoring to surface safety alerts. Exposed via REST APIs, embeddable into safety-focused workflows.",
    note: "NLP risk analysis",
    status: "active project",
    tags: ["NLP", "Safety", "Risk Analysis", "REST APIs"],
    stack: ["Python", "NLP", "REST APIs"],
    themes: ["digital trust", "online safety"],
    color: "plum",
    height: "short",
    image:
      "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=900&q=80",
    motivation:
      "Building toward digital trust and online safety — examining how NLP and risk-analysis algorithms can give people better signals about what they're reading and engaging with.",
    architecture:
      "NLP-based scam classification pipeline, algorithmic risk scoring, alerting layer, and a REST API surface.",
    outcomes:
      "Working NLP detection + risk-analysis pipeline with REST API.",
  },
  {
    slug: "studybee",
    name: "StudyBee",
    year: "2025",
    tagline: "AI study assistant",
    summary:
      "An AI study assistant that generates structured notes, quizzes, and formula sheets from source material — organizing academic content algorithmically. Measured prep-time reduction of approximately 40%.",
    note: "structured prep · 40% time reduction",
    status: "active project",
    tags: ["AI", "Education", "Productivity"],
    stack: ["AI", "NLP", "React"],
    themes: ["educational systems", "reducing overwhelm"],
    color: "pink",
    height: "medium",
    image:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=900&q=80",
    motivation:
      "Built to reduce overwhelm in academic preparation — turning unstructured course material into structured, navigable artifacts.",
    architecture:
      "Content-ingestion and structuring pipeline that produces notes, quizzes, and formula sheets via algorithmic organization.",
    outcomes:
      "Approximately 40% prep-time reduction in measured internal use.",
  },
  {
    slug: "neurobridge",
    name: "NeuroBridge",
    year: "2026",
    timeline: "Feb 2026 – present",
    tagline: "adaptive support platform for neurodivergent users",
    summary:
      "An evolving adaptive-support platform for neurodivergent individuals with modular accessibility tooling across ASD and ADHD support. Features include Routine Visualizer, Sensory Regulation, Social Story Builder, Emotional Check-in, Focus Sessions, and Visual Timelines. Accessibility-first, emotionally aware UX — actively evolving, not deployed at scale or medically certified.",
    note: "evolving · accessibility-first",
    status: "active · evolving",
    tags: ["Accessibility", "Adaptive UX", "Humane Tech", "Modular Systems"],
    stack: ["React", "Next.js", "Tailwind", "Modular Architecture"],
    themes: ["humane technology", "adaptive interfaces", "cognitive support"],
    color: "lavender",
    height: "tall",
    image:
      "https://images.unsplash.com/photo-1499914485622-a88fac536970?auto=format&fit=crop&w=900&q=80",
    motivation:
      "Centered on humane technology and cognitive accessibility — exploring how interfaces and modular tools can offer structured support without becoming gamified or extractive.",
    architecture:
      "Modular feature surface (routine, sensory, social, emotional, focus, timeline) with dynamic feature activation. Designed around emotional safety and accessibility-first interaction patterns.",
    outcomes:
      "Active, evolving platform with significant architectural direction; not deployed at scale or medically certified.",
    features: [
      "Routine Visualizer",
      "Sensory Regulation",
      "Social Story Builder",
      "Emotional Check-in",
      "Focus Sessions",
      "Visual Timelines",
    ],
  },
];

// ──────────────────────────────────────────────────────────────
// AI overview (grounded, technical)
// ──────────────────────────────────────────────────────────────
export const aiOverview = {
  question: "who is anita george?",
  answer:
    "Anita George is a Computer Science Engineering undergraduate at IIIT Kottayam (2024–2028, GPA 9.03/10) based in Kollam, Kerala. She works across the full stack — backend systems (Python, FastAPI, Node.js, Express), frontend (React, Next.js, Tailwind), and a strong foundation in algorithms with 400+ DSA problems solved (230+ LeetCode, 170+ Codeforces). Her projects span graph-based optimization (DelAI), safety-focused AI (VantaAI, LawGorithm), accessibility-first adaptive interfaces (NeuroBridge), and accessible ML tooling (fAImer, StudyBee).",
  citations: [
    { label: "anitageorge.vercel.app", url: "https://anitageorge.vercel.app/" },
    { label: "github.com/AnitaGeorge404", url: "https://github.com/AnitaGeorge404/" },
    { label: "linkedin.com/in/anita-george", url: "https://www.linkedin.com/in/anita-george-8b8334326/" },
  ],
};

// Fallback PAA (used until backend responds)
export const peopleAlsoAsk = [
  {
    q: "What kind of engineer is Anita?",
    a: "A full-stack developer with strong algorithmic foundations (400+ DSA problems), backend systems experience (FastAPI, Express), frontend / UI-UX practice (React, Next.js, Tailwind), and an accessibility-first design instinct.",
    note: "full-stack + design-aware",
  },
  {
    q: "Why does humane technology appear repeatedly in her work?",
    a: "Several projects (VantaAI, NeuroBridge, fAImer, LawGorithm) are explicit about reducing harm, improving accessibility, or creating calmer user experiences. It's a recurring engineering choice, not branding.",
    note: "engineering choice, not branding",
  },
  {
    q: "Why does graph theory appear repeatedly?",
    a: "Anita has solved 400+ DSA problems (170+ on Codeforces) with a focus on graph theory and optimization. The most direct application is DelAI — graph-based route optimization with ~20% efficiency improvement.",
    note: "DSA practice + DelAI",
  },
  {
    q: "What makes NeuroBridge different?",
    a: "Adaptive support for neurodivergent users with modular ASD/ADHD tooling (Routine Visualizer, Sensory Regulation, Social Story Builder, Emotional Check-in, Focus Sessions, Visual Timelines). Accessibility-first, emotionally aware UX. Actively evolving, not medically certified.",
    note: "modular · accessibility-first",
  },
];

// ──────────────────────────────────────────────────────────────
// EXPERIENCE — verified
// ──────────────────────────────────────────────────────────────
export const experience = [
  {
    when: "2024 – present",
    where: "GDG IIIT Kottayam",
    role: "Technical Core Team",
    detail:
      "UI/UX workshops, technical event organization, community engagement, and design-consistency initiatives across chapter activities.",
  },
  {
    when: "2024 – present",
    where: "BetaLabs, IIIT Kottayam",
    role: "Web Development Core",
    detail:
      "Responsive web projects, frontend systems, and reusable component workflows across student team builds.",
  },
  {
    when: "2024 – present",
    where: "Trendles, IIIT Kottayam",
    role: "Design Core",
    detail:
      "Branding assets, posters, event creatives, and consistent visual systems for chapter and campus initiatives.",
  },
  {
    when: "2024 – present",
    where: "IEEE",
    role: "Student Volunteer",
    detail:
      "Active student-volunteer engagement with IEEE chapter activities.",
  },
  {
    when: "2024",
    where: "TEDxIIIT Kottayam",
    role: "Volunteer",
    detail: "Volunteer involvement in TEDxIIIT Kottayam programming.",
  },
];

// ──────────────────────────────────────────────────────────────
// SKILLS — verified
// ──────────────────────────────────────────────────────────────
export const skills = [
  { group: "languages", items: ["C++", "Java", "Python", "SQL", "JavaScript", "C"] },
  { group: "frontend", items: ["React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3"] },
  { group: "backend", items: ["Node.js", "Express.js", "FastAPI", "REST APIs", "Auth"] },
  { group: "databases", items: ["MySQL", "Firebase", "Supabase"] },
  { group: "tools", items: ["Git", "GitHub", "Linux", "Postman", "Figma", "Vercel", "Vite"] },
  { group: "design", items: ["Component Architecture", "Responsive Design", "UI/UX", "Visual Systems"] },
];

// ──────────────────────────────────────────────────────────────
// DSA — verified
// ──────────────────────────────────────────────────────────────
export const dsa = {
  total: "400+",
  leetcode: "230+",
  codeforces: "170+",
  focus: ["graph theory", "optimization", "scalable systems", "algorithms"],
};

// ──────────────────────────────────────────────────────────────
// ACHIEVEMENTS / CERTIFICATIONS — verified
// ──────────────────────────────────────────────────────────────
export const achievements = [
  { title: "TinkHack 2.0", result: "1st Prize Winner", year: "2024" },
  { title: "Girlathon", result: "1st Runner-Up", year: "2024" },
];

export const certifications = [
  { title: "IBM Full-Stack Backend Professional Certificate", issuer: "IBM" },
  { title: "Meta Frontend Professional Certificate", issuer: "Meta" },
  { title: "Google Data Analytics Certification", issuer: "Google" },
];

// ──────────────────────────────────────────────────────────────
// REPOSITORIES — described honestly as experiments / explorations
// ──────────────────────────────────────────────────────────────
export const repos = [
  {
    name: "anita-s-internet-brain",
    kind: "active experiment",
    note: "editorial portfolio + search-engine UX experiment",
  },
  {
    name: "anita-s-digital-archive",
    kind: "active experiment",
    note: "personal knowledge surface — design study",
  },
  { name: "Portfolio_version2", kind: "interface study", note: "iterative portfolio rebuild" },
  { name: "Pv2", kind: "interface study", note: "portfolio architecture explore" },
  { name: "Wrapped", kind: "design exploration", note: "year-in-review design study" },
  { name: "Neurobridge", kind: "ongoing system", note: "adaptive accessibility platform" },
  { name: "Neurobridge_V2", kind: "ongoing system", note: "architectural iteration" },
  { name: "Lume", kind: "design-focused build", note: "interface + visual-system study" },
  { name: "IndigoInForm", kind: "evolving project", note: "form-system exploration" },
  { name: "Indigo_admin", kind: "evolving project", note: "admin-surface iteration" },
];

// Aesthetic obsessions — generic taste markers, not factual claims
export const obsessions = [
  "humane technology",
  "graph theory",
  "accessibility-first UX",
  "adaptive interfaces",
  "scalable APIs",
  "modular systems",
  "interface psychology",
  "AI safety",
  "digital dignity",
  "component architecture",
  "responsive design",
  "cognitive accessibility",
];

export const internetTraces = [
  { time: "today", title: "graph theory practice · codeforces", url: "codeforces.com", tag: "dsa" },
  { time: "today", title: "react component patterns", url: "react.dev", tag: "frontend" },
  { time: "yesterday", title: "fastapi advanced patterns", url: "fastapi.tiangolo.com", tag: "backend" },
  { time: "yesterday", title: "accessibility-first design principles", url: "a11y.dev", tag: "ux" },
  { time: "this week", title: "neurodivergent UX patterns", url: "research", tag: "research" },
  { time: "this week", title: "weighted-graph routing references", url: "papers", tag: "algorithms" },
  { time: "earlier", title: "ibm full-stack backend coursework", url: "coursera.org", tag: "learning" },
  { time: "earlier", title: "meta frontend coursework", url: "coursera.org", tag: "learning" },
];

// Gallery — kept aesthetic, but captions reflect real themes
export const galleryImages = [
  { src: "https://images.unsplash.com/photo-1490604001847-b712b0c2f967?auto=format&fit=crop&w=900&q=80", caption: "interface study · component sketch", tag: "design" },
  { src: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=900&q=80", caption: "notebook page · algorithm notes", tag: "process" },
  { src: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=900&q=80", caption: "studybee · structured prep", tag: "studybee" },
  { src: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=900&q=80", caption: "reading list · systems & algorithms", tag: "reading" },
  { src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=900&q=80", caption: "design system reference", tag: "design" },
  { src: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=900&q=80", caption: "kerala · home", tag: "personal" },
  { src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80", caption: "campus walks · iiit kottayam", tag: "campus" },
  { src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=80", caption: "morning desk · build sessions", tag: "process" },
  { src: "https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?auto=format&fit=crop&w=900&q=80", caption: "moodboard study", tag: "design" },
  { src: "https://images.unsplash.com/photo-1499914485622-a88fac536970?auto=format&fit=crop&w=900&q=80", caption: "neurobridge · interface drafts", tag: "neurobridge" },
  { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80", caption: "delai · graph routing references", tag: "delai" },
  { src: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&w=900&q=80", caption: "archive · notes & references", tag: "archive" },
];

// Themes (replaces fictional 'essays')
export const themes = [
  {
    title: "Humane technology",
    year: "recurring theme",
    venue: "VantaAI · NeuroBridge · fAImer · LawGorithm",
    desc: "Several of Anita's projects choose calmer, safer, more accessible defaults. Detection systems reduce harm; adaptive interfaces reduce cognitive load; tools for low-connectivity contexts reduce exclusion.",
  },
  {
    title: "Graph theory & optimization",
    year: "applied + DSA",
    venue: "DelAI · 400+ DSA problems",
    desc: "DSA practice with a clear focus on graph theory shows up most directly in DelAI's graph-based routing, and as backend modeling intuition across other projects.",
  },
  {
    title: "Accessibility & adaptive interfaces",
    year: "2025 – present",
    venue: "NeuroBridge · fAImer",
    desc: "NeuroBridge is the explicit example — a modular adaptive-support platform with ASD/ADHD surfaces and emotionally aware UX. fAImer extends accessibility into multilingual / offline-first design.",
  },
  {
    title: "Backend systems, REST APIs, modular architecture",
    year: "across projects",
    venue: "VantaAI · LawGorithm · fAImer · NeuroBridge",
    desc: "Most projects rely on REST API surfaces and modular backend services built primarily with Python (FastAPI), Node.js (Express), and standard relational + Firebase/Supabase storage.",
  },
];

// Soft 'shopping' tab — kept playful but grounded
export const shopping = [
  { item: "a great mechanical keyboard", price: "TBD", note: "for the next 400 DSA problems" },
  { item: "a good linux laptop", price: "TBD", note: "build environment of choice" },
  { item: "figma pro", price: "subscription", note: "interface studies" },
  { item: "a stack of systems-design books", price: "ongoing", note: "designing data-intensive applications, etc." },
  { item: "vercel pro", price: "subscription", note: "for shipping iterations" },
  { item: "filter coffee", price: "endless", note: "non-negotiable" },
];

// Videos — placeholders pointing to real project domains
export const videos = [
  { title: "VantaAI — demo walkthrough", duration: "—", channel: "anita.george", thumb: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80" },
  { title: "DelAI — graph routing demo", duration: "—", channel: "anita.george", thumb: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80" },
  { title: "fAImer — offline-first preview", duration: "—", channel: "anita.george", thumb: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80" },
  { title: "NeuroBridge — early demo", duration: "—", channel: "anita.george", thumb: "https://images.unsplash.com/photo-1499914485622-a88fac536970?auto=format&fit=crop&w=600&q=80" },
];

// Archive — project & milestone timeline (verified, no fiction)
export const archive = [
  { date: "2024", note: "begins B.Tech CSE at IIIT Kottayam." },
  { date: "2024", note: "joins GDG, BetaLabs, Trendles core teams." },
  { date: "2024", note: "VantaAI — hackathon-recognized; ~30% inference latency improvement." },
  { date: "2024", note: "DelAI — hackathon-winning; ~20% routing efficiency improvement." },
  { date: "2024", note: "LawGorithm — NLP scam detection + risk analysis." },
  { date: "2024", note: "TinkHack 2.0 · 1st Prize Winner." },
  { date: "2024", note: "Girlathon · 1st Runner-Up." },
  { date: "2025", note: "fAImer — offline-first multilingual smart farming assistant." },
  { date: "2025", note: "StudyBee — AI study assistant; ~40% prep-time reduction (internal use)." },
  { date: "Feb 2026", note: "begins NeuroBridge — adaptive support platform for neurodivergent users (evolving)." },
];
