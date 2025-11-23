import React, { useEffect, useState } from "react";
import { getRandomWord } from "../services/wordsService";
import { shuffleArray } from "../utils/shuffle";
import {
  saveLocalScrambledScore,
  saveScrambledScoreToBackend,
} from "../services/scoreService";

export default function ScrambledWordsGame() {
  const [currentWord, setCurrentWord] = useState("");
  const [scrambled, setScrambled] = useState([]);
  const [slots, setSlots] = useState([]);
  const [usedIndexes, setUsedIndexes] = useState([]);

  const [timer, setTimer] = useState(45);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [showWin, setShowWin] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // ------------------------------------------
  // Initialize a new word
  // ------------------------------------------
  const initNewWord = () => {
    const word = getRandomWord().toUpperCase();
    const letters = word.split("");

    // Shuffle until result is different from original order
    let shuffled = shuffleArray([...letters]);
    while (shuffled.join("") === word) {
      shuffled = shuffleArray([...letters]);
    }

    setCurrentWord(word);
    setScrambled(shuffled);
    setSlots(Array(word.length).fill(""));
    setUsedIndexes([]);
    setMessage("");
    setTimer(45);
  };

  // Load first word
  useEffect(() => {
    initNewWord();
  }, []);

  // ------------------------------------------
  // Timer logic
  // ------------------------------------------
  useEffect(() => {
    if (timer <= 0) {
      setShowWin(true);
      return;
    }

    const id = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [timer]);

  // ------------------------------------------
  // Select letter
  // ------------------------------------------
  const selectLetter = (letter, index) => {
    if (usedIndexes.includes(index)) return;

    const empty = slots.indexOf("");
    if (empty === -1) return;

    const newSlots = [...slots];
    newSlots[empty] = letter;

    setSlots(newSlots);
    setUsedIndexes([...usedIndexes, index]);
  };

  // ------------------------------------------
  // Backspace (remove last filled slot)
  // ------------------------------------------
  const backspace = () => {
    const lastFilled = slots.lastIndexOf(
      slots
        .slice()
        .reverse()
        .find((v) => v !== ""),
    );

    if (lastFilled === -1) return;

    const newSlots = [...slots];
    const removedLetter = newSlots[lastFilled];
    newSlots[lastFilled] = "";

    const newUsed = [...usedIndexes];
    const removeIndex = scrambled.findIndex(
      (char, i) => char === removedLetter && newUsed.includes(i),
    );
    if (removeIndex !== -1) {
      newUsed.splice(newUsed.indexOf(removeIndex), 1);
    }

    setSlots(newSlots);
    setUsedIndexes(newUsed);
  };

  // ------------------------------------------
  // Clear all
  // ------------------------------------------
  const clearSlots = () => {
    setSlots(Array(currentWord.length).fill(""));
    setUsedIndexes([]);
    setMessage("");
  };

  // ------------------------------------------
  // Shuffle
  // ------------------------------------------
  const shuffleLetters = () => {
    setScrambled(shuffleArray([...scrambled]));
    setSlots(Array(currentWord.length).fill(""));
    setUsedIndexes([]);
  };

  // ------------------------------------------
  // Submit
  // ------------------------------------------
  const submitWord = () => {
    const userWord = slots.join("");

    if (userWord.length < currentWord.length) {
      setMessage("Fill all letters!");
      return;
    }

    if (userWord === currentWord) {
      const earned = 25;

      // Update score
      setScore((s) => s + earned);

      // Save to local + backend
      saveLocalScrambledScore(earned);
      saveScrambledScoreToBackend(earned);

      setMessage("Correct! +25");

      // Load next word (timer unchanged)
      setTimeout(() => {
        const word = getRandomWord().toUpperCase();
        const letters = word.split("");

        let shuffled = shuffleArray([...letters]);
        while (shuffled.join("") === word) {
          shuffled = shuffleArray([...letters]);
        }

        setCurrentWord(word);
        setScrambled(shuffled);
        setSlots(Array(word.length).fill(""));
        setUsedIndexes([]);
        setMessage("");
      }, 500);
    } else {
      setMessage("Incorrect word");

      // Clear slots on wrong answer
      setSlots(Array(currentWord.length).fill(""));
      setUsedIndexes([]);
    }
  };

  function loadNextWordWithoutReset() {
    const word = getRandomWord().toUpperCase();
    const letters = word.split("");

    let shuffled = shuffleArray([...letters]);
    while (shuffled.join("") === word) {
      shuffled = shuffleArray([...letters]);
    }

    setCurrentWord(word);
    setScrambled(shuffled);
    setSlots(Array(word.length).fill(""));
    setUsedIndexes([]);
    setMessage("");
  }

  const skipWord = () => {
    setScore((s) => {
      const updated = Math.max(0, s - 5);

      // Save only actual deducted amount
      const deductedPoints = updated === 0 ? (s === 0 ? 0 : -5) : -5;

      // Save locally (avoid negative)
      saveLocalScrambledScore(deductedPoints);

      // Save to backend (avoid negative)
      if (deductedPoints !== 0) {
        saveScrambledScoreToBackend(deductedPoints);
      }

      setMessage("Skipped -5");

      // Load new word
      loadNextWordWithoutReset();
      return updated;
    });
  };

  // ------------------------------------------
  // UI
  // ------------------------------------------
  return (
    <div className="flex h-svh w-full items-center justify-center bg-[#faf7f2] px-4">
      {/* Modern minimal game container */}
      <div className="font-display flex w-full max-w-sm flex-col items-center space-y-5 rounded-2xl border border-[#e8decf] bg-white p-6 text-[#8f6d3b] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        {/* Header */}
        <header className="relative w-full text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#8f6d3b]">
            Scrambled Words
          </h1>

          <div className="mt-1 flex items-center justify-center gap-2">
            <p className="text-sm text-[#8f6d3b]/70">
              Unscramble the letters to form the word
            </p>

            {/* Info Icon */}
            <button
              onClick={() => setShowInfo(true)}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f6f1d8] text-[10px] font-bold text-[#8f6d3b] shadow-sm transition hover:bg-[#ece3c4] active:scale-95"
            >
              i
            </button>
          </div>
        </header>

        {/* Score & Timer */}
        <div className="flex w-full gap-3">
          <div className="flex flex-1 flex-col items-center rounded-xl border border-[#8f6d3b]/10 bg-[#fdfbf6] p-3">
            <p className="text-xs font-semibold text-[#8f6d3b]/70">TIMER</p>
            <p className="text-xl font-bold">
              {String(timer).padStart(2, "0")}
            </p>
          </div>

          <div className="flex flex-1 flex-col items-center rounded-xl border border-[#8f6d3b]/10 bg-[#fdfbf6] p-3">
            <p className="text-xs font-semibold text-[#8f6d3b]/70">SCORE</p>
            <p className="text-xl font-bold">{score}</p>
          </div>
        </div>

        {/* Game Area */}
        <main className="flex w-full flex-col items-center space-y-5 rounded-xl border border-[#8f6d3b]/10 bg-[#fdfbf6] p-5">
          {/* Slots */}
          <div className="flex flex-col items-center space-y-3">
            <fieldset className="flex gap-2">
              {slots.map((letter, i) => (
                <input
                  key={i}
                  readOnly
                  value={letter}
                  maxLength={1}
                  className="h-12 w-10 rounded-lg border border-[#d8c899] bg-[#fffdf5] text-center text-xl font-bold text-[#8f6d3b] outline-none"
                />
              ))}
            </fieldset>

            <p className="min-h-5 text-center text-xs font-medium text-[#8f6d3b]/70">
              {message}
            </p>
          </div>

          {/* Scrambled Letters */}
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {scrambled.map((char, i) => (
              <button
                key={i}
                onClick={() => selectLetter(char, i)}
                className={`flex h-12 w-12 items-center justify-center rounded-xl border shadow transition-transform hover:scale-105 active:scale-95 ${
                  usedIndexes.includes(i)
                    ? "border-[#c6b899] bg-[#d8c7a5] opacity-70"
                    : "border-[#e0d3a8] bg-[#faf4dd]"
                }`}
              >
                <p className="text-xl font-bold text-[#8f6d3b]">{char}</p>
              </button>
            ))}
          </div>
        </main>

        {/* Controls */}
        <div className="flex w-full flex-col space-y-3">
          {/* Row 1: Backspace, Clear, Skip */}
          <div className="flex gap-2">
            <button
              onClick={backspace}
              className="h-10 flex-1 rounded-full border border-[#e0d3a8] bg-[#faf4dd] text-sm font-semibold text-[#8f6d3b] transition-transform hover:scale-[1.02]"
            >
              Backspace
            </button>

            <button
              onClick={clearSlots}
              className="h-10 flex-1 rounded-full border border-[#e0d3a8] bg-[#faf4dd] text-sm font-semibold text-[#8f6d3b] transition-transform hover:scale-[1.02]"
            >
              Clear
            </button>

            <button
              onClick={skipWord}
              className="h-10 flex-1 rounded-full border border-[#e0d3a8] bg-[#faf4dd] text-sm font-semibold text-[#8f6d3b] transition-transform hover:scale-[1.02]"
            >
              Skip -5
            </button>
          </div>

          {/* Row 2: Submit */}
          <button
            onClick={submitWord}
            className="h-12 w-full rounded-full bg-[#b6915b] text-base font-bold text-white shadow-md transition-transform active:scale-[0.98]"
          >
            Submit
          </button>
        </div>
      </div>
      {showWin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xs space-y-4 rounded-2xl bg-white p-6 text-center shadow-xl">
            <h2 className="text-xl font-bold text-[#8f6d3b]">Time’s Up!</h2>

            <p className="text-sm text-[#8f6d3b]/80">Your Score</p>

            <p className="text-4xl font-extrabold text-[#8f6d3b]">{score}</p>

            <div className="mt-4 flex flex-col space-y-3">
              <button
                onClick={() => {
                  // Reset game fully
                  setTimer(45);
                  setScore(0);
                  setShowWin(false);
                  initNewWord(); // This one can reset timer because it's Play Again
                }}
                className="h-12 w-full rounded-full bg-[#8f6d3b] font-bold text-white transition hover:opacity-90 active:scale-95"
              >
                Play Again
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="h-12 w-full rounded-full bg-[#d9cab3] font-semibold text-[#8f6d3b] transition hover:opacity-90 active:scale-95"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      )}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xs space-y-4 rounded-2xl bg-white p-6 text-center text-[#8f6d3b] shadow-xl">
            <h2 className="text-lg font-bold">How to Play</h2>

            <p className="text-sm leading-relaxed text-[#8f6d3b]/80">
              Unscramble the letters to form the correct word. Tap letters to
              place them in the slots. You can clear or backspace to fix
              mistakes.
            </p>

            <p className="mt-2 text-sm font-semibold text-[#8f6d3b]">
              Score: +25 for every correct word, –5 for skipping.
            </p>

            <button
              onClick={() => setShowInfo(false)}
              className="mt-4 h-10 w-full rounded-full bg-[#8f6d3b] font-bold text-white transition hover:opacity-90 active:scale-95"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
