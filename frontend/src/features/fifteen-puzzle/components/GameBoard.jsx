import React from "react";
import Tile from "./Tile.jsx";
import usePuzzleLogic from "../hooks/usePuzzleLogic.js";

export default function GameBoard() {
  const { board, handleTileClick } = usePuzzleLogic();

  return (
    <div className="mt-4 aspect-square w-full max-w-[400px] rounded-lg bg-[#d3e9f6] p-2 shadow-inner">
      <div className="grid h-full w-full grid-cols-4 gap-2">
        {board.map((value, index) => (
          <Tile
            key={index}
            value={value}
            onClick={() => handleTileClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
