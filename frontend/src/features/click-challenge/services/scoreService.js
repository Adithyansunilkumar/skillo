const API_URL = import.meta.env.VITE_API_URL;

// GET total score for current user
export async function getTotalScore(token) {
  try {
    const res = await fetch(`${API_URL}/api/user/score`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch score");
    }

    return res.json(); // returns { totalScore: number }
  } catch (err) {
    console.error("getTotalScore error:", err);
    throw err;
  }
}

// UPDATE total score by adding points
export async function updateTotalScore(points, token) {
  try {
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

    return res.json(); // returns updated score
  } catch (err) {
    console.error("updateTotalScore error:", err);
    throw err;
  }
}
