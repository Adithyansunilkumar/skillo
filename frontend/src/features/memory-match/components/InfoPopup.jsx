import React from "react";
import { X } from "lucide-react";

export default function InfoPopup({ onClose }) {
  return (
    <div className="absolute top-16 left-1/2 w-[250px] -translate-x-1/2 rounded-xl bg-white p-4 shadow-xl border border-gray-200 z-50">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-sm font-semibold text-[#428a79]">How to Play</h3>
        <button onClick={onClose}>
          <X size={16} className="text-gray-600" />
        </button>
      </div>

      <p classname="text-[13px] text-gray-700 leading-snug">
        Flip two cards at a time and try to match the pairs.  
        Fewer moves and faster time = higher score.
      </p>
    </div>
  );
}
