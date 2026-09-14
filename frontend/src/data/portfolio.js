// Verified data for Anita George — luxury editorial search portfolio.
// Every entry here is cross-checked against her resumes, LinkedIn, the
// CHORDS 2026 presentation certificate, and her public GitHub (github.com/AnitaGeorge404).
// Where a claim could not be independently verified, it is either left out
// or explicitly marked as unverified — nothing here is invented.

export const profile = {
  name: "Anita George",
  handle: "anita.george",
  pronouns: "she / her",
  role: "Software Engineer · Applied AI/ML Research",
  degree: "B.Tech in Computer Science Engineering",
  university: "Indian Institute of Information Technology Kottayam",
  universityShort: "IIIT Kottayam",
  years: "2024 – 2028",
  gpa: "9.17 / 10",
  location: "Kollam, Kerala, India",
  tagline: "Software engineer. Also does applied AI/ML research.",
  blurb:
    "Anita George is a Computer Science Engineering undergraduate at IIIT Kottayam (2024–2028, GPA 9.17/10), currently a Software Engineer at theMonks.tech building an agentic data-science platform. Alongside that she has run two research internships — one on code-mixed Malayalam sentiment analysis at SRM University–AP, one on indirect prompt-injection detection at RV University — and a related project, TrustHeritage, was presented at CHORDS 2026. She also builds fast outside of work: Cupid's Ledger handled 1,000+ users in a single day, and DelAI won TinkHack 2.0 on graph-based route optimization.",
  currentFocus: [
    "agentic data-science tooling at theMonks.tech",
    "LLM security — indirect prompt-injection detection",
    "digital-authenticity verification for cultural heritage media",
  ],
  github: "https://github.com/AnitaGeorge404/",
  linkedin: "https://www.linkedin.com/in/anita-george-8b8334326/",
  portfolio: "https://anitageorge.vercel.app/",
  email: "anitageorge1806@gmail.com",
};

export const searchSuggestions = [
  "prompt injection detection",
  "code-mixed NLP",
  "graph-based optimization",
  "digital authenticity & provenance",
  "agentic platforms",
  "accessibility-first interfaces",
  "computer vision forensics",
  "movie-disjoint evaluation",
  "open source contributions",
  "adaptive UX for neurodivergent users",
  "REST API architecture",
  "research methodology",
];

