import React from "react";

export default function Tile({ value, onClick }) {
  const isEmpty = value === 0;

  if (isEmpty) {
    return <div className="rounded bg-transparent"></div>;
  }

  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded bg-[#e6f2fa] text-2xl font-bold text-[#00588a] shadow-sm transition-transform active:scale-95 sm:text-3xl md:text-4xl"
    >
      {value}
    </button>
  );
}
