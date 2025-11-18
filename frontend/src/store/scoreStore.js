import { create } from "zustand";
import {
  getTotalScore,
  updateTotalScore,
} from "../features/click-challenge/services/scoreService";

export const useScoreStore = create((set, get) => ({
  totalScore: 0,
  loading: false,
  error: null,

  // --- Fetch total score from backend ---
  fetchTotalScore: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    set({ loading: true });
    try {
      const res = await getTotalScore(token); // expects { totalScore }
      set({ totalScore: res.totalScore, loading: false, error: null });
    } catch (err) {
      set({ loading: false, error: err.message });
    }
  },

  // --- Local-only score increment (UI update only) ---
  addToTotalScore: (points) => {
    const current = get().totalScore;
    set({ totalScore: current + points });
  },

  // --- Sync score to backend (called from stopGame) ---
  syncScoreToBackend: async (points) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await updateTotalScore(points, token);
      set({ totalScore: res.totalScore });
    } catch (err) {
      console.log("Error syncing score:", err.message);
    }
  },

  // --- Reset score locally (useful for logout) ---
  resetTotalScore: () => {
    set({ totalScore: 0 });
  },
}));
