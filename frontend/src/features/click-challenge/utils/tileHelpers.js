// Tile helper utilities for Click Challenge game

// Get list of free grid cell indices
export function getFreeCells(existingTiles, gridCells) {
  const used = new Set(existingTiles.map((t) => t.cellIndex));
  const free = [];

  for (let i = 0; i < gridCells; i++) {
    if (!used.has(i)) free.push(i);
  }

  return free;
}

// Create a new tile object { id, cellIndex }
export function createTile(existingTiles, gridCells, nextIdRef) {
  const freeCells = getFreeCells(existingTiles, gridCells);
  if (freeCells.length === 0) return null;

  const cellIndex = freeCells[Math.floor(Math.random() * freeCells.length)];
  const id = nextIdRef.current++;

  return { id, cellIndex };
}

// Schedule automatic removal of a tile after its lifetime
export function scheduleTileRemoval(
  tileId,
  tileLifetimeMs,
  setTiles,
  tileTimeoutsRef,
) {
  const timeout = setTimeout(() => {
    setTiles((arr) => arr.filter((t) => t.id !== tileId));
    tileTimeoutsRef.current.delete(tileId);
  }, tileLifetimeMs);

  tileTimeoutsRef.current.set(tileId, timeout);
}
