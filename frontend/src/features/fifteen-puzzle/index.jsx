import React from "react";
import GameBoard from "./components/GameBoard.jsx";
import HeaderStats from "./components/HeaderStats.jsx";
import RestartButton from "./components/RestartButton.jsx";
import WinPopup from "./components/WinPopup.jsx";
import { PuzzleProvider } from "./hooks/PuzzleContext.jsx";

export default function FifteenPuzzle() {
  return (
    <PuzzleProvider>
      <div
        className="bg-background-light font-display flex h-svh w-full items-center justify-center p-4"
        style={{ fontFamily: `"Spline Sans", sans-serif` }}
      >
        <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center">
          <div className="relative flex flex-col items-center text-center">
            <h1 className="tracking-light text-[32px] leading-tight font-bold text-[#00588a]">
              15 Puzzle
            </h1>

            <p className="flex items-center justify-center gap-2 pt-1 text-base leading-normal text-[#00588a]/80">
              Slide the tiles to arrange them in order.
              {/* Inline Minimal Info Button */}
              <button
                onClick={() =>
                  document.dispatchEvent(new Event("open-instructions"))
                }
                className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00588a]/20 text-xs text-[#00588a] shadow-sm transition hover:bg-[#00588a]/30 active:scale-90"
              >
                i
              </button>
            </p>
          </div>

          <HeaderStats />
          <GameBoard />
          <RestartButton />
        </div>

        <WinPopup />
      </div>
    </PuzzleProvider>
  );
}
