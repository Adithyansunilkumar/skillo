// src/hooks/useClickChallengeLogic.js
import { useCallback, useEffect, useRef, useState } from "react";
import { createTile, scheduleTileRemoval } from "../utils/tileHelpers";
import { useScoreStore } from "../../../store/scoreStore";

const DEFAULT_GRID_CELLS = 18;
const DEFAULT_INITIAL_TIME = 30;
const DEFAULT_TILE_LIFETIME_MS = 600;
const DEFAULT_SPAWN_INTERVAL_MS = 500;
const DEFAULT_MAX_TILES = 4;

export default function useClickChallengeLogic({
  initialTime = DEFAULT_INITIAL_TIME,
  gridCells = DEFAULT_GRID_CELLS,
  tileLifetimeMs = DEFAULT_TILE_LIFETIME_MS,
  spawnIntervalMs = DEFAULT_SPAWN_INTERVAL_MS,
  maxTiles = DEFAULT_MAX_TILES,
} = {}) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [tiles, setTiles] = useState([]); // { id, cellIndex }

  // refs for intervals/timeouts
  const timerIntervalRef = useRef(null);
  const spawnIntervalRef = useRef(null);
  const tileTimeoutsRef = useRef(new Map());
  const nextIdRef = useRef(1);
  const mountedRef = useRef(true);
  const gameStoppedRef = useRef(false);

  const clearAllIntervalsAndTimeouts = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (spawnIntervalRef.current) {
      clearInterval(spawnIntervalRef.current);
      spawnIntervalRef.current = null;
    }
    tileTimeoutsRef.current.forEach((id) => clearTimeout(id));
    tileTimeoutsRef.current.clear();
  }, []);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearAllIntervalsAndTimeouts();
    };
  }, [clearAllIntervalsAndTimeouts]);

  function startTimer() {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;

          stopSpawning();
          // stopGame();

          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function startGame() {
    gameStoppedRef.current = false;

    // reset state
    setScore(0);
    setTimeLeft(initialTime);
    setTiles([]);
    setGameActive(true);

    // start countdown timer
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    startTimer();

    // start spawning
    if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    spawnIntervalRef.current = setInterval(() => {
      setTiles((existing) => {
        if (existing.length >= maxTiles) return existing;

        const newTile = createTile(existing, gridCells, nextIdRef);
        if (!newTile) return existing;

        scheduleTileRemoval(
          newTile.id,
          tileLifetimeMs,
          setTiles,
          tileTimeoutsRef,
        );

        return [...existing, newTile];
      });
    }, spawnIntervalMs);
  }
  function stopSpawning() {
    if (spawnIntervalRef.current) {
      clearInterval(spawnIntervalRef.current);
      spawnIntervalRef.current = null;
    }
    // clear pending tile timeouts
    tileTimeoutsRef.current.forEach((to) => clearTimeout(to));
    tileTimeoutsRef.current.clear();
  }

  const syncScoreToBackend = useScoreStore((state) => state.syncScoreToBackend);

  const addToTotalScore = useScoreStore((state) => state.addToTotalScore);

  const stopGame = useCallback(async () => {
    if (gameStoppedRef.current) return;
    gameStoppedRef.current = true;

    setGameActive(false);
    setTimeLeft(0);
    clearAllIntervalsAndTimeouts();
    setTiles([]);

    const points = score;

    try {
      addToTotalScore(points);
      await syncScoreToBackend(points);
      console.log("Score synced successfully");
    } catch (err) {
      console.error("Failed syncing score:", err);
    }
  }, [
    score,
    addToTotalScore,
    syncScoreToBackend,
    clearAllIntervalsAndTimeouts,
  ]);

  useEffect(() => {
    if (timeLeft === 0 && gameActive) {
      const id = setTimeout(() => {
        if (mountedRef.current) stopGame();
      }, 0);

      return () => clearTimeout(id);
    }
  }, [timeLeft, gameActive, stopGame]);

  function handleTileClick(tileId) {
    // increment score and remove tile + cancel its timeout
    setScore((s) => s + 1);
    setTiles((arr) => arr.filter((t) => t.id !== tileId));

    const to = tileTimeoutsRef.current.get(tileId);
    if (to) {
      clearTimeout(to);
      tileTimeoutsRef.current.delete(tileId);
    }
  }

  return {
    timeLeft,
    score,
    gameActive,
    tiles,
    startGame,
    stopGame,
    handleTileClick,
    // constants so components can render grid
    gridCells,
  };
}