// ──────────────────────────────────────────────────────────────
// PROJECTS — verified, shipped or competition-recognized systems.
// Research papers live in `research` below, not here.
// ──────────────────────────────────────────────────────────────
export const projects = [
  {
    slug: "vantaai",
    name: "VantaAI",
    year: "2025",
    tagline: "image-based abuse & deepfake detection platform",
    summary:
      "A platform for preventing and detecting image-based abuse, combining digital watermarking, reverse-image scanning, deepfake detection, and guided remediation — including automated assistance for legal reporting and takedown processes. Built with a team of three for Girlathon 2025 (2nd place / 1st runner-up), organized by GDSC MACE, Kalkitech, and Kerala Startup Mission.",
    note: "Girlathon 2025 · 2nd place",
    status: "hackathon-recognized · team project",
    tags: ["AI", "Computer Vision", "NLP", "Safety", "REST APIs"],
    stack: ["React", "JavaScript", "Python", "Vite"],
    themes: ["digital dignity", "online safety", "computer vision"],
    color: "lavender",
    height: "tall",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
    motivation:
      "Built with Gowri Arun and T P Shivha Shakthiy over an 8-week builder track — a women's-safety platform that treats image-based abuse as a detection-and-response problem, not just a reporting form.",
    architecture:
      "Computer-vision and NLP classification pipelines behind a REST API surface: image protection, reverse-image scanning, deepfake detection, and a guided remediation workflow with automated assistance for legal reporting and takedowns.",
    outcomes:
      "2nd place at Girlathon 2025 (8-week hackathon, GDSC MACE × Kalkitech × Kerala Startup Mission).",
  },
  {
    slug: "delai",
    name: "DelAI",
    year: "2025",
    tagline: "graph-based route optimization system",
    summary:
      "A GenAI-era delivery-optimization system that models delivery locations as a weighted graph and applies shortest-path algorithms to cut routing time. Won 1st place at TinkHack 2.0, a 24-hour hackathon at Govt. Model Engineering College, built with Lestlin Robins and Muhammed Basil.",
    note: "TinkHack 2.0 · 1st place · ~20% routing efficiency gain",
    status: "hackathon winner · team project",
    tags: ["Graphs", "Optimization", "Algorithms", "GenAI"],
    stack: ["Python", "Graph Algorithms"],
    themes: ["graph theory", "optimization", "logistics"],
    color: "sage",
    height: "medium",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
    motivation:
      "A 24-hour team build applying graph theory — Anita's strongest DSA focus area — to a real logistics constraint instead of a leaderboard problem.",
    architecture:
      "Weighted-graph modeling of delivery locations, shortest-path routing engine, and a heuristic layer tuned against a multi-objective cost function to beat baseline route computation.",
    outcomes:
      "1st place, TinkHack 2.0 (sponsored by DBiz.ai, Wizr AI, South Indian Bank); approximately 20% improvement in route efficiency over baseline heuristics.",
  },
  {
    slug: "cupidsledger",
    name: "Cupid's Ledger",
    year: "2026",
    timeline: "Feb 2026",
    tagline: "gamified Valentine's matchmaking platform",
    summary:
      "A BetaLabs project: a gamified Valentine's matchmaking platform spanning authentication, personality quizzes, matchmaking, profiles, and live leaderboards — handling 1,000+ users in a single day.",
    note: "1,000+ users in a single day",
    status: "shipped",
    tags: ["Frontend", "React", "Framer Motion", "Real-time UX"],
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    themes: ["frontend engineering", "real user load", "product design"],
    color: "pink",
    height: "medium",
    image:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=900&q=80",
    motivation:
      "A short-timeline BetaLabs build meant to actually ship and be used, not just demoed — the interesting problem was interaction design and load, not novelty.",
    architecture:
      "React/Vite frontend with a personality-quiz-driven matchmaking flow, live leaderboards, and Framer Motion-driven interaction states, built for a one-day traffic spike rather than steady load.",
    outcomes:
      "1,000+ users engaged with the platform within its first day live.",
  },
  {
    slug: "neurobridge",
    name: "NeuroBridge",
    year: "2026",
    timeline: "Feb 2026 – present",
    tagline: "adaptive support platform for neurodivergent individuals",
    summary:
      "An adaptive support platform for people with ASD, ADHD, Dyslexia, and Dyscalculia, with modular tools for routine management, sensory regulation, emotional awareness, social stories, and focused productivity. Built with Sona Jomon, Gowri Arun, and T P Shivha Shakthiy during Kerala Startup Mission's She Builds Tech 2.0 (5-week builder program), presented at the IEDC Kerala Startup Summit 2026 Demo Day.",
    note: "She Builds Tech 2.0 · Demo Day, IEDC Kerala Startup Summit 2026",
    status: "active · evolving, ongoing KSUM mentorship",
    tags: ["Accessibility", "Adaptive UX", "Humane Tech", "Modular Systems"],
    stack: ["React", "Vite", "Flask", "Supabase"],
    themes: ["accessibility", "adaptive interfaces", "cognitive support"],
    color: "lavender",
    height: "tall",
    image:
      "https://images.unsplash.com/photo-1499914485622-a88fac536970?auto=format&fit=crop&w=900&q=80",
    motivation:
      "Rather than one generic accessibility tool, the team built a modular surface so each person only sees the support relevant to them — the design bet was against cognitive overload, not for feature count.",
    architecture:
      "Modular feature surface (Routine Visualizer, Sensory Regulation, Social Story Builder, Emotional Check-in, Focus Sessions, Visual Timelines) with dynamic feature activation, adaptive onboarding, and role-based access on a React/Vite frontend with a Flask + Supabase backend.",
    outcomes:
      "Presented at Demo Day among 8 student teams at the IEDC Kerala Startup Summit 2026; continuing with Kerala Startup Mission mentorship. Not deployed at scale or medically certified.",
    features: [
      "Routine Visualizer",
      "Sensory Regulation",
      "Social Story Builder",
      "Emotional Check-in",
      "Focus Sessions",
      "Visual Timelines",
    ],
  },
  {
    slug: "civicaid",
    name: "CivicAid",
    year: "2025",
    tagline: "civic-tech venture pitch — Innowave Pitchathon winner",
    summary:
      "A startup pitch built with the REsolvers team for the Innowave Pitchathon in Kollam — a pure business-strategy round with no demo and no code, judged on market logic and execution planning rather than a working prototype. Won 1st place.",
    note: "Innowave Pitchathon · 1st place · no-code round",
    status: "pitch-stage · 1st place",
    tags: ["Product Strategy", "Frontend", "Civic Tech"],
    stack: ["Product Strategy", "Pitch Design"],
    themes: ["product thinking", "civic technology", "startup strategy"],
    color: "sage",
    height: "short",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    motivation:
      "Innowave deliberately stripped the hackathon format down to strategy and market logic — the challenge was articulating why the idea matters as a business, not proving it could be built.",
    architecture:
      "Business-model and go-to-market plan for a civic-tech concept, developed with team lead Adithyan M Nair, and teammates Amal Sajeev, Muhammed Basil, and Lestlin Robins; Anita's focus was the product experience and framing of the pitch.",
    outcomes:
      "1st place at the Innowave Pitchathon, held at Innerspace Coworking, Kollam.",
  },
  {
    slug: "faimer",
    name: "fAImer",
    year: "2025",
    tagline: "smart farming assistant",
    summary:
      "A smart farming assistant with ML-based crop disease detection, expense tracking, and market-price insights — built as a Progressive Web App with multilingual support and offline-first data handling for low-connectivity rural contexts.",
    note: "offline-first · multilingual",
    status: "experimental",
    tags: ["AI", "Computer Vision", "Accessibility", "Multilingual", "Offline-first"],
    stack: ["ML", "Computer Vision", "PWA"],
    themes: ["accessible technology", "practical AI"],
    color: "sage",
    height: "tall",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
    motivation:
      "Designed around accessible technology and practical AI — making image classification and farm-management tooling usable in low-connectivity contexts and multiple languages.",
    architecture:
      "ML image-classification model for crop-disease detection, plus expense-tracking and market-insight modules, packaged as a Progressive Web App with offline-first sync and multilingual UI.",
    outcomes:
      "Working prototype with offline-first sync, multilingual UI, and crop-disease classification.",
  },
  {
    slug: "lawgorithm",
    name: "LawGorithm",
    year: "2025",
    tagline: "scam detection & risk analysis system",
    summary:
      "A scam-detection and risk-analysis system using NLP-based classification and algorithmic decision logic, exposed via REST APIs to deliver real-time safety alerts.",
    note: "NLP risk analysis",
    status: "experimental",
    tags: ["NLP", "Safety", "Risk Analysis", "REST APIs"],
    stack: ["Python", "NLP", "REST APIs"],
    themes: ["digital trust", "online safety"],
    color: "plum",
    height: "short",
    image:
      "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=900&q=80",
    motivation:
      "An exploration of how NLP and rule-based risk scoring can give people a faster signal about what they're reading before they act on it.",
    architecture:
      "NLP-based scam-classification pipeline with algorithmic risk scoring and a REST API layer for real-time alerts.",
    outcomes: "Working NLP detection and risk-scoring pipeline exposed as a REST API.",
  },
  {
    slug: "studybee",
    name: "StudyBee",
    year: "2025",
    tagline: "AI study assistant",
    summary:
      "An AI study assistant that turns source material into structured notes, quizzes, and formula sheets — organizing academic content algorithmically to reduce prep time.",
    note: "structured prep · ~40% time reduction",
    status: "experimental",
    tags: ["AI", "Education", "Productivity"],
    stack: ["Python", "NLP"],
    themes: ["educational tooling"],
    color: "pink",
    height: "medium",
    image:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=900&q=80",
    motivation:
      "Built to turn unstructured course material into something navigable — the interesting part was the content-structuring logic, not the UI.",
    architecture:
      "Content-ingestion and structuring pipeline that produces notes, quizzes, and formula sheets via algorithmic organization of source material.",
    outcomes: "Reported ~40% reduction in prep time in internal use (self-reported, not independently benchmarked).",
  },
];

