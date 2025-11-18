import React from "react";
import Home from "./pages/Home";
import ClickChallenge from "./features/click-challenge/index";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-background-light font-display min-h-screen text-[#140d1b] select-none">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/click-challenge"
          element={
            <ProtectedRoute>
              <ClickChallenge onGoHome={() => navigate("/")} />
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
