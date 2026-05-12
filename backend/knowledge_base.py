"""
Lightweight knowledge-base retrieval for Anita George's AI search.

No external embedding API. Uses TF-IDF (cosine similarity over token sets)
against a small curated corpus of JSON files in /app/backend/knowledge/.
"""

from __future__ import annotations

import json
import math
import re
from collections import Counter
from pathlib import Path
from typing import Dict, List, Tuple

KNOWLEDGE_DIR = Path(__file__).parent / "knowledge"

_STOPWORDS = {
    "the", "a", "an", "and", "or", "but", "is", "are", "was", "were", "be",
    "been", "being", "of", "in", "on", "at", "to", "for", "with", "by",
    "as", "it", "its", "that", "this", "these", "those", "from", "into",
    "i", "she", "her", "he", "his", "their", "they", "them", "we", "us",
    "you", "your", "my", "me", "what", "who", "why", "how", "where", "when",
    "do", "does", "did", "have", "has", "had", "can", "could", "should",
    "would", "will", "about", "any", "all", "some", "more", "most",
}

_TOKEN_RE = re.compile(r"[a-zA-Z][a-zA-Z0-9-]+")


def _tokenize(text: str) -> List[str]:
    return [
        t.lower() for t in _TOKEN_RE.findall(text or "")
        if t.lower() not in _STOPWORDS and len(t) > 1
    ]


