from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import random
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime, timezone

from knowledge_base import KnowledgeBase

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# Knowledge base (loaded once)
kb = KnowledgeBase()

# App
app = FastAPI(title="Anita George — search backend")
api_router = APIRouter(prefix="/api")


# ----- models -----
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class Source(BaseModel):
    id: str
    source: str
    title: str
    url: str
    score: float
    snippet: str


class SearchResponse(BaseModel):
    query: str
    answer: str
    sources: List[Source] = []
    related_pages: List[str] = []
    related_searches: List[str] = []
    closest_archive: Optional[str] = None
    easter_egg: Optional[str] = None
    grounded: bool = True


RELATED_SEARCH_POOL = [
    "what is vanta ai",
    "why graph theory",
    "what does anita think about ai ethics",
    "what technologies does anita use",
    "what is studybee",
    "what does she care about",
    "midnight thoughts",
    "burnout",
    "the future she wants to build",
    "favorite project",
    "why humane technology",
    "the soft software thesis",
]


# ----- routes -----
@api_router.get("/")
async def root():
    return {"message": "anita's archive — soft & online", "kb": kb.stats()}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r.get("timestamp"), str):
            r["timestamp"] = datetime.fromisoformat(r["timestamp"])
    return rows


# ----- AI search -----

SYSTEM_PROMPT = """You are 'anita.ai', a small grounded search engine that answers
questions about Anita George — an AI/Full-Stack engineer and CS undergraduate
at IIIT Kottayam — using ONLY the context passages provided below.

STRICT RULES:
1. Use ONLY information from the provided context. Do NOT invent facts.
2. Do NOT fabricate skills, projects, achievements, opinions, dates, or quotes.
3. If the context does not contain enough information, you MUST reply exactly:
   "I could not find enough verified information about that in Anita's archive."
   Then suggest the most relevant archive page from the context.
4. Keep the tone calm, intelligent, and slightly editorial (this is a luxury
   search engine, not a chatbot). 2-4 short paragraphs maximum.
5. Refer to Anita in the third person ("Anita", "she"). Never roleplay as her.
6. Do not include URLs in prose. URLs are surfaced as separate citations.
"""


async def _llm_answer(query: str, contexts: List[dict]) -> tuple[str, bool]:
    """Generate grounded answer. Returns (answer, grounded_bool)."""
    if not contexts:
        return (
            "I could not find enough verified information about that in Anita's archive. "
            "Try the closest related page below, or ask about her projects, skills, or thinking.",
            False,
        )

    api_key = os.environ.get("EMERGENT_LLM_KEY")
    if not api_key:
        # Graceful fallback: stitch top context snippet.
        top = contexts[0]
        return (
            f"From Anita's archive ({top['title']}): {top['text'][:520]}…",
            True,
        )

    # Lazy import so backend boots even without the package.
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
    except Exception as e:  # noqa: BLE001
        logging.exception("emergentintegrations import failed: %s", e)
        top = contexts[0]
        return (f"From Anita's archive: {top['text'][:520]}…", True)

    context_block = "\n\n".join(
        f"[{i+1}] ({c['source']} · {c['title']})\n{c['text']}"
        for i, c in enumerate(contexts)
    )
    user_text = (
        f"Question: {query}\n\n"
        f"Context passages from Anita's archive:\n{context_block}\n\n"
        f"Answer the question using ONLY the passages above. If the passages do "
        f"not contain enough information, say so."
    )

    try:
        chat = LlmChat(
            api_key=api_key,
            session_id=f"anita-search-{uuid.uuid4().hex[:8]}",
            system_message=SYSTEM_PROMPT,
        ).with_model("anthropic", "claude-sonnet-4-5-20250929")
        response = await chat.send_message(UserMessage(text=user_text))
        text = (response or "").strip()
        if not text:
            raise RuntimeError("empty response")
        return text, True
    except Exception as e:  # noqa: BLE001
        logging.exception("LLM call failed: %s", e)
        top = contexts[0]
        return (
            f"From Anita's archive ({top['title']}): {top['text'][:520]}…",
            True,
        )


def _snippet(text: str, max_len: int = 220) -> str:
    text = (text or "").strip().replace("\n", " ")
    if len(text) <= max_len:
        return text
    return text[: max_len].rsplit(" ", 1)[0] + "…"


@api_router.get("/ai/search", response_model=SearchResponse)
async def ai_search(q: str = Query(..., min_length=1, max_length=400)):
    q_clean = q.strip()

    # 1. Easter egg short-circuit
    egg = kb.easter_egg(q_clean)
    if egg:
        related_pool = [s for s in RELATED_SEARCH_POOL if s.lower() not in q_clean.lower()]
        return SearchResponse(
            query=q_clean,
            answer=egg["answer"],
            sources=[],
            related_pages=egg.get("related", []),
            related_searches=random.sample(related_pool, k=min(4, len(related_pool))),
            closest_archive=(egg.get("related") or [None])[0],
            easter_egg=egg.get("key"),
            grounded=True,
        )

    # 2. Retrieve top-k chunks
    contexts = kb.search(q_clean, k=5)

    # 3. Build sources view
    sources = [
        Source(
            id=c["id"],
            source=c["source"],
            title=c["title"],
            url=c["url"],
            score=c["score"],
            snippet=_snippet(c["text"]),
        )
        for c in contexts
    ]

    # 4. Generate grounded answer
    answer, grounded = await _llm_answer(q_clean, contexts)

    related_pages: List[str] = []
    for c in contexts[:3]:
        if c["url"] and c["url"] not in related_pages:
            related_pages.append(c["url"])
        for r in c.get("related", []):
            if r not in related_pages:
                related_pages.append(r)

    closest = contexts[0]["url"] if contexts else "/"

    related_pool = [s for s in RELATED_SEARCH_POOL if s.lower() not in q_clean.lower()]
    related_searches = random.sample(related_pool, k=min(4, len(related_pool)))

    return SearchResponse(
        query=q_clean,
        answer=answer,
        sources=sources,
        related_pages=related_pages[:5],
        related_searches=related_searches,
        closest_archive=closest,
        easter_egg=None,
        grounded=grounded,
    )


@api_router.get("/ai/stats")
async def ai_stats():
    return {
        **kb.stats(),
        "indexed_at": datetime.now(timezone.utc).isoformat(),
    }


# Include router & middleware
app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
