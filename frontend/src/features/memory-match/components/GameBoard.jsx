import React from "react";
import Card from "./Card";
import GameOverModal from "./GameOverModal";
import useMemoryMatchLogic from "../hooks/useMemoryMatchLogic";
import { Info } from "lucide-react";
import InfoPopup from "./InfoPopup";
import { useState } from "react";

const GameBoard = () => {
  const {
    deck,
    flippedCards,
    matchedIds,
    handleCardClick,
    time,
    moves,
    isGameOver,
    finalScore,
    isGameStarted,
    warningMessage,
    restartGame,
    startGame,
  } = useMemoryMatchLogic();

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-3">
        <div className="flex min-w-[140px] flex-col items-center justify-center gap-0.5 rounded-full bg-[#d8f6f1] p-1 px-4">
          <p className="text-sm font-medium text-[#428a79]">Timer</p>
          <p className="text-md font-bold text-[#428a79]">{formatTime(time)}</p>
        </div>

        <div className="flex min-w-[140px] flex-col items-center justify-center gap-0.5 rounded-full bg-[#d8f6f1] p-1 px-4">
          <p className="text-sm font-medium text-[#428a79]">Moves</p>
          <p className="text-md font-bold text-[#428a79]">{moves}</p>
        </div>
      </div>

      <div className="relative mt-1 flex h-2 items-center justify-center">
        {warningMessage ? (
          <p className="text-sm font-medium text-red-600">{warningMessage}</p>
        ) : !isGameStarted ? (
          <div className="flex items-center gap-1 text-[12px] font-medium text-[#649c8f]">
            <span>Press Start Game and flip the cards</span>

            <button onClick={() => setShowInfo(true)}>
              <Info size={14} className="text-[#428a79]" />
            </button>
          </div>
        ) : (
          <p className="text-sm opacity-0">placeholder</p>
        )}

        {showInfo && <InfoPopup onClose={() => setShowInfo(false)} />}
      </div>

      {/* Grid */}
      <div className="mt-1 grid grid-cols-4 place-items-center gap-2">
        {deck.map((card) => {
          const isFlipped =
            isGameStarted && flippedCards.some((c) => c.id === card.id);

          const isMatched = matchedIds.includes(card.pairId);

          return (
            <Card
              key={card.id}
              card={card}
              isFlipped={isFlipped}
              isMatched={isMatched}
              onClick={() => handleCardClick(card)}
            />
          );
        })}
      </div>

      {/* Restart Button */}
      <div className="flex items-center justify-center pt-2">
        {!isGameStarted ? (
          <button
            onClick={startGame}
            className="text-md flex h-12 w-6/10 items-center justify-center rounded-full bg-[#428a79] font-bold text-white shadow-lg hover:shadow-xl"
          >
            Start Game
          </button>
        ) : (
          <button
            onClick={restartGame}
            className="text-md flex h-12 w-6/10 items-center justify-center rounded-full bg-[#428a79] font-bold text-white shadow-lg hover:shadow-xl"
          >
            Restart
          </button>
        )}
      </div>

      {isGameOver && (
        <GameOverModal
          time={time}
          moves={moves}
          score={finalScore}
          onRestart={restartGame}
        />
      )}
    </>
  );
};

export default GameBoard;