// ──────────────────────────────────────────────────────────────
// RESEARCH — actual papers / research projects, kept distinct from
// product/hackathon projects. Status is stated precisely: "presented"
// is not the same as "published," and a "research project" is not a
// "manuscript." Do not blur these.
// ──────────────────────────────────────────────────────────────
export const research = [
  {
    slug: "trustheritage",
    title: "TrustHeritage: A Multi-Layer AI Framework for Authenticity Preservation of Digitized Cultural Heritage",
    venue: "CHORDS 2026 — International Conference on Computation and Humanities: Overlapping Research in Digital Spaces",
    org: "IIIT Kottayam, ANRF-sponsored, hybrid mode, 13–15 July 2026",
    status: "Presented",
    year: "2026",
    problem:
      "Digitized cultural-heritage media (scanned artifacts, restorations, archival photographs) can be manipulated or degraded with no reliable way to verify what's authentic versus altered.",
    method:
      "An explainable, multi-layer authenticity framework combining DWT (discrete wavelet transform) watermarking, SHA-256 provenance hashing, image forensics, and OpenCLIP semantic-similarity scoring — layering complementary evidence rather than relying on a single detector.",
    evaluation:
      "130 controlled verification runs across compression, cropping, resizing, rotation, blur, tonal changes, and localized manipulation, analyzing how each evidence layer behaves under each distortion type.",
    result:
      "A working multi-layer verification pipeline with per-layer behavior characterized across seven distortion categories.",
    limitation:
      "Presented at a conference, not yet published as a peer-reviewed journal article; evaluation is on controlled synthetic manipulations rather than real-world adversarial cases.",
    tags: ["Computer Vision", "Digital Forensics", "Cultural Heritage", "Watermarking"],
    repo: "trustheritage",
  },
  {
    slug: "sage-pi",
    title: "SAGE-PI: Structure-Aware Generalizable Detection of Indirect Prompt Injection",
    venue: "Research project — RV University",
    org: "RV University, Jun – Jul 2026",
    status: "Research project",
    year: "2026",
    problem:
      "LLM security classifiers for indirect prompt injection tend to overfit to the specific sources and attack styles they were trained on, and fail to generalize to unseen sources or novel attack families.",
    method:
      "A multi-channel detection approach combining DistilBERT-based semantic representations, source-structural features, and instruction-conflict modeling, built on a 32,475-sample corpus spanning seven public and synthetic sources.",
    evaluation:
      "Leave-one-source-out and unseen-attack-family evaluation protocols, with a leakage-audited experimental pipeline and statistical significance testing to check that generalization gains were real, not noise.",
    result:
      "A reproducible cross-source and cross-attack-family evaluation pipeline for indirect prompt-injection detection, with significance-tested comparisons across feature channels.",
    limitation:
      "A research project, not a published paper; corpus includes synthetic sources alongside public ones, which can only approximate real-world attack diversity.",
    tags: ["LLM Security", "Prompt Injection", "NLP", "DistilBERT"],
    repo: "sage_pi",
  },
  {
    slug: "malayalam-sentiment",
    title: "A Movie-Disjoint Benchmark for Code-Mixed Malayalam Movie-Review Sentiment, with Judgeability-Gated Classification and a Cross-View Diagnostic",
    venue: "Research manuscript — SRM University–AP",
    org: "SRM University–AP, Jun – Jul 2026 (SIF-2026 Summer Research Internship)",
    status: "Manuscript",
    year: "2026",
    problem:
      "Sentiment models for code-mixed languages are usually evaluated with random train/test splits, which lets a model implicitly memorize movie-specific vocabulary instead of learning to generalize to review sentiment it hasn't seen before.",
    method:
      "Built a 57,393-comment benchmark across 36 Malayalam movies and introduced a movie-disjoint evaluation protocol — no movie appears in both train and test — plus a judgeability-gated classification step and a cross-view diagnostic for opinion transfer.",
    evaluation:
      "Compared TF-IDF + Logistic Regression, MuRIL, XLM-RoBERTa, and IndicBERTv2 under both conventional and movie-disjoint splits.",
    result:
      "A 13.3-point macro-F1 gap between conventional and movie-disjoint evaluation — a concrete demonstration that standard evaluation protocols overstate real-world generalization on this task.",
    limitation:
      "Manuscript stage, not yet peer-reviewed or published; recognized with a Best Intern award (SIF-2026) but the research itself remains under further development.",
    tags: ["NLP", "Code-Mixed Language", "Sentiment Analysis", "Evaluation Methodology"],
    repo: "movie_research",
  },
];

