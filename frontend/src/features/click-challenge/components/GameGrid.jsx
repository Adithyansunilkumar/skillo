import React from "react";
import Tile from "./Tile";

export default function GameGrid({ gridCells, tiles, onTileClick }) {
  const tileMap = new Map(tiles.map((t) => [t.cellIndex, t]));

  return (
    <div className="mt-6">
      <div className="relative w-full rounded-xl bg-linear-to-b from-white to-purple-50 p-4">
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(64px, 1fr))",
          }}
        >
          {Array.from({ length: gridCells }).map((_, cellIndex) => {
            const tile = tileMap.get(cellIndex);

            return (
              <div
                key={cellIndex}
                className="relative flex h-20 w-full items-center justify-center md:h-24"
              >
                {tile ? (
                  <Tile onClick={() => onTileClick(tile.id)} />
                ) : (
                  <div className="h-full w-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
