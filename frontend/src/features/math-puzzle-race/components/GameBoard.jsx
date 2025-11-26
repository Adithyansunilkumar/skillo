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
  const addToTotalScore = useScoreStore((state) => state.addToTotalScore);
  const syncScoreToBackend = useScoreStore((state) => state.syncScoreToBackend);
  const navigate = useNavigate()

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

        // Local UI score update
        addToTotalScore(10);

        // Backend sync
        syncScoreToBackend(10);

        return updated;
      });

      // Move to next question instantly
      setPuzzle(generatePuzzle(score + 10));

      // Clear message after short delay
      setTimeout(() => {
        setResultMessage("");
      }, 600); // adjust timing if needed
    } else {
      setResultMessage("Wrong!");

      // Move to next question
      setPuzzle(generatePuzzle(score));

      // Clear message quickly
      setTimeout(() => {
        setResultMessage("");
      }, 600);
    }
  };

  const startGame = () => {
    setHasStarted(true); // hide Start button
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
      <div className="flex w-full max-w-sm flex-col items-center rounded-3xl border border-red-50 bg-[#fffdfd] p-6 shadow-md md:max-w-md md:p-8">
        {/* Title */}
        <h1 className="mb-1 text-3xl font-bold text-[#b95976]">
          Math Puzzle Race
        </h1>
        <p className="mb-6 text-sm text-[#b95976]">Solve math problems fast</p>

        {/* Stats */}
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

        {/* Question */}
        <div className="mb-6 flex w-full items-center justify-center rounded-2xl bg-[#fde6ec] p-10 shadow-xs">
          <p className="text-4xl font-extrabold text-[#b95976]">
            {puzzle.question}
          </p>
        </div>

        {/* Options */}
        {!gameOver ? (
          <AnswerInput options={puzzle.options} onSubmit={handleAnswerSubmit} />
        ) : (
          hasStarted &&
          gameOver && (
            <GameOverModal
              score={score}
              onRestart={startGame}
              onHome={() => {
                // Navigate to your home page
                navigate("/home")
                // or use react-router: navigate("/")
              }}
            />
          )
        )}

        {!gameOver && resultMessage && (
          <p className="mt-2 font-bold text-[#b95976]">{resultMessage}</p>
        )}

        {/* Controls */}
        <Controls
          onStart={startGame}
          onReset={resetGame}
          hasStarted={hasStarted}
        />
      </div>
    </div>
  );
};

export default MathPuzzleRace;
