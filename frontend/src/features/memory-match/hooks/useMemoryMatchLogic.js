import { useState, useEffect } from "react";
import { useScoreStore } from "../../../store/scoreStore";
import { saveMemoryMatchScore } from "../services/scoreService";

export default function useMemoryMatchLogic() {
  const [deck, setDeck] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [moves, setMoves] = useState(0);

  const [isGameOver, setIsGameOver] = useState(false);

  const [finalScore, setFinalScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    Promise.resolve().then(() => {
      setDeck(generateDeck(8));
    });
  }, []);

  // Timer
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startGame = () => {
    setIsGameStarted(true);
    setIsRunning(true);
    setWarningMessage("");
  };

  // Handle card click
  const handleCardClick = (card) => {
    if (!isGameStarted) {
      setWarningMessage("Please press Start Game first.");
      return;
    }

    if (isGameOver) return;
    if (flippedCards.length === 2) return;
    if (flippedCards.find((c) => c.id === card.id)) return;
    if (matchedIds.includes(card.pairId)) return;

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      checkForMatch(newFlipped);
    }
  };

  const { addToTotalScore } = useScoreStore.getState();

  // Check match
  const checkForMatch = (cards) => {
    const [c1, c2] = cards;

    if (c1.pairId === c2.pairId) {
      setMatchedIds((prev) => {
        const updated = [...prev, c1.pairId];

        // Game Complete Check
        if (updated.length === deck.length / 2) {
          setIsRunning(false);

          const totalScore = calculateScore(time, moves + 1, deck.length / 2);
          setFinalScore(totalScore);

          // 1. Save to backend (PATCH /update-score)
          saveMemoryMatchScore(totalScore);

          // 2. Update the Zustand store so UI updates instantly
          addToTotalScore(totalScore);

          // (Optional) Sync from backend for safety
          // syncScoreToBackend(totalScore);

          setIsGameOver(true);
        }

        return updated;
      });

      setTimeout(() => {
        setFlippedCards([]);
      }, 600);
    } else {
      setTimeout(() => {
        setFlippedCards([]);
      }, 600);
    }
  };

  // Restart
  const restartGame = () => {
    const newDeck = generateDeck(8);
    setDeck(newDeck);

    setFlippedCards([]);
    setMatchedIds([]);
    setTime(0);
    setMoves(0);

    setWarningMessage("");
    setIsRunning(false);
    setIsGameOver(false);
    setIsGameStarted(false); // Important
  };

  return {
    deck,
    flippedCards,
    matchedIds,
    handleCardClick,

    time,
    moves,
    isRunning,
    isGameOver,
    finalScore,
    isGameStarted,
    warningMessage,
    startGame,
    restartGame,
  };
}

function calculateScore(time, moves, pairCount) {
  const idealMoves = pairCount * 2;

  const timePenalty = time * 1;
  const movePenalty = Math.max(0, moves - idealMoves);

  let raw = 100 - (timePenalty + movePenalty);

  if (raw < 0) raw = 0;
  if (raw > 100) raw = 100;

  return Math.round(raw);
}

function generateDeck(pairCount) {
  const pairs = [];

  for (let i = 1; i <= pairCount; i++) {
    const pairId = `P${i}`;
    pairs.push({ id: `${pairId}-1`, pairId }, { id: `${pairId}-2`, pairId });
  }

  return shuffleArray(pairs);
}

function shuffleArray(array) {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}
