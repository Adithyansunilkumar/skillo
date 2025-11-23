const API_URL = import.meta.env.VITE_API_URL;

// Add points to user's totalScore (same API as memory match)
export async function saveMathPuzzleRaceScore(points) {
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
      const error = await res.json();
      throw new Error(error.message || "Failed to update score");
    }

    return res.json();
  } catch (err) {
    console.error("saveMathPuzzleRaceScore error:", err);
    throw err;
  }
}
