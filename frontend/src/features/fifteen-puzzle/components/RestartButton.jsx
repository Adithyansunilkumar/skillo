import React from "react";
import usePuzzleLogic from "../hooks/usePuzzleLogic.js";

export default function RestartButton() {
  const { resetGame } = usePuzzleLogic();

  return (
    <div className="mt-6 flex justify-center">
      <button
        onClick={resetGame}
        className="hover:bg-opacity-90 w-full max-w-[240px] rounded-2xl bg-[#00588a] px-8 py-3 text-lg font-semibold text-white shadow-md transition-all active:scale-95"
      >
        Restart
      </button>
    </div>
  );
}
