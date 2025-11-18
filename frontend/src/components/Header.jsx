import React, { useState, useEffect } from "react";
import stars from "../assets/stars.svg";
import account from "../assets/account.svg";
import { useScoreStore } from "../store/scoreStore";
import ProfilePopup from "./ProfilePopup";
import { useNavigate } from "react-router-dom";

const Header = ({ scrollToSection }) => {
  const totalScore = useScoreStore((state) => state.totalScore);
  const fetchTotalScore = useScoreStore((state) => state.fetchTotalScore);
  const [isLoggedIn] = useState(localStorage.getItem("token"));
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      fetchTotalScore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  return (
    <div className="w-full">
      <header className="bg-background-light/80 sticky top-0 z-10 flex items-center justify-between p-4 pb-2">
        <h1 className="text-xl font-bold text-zinc-900 md:text-2xl">Skillo</h1>
        <div className="flex items-center gap-2">
          {!isLoggedIn ? (
            <p
              onClick={() => navigate("/login")}
              className="font-bold text-purple-700"
            >
              Sign in
            </p>
          ) : (
            <div
              onClick={() => scrollToSection()}
              className="flex h-10 items-center gap-2 rounded-full bg-purple-700/10 px-3"
            >
              <img src={stars} alt="stars icon" className="h-5 w-5" />
              <p className="text-sm font-bold text-purple-700">{totalScore}</p>
            </div>
          )}
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-zinc-900">
            <img
              onClick={() => isLoggedIn && setOpen(!open)}
              src={account}
              alt="account"
              className="h-7 w-7"
            />
          </button>
        </div>
      </header>
      {open && <ProfilePopup user={user} score={totalScore} />}
      <hr className="text-purple-950/5" />
    </div>
  );
};

export default Header;
