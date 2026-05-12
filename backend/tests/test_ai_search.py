"""Backend tests for Anita George portfolio AI search backend (iteration 2)."""

import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://anita-internet-brain.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ----- root + stats -----
class TestStatsAndRoot:
    def test_root_returns_kb_stats(self, client):
        r = client.get(f"{API}/", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "kb" in data
        kb = data["kb"]
        assert kb["chunks"] >= 18  # ~20
        assert kb["easter_eggs"] == 8
        assert kb["vocab"] > 0

    def test_ai_stats(self, client):
        r = client.get(f"{API}/ai/stats", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["chunks"] >= 18
        assert data["easter_eggs"] == 8
        assert "indexed_at" in data
        assert "vocab" in data


# ----- AI Search grounded retrieval -----
class TestAISearchGrounded:
    def _get(self, client, q):
        r = client.get(f"{API}/ai/search", params={"q": q}, timeout=60)
        assert r.status_code == 200, r.text
        return r.json()

    def test_vanta_ai_query(self, client):
        data = self._get(client, "what is vanta ai")
        assert data["grounded"] is True
        assert data["easter_egg"] is None
        # Sources should include VantaAI
        titles = [s["title"].lower() for s in data["sources"]]
        assert any("vanta" in t for t in titles), f"No VantaAI in sources: {titles}"
        # related_pages should contain /projects/vanta-ai
        assert "/projects/vanta-ai" in data["related_pages"], data["related_pages"]
        # answer should mention VantaAI
        assert "vanta" in data["answer"].lower()

    def test_graph_theory_query(self, client):
        data = self._get(client, "why graph theory")
        assert data["grounded"] is True
        # Sources/related should include DelAI or research/essay
        titles = " ".join(s["title"].lower() for s in data["sources"])
        rp = data["related_pages"]
        has_del = "del" in titles or any("/projects/del-ai" in r or "/research" in r for r in rp)
        assert has_del, f"Expected DelAI or research in {titles} / {rp}"

    def test_unknown_topic_no_hallucination(self, client):
        data = self._get(client, "what pizza toppings does anita like")
        # The critical no-hallucination check
        assert data["answer"].startswith("I could not find enough verified information"), (
            f"Hallucination guard failed: {data['answer'][:200]}"
        )
        assert data["closest_archive"] is not None


# ----- Easter eggs -----
class TestEasterEggs:
    def _get(self, client, q):
        r = client.get(f"{API}/ai/search", params={"q": q}, timeout=30)
        assert r.status_code == 200, r.text
        return r.json()

    def test_midnight_thoughts(self, client):
        d = self._get(client, "midnight thoughts")
        assert d["easter_egg"] == "midnight thoughts"
        ans = d["answer"].lower()
        assert "graph theory" in ans or "2am" in ans

    def test_burnout(self, client):
        d = self._get(client, "burnout")
        assert d["easter_egg"] == "burnout"
        assert len(d["answer"]) > 0

    def test_best_project(self, client):
        d = self._get(client, "best project")
        assert d["easter_egg"] == "best project"
        assert len(d["answer"]) > 0

    def test_future(self, client):
        d = self._get(client, "future")
        assert d["easter_egg"] == "future"
        assert len(d["answer"]) > 0

    def test_are_you_overwhelmed(self, client):
        d = self._get(client, "are you overwhelmed")
        assert d["easter_egg"] == "are you overwhelmed"
        assert len(d["answer"]) > 0
