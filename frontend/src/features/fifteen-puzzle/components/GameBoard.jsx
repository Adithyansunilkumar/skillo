import React, { useState } from "react";
import Tile from "./Tile.jsx";
import usePuzzleLogic from "../hooks/usePuzzleLogic.js";

export default function GameBoard() {
  const { board, handleTileClick } = usePuzzleLogic();

  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });

  const onTouchStart = (e) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  // 🔥 Prevent pull-to-refresh inside the board
  const onTouchMove = (e) => {
    e.preventDefault();
  };

  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStart.x;
    const dy = e.changedTouches[0].clientY - touchStart.y;

    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    // Ignore tiny swipes
    if (absX < 30 && absY < 30) return;

    let direction = null;

    if (absX > absY) {
      direction = dx > 0 ? "right" : "left";
    } else {
      direction = dy > 0 ? "down" : "up";
    }

    handleTileClick(direction, true);
  };

  return (
    <div
      className="mt-4 aspect-square w-full max-w-[400px] touch-none rounded-lg bg-[#d3e9f6] p-2 shadow-inner"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
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
