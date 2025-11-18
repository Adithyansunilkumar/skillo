import React from "react";

const GameCard = ({ game, handlePlayGame }) => {
  return (
    <div className="flex flex-col rounded-lg bg-white shadow-sm transition-shadow duration-300 sm:hover:shadow-lg">
      <div
        className={`flex aspect-video w-full items-center justify-center rounded-t-lg ${game.bg}`}
      >
        <span className={`material-symbols-outlined text-6xl ${game.color}`}>
          {game.icon}
        </span>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <p className="text-lg font-bold text-zinc-900">{game.title}</p>
        <div className="flex items-end justify-between gap-3">
          <p className="flex-1 text-sm text-zinc-500">{game.desc}</p>
          <button
            onClick={() => handlePlayGame(game.title)}
            className="h-9 cursor-pointer rounded-full bg-violet-700/70 px-5 text-sm font-medium text-white transition-colors hover:bg-violet-700/90"
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
