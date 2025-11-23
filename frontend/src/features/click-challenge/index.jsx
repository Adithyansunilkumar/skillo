import React from "react";
import Header from "../../components/Header";

import GameGrid from "./components/GameGrid";
import GameOverModal from "./components/GameOverModal";
import TimerSection from "./components/TimerSection";
import { useScoreStore } from "../../store/scoreStore";
import useClickChallengeLogic from "./hooks/useClickChallengeLogic";


export default function ClickChallenge({ onGoHome }) {
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
    tileLifetimeMs: 2000,
    spawnIntervalMs: 400,
    maxTiles: 4,
  });

  const fetchTotalScore = useScoreStore((s) => s.fetchTotalScore);

  // --- Navigation handler ---
  const handleGoHome = () => {
    fetchTotalScore(); // Sync latest score from backend
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

      {/* --- Main Game Card --- */}
      <main className="w-full max-w-4xl">
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          {/* Title + Timer */}
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="mb-2 text-2xl font-extrabold text-purple-950">
                Click Challenge
              </h2>
              <p className="text-sm text-gray-500">
                Test your speed and accuracy.
              </p>
            </div>

            <TimerSection
              timeLeft={timeLeft}
              score={score}
              gameActive={gameActive}
              onTogglePlay={() =>
                gameActive ? stopGame() : startGame()
              }
            />
          </div>

          {/* --- Game Grid --- */}
          <GameGrid
            gridCells={gridCells}
            tiles={tiles}
            onTileClick={handleTileClick}
          />
        </div>
      </main>

      {/* --- Game Over Modal --- */}
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

      {/* Local animation fallback */}
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
