import { usePuzzleContext } from "./PuzzleContext.jsx";
import {
  saveLocalPuzzleScore,
  savePuzzleScoreToBackend,
} from "../services/scoreService.js";

export default function usePuzzleLogic() {
  const { board, setBoard, moves, setMoves, resetGame } = usePuzzleContext();

  const isSolved = (arr) => {
    for (let i = 0; i < 15; i++) {
      if (arr[i] !== i + 1) return false;
    }
    return arr[15] === 0;
  };

  const handleTileClick = (index) => {
    const emptyIndex = board.indexOf(0);

    const isAdjacent =
      (index === emptyIndex - 1 && emptyIndex % 4 !== 0) ||
      (index === emptyIndex + 1 && index % 4 !== 0) ||
      index === emptyIndex - 4 ||
      index === emptyIndex + 4;

    if (!isAdjacent) return;

    const newBoard = [...board];
    [newBoard[index], newBoard[emptyIndex]] = [
      newBoard[emptyIndex],
      newBoard[index],
    ];

    setBoard(newBoard);
    setMoves((prev) => prev + 1);

    if (isSolved(newBoard)) {
      const updatedMoves = moves + 1;

      let score = 0;

      if (updatedMoves < 80) {
        score = 600;
      } else if (updatedMoves > 1000) {
        score = 300;
      } else {
        score = 600 - (updatedMoves - 80) * 0.326;
      }

      score = Math.round(Math.min(600, Math.max(300, score)));

      // Save locally (last round)
      saveLocalPuzzleScore(score);

      // Save to backend (adds to user's total score)
      savePuzzleScoreToBackend(score);

      // Trigger win popup with score + moves
      document.dispatchEvent(
        new CustomEvent("puzzle-won", {
          detail: { score, moves: updatedMoves },
        }),
      );
    }
  };

  return { board, moves, handleTileClick, resetGame };
}
