import React from "react";

const GameOverModal = ({ score, onRestart, onHome }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="w-11/12 max-w-sm rounded-2xl border border-red-100 bg-white p-6 text-center shadow-xl">
        <h2 className="mb-2 text-2xl font-bold text-[#B91C1C]">Game Over</h2>

        <p className="mb-6 text-lg text-[#B91C1C]">
          Your Score: <span className="font-bold">{score}</span>
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onRestart}
            className="w-full rounded-xl bg-[#FCE7EC] py-3 font-semibold text-[#B91C1C] transition hover:bg-[#F8D7DA]"
          >
            Play Again
          </button>

          <button
            onClick={onHome}
            className="w-full rounded-xl bg-[#FEEAEF] py-3 font-semibold text-[#B91C1C] transition hover:bg-[#FCE7EC]"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
