import React, { useState, useEffect } from "react";
import usePuzzleLogic from "../hooks/usePuzzleLogic.js";

export default function HeaderStats() {
  const { moves } = usePuzzleLogic();
  const [openInstructions, setOpenInstructions] = useState(false);

  useEffect(() => {
    setOpenInstructions(true); // Auto-open on entering game page
  
    const openListener = () => setOpenInstructions(true);
  
    document.addEventListener("open-instructions", openListener);
    return () => {
      document.removeEventListener("open-instructions", openListener);
    };
  }, []);
  

  return (
    <>
      {/* Stats Section */}
      <div className="mt-5 flex w-full flex-col items-center">
        {/* Modern Moves Card */}
        <div className="flex min-w-[160px] flex-col items-center rounded-2xl bg-[#d3e9f6] px-8 py-4 shadow-sm">
          <p className="text-sm font-medium tracking-wide text-[#00588a]/70">
            Moves
          </p>

          <p className="mt-1 text-3xl font-extrabold text-[#00588a]">{moves}</p>
        </div>
      </div>

      {/* Instruction Popup */}
      {openInstructions && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="w-[90%] max-w-md rounded-3xl border border-[#00588a]/20 bg-white px-8 py-8 text-center shadow-2xl">
            <h2 className="mb-4 text-2xl font-bold text-[#00588a]">
              ℹ️ How Scoring Works
            </h2>

            <p className="mb-6 text-base leading-relaxed text-[#00588a]/80">
              You will always earn at least{" "}
              <span className="font-bold text-[#00588a]">300 points</span> even
              if you take more than{" "}
              <span className="font-bold text-[#00588a]">1000 moves</span> to
              solve the puzzle. You can earn up to{" "}
              <span className="font-bold text-[#00588a]">600 points</span> if
              you solve it in fewer moves.
            </p>

            <p className="mb-6 text-sm leading-relaxed text-[#00588a]/70">
              <span className="font-semibold text-[#00588a]">
                What is the 15 Puzzle?
              </span>
              <br />
              <br />
              The puzzle contains tiles numbered 1 to 15 and one empty space.
              Slide the tiles into the empty space and arrange them in numerical
              order from 1 to 15 to complete the puzzle.
            </p>

            <button
              onClick={() => setOpenInstructions(false)}
              className="hover:bg-opacity-90 rounded-full bg-[#00588a] px-8 py-3 font-semibold text-white shadow-md transition-transform active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
