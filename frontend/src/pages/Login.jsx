import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim()) return setError("Enter email");
    if (!password.trim()) return setError("Enter password");

    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);
      setSuccess("Logged in successfully!");
      setError("");
      console.log("Success:", res);
      navigate("/");
    } catch (err) {
      setError(err.message);
      setSuccess("");
      console.log("Error:", err.message);
    }
  }

  return (
    <div className="font-display flex min-h-screen items-center justify-center bg-[#E9E3FF] p-6">
      <div className="w-full max-w-md rounded-xl bg-white/80 p-8 shadow-md backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#0e0d1c]">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Log in to continue playing!</p>
        </div>

        {error && <p className="mt-4 font-semibold text-red-500">{error}</p>}
        {success && (
          <p className="mt-4 font-semibold text-green-600">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col">
            <p className="pb-1 font-medium text-[#0e0d1c]">Email</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="h-14 rounded-xl border border-gray-300 bg-white p-4 outline-none focus:ring-1 focus:ring-purple-700/40"
            />
          </label>

          <label className="flex flex-col">
            <p className="pb-1 font-medium text-[#0e0d1c]">Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="h-14 rounded-xl border border-gray-300 bg-white p-4 outline-none focus:ring-2 focus:ring-purple-700/40"
            />
          </label>

          <button
            type="submit"
            className="mt-4 h-14 rounded-xl bg-purple-700 font-bold text-white shadow-lg shadow-purple-700/30 transition-all hover:bg-purple-700/90"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            onClick={() => navigate("/register")}
            className="font-bold text-purple-700 hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
