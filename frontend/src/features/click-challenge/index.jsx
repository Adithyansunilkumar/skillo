import React, { useState, useEffect } from "react";
import Header from "../../components/Header";

import GameGrid from "./components/GameGrid";
import GameOverModal from "./components/GameOverModal";
import TimerSection from "./components/TimerSection";
import { useScoreStore } from "../../store/scoreStore";
import useClickChallengeLogic from "./hooks/useClickChallengeLogic";

export default function ClickChallenge({ onGoHome }) {
  const [showInfo, setShowInfo] = useState(false);

  const {
    timeLeft,
    score,
    gameActive,
    tiles,
    startGame,
    stopGame,
    handleTileClick,
    gridCells,
  } = useClickChallengeLogic({
    initialTime: 30,
    gridCells: 18,
    tileLifetimeMs: 1000,
    spawnIntervalMs: 250,
    maxTiles: 4,
  });

  const fetchTotalScore = useScoreStore((s) => s.fetchTotalScore);

  useEffect(() => {
    setShowInfo(true);
  }, []);

  const handleGoHome = () => {
    fetchTotalScore();
    if (typeof onGoHome === "function") onGoHome();
  };

  return (
    <div
      className="flex min-h-screen flex-col items-center space-y-6 bg-linear-to-b from-purple-100 to-white px-4"
      style={{
        fontFamily:
          "'SF UI Display', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
    >
      <Header />
      <main className="w-full max-w-4xl">
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="relative">
              <h2 className="mb-2 text-2xl font-extrabold text-purple-950">
                Click Challenge
              </h2>

              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">
                  Test your speed and accuracy.
                </p>

                {/* Small Info Icon */}
                <button
                  onClick={() => setShowInfo(true)}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-200 text-[10px] font-bold text-purple-800 shadow-sm transition hover:bg-purple-300 active:scale-95"
                >
                  i
                </button>
              </div>
            </div>

            <TimerSection
              timeLeft={timeLeft}
              score={score}
              gameActive={gameActive}
              onTogglePlay={() => (gameActive ? stopGame() : startGame())}
            />
          </div>

          <GameGrid
            gridCells={gridCells}
            tiles={tiles}
            onTileClick={handleTileClick}
          />
        </div>
      </main>

      {/* Game Over Modal */}
      {!gameActive && timeLeft === 0 && (
        <GameOverModal
          score={score}
          onPlayAgain={startGame}
          onGoHome={handleGoHome}
        />
      )}

      <div className="text-xs text-gray-400">
        Click the purple tiles as they appear — each tile gives +1 point.
      </div>

      {/* --------------------------- */}
      {/*       INFO POPUP           */}
      {/* --------------------------- */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xs space-y-4 rounded-2xl bg-white p-6 text-center text-purple-900 shadow-xl">
            <h2 className="text-lg font-bold">How to Play</h2>

            <p className="text-sm leading-relaxed text-purple-900/80">
              Tap the purple tiles as soon as they appear. Each correct tap
              gives <strong>+1 point</strong>. Tiles disappear quickly, so be
              fast and accurate. Your goal is to score as much as possible in{" "}
              <strong>30 seconds</strong>.
            </p>

            <p className="mt-2 text-sm font-semibold text-purple-900">
              Be quick — tiles last only 1 second!
            </p>

            <button
              onClick={() => setShowInfo(false)}
              className="mt-4 h-10 w-full rounded-full bg-purple-700 font-bold text-white transition hover:opacity-90 active:scale-95"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeInScale 220ms ease-out;
        }
      `}</style>
    </div>
  );
}
