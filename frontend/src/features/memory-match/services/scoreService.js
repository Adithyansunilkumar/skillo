const API_URL = import.meta.env.VITE_API_URL;

// Add points to user's totalScore
export async function saveMemoryMatchScore(points) {
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
    console.error("saveMemoryMatchScore error:", err);
    throw err;
  }
}