// ──────────────────────────────────────────────────────────────
// AI overview (grounded, technical)
// ──────────────────────────────────────────────────────────────
export const aiOverview = {
  question: "who is anita george?",
  answer:
    "Anita George is a Computer Science Engineering undergraduate at IIIT Kottayam (2024–2028, GPA 9.17/10), currently a Software Engineer at theMonks.tech working on an agentic data-science platform. She has run two research internships — code-mixed Malayalam sentiment analysis at SRM University–AP (Best Intern, SIF-2026) and indirect prompt-injection detection at RV University — and a related project, TrustHeritage, was presented at CHORDS 2026. She's also shipped fast outside of work: Cupid's Ledger handled 1,000+ users in a day, and DelAI won TinkHack 2.0 on graph-based route optimization. 400+ DSA problems solved (230+ LeetCode, 170+ Codeforces).",
  citations: [
    { label: "anitageorge.vercel.app", url: "https://anitageorge.vercel.app/" },
    { label: "github.com/AnitaGeorge404", url: "https://github.com/AnitaGeorge404/" },
    { label: "linkedin.com/in/anita-george", url: "https://www.linkedin.com/in/anita-george-8b8334326/" },
  ],
};

// Fallback PAA (used until backend responds)
export const peopleAlsoAsk = [
  {
    q: "What is Anita currently working on?",
    a: "She's a Software Engineer at theMonks.tech, building full-stack features for an agentic data-science platform — AI agents, datasets, projects, workspaces, and conversational workflows.",
    note: "current role",
  },
  {
    q: "What did the TrustHeritage paper investigate?",
    a: "A multi-layer authenticity-verification framework for digitized cultural heritage, combining DWT watermarking, SHA-256 provenance, image forensics, and OpenCLIP semantic similarity — tested across 130 controlled verification runs. Presented at CHORDS 2026.",
    note: "presented, CHORDS 2026",
  },
  {
    q: "What is SAGE-PI?",
    a: "A research project at RV University on detecting indirect prompt injection in LLM systems, using a 32,475-sample corpus and structure-aware, cross-source evaluation with statistical significance testing.",
    note: "LLM security research",
  },
  {
    q: "Which project handled real users?",
    a: "Cupid's Ledger — a gamified Valentine's matchmaking platform built for BetaLabs — handled 1,000+ users in a single day.",
    note: "shipped, real load",
  },
];

