import React from "react";
import Header from "../components/Header";
import GameCard from "../components/GameCard";
import LeaderBoard from "../components/LeaderBoard";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

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
  const scrollToSection = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleNavigation = (title) => {
    const lower = title.toLowerCase();
    const spaceLessTitle = lower.split(" ").join("-");
    return spaceLessTitle;
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game, index) => (
            <GameCard game={game} handlePlayGame={handlePlayGame} key={index} />
          ))}
        </div>

        <LeaderBoard ref={featuresRef} />
      </main>
    </div>
  );
};

export default Home;
