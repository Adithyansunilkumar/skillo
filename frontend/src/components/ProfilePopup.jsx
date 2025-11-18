import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePopup({ user, score }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div className="absolute top-16 right-4 z-50 w-full max-w-xs">
      <div className="flex flex-col gap-4 rounded-lg bg-white p-5 shadow-lg">
        <div className="flex items-center gap-4">
          <div
            className="h-16 w-16 rounded-full bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://cdn-icons-png.flaticon.com/512/3135/3135715.png")',
            }}
          ></div>

          <div className="flex flex-col overflow-hidden">
            <p className="truncate text-lg font-semibold">{user?.username}</p>
            <p className="truncate text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* Score Box */}
        <div className="flex flex-col gap-1 rounded-lg bg-gray-100 p-4">
          <p className="text-sm font-medium text-gray-500">Total Score</p>
          <p className="text-3xl font-bold text-purple-700">
            {score?.toLocaleString() || 0}
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-purple-700 px-4 font-semibold text-white transition hover:bg-purple-800"
        >
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </div>
    </div>
  );
}
