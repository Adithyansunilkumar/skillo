import React from "react";
import { useNavigate } from "react-router-dom";

const GameOverModal = ({ time, moves, score, onRestart }) => {
  const navigate = useNavigate();

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">

        <h2 className="text-2xl font-bold text-[#428a79] mb-4">🎉 Game Completed!</h2>

        <p className="text-lg">Time: <b>{formatTime(time)}</b></p>
        <p className="text-lg">Moves: <b>{moves}</b></p>
        <p className="text-lg">Score: <b>{score}</b></p>

        {/* Play Again Button */}
        <button
          onClick={onRestart}
          className="mt-6 w-full h-12 bg-[#428a79] text-white rounded-full font-bold shadow-md"
        >
          Play Again
        </button>

        {/* Go Home Button */}
        <button
          onClick={() => navigate("/home")}
          className="mt-3 w-full h-12 bg-gray-50 text-[#428a79] rounded-full font-bold shadow-md hover:bg-gray-300"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;