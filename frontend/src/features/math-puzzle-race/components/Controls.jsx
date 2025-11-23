import React from "react";

const Controls = ({ onStart, onReset, hasStarted }) => {
  return (
    <div className="mt-6 flex gap-4">

      {/* Show START only before game starts */}
      {!hasStarted && (
        <button
          onClick={onStart}
          className="rounded-lg bg-[#c76172] px-12 py-3 font-medium text-red-50 shadow-sm transition"
        >
          Start
        </button>
      )}

      {/* Show QUIT only after game starts */}
      {hasStarted && (
        <button
          onClick={onReset}
          className="rounded-lg bg-[#c76172] px-12 py-3 font-medium text-red-50 shadow-sm transition"
        >
          Quit
        </button>
      )}

    </div>
  );
};

export default Controls;