// ──────────────────────────────────────────────────────────────
// EXPERIENCE — verified, reverse-chronological
// ──────────────────────────────────────────────────────────────
export const experience = [
  {
    when: "Jun 2026 – present",
    where: "theMonks.tech",
    role: "Software Engineer",
    detail:
      "Full-stack features for an agentic data-science platform — AI agents, datasets, projects, workspaces, and conversational workflows. Architects backend services and APIs, and builds modular React/Vite interfaces for production workflows.",
  },
  {
    when: "Jun – Jul 2026",
    where: "SRM University–AP",
    role: "Research Intern",
    detail:
      "Built a 57,393-comment, 36-movie benchmark for code-mixed Malayalam sentiment analysis with a movie-disjoint evaluation protocol; co-authored the resulting manuscript. Recognized as Best Intern, SIF-2026 Summer Research Internship Program.",
  },
  {
    when: "Jun – Jul 2026",
    where: "RV University",
    role: "Research Intern",
    detail:
      "Ran concurrently with the SRM internship. Researched SAGE-PI — structure-aware detection of indirect prompt injection — building a 32,475-sample corpus and a leakage-audited, cross-source evaluation pipeline.",
  },
  {
    when: "May – Jun 2026",
    where: "Pixelboho",
    role: "Software Developer Intern",
    detail:
      "Built responsive web features and UI, integrated APIs, and optimized frontend–backend communication in a Git-based cross-functional workflow. Kochi.",
  },
  {
    when: "May – Jul 2026",
    where: "GirlScript Summer of Code (GSSoC)",
    role: "Ambassador & Contributor — Open Source & AI Agents",
    detail:
      "Contributed React components and animation utilities through GitHub issues and pull requests. Also served as a GSSoC 2026 Ambassador.",
  },
  {
    when: "Feb 2026 – present",
    where: "REsolvers",
    role: "Co-Founder",
    detail:
      "Co-founded with Adithyan M Nair, Amal Sajeev, Muhammed Basil, and Lestlin Robins. Won 1st place at the Innowave Pitchathon (Kollam) with CivicAid; Anita's focus was frontend and product experience.",
  },
  {
    when: "Jun – Jul 2025",
    where: "Skillbit Technologies",
    role: "Full Stack Developer",
    detail: "Short-term full-stack development engagement.",
  },
];

