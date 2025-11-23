import React, { useEffect, useState } from "react";
import star from "../assets/stars.svg";
const API_URL = import.meta.env.VITE_API_URL;

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/api/leaderboard`);
        const data = await res.json();

        const sorted = data.sort((a, b) => b.totalScore - a.totalScore);
        setPlayers(sorted);
      } catch (error) {
        console.error("Failed to load leaderboard", error);
      }
    };

    loadUsers();
  }, []);

  console.log(players)

  // rank colors like screenshot
  const rankColors = [
    "text-purple-700", // #1
    "text-blue-600", // #2
    "text-orange-600", // #3
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4">
      <h1 className="text-2xl font-bold text-zinc-900">Leaderboard</h1>

      <div className="flex flex-col gap-4">
        {players.map((player, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-6 py-5 shadow-sm"
          >
            {/* LEFT: rank + username */}
            <div className="flex items-center gap-3">
              <span
                className={`font-bold ${rankColors[index] || "text-zinc-500"}`}
              >
                #{index + 1}
              </span>

              <p className="font-medium text-zinc-900">{player.username}</p>
            </div>

            {/* RIGHT: score pill */}
            <div className="flex items-center gap-1.5 rounded-full bg-purple-700/10 px-4 py-2">
              <img src={star} alt="star" className="w-4 opacity-80" />
              <p className="font-semibold text-purple-700">
                {player.totalScore.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
