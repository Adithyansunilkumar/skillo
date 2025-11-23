import React from "react";
import GameBoard from "./components/GameBoard";

const MemoryMatch = () => {
  return (
    <main className="mx-auto w-full flex items-center justify-center h-svh max-w-sm">
      <div className="flex flex-col sm:h-9/10 gap-4 w-9/10 rounded-xl bg-[#f6f7f7] shadow-lg p-5">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-[28px] leading-tight font-bold text-slate-900">
            Memory Match
          </h1>
          <p className="pt-1 text-sm text-slate-600">
            Find all matching pairs.
          </p>
        </div>

        <GameBoard />
      </div>
    </main>
  );
};

export default MemoryMatch;
