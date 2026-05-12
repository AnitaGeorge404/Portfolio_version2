// Real data for Anita George — luxury editorial search portfolio

export const profile = {
  name: "Anita George",
  handle: "anita.george",
  role: "AI / Full-Stack Engineer",
  studying: "B.Tech, Computer Science — IIIT Kottayam",
  location: "Kerala, India",
  tagline: "building emotionally-driven, humane systems",
  blurb:
    "Anita is a computer science undergraduate at IIIT Kottayam who builds AI-driven systems with an unusual amount of feeling. Her work lives in the soft seam between graph theory and graceful interfaces — research-leaning, design-obsessed, and quietly ambitious about what humane technology can become.",
  github: "https://github.com/AnitaGeorge404",
  linkedin: "https://www.linkedin.com/in/anita-george-8b8334326/",
  portfolio: "https://anitageorge.vercel.app/",
  email: "anita.george@example.com",
  pronouns: "she / her",
};

export const searchSuggestions = [
  "why she built vanta ai",
  "graph theory obsession",
  "emotional ai systems",
  "things she thinks about at 2am",
  "projects that became personal",
  "internet tabs that changed her",
  "humane technology",
  "ideas that scare her",
  "startup dreams",
  "systems she wishes existed",
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

export const projects = [
  {
    slug: "vanta-ai",
    name: "VantaAI",
    year: "2024",
    tagline: "an emotionally-aware AI companion",
    summary:
      "A privacy-first emotional AI built around the idea that software can hold space for someone the way a friend does — quiet, unjudgemental, and actually listening. Vanta surfaces patterns from your own writing and builds a small mirror of how you've been.",
    note: "built during a week where i barely slept",
    tags: ["AI", "NLP", "Emotional Systems", "Privacy"],
    stack: ["Python", "FastAPI", "OpenAI", "React", "MongoDB"],
    color: "lavender",
    height: "tall",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=80",
    motivation:
      "I kept noticing how loud the internet had become — every product wanted to be your everything. I wanted to build the opposite: a small, soft, slow companion that doesn't try to fix you.",
    architecture:
      "Local-first journaling with optional encrypted sync. A semantic memory layer over a vector store, a lightweight emotion classifier, and a planner that suggests gentle reflections rather than tasks.",
    failures:
      "First version felt like a chatbot. It took three rewrites before it stopped being a productivity tool wearing emotional clothing.",
  },
  {
    slug: "del-ai",
    name: "DelAI",
    year: "2024",
    tagline: "delivery routing rewritten with graphs",
    summary:
      "A graph-theory-first approach to last-mile logistics. DelAI re-imagines routes as living constraint problems, optimizing not just for speed but for the rider's day.",
    note: "graph theory is weirdly beautiful",
    tags: ["Graphs", "Optimization", "Logistics"],
    stack: ["Python", "NetworkX", "FastAPI", "React", "Mapbox"],
    color: "sage",
    height: "medium",
    image:
      "https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&w=900&q=80",
    motivation:
      "I fell down a rabbit hole reading about TSP variants and realized most delivery apps optimize the wrong thing.",
    architecture:
      "Multi-objective routing on a contracted graph + dynamic traffic edges + a soft preference layer that learns rider patterns over time.",
    failures:
      "Spent two weeks tuning a heuristic that turned out to be worse than a clean Dijkstra. Lesson: measure first, romanticize later.",
  },
  {
    slug: "faimer",
    name: "fAImer",
    year: "2025",
    tagline: "AI for small farms",
    summary:
      "A farmer-facing assistant that diagnoses crop disease from photos and recommends region-specific interventions in the local language. Built for low-end Android phones and patchy connections.",
    note: "this project became strangely personal",
    tags: ["Computer Vision", "Agriculture", "Edge AI", "Multilingual"],
    stack: ["TensorFlow Lite", "React Native", "FastAPI", "Postgres"],
    color: "sage",
    height: "tall",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
    motivation:
      "My grandparents farmed. I wanted to build the tool I wished existed in their village — not a SaaS dashboard, just something useful.",
    architecture:
      "On-device CNN for offline diagnosis, server-side LLM for reasoning over agricultural extension manuals, voice-first interface.",
    failures:
      "Initial dataset was too clean. Real photos are blurry, lit by kitchen bulbs, taken at odd angles. Re-collected from scratch.",
  },
  {
    slug: "lawgorithm",
    name: "LawGorithm",
    year: "2024",
    tagline: "legal docs, demystified",
    summary:
      "A reading companion that translates dense legal documents into plain language with cross-references and risk highlights. Designed for first-generation founders who can't afford a lawyer for every paragraph.",
    note: "i wrote half of this on a train",
    tags: ["NLP", "Legal Tech", "Accessibility"],
    stack: ["Python", "Transformers", "Next.js"],
    color: "plum",
    height: "short",
    image:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=900&q=80",
    motivation:
      "Reading a contract should not feel like climbing a wall barefoot.",
    architecture:
      "Document chunker → clause classifier → grounded LLM rewriting layer with an obligation/right/risk taxonomy.",
    failures:
      "First version hallucinated obligations. Added a strict citation requirement and the entire experience became honest again.",
  },
  {
    slug: "studybee",
    name: "StudyBee",
    year: "2023",
    tagline: "soft, slow studying",
    summary:
      "A focus app shaped like a notebook. StudyBee replaces gamified streaks with quiet rituals — a single page, a single intention, a single hour.",
    note: "a love letter to my undergrad self",
    tags: ["Productivity", "UX", "Soft UI"],
    stack: ["React", "Tailwind", "IndexedDB"],
    color: "pink",
    height: "medium",
    image:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=900&q=80",
    motivation:
      "I was tired of productivity tools shaming me. I wanted something that felt like a paper notebook on a Sunday morning.",
    architecture:
      "Offline-first, no accounts, no analytics. Just structured local storage and a beautiful page.",
    failures:
      "Tried to add streaks once. Removed them within 48 hours.",
  },
];

export const aiOverview = {
  question: "who is anita george?",
  answer:
    "Anita George is a computer-science undergraduate at IIIT Kottayam and an AI/full-stack engineer building emotionally intelligent systems. Her work blends graph theory, humane interface design, and a research-leaning approach to AI — visible across projects like VantaAI, fAImer, and LawGorithm. She is interested in slow software, feminine internet aesthetics, and tools that hold space for the people using them.",
  citations: [
    { label: "anitageorge.vercel.app", url: "https://anitageorge.vercel.app/" },
    { label: "github.com/AnitaGeorge404", url: "https://github.com/AnitaGeorge404" },
    { label: "linkedin.com/in/anita-george", url: "https://www.linkedin.com/in/anita-george-8b8334326/" },
  ],
};

export const peopleAlsoAsk = [
  {
    q: "Why does Anita build emotionally-driven systems?",
    a: "Because most software is built to extract attention. She's interested in the inverse — software that returns attention to the person, gently. Emotional intelligence isn't decoration in her work; it's the whole spec.",
    note: "the quiet thesis",
  },
  {
    q: "What project almost made her quit?",
    a: "fAImer, twice. Once when the dataset turned out to be unusable, and once when she realized the people she was building it for didn't speak the languages her models had been trained on. She rebuilt both times.",
    note: "kept going anyway",
  },
  {
    q: "Why is she obsessed with humane technology?",
    a: "Because she watched the internet she grew up on become loud and extractive. She is trying to build small pieces of an alternative — slower, softer, more honest.",
    note: "soft rebellion",
  },
  {
    q: "What does she think about at 2am?",
    a: "Graph theory. The geometry of attention. Whether AI can be tender. Whether her side projects are art or research or therapy. Usually all four.",
    note: "open tabs of the mind",
  },
  {
    q: "Why does graph theory feel beautiful to her?",
    a: "Because everything she finds interesting — language, friendship, cities, love — is fundamentally a graph. Edges and nodes and the spaces between them.",
    note: "the underlying shape",
  },
  {
    q: "Does she romanticize coding too much?",
    a: "Yes. Unapologetically. She thinks engineering deserves more poetry, not less.",
    note: "guilty as charged",
  },
  {
    q: "What kind of future does she want to build?",
    a: "One where software feels like it was made by a person. One with more pauses, fewer notifications, and AI that doesn't pretend to be a friend but also doesn't pretend it isn't one.",
    note: "the long arc",
  },
];

export const experience = [
  {
    when: "2024 — present",
    where: "Independent Research / Side Projects",
    role: "AI / Full-Stack Engineer",
    detail:
      "Building VantaAI, fAImer and LawGorithm. Writing about humane AI, soft UX and the geometry of attention.",
  },
  {
    when: "2023 — 2024",
    where: "IIIT Kottayam — Research Track",
    role: "Undergraduate Researcher",
    detail:
      "Graph theory, optimization, and applied ML. Collaborated on routing and recommendation experiments.",
  },
  {
    when: "2022 — 2023",
    where: "Open Source",
    role: "Contributor",
    detail:
      "Small contributions to NLP and accessibility libraries. Learned how to read other people's code with patience.",
  },
  {
    when: "2021 — present",
    where: "Personal Archive",
    role: "Internet citizen",
    detail:
      "Curating an internal moodboard of the internet she wants to live in.",
  },
];

export const skills = [
  { group: "languages", items: ["Python", "JavaScript", "TypeScript", "C++", "SQL"] },
  { group: "ai / ml", items: ["PyTorch", "TensorFlow", "Transformers", "LangChain", "Vector DBs"] },
  { group: "frontend", items: ["React", "Next.js", "Tailwind", "Framer Motion", "Three.js"] },
  { group: "backend", items: ["FastAPI", "Node.js", "PostgreSQL", "MongoDB", "Redis"] },
  { group: "tools", items: ["Figma", "Git", "Docker", "Vercel", "Linear"] },
  { group: "soft", items: ["Editorial taste", "Slow software", "Cross-disciplinary research"] },
];

export const internetTraces = [
  { time: "today, 02:14", title: "graph theory and the geometry of friendship", url: "old.zine/graphs", tag: "research" },
  { time: "today, 01:47", title: "is feminine software a thesis or an aesthetic?", url: "personal.notes", tag: "essay" },
  { time: "yesterday, 23:12", title: "vintage botanical scans archive", url: "biodiversity-library.org", tag: "moodboard" },
  { time: "yesterday, 22:01", title: "humane interfaces — bret victor", url: "worrydream.com", tag: "rewatch" },
  { time: "yesterday, 19:30", title: "tiny prayers for engineers", url: "tinyletter/anita", tag: "writing" },
  { time: "two days ago", title: "soft startup, soft scale, soft exit", url: "long.essay", tag: "draft" },
  { time: "two days ago", title: "watercolor process — yuko shimizu", url: "instagram", tag: "inspiration" },
  { time: "last week", title: "the editorial internet — paper", url: "personal.research", tag: "thesis" },
];

export const obsessions = [
  "feminine internet aesthetics",
  "vintage botanical scans",
  "graph theory",
  "tiny tools",
  "humane AI",
  "magazine spreads from 1998",
  "scrapbook composition",
  "slow software",
  "the geometry of attention",
  "soft startup ideas",
  "rural-tech",
  "editorial typography",
];

export const galleryImages = [
  { src: "https://images.unsplash.com/photo-1490604001847-b712b0c2f967?auto=format&fit=crop&w=900&q=80", caption: "pressed flowers, scanned at 2am", tag: "moodboard" },
  { src: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=900&q=80", caption: "an old notebook page", tag: "archive" },
  { src: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=900&q=80", caption: "studying, soft hours", tag: "studybee" },
  { src: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=900&q=80", caption: "books that taught me to think", tag: "reading" },
  { src: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80", caption: "a rescued tabby named graph", tag: "personal" },
  { src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=900&q=80", caption: "vintage botanical print", tag: "moodboard" },
  { src: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=900&q=80", caption: "kerala backwaters in monsoon", tag: "home" },
  { src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80", caption: "garden flowers, late summer", tag: "moodboard" },
  { src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=80", caption: "morning desk", tag: "process" },
  { src: "https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?auto=format&fit=crop&w=900&q=80", caption: "watercolor, in progress", tag: "art" },
  { src: "https://images.unsplash.com/photo-1499914485622-a88fac536970?auto=format&fit=crop&w=900&q=80", caption: "library afternoons", tag: "research" },
  { src: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&w=900&q=80", caption: "old paper textures", tag: "archive" },
];

export const research = [
  { title: "On the Quiet Thesis of Emotional AI", year: "2025", venue: "Personal Essay", desc: "An argument for AI systems that decline to perform empathy and instead make space for it." },
  { title: "Graphs as a Theory of Friendship", year: "2024", venue: "Working Notes", desc: "Speculative piece linking small-world graphs and emotional bandwidth." },
  { title: "Multilingual Computer Vision for Smallholder Farms", year: "2024", venue: "Project Whitepaper", desc: "Lessons from building fAImer for low-resource phones in three Indian languages." },
  { title: "Soft Software", year: "2023", venue: "Tinyletter", desc: "A loose manifesto on slowness, modesty and femininity in software design." },
];

export const shopping = [
  { item: "a moleskine, but used", price: "₹0", note: "found on a bench in fort kochi" },
  { item: "an audible subscription she actually uses", price: "₹199", note: "current obsession: gabor maté" },
  { item: "linen pinafore for studying", price: "₹2,400", note: "the studybee uniform" },
  { item: "kerala filter coffee", price: "endless", note: "non-negotiable" },
  { item: "a domain she'll never deploy", price: "₹890/yr", note: "but the idea is beautiful" },
  { item: "vintage botanical scan licenses", price: "free, public domain", note: "biodiversity heritage library" },
];

export const videos = [
  { title: "VantaAI — soft demo", duration: "2:14", channel: "anita.george", thumb: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=600&q=80" },
  { title: "DelAI walkthrough", duration: "4:02", channel: "anita.george", thumb: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80" },
  { title: "fAImer in the field", duration: "3:31", channel: "anita.george", thumb: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80" },
  { title: "talking soft software, IIITK", duration: "12:08", channel: "campus talks", thumb: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=600&q=80" },
];

export const archive = [
  { date: "2014", note: "first html page. background: tiled clouds." },
  { date: "2017", note: "wrote a poem inside a python comment." },
  { date: "2019", note: "tried to invent a new social network in a notebook. it failed." },
  { date: "2021", note: "first AI side project. terrible. loved it." },
  { date: "2022", note: "started keeping a tinyletter no one read." },
  { date: "2023", note: "studybee, the soft year." },
  { date: "2024", note: "vanta. del. lawgorithm. one bad sleep schedule." },
  { date: "2025", note: "fAImer ships. a lot more to do." },
];
