# PRD — Anita George · "Search Results for: Anita George"

## Original problem statement
Build a breathtaking, deeply aesthetic, emotionally immersive personal portfolio for Anita George (CS undergrad at IIIT Kottayam + AI/Full-Stack engineer). Concept: "Google Search reimagined as a luxury Pinterest-inspired editorial internet universe." Structurally a search engine; visually feminine editorial scrapbook.

## User personas
1. **Recruiters / engineers** browsing her work — need fast access to projects, stack, contact.
2. **Curious internet strangers** — want to feel like they're "discovering" someone fascinating.
3. **Researchers / collaborators** — want to read essays, research, philosophy.

## Architecture
- **Frontend:** React 19, react-router-dom v7, Tailwind, shadcn/ui, lucide-react, custom SVG decorations.
- **Backend:** FastAPI + MongoDB (status check stub) + RAG semantic search (`/api/ai/search`, `/api/ai/stats`).
- **Knowledge base:** Curated JSON files at `/app/backend/knowledge/` (profile, projects, essays, faq, easter_eggs).
- **RAG retrieval:** TF-IDF cosine similarity in pure Python (no extra ML deps) over ~20 chunks.
- **Answer generation:** Claude Sonnet 4.5 via `emergentintegrations` + `EMERGENT_LLM_KEY`. Strict no-hallucination system prompt; falls back to stitched archive snippet if LLM unavailable.

## Routes
`/`, `/work`, `/projects`, `/projects/:slug`, `/ai-mode`, `/images`, `/videos`, `/research`, `/people-also-ask`, `/shopping`, `/contact`, `/archive`, `/more`

## What's been implemented (2026-05-12)

### Iteration 1 — static portfolio MVP
- Cream/dusty-pink/lavender/sage palette, paper grain + radial gradient texture overlays
- Fonts: Cormorant Garamond + Outfit + Caveat + DM Mono
- Hero search bar with typewriter placeholder + suggestion dropdown + smart routing
- Sticky header with logo + compact search + tabs nav (appears on scroll on home, always on inner pages)
- Decorations library: tape, paperclip, sparkle, squiggle, rose, sprig, hand arrow, numbered markers
- Pages: Home (AI overview + knowledge panel + featured projects + PAA preview + timeline + about spread), Projects (Pinterest masonry, filter chips), ProjectDetail (Google-style with chapters + sidebar), Images (masonry + modal), Videos, Research, PeopleAlsoAsk (accordion), Shopping, Contact (display-only, no form), Archive, More
- All elements tagged with `data-testid`

### Iteration 2 — Work page + functional AI Mode RAG (this iteration)
- New `/work` page: Google-search-result-styled scrapbook masonry with animated indexing metadata, breadcrumb-style cards (`ANITA.DEV › PROJECTS › VANTA-AI`), sticky-note overlays, tape effects, paper textures
- `Work` tab added to main nav (between AI Mode and Images)
- AI Mode rebuilt as real semantic search:
  - Knowledge base: profile, 5 projects, 4 essays, 10 FAQ entries, 8 easter eggs
  - TF-IDF retrieval + Claude Sonnet 4.5 grounded answer generation
  - Strict hallucination guard ("I could not find enough verified information…")
  - Sources with relevance scores + closest archive + related pages + related searches
  - Easter-egg routes for `midnight thoughts`, `burnout`, `best project`, `future`, `are you overwhelmed`, `2am`, `hello`, `who built this`
  - Search history within session, starter questions
- Home buttons + searchbar routing updated to `/work`

## Test coverage
- `/app/test_reports/iteration_1.json` — 16/16 frontend flows pass
- `/app/test_reports/iteration_2.json` — 10/10 backend pytest + all frontend flows pass
- `/app/backend/tests/test_ai_search.py` — automated coverage for root, stats, 3 grounded queries, 5 easter eggs, hallucination guard

## Backlog (next tasks)

### P0
- Replace placeholder project images with real screenshots once Anita provides them (`/app/frontend/src/data/portfolio.js` — `image` fields on each project)

### P1
- Surface a subtle "fallback mode" indicator in AI Mode when LLM unavailable (currently silent stitched-snippet fallback)
- Add a "share this result" link/copy-link button on AI Mode answers (shareability)
- Add OG/Twitter meta + favicon to `public/index.html` for richer link previews
- Mobile QA pass at 375px/414px breakpoints

### P2
- Migrate retrieval to embeddings (OpenAI text-embedding-3-small) if knowledge base grows beyond ~100 chunks
- Add server-side session-based search analytics (count top queries) to grow the FAQ over time
- "Print as a zine" page — read-only printable spread of best content
- Hidden archive Easter eggs in the URL bar (`/archive/?from=hidden`)

## Environment
- `MONGO_URL` (provided)
- `DB_NAME` (provided)
- `CORS_ORIGINS=*` (provided)
- `EMERGENT_LLM_KEY` (provisioned by Emergent)

## Notes
- Hot reload enabled — no manual restarts needed for code changes
- `/api` prefix required on all backend routes (Kubernetes ingress)
- Backend logs occasionally show litellm "Budget exceeded" for the Universal Key; backend handles it gracefully by falling back to stitched archive snippets while preserving citations
