const API_URL = import.meta.env.VITE_API_URL;
const STORAGE_KEY = "scrambledWordsLastScore";

// ----------------------------
// 1. Save last round score locally
// ----------------------------
export function saveLocalScrambledScore(score) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ score }));
}

// ----------------------------
// 2. Load last round score (optional)
// ----------------------------
export function loadLocalScrambledScore() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { score: null };
  } catch {
    return { score: null };
  }
}

// ----------------------------
// 3. Save score to backend user account
// (update user's totalScore)
// ----------------------------
export async function saveScrambledScoreToBackend(points) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/api/user/update-score`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ points }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      throw new Error(error?.message || "Failed to update score");
    }

    return res.json();
  } catch (err) {
    console.error("saveScrambledScoreToBackend error:", err);
    throw err;
  }
}
