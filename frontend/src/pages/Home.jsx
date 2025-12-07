import React, { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import GameCard from "../components/GameCard";
import { useNavigate } from "react-router-dom";
import trophy from "../assets/trophy.svg";
import stars from "../assets/stars.svg";

const API_URL = import.meta.env.VITE_API_URL;

const totalScore = 2000;

const games = [
  {
    title: "Click Challenge",
    desc: "Test your speed and accuracy.",
    icon: "ads_click",
    bg: "bg-[#E0D8F6]",
    color: "text-[#8200db]",
  },
  {
    title: "Math Puzzle Race",
    desc: "Solve math problems against the clock.",
    icon: "calculate",
    bg: "bg-[#F6D8E3]",
    color: "text-[#8A1E4B]",
  },
  {
    title: "15 Puzzle",
    desc: "Slide the tiles to solve the puzzle.",
    icon: "dialpad",
    bg: "bg-[#D8E8F6]",
    color: "text-[#1E578A]",
  },
  {
    title: "Scrambled Words",
    desc: "Unscramble letters to form a word.",
    icon: "shuffle",
    bg: "bg-[#F6F1D8]",
    color: "text-[#8A7A1E]",
  },
  {
    title: "Memory Match",
    desc: "Find all the matching pairs.",
    icon: "memory",
    bg: "bg-[#D8F6F1]",
    color: "text-[#1E8A78]",
  },
];

const Home = () => {
  const featuresRef = useRef();
  const navigate = useNavigate();

  const [topPlayers, setTopPlayers] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);

  useEffect(() => {
    const loadTopPlayers = async () => {
      try {
        const res = await fetch(`${API_URL}/api/leaderboard`);
        const data = await res.json();

        const sorted = data.sort((a, b) => b.totalScore - a.totalScore);

        setAllPlayers(sorted); // keep full list
        setTopPlayers(sorted.slice(0, 3)); // derive top 3
      } catch (error) {
        console.error("Failed to fetch top players:", error);
      }
    };

    loadTopPlayers();
  }, []);

  const scrollToSection = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavigation = (title) => {
    const lower = title.toLowerCase();
    return "/" + lower.split(" ").join("-");
  };

  const handlePlayGame = (title) => {
    navigate(handleNavigation(title));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header totalScore={totalScore} scrollToSection={scrollToSection} />

      <main className="grow space-y-8 p-4">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-zinc-900 md:text-3xl">
            Play For Prizes
          </h2>
          <p className="mt-2 w-9/10 text-center text-zinc-600">
            The more you play, the more points you earn. Top player win cash!
          </p>
        </div>

        {/* Game Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game, index) => (
            <GameCard game={game} handlePlayGame={handlePlayGame} key={index} />
          ))}
        </div>

        {/* ============================
    TOP PLAYERS SECTION
============================ */}

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900">Top Players</h2>

          {allPlayers.length === 0 ? (
            <div className="flex items-center justify-center rounded-lg border border-zinc-200 bg-white py-6 text-zinc-500">
              No players yet.
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3">
                {topPlayers.map((player, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-6 py-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-lg font-bold ${
                          index === 0
                            ? "text-purple-700"
                            : index === 1
                              ? "text-sky-600"
                              : "text-amber-700"
                        }`}
                      >
                        #{index + 1}
                      </span>

                      <p className="font-medium text-zinc-900">
                        {player.username}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-full bg-purple-700/10 px-4 py-2">
                      <img src={stars} alt="star" className="w-5" />
                      <p className="text-sm font-bold text-purple-700">
                        {player.totalScore.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {allPlayers.length > 3 && (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => navigate("/leaderboard")}
                    className="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white shadow-sm"
                  >
                    View more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
