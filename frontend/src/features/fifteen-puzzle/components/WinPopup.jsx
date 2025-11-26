import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WinPopup() {
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState(null);
  const [moves, setMoves] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listener = (e) => {
      setScore(e.detail.score);
      setMoves(e.detail.moves);
      setOpen(true);
    };

    document.addEventListener("puzzle-won", listener);
    return () => document.removeEventListener("puzzle-won", listener);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[90%] max-w-md rounded-3xl bg-white px-8 py-10 shadow-2xl border border-[#00588a]/20 text-center">

        {/* Title */}
        <h2 className="text-[30px] font-extrabold text-[#00588a] mb-6">
          🎉 Puzzle Completed!
        </h2>

        {/* Stats Box */}
        <div className="flex items-center justify-center gap-6 mb-8">
          
          {/* Score Card */}
          <div className="flex flex-col items-center bg-[#d3e9f6] rounded-2xl px-6 py-4 shadow-md min-w-[120px]">
            <p className="text-sm text-[#00588a]/70 font-medium">Score</p>
            <p className="text-3xl font-extrabold text-[#00588a] mt-1">{score}</p>
          </div>

          {/* Moves Card */}
          <div className="flex flex-col items-center bg-[#d3e9f6] rounded-2xl px-6 py-4 shadow-md min-w-[120px]">
            <p className="text-sm text-[#00588a]/70 font-medium">Moves</p>
            <p className="text-3xl font-extrabold text-[#00588a] mt-1">{moves}</p>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 items-center">

          <button
            onClick={() => window.location.reload()}
            className="w-full max-w-[240px] rounded-full bg-[#00588a] text-white py-3 text-lg font-semibold shadow-md hover:bg-opacity-90 active:scale-95 transition"
          >
            Play Again
          </button>

          <button
            onClick={() => navigate("/home")}
            className="w-full max-w-60 rounded-full bg-[#d3e9f6] text-[#00588a] py-3 text-lg font-semibold shadow-md hover:bg-[#c2ddee] active:scale-95 transition"
          >
            Go Home
          </button>

        </div>
      </div>
    </div>
  );
}
