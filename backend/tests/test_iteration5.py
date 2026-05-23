"""Iteration 5 - v2.0.0 sync: Gemini conversational RAG tests for /api/ai/chat and /api/ai/search."""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://anita-internet-brain.preview.emergentagent.com").rstrip("/")
TIMEOUT = 45


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- KB / Stats endpoints ---
class TestKB:
    def test_root_stats(self, client):
        r = client.get(f"{BASE_URL}/api/", timeout=TIMEOUT)
        assert r.status_code == 200
        d = r.json()
        assert d["mode"] == "conversational-rag"
        kb = d["kb"]
        assert kb["chunks"] == 65
        assert kb["projects"] == 6
        assert kb["repositories"] == 7
        assert kb["themes"] == 6
        assert kb["relationships"] == 8

    def test_ai_stats(self, client):
        r = client.get(f"{BASE_URL}/api/ai/stats", timeout=TIMEOUT)
        assert r.status_code == 200
        d = r.json()
        assert d["gemini_configured"] is True
        assert d["primary_model"] == "gemini-2.5-flash"
        assert d["faq_entries"] == 23


# --- /api/ai/chat core flows ---
class TestAIChat:
    def test_chat_neurobridge(self, client):
        body = {"q": "tell me about NeuroBridge"}
        r = client.post(f"{BASE_URL}/api/ai/chat", json=body, timeout=TIMEOUT)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["llm_available"] is True, f"Gemini not used: {d.get('fallbackReason')}"
        assert d["grounded"] is True
        answer = d["answer"].lower()
        assert ("routine visualizer" in answer) or ("asd" in answer) or ("adhd" in answer) or ("neurodivergent" in answer)
        src_titles = " ".join(s["title"].lower() for s in d["sources"])
        assert "neurobridge" in src_titles

    def test_chat_graph_theory_delai(self, client):
        body = {"q": "Which project of Anita uses graph theory?"}
        r = client.post(f"{BASE_URL}/api/ai/chat", json=body, timeout=TIMEOUT)
        assert r.status_code == 200
        d = r.json()
        answer = d["answer"].lower()
        assert "delai" in answer, f"DelAI not in answer: {d['answer'][:300]}"
        src_titles = " ".join(s["title"].lower() for s in d["sources"])
        assert "delai" in src_titles
        assert len(d["related_searches"]) > 0 or len(d.get("relatedSearches", [])) > 0
        assert len(d.get("follow_ups", []) + d.get("people_also_ask", [])) >= 0

    def test_chat_out_of_scope(self, client):
        body = {"q": "who is barack obama"}
        r = client.post(f"{BASE_URL}/api/ai/chat", json=body, timeout=TIMEOUT)
        assert r.status_code == 200
        d = r.json()
        assert d["grounded"] is False
        assert d["intent"] == "outside_archive"
        ans = d["answer"].lower()
        # Should redirect, not fabricate
        assert "archive" in ans or "anita" in ans
        assert "barack" not in ans or "do not have" in ans or "does not contain" in ans

    def test_chat_search_post_same_shape(self, client):
        r1 = client.post(f"{BASE_URL}/api/ai/search", json={"q": "tell me about VantaAI"}, timeout=TIMEOUT)
        r2 = client.post(f"{BASE_URL}/api/ai/chat", json={"q": "tell me about VantaAI"}, timeout=TIMEOUT)
        assert r1.status_code == 200 and r2.status_code == 200
        # Same response shape
        assert set(r1.json().keys()) == set(r2.json().keys())

    def test_legacy_get_search(self, client):
        r = client.get(f"{BASE_URL}/api/ai/search", params={"q": "humane technology"}, timeout=TIMEOUT)
        assert r.status_code == 200
        d = r.json()
        assert "answer" in d and "sources" in d


# --- Conversational memory ---
class TestMemory:
    def test_memory_pronoun_resolution(self, client):
        """Test that follow-up 'how is it different from StudyBee' resolves 'it'=NeuroBridge.

        NOTE: Backend SearchRequest expects `messages` list, NOT `session_id`. We test both.
        """
        conv_id = "test-mem-iter5"

        # First turn
        r1 = client.post(
            f"{BASE_URL}/api/ai/chat",
            json={"q": "Tell me about NeuroBridge", "conversationId": conv_id, "session_id": conv_id},
            timeout=TIMEOUT,
        )
        assert r1.status_code == 200
        d1 = r1.json()
        first_answer = d1["answer"]

        time.sleep(1)

        # Second turn - send conversation history via messages
        messages = [
            {"role": "user", "content": "Tell me about NeuroBridge"},
            {"role": "assistant", "content": first_answer[:1500]},
        ]
        r2 = client.post(
            f"{BASE_URL}/api/ai/chat",
            json={
                "q": "How is it different from StudyBee?",
                "conversationId": conv_id,
                "session_id": conv_id,
                "messages": messages,
            },
            timeout=TIMEOUT,
        )
        assert r2.status_code == 200
        d2 = r2.json()
        ans2 = d2["answer"].lower()
        # Memory test: should mention BOTH NeuroBridge AND StudyBee
        assert "neurobridge" in ans2, f"Pronoun NOT resolved. Answer: {d2['answer'][:400]}"
        assert "studybee" in ans2, f"StudyBee missing from comparison. Answer: {d2['answer'][:400]}"

    def test_session_id_only_no_messages(self, client):
        """Test if backend supports session_id alone (per review spec) without messages array."""
        sid = "test-sid-only-iter5"
        client.post(f"{BASE_URL}/api/ai/chat", json={"q": "Tell me about NeuroBridge", "session_id": sid}, timeout=TIMEOUT)
        time.sleep(1)
        r2 = client.post(
            f"{BASE_URL}/api/ai/chat",
            json={"q": "How is it different from StudyBee?", "session_id": sid},
            timeout=TIMEOUT,
        )
        assert r2.status_code == 200
        d2 = r2.json()
        ans2 = d2["answer"].lower()
        # If session_id alone gives memory, both names appear. If not, only StudyBee will (server-side memory absent)
        has_memory = "neurobridge" in ans2 and "studybee" in ans2
        if not has_memory:
            pytest.fail(
                "session_id alone does NOT carry memory server-side. "
                "Backend SearchRequest has no session_id field, only conversationId/messages. "
                f"Second answer: {d2['answer'][:400]}"
            )
