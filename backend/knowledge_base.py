from __future__ import annotations

import json
import math
import re
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

KNOWLEDGE_DIR = Path(__file__).parent / "knowledge"

STOPWORDS = {
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "been",
    "being",
    "by",
    "can",
    "could",
    "did",
    "do",
    "does",
    "for",
    "from",
    "had",
    "has",
    "have",
    "he",
    "her",
    "hers",
    "his",
    "how",
    "i",
    "in",
    "into",
    "is",
    "it",
    "its",
    "me",
    "more",
    "most",
    "my",
    "of",
    "on",
    "or",
    "she",
    "should",
    "some",
    "that",
    "the",
    "their",
    "them",
    "these",
    "they",
    "this",
    "those",
    "to",
    "us",
    "was",
    "we",
    "were",
    "what",
    "when",
    "where",
    "which",
    "who",
    "why",
    "will",
    "with",
    "would",
    "you",
    "your",
}

TOKEN_RE = re.compile(r"[a-zA-Z][a-zA-Z0-9-]+")

TEXT_REPLACEMENTS = {
    "â€”": "-",
    "â€“": "-",
    "Â·": "-",
    "â†’": "->",
    "â†—": "->",
    "âœ“": "ok",
    "â€˜": "'",
    "â€™": "'",
    "â€œ": '"',
    "â€�": '"',
    "â€º": ">",
}


def clean_text(value: Any) -> str:
    text = str(value or "")
    for bad, good in TEXT_REPLACEMENTS.items():
        text = text.replace(bad, good)
    return re.sub(r"\s+", " ", text).strip()


def tokenize(text: str) -> list[str]:
    return [
        token.lower()
        for token in TOKEN_RE.findall(clean_text(text))
        if token.lower() not in STOPWORDS and len(token) > 1
    ]


def unique(items: list[Any], key: str | None = None) -> list[Any]:
    seen: set[str] = set()
    output: list[Any] = []
    for item in items:
        marker = str(item.get(key, "") if key and isinstance(item, dict) else item).lower()
        if not marker or marker in seen:
            continue
        seen.add(marker)
        output.append(item)
    return output


