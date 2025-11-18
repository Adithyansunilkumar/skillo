import React from "react";

export default function TimerSection({
  timeLeft,
  score,
  gameActive,
  onTogglePlay,
}) {
  return (
    <div className="relative mt-3 flex w-full items-center justify-center">
      <div className="absolute left-0 flex h-15 w-27 flex-col items-center justify-center rounded-3xl bg-purple-300">
        <h2 className="text-sm text-purple-800">Time Left</h2>
        <h2 className="text-lg font-bold text-purple-900">{timeLeft}s</h2>
      </div>

      <button
        onClick={onTogglePlay}
        className="h-15 w-27 rounded-3xl bg-purple-700/80 text-white hover:bg-purple-600 focus:outline-none"
      >
        {gameActive ? "Give Up" : "Play"}
      </button>
      <div className="absolute right-0 flex h-15 w-27 flex-col items-center justify-center rounded-3xl bg-purple-300">
        <h2 className="text-sm text-purple-800">Score</h2>
        <h2 className="text-lg font-bold text-purple-900">{score}</h2>
      </div>
    </div>
  );
}