class KnowledgeBase:
    def __init__(self, knowledge_dir: Path = KNOWLEDGE_DIR):
        self.knowledge_dir = knowledge_dir
        self.chunks: List[Dict] = []
        self.faq_entries: List[Dict] = []
        self.easter_eggs: Dict[str, Dict] = {}
        self._idf: Dict[str, float] = {}
        self._load()

    # ----- loading -----
    def _load(self) -> None:
        self.chunks = []

        profile_path = self.knowledge_dir / "profile.json"
        if profile_path.exists():
            data = json.loads(profile_path.read_text())
            blob = (
                f"{data.get('name','')}. {data.get('role','')}. "
                f"{data.get('blurb','')} Interests: {', '.join(data.get('interests', []))}. "
                f"Values: {', '.join(data.get('values', []))}. "
                f"Philosophy: {' '.join(data.get('philosophy', []))}"
            )
            self.chunks.append({
                "id": "profile",
                "source": "profile",
                "title": data.get("name", "Anita George"),
                "url": "/",
                "text": blob,
            })

        projects_path = self.knowledge_dir / "projects.json"
        if projects_path.exists():
            for p in json.loads(projects_path.read_text()):
                blob = (
                    f"{p['name']} — {p['tagline']} ({p['year']}). "
                    f"{p['summary']} Why: {p['motivation']} "
                    f"How: {p['architecture']} What broke: {p['failures']}. "
                    f"Tags: {', '.join(p['tags'])}. Stack: {', '.join(p['stack'])}. "
                    f"Note: {p['note']}"
                )
                self.chunks.append({
                    "id": f"project:{p['slug']}",
                    "source": "project",
                    "title": p["name"],
                    "url": p["url"],
                    "text": blob,
                })

        essays_path = self.knowledge_dir / "essays.json"
        if essays_path.exists():
            for e in json.loads(essays_path.read_text()):
                blob = f"{e['title']} ({e['year']}, {e['venue']}). {e['body']}"
                self.chunks.append({
                    "id": f"essay:{e['title']}",
                    "source": "essay",
                    "title": e["title"],
                    "url": e["url"],
                    "text": blob,
                })

        faq_path = self.knowledge_dir / "faq.json"
        if faq_path.exists():
            for f in json.loads(faq_path.read_text()):
                blob = f"Q: {f['q']} A: {f['a']}"
                self.chunks.append({
                    "id": f"faq:{f['q'][:30]}",
                    "source": "faq",
                    "title": f["q"],
                    "url": (f.get("related") or ["/"])[0],
                    "related": f.get("related", []),
                    "text": blob,
                })
                # also keep a richer raw copy for people-also-ask matching
                self.faq_entries.append({
                    "q": f["q"],
                    "a": f["a"],
                    "related": f.get("related", []),
                    "tags": f.get("tags", []),
                    "_tokens": set(_tokenize(f["q"] + " " + f["a"] + " " + " ".join(f.get("tags", [])))),
                })

        eggs_path = self.knowledge_dir / "easter_eggs.json"
        if eggs_path.exists():
            self.easter_eggs = json.loads(eggs_path.read_text())

        # Precompute TF & IDF
        N = max(len(self.chunks), 1)
        df: Counter = Counter()
        for c in self.chunks:
            tokens = _tokenize(c["text"])
            tf = Counter(tokens)
            c["_tf"] = tf
            c["_norm_tokens"] = set(tokens)
            for tok in set(tokens):
                df[tok] += 1
        self._idf = {
            tok: math.log((N + 1) / (cnt + 1)) + 1.0
            for tok, cnt in df.items()
        }

    # ----- search -----
    def _vectorize(self, tokens: List[str]) -> Dict[str, float]:
        tf = Counter(tokens)
        vec: Dict[str, float] = {}
        for tok, count in tf.items():
            idf = self._idf.get(tok, math.log(len(self.chunks) + 1) + 1.0)
            vec[tok] = (1 + math.log(count)) * idf
        return vec

    @staticmethod
    def _cosine(a: Dict[str, float], b_tf: Counter, b_idf: Dict[str, float]) -> float:
        if not a or not b_tf:
            return 0.0
        # build b vec on the fly using same idf table
        b_vec = {tok: (1 + math.log(c)) * b_idf.get(tok, 1.0) for tok, c in b_tf.items()}
        common = set(a.keys()) & set(b_vec.keys())
        if not common:
            return 0.0
        dot = sum(a[t] * b_vec[t] for t in common)
        na = math.sqrt(sum(v * v for v in a.values()))
        nb = math.sqrt(sum(v * v for v in b_vec.values()))
        if na == 0 or nb == 0:
            return 0.0
        return dot / (na * nb)

    def easter_egg(self, query: str) -> Dict | None:
        q = (query or "").lower().strip()
        if not q:
            return None
        # direct contains match
        for key, val in self.easter_eggs.items():
            if key in q:
                return {"key": key, **val}
        return None

    def search(self, query: str, k: int = 5) -> List[Dict]:
        tokens = _tokenize(query)
        if not tokens:
            return []
        qv = self._vectorize(tokens)
        scored: List[Tuple[float, Dict]] = []
        for c in self.chunks:
            sc = self._cosine(qv, c["_tf"], self._idf)
            if sc > 0:
                scored.append((sc, c))
        scored.sort(key=lambda x: x[0], reverse=True)
        results = []
        for sc, c in scored[:k]:
            results.append({
                "id": c["id"],
                "source": c["source"],
                "title": c["title"],
                "url": c["url"],
                "text": c["text"],
                "score": round(sc, 4),
                "related": c.get("related", []),
            })
        return results

    def stats(self) -> Dict:
        return {
            "chunks": len(self.chunks),
            "vocab": len(self._idf),
            "easter_eggs": len(self.easter_eggs),
            "faq_entries": len(self.faq_entries),
        }

    def people_also_ask(self, query: str, k: int = 4) -> List[Dict]:
        """Pick the most semantically-relevant FAQ entries for the query.

        Falls back to a default 'broad' set if nothing matches well, so the
        Home page (query='anita george') still gets a sensible default.
        """
        if not self.faq_entries:
            return []
        q_tokens = set(_tokenize(query or ""))
        scored: List[Tuple[float, Dict]] = []
        for f in self.faq_entries:
            if not q_tokens:
                score = 0.0
            else:
                overlap = q_tokens & f["_tokens"]
                # token overlap + small boost when an explicit tag matches
                tag_boost = 0.5 * sum(1 for t in f.get("tags", []) if t.lower() in q_tokens)
                score = (len(overlap) / max(len(q_tokens), 1)) + tag_boost
            scored.append((score, f))

        scored.sort(key=lambda x: x[0], reverse=True)
        # If nothing meaningful matched, return a diverse default
        if all(s <= 0.05 for s, _ in scored):
            default_qs = [
                "What is Anita's strongest project?",
                "Why does Anita care about humane technology?",
                "What kind of engineer is Anita?",
                "Why is Anita obsessed with graph theory?",
            ]
            ordered = [f for q in default_qs for f in self.faq_entries if f["q"] == q]
            picked = ordered[:k] or [f for _, f in scored[:k]]
        else:
            picked = [f for _, f in scored[:k]]
        return [
            {"q": f["q"], "a": f["a"], "related": f.get("related", [])}
            for f in picked
        ]