class KnowledgeBase:
    def __init__(self, knowledge_dir: Path = KNOWLEDGE_DIR):
        self.knowledge_dir = knowledge_dir
        self.indexed_at = datetime.now(timezone.utc).isoformat()
        self.profile: dict[str, Any] = {}
        self.projects: list[dict[str, Any]] = []
        self.repositories: list[dict[str, Any]] = []
        self.themes: list[dict[str, Any]] = []
        self.relationships: list[dict[str, Any]] = []
        self.experiences: list[dict[str, Any]] = []
        self.faq_entries: list[dict[str, Any]] = []
        self.easter_eggs: dict[str, Any] = {}
        self.embedding_config: dict[str, Any] = {}
        self.chunks: list[dict[str, Any]] = []
        self._idf: dict[str, float] = {}
        self._load()

    def _json(self, name: str, default: Any) -> Any:
        path = self.knowledge_dir / name
        if not path.exists():
            return default
        return json.loads(path.read_text(encoding="utf-8"))

    def _add_chunk(
        self,
        *,
        chunk_id: str,
        source: str,
        title: str,
        url: str,
        text: str,
        metadata: dict[str, Any] | None = None,
    ) -> None:
        cleaned = clean_text(text)
        if not cleaned:
            return
        self.chunks.append(
            {
                "id": chunk_id,
                "source": source,
                "title": clean_text(title),
                "url": url or "/",
                "text": cleaned,
                "metadata": metadata or {},
            }
        )

    def _load(self) -> None:
        self.profile = self._json("profile.json", {})
        self.projects = self._json("projects.json", [])
        repos = self._json("repositories.json", [])
        if not repos:
            repos = self._json("repos.json", [])
        self.repositories = repos
        self.themes = self._json("themes.json", [])
        self.relationships = self._json("relationships.json", [])
        self.experiences = self._json("experiences.json", self._json("experience.json", []))
        self.embedding_config = self._json("search_embeddings.json", {"concepts": []})
        self.easter_eggs = self._json("easter_eggs.json", {})

        self._build_chunks()
        self._build_vectors()

    def _build_chunks(self) -> None:
        self.chunks = []

        if self.profile:
            dsa = self.profile.get("dsa", {})
            profile_blob = " ".join(
                [
                    self.profile.get("name", ""),
                    self.profile.get("role", ""),
                    self.profile.get("blurb", ""),
                    f"Degree: {self.profile.get('degree', '')}",
                    f"University: {self.profile.get('university', '')}",
                    f"Years: {self.profile.get('years', '')}",
                    f"GPA: {self.profile.get('gpa', '')}",
                    f"Location: {self.profile.get('location', '')}",
                    f"Interests: {', '.join(self.profile.get('interests', []))}",
                    f"Values: {', '.join(self.profile.get('values', []))}",
                    f"Philosophy: {' '.join(self.profile.get('philosophy', []))}",
                    f"DSA: {dsa.get('total_problems', '')} problems; LeetCode {dsa.get('leetcode', '')}; Codeforces {dsa.get('codeforces', '')}; focus {', '.join(dsa.get('focus', []))}",
                ]
            )
            self._add_chunk(
                chunk_id="profile:anita-george",
                source="profile",
                title=self.profile.get("name", "Anita George"),
                url="/",
                text=profile_blob,
                metadata={"kind": "identity"},
            )

        for project in self.projects:
            slug = project.get("slug") or project.get("name", "").lower()
            parts = [
                f"{project.get('name', '')}: {project.get('tagline', '')}",
                f"Year: {project.get('year', '')}",
                f"Timeline: {project.get('timeline', '')}",
                project.get("summary", ""),
                f"Motivation: {project.get('motivation', '')}",
                f"Architecture: {project.get('architecture', '')}",
                f"Outcomes: {project.get('outcomes', '')}",
                f"Status: {project.get('status', '')}",
                f"Tags: {', '.join(project.get('tags', []))}",
                f"Stack: {', '.join(project.get('stack', []))}",
                f"Themes: {', '.join(project.get('themes', []))}",
                f"Features: {', '.join(project.get('features', []))}",
                f"Engineering signals: {', '.join(project.get('engineering_signals', []))}",
                f"Note: {project.get('note', '')}",
            ]
            self._add_chunk(
                chunk_id=f"project:{slug}",
                source="project",
                title=project.get("name", slug),
                url=project.get("url", f"/projects/{slug}"),
                text=" ".join(parts),
                metadata={"slug": slug, "project": project},
            )

        for theme in self.themes:
            text = " ".join(
                [
                    theme.get("label", ""),
                    theme.get("description", ""),
                    f"Related projects: {', '.join(theme.get('relatedProjects', []))}",
                    f"Related repositories: {', '.join(theme.get('relatedRepositories', []))}",
                    f"Keywords: {', '.join(theme.get('keywords', []))}",
                ]
            )
            self._add_chunk(
                chunk_id=f"theme:{theme.get('id', theme.get('label', 'theme'))}",
                source="theme",
                title=theme.get("label", "Theme"),
                url="/research",
                text=text,
                metadata={"theme": theme},
            )

        for repo in self.repositories:
            text = " ".join(
                [
                    repo.get("name", ""),
                    repo.get("kind", ""),
                    repo.get("description", ""),
                    repo.get("note", ""),
                    f"Themes: {', '.join(repo.get('themes', []))}",
                    f"Related projects: {', '.join(repo.get('relatedProjects', []))}",
                ]
            )
            self._add_chunk(
                chunk_id=f"repo:{repo.get('name', '')}",
                source="repository",
                title=repo.get("name", "Repository"),
                url=repo.get("url", "https://github.com/AnitaGeorge404/"),
                text=text,
                metadata={"repository": repo},
            )

        for relation in self.relationships:
            text = " ".join(
                [
                    relation.get("source", ""),
                    relation.get("target", ""),
                    relation.get("type", ""),
                    relation.get("theme", ""),
                    relation.get("reason", ""),
                ]
            )
            self._add_chunk(
                chunk_id=f"relationship:{relation.get('source', '')}:{relation.get('target', '')}",
                source="relationship",
                title=f"{relation.get('source', '')} -> {relation.get('target', '')}",
                url="/work",
                text=text,
                metadata={"relationship": relation},
            )

        for item in self._json("essays.json", []):
            self._add_chunk(
                chunk_id=f"essay:{item.get('title', '')}",
                source="essay",
                title=item.get("title", "Archive note"),
                url=item.get("url", "/research"),
                text=f"{item.get('title', '')}. {item.get('venue', '')}. {item.get('body', '')}",
                metadata={"essay": item},
            )

        for item in self.experiences:
            self._add_chunk(
                chunk_id=f"experience:{item.get('where', '')}:{item.get('role', '')}",
                source="experience",
                title=f"{item.get('role', '')} at {item.get('where', '')}",
                url="/work",
                text=f"{item.get('role', '')} at {item.get('where', '')} ({item.get('year', '')}). {item.get('detail', '')}. Themes: {', '.join(item.get('themes', []))}",
                metadata={"experience": item},
            )

        for item in self._json("faq.json", []):
            related = item.get("related") or ["/"]
            text = f"Q: {item.get('q', '')} A: {item.get('a', '')}. Tags: {', '.join(item.get('tags', []))}"
            self._add_chunk(
                chunk_id=f"faq:{item.get('q', '')[:42]}",
                source="faq",
                title=item.get("q", "Question"),
                url=related[0],
                text=text,
                metadata={"faq": item, "related": related},
            )
            self.faq_entries.append(
                {
                    "q": clean_text(item.get("q", "")),
                    "a": clean_text(item.get("a", "")),
                    "related": related,
                    "tags": item.get("tags", []),
                    "_tokens": set(tokenize(text)),
                }
            )

        achievements = self._json("achievements.json", {})
        for item in achievements.get("achievements", []):
            self._add_chunk(
                chunk_id=f"achievement:{item.get('title', '')}",
                source="achievement",
                title=f"{item.get('result', '')} - {item.get('title', '')}",
                url="/work",
                text=f"{item.get('result', '')} at {item.get('title', '')} ({item.get('year', '')}).",
                metadata={"achievement": item},
            )
        for item in achievements.get("certifications", []):
            self._add_chunk(
                chunk_id=f"certification:{item.get('title', '')}",
                source="certification",
                title=item.get("title", "Certification"),
                url="/work",
                text=f"{item.get('title', '')}, issued by {item.get('issuer', '')}.",
                metadata={"certification": item},
            )

    def _build_vectors(self) -> None:
        total = max(len(self.chunks), 1)
        df: Counter[str] = Counter()
        for chunk in self.chunks:
            tokens = tokenize(f"{chunk['title']} {chunk['text']}")
            chunk["_tf"] = Counter(tokens)
            chunk["_tokens"] = set(tokens)
            for token in set(tokens):
                df[token] += 1
        self._idf = {token: math.log((total + 1) / (count + 1)) + 1 for token, count in df.items()}

    def _vectorize(self, text: str) -> dict[str, float]:
        counts = Counter(tokenize(text))
        return {
            token: (1 + math.log(count)) * self._idf.get(token, math.log(len(self.chunks) + 1) + 1)
            for token, count in counts.items()
        }

    def _cosine(self, query_vec: dict[str, float], chunk_tf: Counter[str]) -> float:
        if not query_vec or not chunk_tf:
            return 0.0
        chunk_vec = {
            token: (1 + math.log(count)) * self._idf.get(token, 1.0)
            for token, count in chunk_tf.items()
        }
        common = set(query_vec) & set(chunk_vec)
        if not common:
            return 0.0
        dot = sum(query_vec[token] * chunk_vec[token] for token in common)
        q_norm = math.sqrt(sum(value * value for value in query_vec.values()))
        c_norm = math.sqrt(sum(value * value for value in chunk_vec.values()))
        return dot / (q_norm * c_norm) if q_norm and c_norm else 0.0

    def concept_hits(self, query: str) -> list[dict[str, Any]]:
        q = clean_text(query).lower()
        q_tokens = set(tokenize(q))
        hits: list[dict[str, Any]] = []
        for concept in self.embedding_config.get("concepts", []):
            aliases = concept.get("aliases", [])
            matched = [alias for alias in aliases if clean_text(alias).lower() in q]
            token_matches = [alias for alias in aliases if set(tokenize(alias)) & q_tokens]
            score = len(matched) * 1.2 + len(token_matches) * 0.35
            if score:
                hits.append(
                    {
                        "id": concept.get("id"),
                        "label": concept.get("label"),
                        "score": round(score * float(concept.get("weight", 1)), 3),
                        "matchedAliases": unique(matched + token_matches),
                        "relatedProjects": concept.get("relatedProjects", []),
                        "relatedThemes": concept.get("relatedThemes", []),
                    }
                )
        hits.sort(key=lambda item: item["score"], reverse=True)
        return hits

    def project_alias_hits(self, query: str) -> list[str]:
        q = clean_text(query).lower()
        hits: list[str] = []
        aliases = self.embedding_config.get("projectAliases", {})
        for slug, values in aliases.items():
            names = [slug, *values]
            if any(clean_text(name).lower() in q for name in names):
                hits.append(slug)
        for project in self.projects:
            slug = project.get("slug", "")
            name = clean_text(project.get("name", "")).lower()
            if slug and (slug in q or name in q):
                hits.append(slug)
        return unique(hits)

    def search(self, query: str, k: int = 8, context: str = "") -> list[dict[str, Any]]:
        search_text = f"{query} {context}".strip()
        query_vec = self._vectorize(search_text)
        q_lower = clean_text(search_text).lower()
        q_tokens = set(tokenize(search_text))
        concepts = self.concept_hits(search_text)
        project_aliases = set(self.project_alias_hits(search_text))
        related_projects = {
            slug
            for concept in concepts
            for slug in concept.get("relatedProjects", [])
        }

        scored: list[tuple[float, dict[str, Any]]] = []
        for chunk in self.chunks:
            score = self._cosine(query_vec, chunk["_tf"])
            chunk_text = f"{chunk['title']} {chunk['text']}".lower()
            chunk_tokens = chunk.get("_tokens", set())
            overlap = len(q_tokens & chunk_tokens) / max(len(q_tokens), 1) if q_tokens else 0
            score += overlap * 0.18

            slug = chunk.get("metadata", {}).get("slug")
            if slug and slug in project_aliases:
                score += 0.85
            if slug and slug in related_projects:
                score += 0.28
            if clean_text(chunk["title"]).lower() in q_lower:
                score += 0.55
            if any(clean_text(alias).lower() in chunk_text for alias in project_aliases):
                score += 0.2

            if score > 0:
                scored.append((score, chunk))

        scored.sort(key=lambda item: item[0], reverse=True)
        if not scored:
            return []

        top_score = scored[0][0] or 1
        results: list[dict[str, Any]] = []
        for raw_score, chunk in scored[:k]:
            normalized = min(0.98, raw_score / max(top_score, 1))
            results.append(
                {
                    "id": chunk["id"],
                    "source": chunk["source"],
                    "title": chunk["title"],
                    "url": chunk["url"],
                    "text": chunk["text"],
                    "score": round(normalized, 4),
                    "raw_score": round(raw_score, 4),
                    "metadata": chunk.get("metadata", {}),
                }
            )
        return results

    def easter_egg(self, query: str) -> dict[str, Any] | None:
        q = clean_text(query).lower()
        if not q:
            return None
        for key, value in self.easter_eggs.items():
            if key.lower() in q:
                return {"key": key, **value}
        return None

    def people_also_ask(self, query: str, k: int = 4) -> list[dict[str, Any]]:
        if not self.faq_entries:
            return []
        q_tokens = set(tokenize(query))
        scored: list[tuple[float, dict[str, Any]]] = []
        for item in self.faq_entries:
            if not q_tokens:
                score = 0.0
            else:
                overlap = q_tokens & item["_tokens"]
                tag_boost = 0.4 * sum(1 for tag in item.get("tags", []) if clean_text(tag).lower() in q_tokens)
                score = len(overlap) / max(len(q_tokens), 1) + tag_boost
            scored.append((score, item))
        scored.sort(key=lambda entry: entry[0], reverse=True)

        if all(score <= 0.05 for score, _ in scored):
            default_questions = [
                "What kind of engineer is Anita?",
                "Why does humane technology appear repeatedly in her work?",
                "Why does graph theory appear repeatedly?",
                "What makes NeuroBridge different?",
            ]
            picked = [
                item
                for question in default_questions
                for item in self.faq_entries
                if item["q"] == question
            ][:k]
        else:
            picked = [item for _, item in scored[:k]]

        return [
            {"q": item["q"], "a": item["a"], "related": item.get("related", [])}
            for item in picked
        ]

    def stats(self) -> dict[str, Any]:
        return {
            "chunks": len(self.chunks),
            "vocab": len(self._idf),
            "faq_entries": len(self.faq_entries),
            "easter_eggs": len(self.easter_eggs),
            "projects": len(self.projects),
            "repositories": len(self.repositories),
            "themes": len(self.themes),
            "relationships": len(self.relationships),
            "indexed_at": self.indexed_at,
        }
