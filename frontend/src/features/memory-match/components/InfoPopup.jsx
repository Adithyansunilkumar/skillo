import React from "react";
import { X } from "lucide-react";

export default function InfoPopup({ onClose }) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="relative w-[90%] max-w-md rounded-3xl border border-[#428a79]/20 bg-white px-8 py-8 text-center shadow-2xl">
        {/* Close Button (top-right) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 transition hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="mb-4 text-2xl font-bold text-[#428a79]">
          ℹ️ How to Play
        </h2>

        {/* Main Text */}
        <p className="mb-6 text-base leading-relaxed text-[#428a79]/80">
          Flip two cards at a time and try to match the pairs. A correct match
          keeps the cards open — an incorrect pair flips back.
        </p>

        <p className="mb-8 text-sm leading-relaxed text-[#428a79]/70">
          Your score improves when you finish the game using{" "}
          <span className="font-semibold text-[#428a79]">fewer moves</span>
          and in a
          <span className="font-semibold text-[#428a79]"> shorter time</span>.
        </p>

        {/* Close Button Bottom */}
        <button
          onClick={onClose}
          className="hover:bg-opacity-90 rounded-full bg-[#428a79] px-8 py-3 font-semibold text-white shadow-md transition-transform active:scale-95"
        >
          Close
        </button>
      </div>
    </div>
  );
}
