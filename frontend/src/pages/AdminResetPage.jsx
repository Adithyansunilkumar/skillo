import React, { useState } from "react";

export default function AdminResetPage() {
  const [auth, setAuth] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // Simple frontend password
  const ADMIN_PASSWORD = "admin6235"; // change to your own

  const handleAuth = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setAuth(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleReset = async () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset ALL user scores to 0?",
    );
    if (!confirmReset) return;

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(`${API_URL}/api/admin/reset-scores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to reset scores.");
        return;
      }

      setMessage(data.message || "Scores reset successfully.");
    } catch (error) {
      setMessage("Unable to reset scores. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // First show login screen
  if (!auth) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 px-6">
        <div className="w-full max-w-sm rounded-xl bg-white p-8 text-center shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Admin Login</h2>

          <input
            type="password"
            placeholder="Enter admin password"
            className="mb-4 w-full rounded-lg border p-3"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />

          <button
            onClick={handleAuth}
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // Admin page after login
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Admin Panel</h1>

        <button
          onClick={handleReset}
          disabled={loading}
          className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-red-700 disabled:bg-gray-400"
        >
          {loading ? "Resetting..." : "Reset All Scores"}
        </button>

        {message && <p className="mt-4 font-medium text-gray-700">{message}</p>}
      </div>
    </div>
  );
}
