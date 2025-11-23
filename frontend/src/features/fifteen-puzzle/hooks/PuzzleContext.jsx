import React from "react";
import { createContext, useContext, useState } from "react";
import generatePuzzle from "../utils/generatePuzzle.js";

const PuzzleContext = createContext();

export function PuzzleProvider({ children }) {
  const [board, setBoard] = useState(generatePuzzle());
  const [moves, setMoves] = useState(0);

  const resetGame = () => {
    setBoard(generatePuzzle());
    setMoves(0);
  };

  return (
    <PuzzleContext.Provider
      value={{ board, setBoard, moves, setMoves, resetGame }}
    >
      {children}
    </PuzzleContext.Provider>
  );
}

export function usePuzzleContext() {
  return useContext(PuzzleContext);
}