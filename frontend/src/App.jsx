import React from "react";
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ClickChallenge from "./features/click-challenge/index";
import MemoryMatch from "./features/memory-match/index";
import ProtectedRoute from "./components/ProtectedRoute";
import MathPuzzleRace from "./features/math-puzzle-race";
import FifteenPuzzle from "./features/fifteen-puzzle";
import ScrambledWordsGame from "./features/scrambled-words/components/ScrambledWordsGame";
import Leaderboard from "./pages/Leaderboard";
import SplashScreen from "./pages/SplashScreen";

const App = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-background-light font-display h-svh text-[#140d1b] select-none">
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route
          path="/click-challenge"
          element={
            <ProtectedRoute>
              <ClickChallenge onGoHome={() => navigate("/home")} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/memory-match"
          element={
            <ProtectedRoute>
              <MemoryMatch onGoHome={() => navigate("/home")} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/math-puzzle-race"
          element={
            <ProtectedRoute>
              <MathPuzzleRace onGoHome={() => navigate("/home")} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/15-puzzle"
          element={
            <ProtectedRoute>
              <FifteenPuzzle onGoHome={() => navigate("/home")} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scrambled-words"
          element={
            <ProtectedRoute>
              <ScrambledWordsGame onGoHome={() => navigate("/home")} />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
