import React, { useState, useEffect } from "react";
import { generatePuzzle } from "../utils/generatePuzzle";
import AnswerInput from "./AnswerInput";
import Controls from "./Controls";
import GameOverModal from "./GameOverModal";
import { useScoreStore } from "../../../store/scoreStore";
import { useNavigate } from "react-router-dom";

const MathPuzzleRace = () => {
  const [puzzle, setPuzzle] = useState(generatePuzzle(0));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(true);
  const [resultMessage, setResultMessage] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const [showInstructions, setShowInstructions] = useState(false); // ⬅ NEW

  const addToTotalScore = useScoreStore((state) => state.addToTotalScore);
  const syncScoreToBackend = useScoreStore((state) => state.syncScoreToBackend);
  const navigate = useNavigate();

  useEffect(() => {
    setShowInstructions(true);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver]);

  const handleAnswerSubmit = (userAnswer) => {
    if (Number(userAnswer) === puzzle.answer) {
      setResultMessage("Correct!");

      setScore((prev) => {
        const updated = prev + 10;
        addToTotalScore(10);
        syncScoreToBackend(10);
        return updated;
      });

      setPuzzle(generatePuzzle(score + 10));

      setTimeout(() => setResultMessage(""), 600);
    } else {
      setResultMessage("Wrong!");
      setPuzzle(generatePuzzle(score));
      setTimeout(() => setResultMessage(""), 600);
    }
  };

  const startGame = () => {
    setHasStarted(true);
    setTimeLeft(30);
    setScore(0);
    setResultMessage("");
    setGameOver(false);
    setPuzzle(generatePuzzle(0));
  };

  const resetGame = () => {
    setTimeLeft(30);
    setScore(0);
    setResultMessage("");
    setGameOver(true);
    setPuzzle(generatePuzzle(0));
    setHasStarted(false);
  };

  return (
    <div className="flex w-full items-center justify-center px-4 py-8">
      <div className="relative flex w-full max-w-sm flex-col items-center rounded-3xl border border-red-50 bg-[#fffdfd] p-6 shadow-md md:max-w-md md:p-8">
        {/* Small Instructions Button */}
        <button
          onClick={() => setShowInstructions(true)}
          className="absolute top-8 right-6 h-6 w-6 rounded-full bg-[#fde6ec] font-bold text-[#b95976]"
        >
          i
        </button>

        <h1 className="mb-1 text-3xl font-bold text-[#b95976]">
          Math Puzzle Race
        </h1>
        <p className="mb-6 text-sm text-[#b95976]">Solve math problems fast</p>

        <div className="mb-6 flex w-full gap-4">
          <div className="flex-1 rounded-xl bg-[#fde6ec] p-4 text-center shadow-xs">
            <p className="text-sm font-medium text-[#b95976]">Timer</p>
            <p className="text-2xl font-bold text-[#b95976]">{timeLeft}s</p>
          </div>

          <div className="flex-1 rounded-xl bg-[#fde6ec] p-4 text-center shadow-xs">
            <p className="text-sm font-medium text-[#b95976]">Score</p>
            <p className="text-2xl font-bold text-[#b95976]">{score}</p>
          </div>
        </div>

        <div className="mb-6 flex w-full items-center justify-center rounded-2xl bg-[#fde6ec] p-10 shadow-xs">
          <p className="text-4xl font-extrabold text-[#b95976]">
            {puzzle.question}
          </p>
        </div>

        {!gameOver ? (
          <AnswerInput options={puzzle.options} onSubmit={handleAnswerSubmit} />
        ) : (
          hasStarted &&
          gameOver && (
            <GameOverModal
              score={score}
              onRestart={startGame}
              onHome={() => navigate("/home")}
            />
          )
        )}

        {!gameOver && resultMessage && (
          <p className="mt-2 font-bold text-[#b95976]">{resultMessage}</p>
        )}

        <Controls
          onStart={startGame}
          onReset={resetGame}
          hasStarted={hasStarted}
        />
      </div>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-80 rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="mb-2 text-xl font-bold text-[#b95976]">
              How to Play
            </h2>
            <p className="mb-4 text-sm text-[#b95976]">
              Solve the math problem shown on the screen. Select the correct
              answer quickly. Each correct answer gives +10 points. You have 30
              seconds. Try to get the highest score possible.
            </p>

            <button
              onClick={() => setShowInstructions(false)}
              className="mt-4 w-full rounded-lg bg-[#b95976] py-2 font-semibold text-white shadow"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathPuzzleRace;
