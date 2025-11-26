import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [generatedUsername, setGeneratedUsername] = useState("");

  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  function createUsername(email) {
    const prefix = email.split("@")[0];
    return prefix.replace(/[^a-zA-Z0-9_]/g, "_").substring(0, 16);
  }

  function validateInputs() {
    if (!email.trim()) return "Enter email";
    if (!emailRegex.test(email)) return "Enter a valid email";
    if (!email.endsWith("@gmail.com"))
      return "Only Gmail addresses are allowed";

    if (!password.trim()) return "Enter password";
    if (password.length < 6) return "Password must be at least 6 characters";

    if (password !== confirmPassword) return "Passwords do not match";

    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    const username = createUsername(email);

    setGeneratedUsername(username);
    setShowConfirmPopup(true);
  }

  async function confirmRegistration() {
    try {
      const res = await registerUser({
        username: generatedUsername,
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);

      setSuccess("Account created successfully!");
      setError("");
      setShowConfirmPopup(false);

      setTimeout(() => navigate("/home"), 800);
    } catch (err) {
      setError(err.message || "Registration failed");
      setSuccess("");
      setShowConfirmPopup(false);
    }
  }

  return (
    <div className="font-display relative flex min-h-screen items-center justify-center bg-[#E9E3FF] p-6">
      <div className="w-full max-w-md rounded-xl bg-white/90 p-8 shadow-md backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#0e0d1c]">
            Create Your Account
          </h1>
          <p className="mt-2 text-gray-600">Join the game and start winning!</p>
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
              className="h-14 rounded-xl border border-gray-300 bg-white p-4 outline-none focus:ring-1 focus:ring-purple-700/70"
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
              className="h-14 rounded-xl border border-gray-300 bg-white p-4 outline-none focus:ring-1 focus:ring-purple-700/70"
            />
          </label>

          <label className="flex flex-col">
            <p className="pb-1 font-medium text-[#0e0d1c]">Confirm Password</p>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              className="mb-4 h-14 rounded-xl border border-gray-300 bg-white p-4 outline-none focus:ring-1 focus:ring-purple-700/70"
            />
          </label>

          <button
            type="submit"
            className="h-14 rounded-xl bg-purple-700 font-bold text-white shadow-lg shadow-purple-700/30 transition-all hover:bg-purple-700/90"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            className="font-bold text-purple-700 hover:underline"
            onClick={() => navigate("/login")}
          >
            Log In
          </a>
        </p>
      </div>

      {/* Confirmation Popup */}
      {showConfirmPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="w-80 rounded-xl bg-white p-6 text-center shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Confirm Username</h2>
            <p className="mb-6 text-gray-700">
              Your username will be:
              <br />
              <span className="text-lg font-bold text-purple-700">
                {generatedUsername}
              </span>
            </p>

            <div className="flex justify-between gap-3">
              <button
                onClick={() => setShowConfirmPopup(false)}
                className="h-12 w-1/2 rounded-xl border border-gray-300 bg-gray-100 font-medium"
              >
                Cancel
              </button>

              <button
                onClick={confirmRegistration}
                className="h-12 w-1/2 rounded-xl bg-purple-700 font-bold text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
