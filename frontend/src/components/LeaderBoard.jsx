import React from "react";
import trophy from "../assets/trophy.svg";
import stars from "../assets/stars.svg";
import { forwardRef } from "react";

const players = [
  { name: "Alex", points: "15,200" },
  { name: "Jordan", points: "9,850" },
  { name: "Casey", points: "12,100" },
];

const LeaderBoard = forwardRef((props, ref) => {
  const sortedPlayers = players.sort((a, b) => {
    const numA = Number(a.points.replace(/,/g, ""));
    const numB = Number(b.points.replace(/,/g, ""));
    return numB - numA;
  });

  return (
    <div ref={ref} className="space-y-4">
      <h2 className="text-xl font-bold text-zinc-900">Top Players</h2>
      <div className="flex flex-col gap-3">
        {sortedPlayers.map((score, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-lg bg-white px-6 py-4 shadow-sm"
          >
            <img src={trophy} alt="trophy" />
            <div className="grow">
              <p className="font-semibold text-zinc-900">{score.name}</p>
            </div>
            <div className="flex h-10 w-30 items-center justify-center gap-1.5 rounded-3xl bg-purple-700/10">
              <img src={stars} alt="stars" className="w-5" />
              <p className="rounded-3xl text-sm font-bold text-purple-700">
                {score.points}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default LeaderBoard;
