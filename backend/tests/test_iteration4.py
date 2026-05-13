"""Backend tests for Anita George portfolio iteration 4 — verified data + LLM-aware search."""

import os
import pytest
import requests

BASE_URL = (os.environ.get("REACT_APP_BACKEND_URL") or "https://anita-internet-brain.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def _search(client, q, timeout=60):
    r = client.get(f"{API}/ai/search", params={"q": q}, timeout=timeout)
    assert r.status_code == 200, r.text
    return r.json()


# ---------- KB stats / root ----------
class TestStats:
    def test_root_kb_stats(self, client):
        r = client.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        kb = r.json()["kb"]
        assert kb["chunks"] > 40, f"Expected >40 chunks, got {kb['chunks']}"
        assert kb["easter_eggs"] == 7

    def test_ai_stats_faq_23(self, client):
        r = client.get(f"{API}/ai/stats", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data["faq_entries"] == 23, f"Expected faq_entries=23, got {data.get('faq_entries')}"


# ---------- Grounded answers on verified content ----------
class TestVerifiedQueries:
    def test_neurobridge(self, client):
        d = _search(client, "what is neurobridge")
        ans = d["answer"].lower()
        # Must mention specific verified terms
        has_routine = "routine visualizer" in ans or "routine" in ans
        has_sensory = "sensory regulation" in ans or "sensory" in ans
        has_neuro = "asd" in ans or "adhd" in ans or "neurodivergent" in ans
        assert has_routine, f"Missing Routine Visualizer in: {ans[:300]}"
        assert has_sensory, f"Missing Sensory in: {ans[:300]}"
        assert has_neuro, f"Missing ASD/ADHD in: {ans[:300]}"
        assert d.get("llm_available") is True
        titles = " ".join(s["title"].lower() for s in d["sources"])
        assert "neurobridge" in titles
        assert d.get("closest_archive") == "/projects/neurobridge"

    def test_engineer_kind(self, client):
        d = _search(client, "what kind of engineer is anita")
        ans = d["answer"].lower()
        # Verified content must be present
        assert "iiit kottayam" in ans, f"Missing IIIT Kottayam: {ans[:300]}"
        assert ("full-stack" in ans or "full stack" in ans), f"Missing full-stack: {ans[:300]}"
        assert "400+" in ans or "400" in ans, f"Missing 400+ DSA: {ans[:300]}"
        assert "9.03" in ans, f"Missing GPA 9.03: {ans[:300]}"
        # Forbidden poetic content
        forbidden = ["soft software", "soft, honest", "tender", "20-year-old", "midnight thoughts"]
        for bad in forbidden:
            assert bad not in ans, f"Forbidden phrase '{bad}' in: {ans[:300]}"

    def test_hackathon_builds(self, client):
        d = _search(client, "which projects are hackathon builds")
        ans = d["answer"].lower()
        assert "vantaai" in ans or "vanta" in ans
        assert "delai" in ans or "del" in ans
        rp = d["related_pages"]
        assert "/projects/vantaai" in rp, f"vantaai not in {rp}"
        assert "/projects/delai" in rp, f"delai not in {rp}"

    def test_people_also_ask_grounded(self, client):
        d = _search(client, "anita george")
        paa = d.get("people_also_ask", [])
        assert len(paa) == 4, f"Expected 4 PAA, got {len(paa)}: {paa}"
        # Must not contain poetic items
        forbidden = ["midnight thoughts", "soft software", "phoebe bridgers", "letters"]
        for item in paa:
            q = (item.get("q") or "").lower()
            for bad in forbidden:
                assert bad not in q, f"Forbidden PAA item '{q}'"

    def test_hallucination_guard_phd(self, client):
        d = _search(client, "does anita have a phd")
        ans = d["answer"]
        assert ans.startswith("I could not find enough verified information"), (
            f"Hallucination guard failed: {ans[:300]}"
        )