// Campus leadership & community roles — kept separate from professional/research experience.
export const leadership = [
  {
    when: "Nov 2025 – present",
    where: "GDG IIIT Kottayam",
    role: "Technical Core Team",
    detail:
      "Led UI/UX and modern web-animation workshops; helped organize Techashy, a 24-hour hackathon. Technical volunteer with the chapter from Jan 2025.",
  },
  {
    when: "Aug 2026 – present",
    where: "BetaLabs, IIIT Kottayam",
    role: "Web Development Lead",
    detail:
      "Previously Web Development Core Team (Nov 2025 – Aug 2026): responsive web projects and reusable component workflows, improving frontend development efficiency by ~25% through component reuse and standardized layouts.",
  },
  {
    when: "Sep 2026 – present",
    where: "Trendles, IIIT Kottayam",
    role: "Design Lead",
    detail:
      "Previously Design Core Team (Oct 2025 – Sep 2026): 10+ branding assets — posters, social creatives, and event materials.",
  },
  {
    when: "Dec 2025 – Jan 2026",
    where: "Code Kalari, IIIT Kottayam",
    role: "Core Organizer",
    detail:
      "Co-organized a 24-hour national-level hackathon with a ₹2,00,000+ prize pool, sponsored by Dodo Payments, navan.ai, Mastra, Interview Cake, Devfolio, and ETHGlobal.",
  },
  {
    when: "Feb 2025",
    where: "IEEE",
    role: "Student Volunteer",
    detail: "Supported organization of a 100+ participant technical event — registrations, logistics, coordination.",
  },
  {
    when: "Jan 2025",
    where: "TEDxIIIT Kottayam",
    role: "Volunteer",
    detail: "PR and audience outreach for a 200+ attendee event.",
  },
];

// ──────────────────────────────────────────────────────────────
// SKILLS — verified
// ──────────────────────────────────────────────────────────────
export const skills = [
  { group: "languages", items: ["C++", "Python", "Java", "JavaScript", "SQL", "C"] },
  { group: "frontend", items: ["React.js", "Next.js", "Vite", "Tailwind CSS", "React Native", "HTML5", "CSS3"] },
  { group: "backend", items: ["Node.js", "Express.js", "FastAPI", "REST APIs", "Authentication"] },
  { group: "ai / ml", items: ["NLP", "PyTorch", "Transformers", "scikit-learn", "pandas", "NumPy", "Prompt-Injection Detection"] },
  { group: "databases", items: ["MySQL", "Firebase", "Supabase", "MongoDB"] },
  { group: "tools", items: ["Git", "GitHub", "Google Cloud", "Linux", "Postman", "Figma", "Vercel", "Jupyter"] },
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
  { title: "TinkHack 2.0 (GenAI Hackathon)", result: "1st Place — DelAI", year: "2025" },
  { title: "Girlathon 2025", result: "2nd Place (1st Runner-Up) — VantaAI", year: "2025" },
  { title: "Innowave Pitchathon", result: "1st Place — CivicAid, with REsolvers", year: "2025" },
  { title: "SIF-2026 Summer Research Internship, SRM University–AP", result: "Best Intern", year: "2026" },
];

export const certifications = [
  { title: "IBM Full-Stack Software Developer Professional Certificate", issuer: "IBM" },
  { title: "Meta Frontend Developer Professional Certificate", issuer: "Meta" },
  { title: "Google Data Analytics Certification", issuer: "Google" },
  { title: "Cloud to Crowd: Build Your Portfolio with Next.js", issuer: "IEDC / Startup Summit" },
];

// ──────────────────────────────────────────────────────────────
// REPOSITORIES — verified directly against github.com/AnitaGeorge404
// (41 public repos as of this audit). Split into repos that map to a
// documented project/paper above, and everything else — listed
// honestly by name/language only, since their READMEs weren't
// available to describe accurately.
// ──────────────────────────────────────────────────────────────
const GH = "https://github.com/AnitaGeorge404/";

