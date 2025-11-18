import React from "react";

export default function GameOverModal({ score, onPlayAgain, onGoHome }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative z-50 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-center text-2xl font-bold text-purple-700">
          Game Over
        </h3>
        <p className="mt-1 text-center text-sm text-gray-500">
          Time's up — great effort!
        </p>

        <div className="mt-6 flex flex-col items-center space-y-4">
          <div className="text-6xl font-extrabold text-purple-700">{score}</div>

          <div className="flex gap-4">
            <button
              onClick={onPlayAgain}
              className="rounded-xl bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
            >
              Play Again
            </button>

            <button
              onClick={onGoHome}
              className="rounded-xl border border-purple-200 bg-white px-4 py-2 hover:bg-purple-50"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
