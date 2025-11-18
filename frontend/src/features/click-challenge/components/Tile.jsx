import React from "react";

export default function Tile({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="animate-fade-in h-16 w-16 transform rounded-full bg-purple-500 shadow-md transition active:scale-90"
    >
      <div className="flex h-full w-full items-center justify-center font-semibold text-white select-none">
        +1
      </div>
    </button>
  );
}
