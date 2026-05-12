"""Backend tests for People Also Ask (PAA) feature — iteration 3.

Validates that GET /api/ai/search returns a `people_also_ask` array
contextual to the query, falling back to a diverse default for broad queries.
Also validates /api/ai/stats reports faq_entries == 20.
"""

import os
import pytest
import requests

BASE_URL = os.environ.get(
    "REACT_APP_BACKEND_URL",
    "https://anita-internet-brain.preview.emergentagent.com",
).rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ----- stats -----
class TestStats:
    def test_faq_entries_count_is_20(self, client):
        r = client.get(f"{API}/ai/stats", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("faq_entries") == 20, (
            f"Expected 20 FAQ entries, got {data.get('faq_entries')}"
        )


# ----- PAA contextual contents -----
class TestPeopleAlsoAsk:
    def _search(self, client, q):
        r = client.get(f"{API}/ai/search", params={"q": q}, timeout=60)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "people_also_ask" in data
        return data

    def test_graph_theory_paa(self, client):
        data = self._search(client, "graph theory")
        paa = data["people_also_ask"]
        assert 3 <= len(paa) <= 4, f"Expected 3-4 PAA items, got {len(paa)}"
        # validate item shape
        for item in paa:
            assert "q" in item and "a" in item and "related" in item
            assert isinstance(item["q"], str) and len(item["q"]) > 0
            assert isinstance(item["a"], str) and len(item["a"]) > 0
        # at least 2 of the 4 should be graph-related
        joined = " ".join(p["q"].lower() + " " + p["a"].lower() for p in paa)
        assert "graph" in joined, f"No graph-related PAA: {[p['q'] for p in paa]}"

    def test_burnout_paa_and_easter_egg(self, client):
        data = self._search(client, "burnout")
        # burnout is an easter egg
        assert data.get("easter_egg") == "burnout"
        paa = data["people_also_ask"]
        assert len(paa) == 4, f"Expected 4 PAA items on burnout, got {len(paa)}"
        joined = " ".join(p["q"].lower() + " " + p["a"].lower() for p in paa)
        # at least one of burnout/overwork/2am/late/night themes
        assert any(
            term in joined
            for term in ["burnout", "overwork", "2am", "late", "midnight", "night", "rest"]
        ), f"PAA not biased to burnout themes: {[p['q'] for p in paa]}"

    def test_vanta_ai_paa(self, client):
        data = self._search(client, "vanta ai")
        paa = data["people_also_ask"]
        assert len(paa) >= 3
        qs = [p["q"] for p in paa]
        assert any("VantaAI" in q or "Vanta" in q for q in qs), (
            f"Expected a VantaAI question in PAA: {qs}"
        )

    def test_anita_george_broad_query_default_paa(self, client):
        """Broad 'anita george' should fall back to default diverse PAA set."""
        data = self._search(client, "anita george")
        paa = data["people_also_ask"]
        assert len(paa) == 4, f"Expected 4 default PAA items, got {len(paa)}"
        qs = [p["q"] for p in paa]
        expected_defaults = {
            "What is Anita's strongest project?",
            "Why does Anita care about humane technology?",
            "What kind of engineer is Anita?",
            "Why is Anita obsessed with graph theory?",
        }
        found = expected_defaults.intersection(set(qs))
        assert len(found) >= 3, (
            f"Default PAA fallback missing. Got {qs}, expected at least 3 of {expected_defaults}"
        )

    def test_no_hallucination_on_unknown_topic(self, client):
        r = client.get(
            f"{API}/ai/search",
            params={"q": "anita favorite pizza topping"},
            timeout=60,
        )
        assert r.status_code == 200
        data = r.json()
        assert data["answer"].startswith(
            "I could not find enough verified information"
        ), f"Hallucination guard failed: {data['answer'][:200]}"