export const repos = [
  { name: "VantaAI", kind: "hackathon project", note: "Girlathon 2025 — image-abuse & deepfake detection", relatedProject: "vantaai", url: `${GH}VantaAI` },
  { name: "Neurobridge", kind: "ongoing system", note: "NeuroBridge, first iteration", relatedProject: "neurobridge", url: `${GH}Neurobridge` },
  { name: "Neurobridge_V2", kind: "ongoing system", note: "NeuroBridge, architectural rebuild", relatedProject: "neurobridge", url: `${GH}Neurobridge_V2` },
  { name: "Betalabs_cupids_ledger", kind: "shipped project", note: "Cupid's Ledger — BetaLabs", relatedProject: "cupidsledger", url: `${GH}Betalabs_cupids_ledger` },
  { name: "CIVIC-AID-STARTUP-", kind: "pitch project", note: "Innowave Pitchathon submission", relatedProject: "civicaid", url: `${GH}CIVIC-AID-STARTUP-` },
  { name: "LawGorithm", kind: "experiment", note: "NLP scam detection & risk analysis", relatedProject: "lawgorithm", url: `${GH}LawGorithm` },
  { name: "sage_pi", kind: "research", note: "SAGE-PI — RV University", relatedProject: "sage-pi", url: `${GH}sage_pi` },
  { name: "trustheritage", kind: "research", note: "TrustHeritage — presented at CHORDS 2026", relatedProject: "trustheritage", url: `${GH}trustheritage` },
  { name: "movie_research", kind: "research", note: "Malayalam sentiment benchmark — SRM University–AP", relatedProject: "malayalam-sentiment", url: `${GH}movie_research` },
  { name: "EaseMotion-css", kind: "open source", note: "Zero-dependency animation-first CSS/React framework — GSSoC 2026 contribution", url: `${GH}EaseMotion-css` },
  { name: "fAImer", kind: "experiment", note: "Smart farming assistant", relatedProject: "faimer", url: `${GH}fAImer` },
  { name: "StudyBee", kind: "experiment", note: "AI study assistant", relatedProject: "studybee", url: `${GH}StudyBee` },
  { name: "Portfolio_version2", kind: "interface study", note: "This portfolio", url: `${GH}Portfolio_version2` },
];

// Other public repositories — listed for transparency, not fully
// documented here. Descriptions kept to what's independently
// verifiable (name, language) rather than guessed.
export const otherRepos = [
  { name: "AIVentures", language: "JavaScript", url: `${GH}AIVentures` },
  { name: "DarkMatter", language: "TypeScript", url: `${GH}DarkMatter` },
  { name: "Vitalis", language: "JavaScript", url: `${GH}Vitalis` },
  { name: "FetalTracker", language: "TypeScript", url: `${GH}FetalTracker` },
  { name: "CHild_safety", language: "TypeScript", url: `${GH}CHild_safety` },
  { name: "Quantum_website", language: "JavaScript", url: `${GH}Quantum_website` },
  { name: "Qiskit-fall-fest-website", language: "JavaScript", url: `${GH}Qiskit-fall-fest-website` },
  { name: "Ocr_and_extraction", language: "Python", url: `${GH}Ocr_and_extraction` },
  { name: "IssueScout_Hunter", language: "—", url: `${GH}IssueScout_Hunter` },
  { name: "du_hacks_team_141", language: "TypeScript", url: `${GH}du_hacks_team_141` },
  { name: "chat-app", language: "JavaScript", url: `${GH}chat-app` },
  { name: "Event-Management-Landing-Page", language: "HTML", url: `${GH}Event-Management-Landing-Page` },
];

// Aesthetic / technical interests — grounded in actual work, not vibes.
export const obsessions = [
  "graph theory",
  "accessibility-first UX",
  "LLM security & prompt injection",
  "code-mixed NLP",
  "digital forensics & provenance",
  "agentic systems",
  "component architecture",
  "responsive design",
  "open source",
];

