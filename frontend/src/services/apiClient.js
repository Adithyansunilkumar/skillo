const API_URL = import.meta.env.VITE_API_URL;

export async function apiClient(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle token invalid due to multi-device login
  if (res.status === 401) {
    const data = await res.json();

    if (data.message === "Logged in from another device") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login"; // force redirect
      return;
    }
  }

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  return res.json();
}
