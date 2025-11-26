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

  // -----------------------------------------------------------------------
  // 🔄 handleTileClick now supports:
  //  - Click moves         (index)
  //  - Swipe moves         (direction, isSwipe=true)
  // -----------------------------------------------------------------------
  const handleTileClick = (indexOrDirection, isSwipe = false) => {
    const emptyIndex = board.indexOf(0);

    // ========================================================
    // 🟦 HANDLE SWIPES (mobile slide)
    // ========================================================
    if (isSwipe) {
      const row = Math.floor(emptyIndex / 4);
      const col = emptyIndex % 4;

      let targetIndex = null;

      if (indexOrDirection === "left" && col < 3) targetIndex = emptyIndex + 1;
      if (indexOrDirection === "right" && col > 0) targetIndex = emptyIndex - 1;
      if (indexOrDirection === "up" && row < 3) targetIndex = emptyIndex + 4;
      if (indexOrDirection === "down" && row > 0) targetIndex = emptyIndex - 4;

      // If a valid tile is swipe-targeted → move it
      if (targetIndex !== null) {
        return handleTileClick(targetIndex); // re-use normal logic
      }

      return; // invalid swipe → ignore
    }

    // ========================================================
    // 🟧 NORMAL TAP LOGIC (desktop/mobile tap)
    // ========================================================
    const isAdjacent =
      (indexOrDirection === emptyIndex - 1 && emptyIndex % 4 !== 0) ||
      (indexOrDirection === emptyIndex + 1 && indexOrDirection % 4 !== 0) ||
      indexOrDirection === emptyIndex - 4 ||
      indexOrDirection === emptyIndex + 4;

    if (!isAdjacent) return;

    const newBoard = [...board];
    [newBoard[indexOrDirection], newBoard[emptyIndex]] = [
      newBoard[emptyIndex],
      newBoard[indexOrDirection],
    ];

    setBoard(newBoard);
    setMoves((prev) => prev + 1);

    // ========================================================
    // 🟩 CHECK SOLVED + SCORE SYSTEM
    // ========================================================
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

      // Save to backend (add to user's total score)
      savePuzzleScoreToBackend(score);

      // Popup event
      document.dispatchEvent(
        new CustomEvent("puzzle-won", {
          detail: { score, moves: updatedMoves },
        }),
      );
    }
  };

  return { board, moves, handleTileClick, resetGame };
}