// Gallery — explicitly a moodboard, not project screenshots (labeled as such on the Images page).
export const galleryImages = [
  { src: "https://images.unsplash.com/photo-1490604001847-b712b0c2f967?auto=format&fit=crop&w=900&q=80", caption: "interface study · component sketch", tag: "design" },
  { src: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=900&q=80", caption: "notebook page · algorithm notes", tag: "process" },
  { src: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=900&q=80", caption: "studybee · structured prep", tag: "studybee" },
  { src: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=900&q=80", caption: "reading list · systems & algorithms", tag: "reading" },
  { src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=900&q=80", caption: "design system reference", tag: "design" },
  { src: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=900&q=80", caption: "kerala · home", tag: "personal" },
  { src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80", caption: "campus walks · iiit kottayam", tag: "campus" },
  { src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=80", caption: "morning desk · build sessions", tag: "process" },
  { src: "https://images.unsplash.com/photo-1499914485622-a88fac536970?auto=format&fit=crop&w=900&q=80", caption: "neurobridge · interface drafts", tag: "neurobridge" },
  { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80", caption: "delai · graph routing references", tag: "delai" },
  { src: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&w=900&q=80", caption: "archive · notes & references", tag: "archive" },
];

// Themes — recurring technical patterns across the work (not a
// substitute for the actual research papers, which live in `research`).
export const themes = [
  {
    title: "Safety-focused AI",
    year: "2025 – present",
    venue: "VantaAI · LawGorithm",
    desc: "Detection-first systems for online harm — image-abuse detection, deepfake detection, and NLP-based scam/risk analysis.",
  },
  {
    title: "Graph theory & optimization",
    year: "applied + DSA",
    venue: "DelAI · 400+ DSA problems",
    desc: "400+ DSA problems solved with a stated focus on graph theory and optimization, applied directly in DelAI's routing engine.",
  },
  {
    title: "Accessibility & adaptive interfaces",
    year: "2026",
    venue: "NeuroBridge · fAImer",
    desc: "NeuroBridge's modular, cognitive-load-aware design for neurodivergent users; fAImer's multilingual, offline-first design for low-connectivity contexts.",
  },
  {
    title: "AI/ML research",
    year: "2026",
    venue: "TrustHeritage · SAGE-PI · Malayalam sentiment benchmark",
    desc: "Two concurrent research internships (SRM University–AP, RV University) plus a presented conference paper, spanning digital forensics, LLM security, and NLP evaluation methodology.",
  },
];

// Videos — self-labeled as not yet recorded; kept honest rather than implying they exist.
export const videos = [
  { title: "VantaAI — walkthrough", duration: "—", channel: "anita.george", thumb: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80" },
  { title: "DelAI — graph routing demo", duration: "—", channel: "anita.george", thumb: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80" },
  { title: "Cupid's Ledger — live-day recap", duration: "—", channel: "anita.george", thumb: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80" },
  { title: "NeuroBridge — Demo Day walkthrough", duration: "—", channel: "anita.george", thumb: "https://images.unsplash.com/photo-1499914485622-a88fac536970?auto=format&fit=crop&w=600&q=80" },
];

// Archive — verified milestone timeline
export const archive = [
  { date: "2024", note: "begins B.Tech CSE at IIIT Kottayam (GPA 9.17/10)." },
  { date: "2024 – 2025", note: "joins GDG, BetaLabs, and Trendles core teams." },
  { date: "2025", note: "TinkHack 2.0 — 1st place with DelAI (graph-based route optimization)." },
  { date: "2025", note: "Girlathon 2025 — 2nd place with VantaAI (image-abuse & deepfake detection)." },
  { date: "2025", note: "Innowave Pitchathon — 1st place with CivicAid, co-founds REsolvers." },
  { date: "Feb 2026", note: "begins NeuroBridge during Kerala Startup Mission's She Builds Tech 2.0." },
  { date: "Feb 2026", note: "Cupid's Ledger ships — 1,000+ users in a single day." },
  { date: "May 2026", note: "Software Developer Intern at Pixelboho; joins GSSoC 2026 as Ambassador & Contributor." },
  { date: "Jun 2026", note: "Software Engineer at theMonks.tech; begins parallel research internships at SRM University–AP and RV University." },
  { date: "Jul 2026", note: "Named Best Intern, SIF-2026 (SRM University–AP)." },
  { date: "Jul 2026", note: "TrustHeritage presented at CHORDS 2026, IIIT Kottayam." },
];

// Soft 'shopping' tab — explicitly framed as tongue-in-cheek on the page itself.
export const shopping = [
  { item: "a great mechanical keyboard", price: "TBD", note: "for the next 400 DSA problems" },
  { item: "a good linux laptop", price: "TBD", note: "build environment of choice" },
  { item: "figma pro", price: "subscription", note: "interface studies" },
  { item: "a stack of systems-design books", price: "ongoing", note: "designing data-intensive applications, etc." },
  { item: "vercel pro", price: "subscription", note: "for shipping iterations" },
  { item: "filter coffee", price: "endless", note: "non-negotiable" },
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
