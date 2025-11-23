import React from "react";

export default function DevWinButton() {
  const triggerWin = () => {
    document.dispatchEvent(
      new CustomEvent("dev-win", {
        detail: { score: 100, finalTime: "00:10" },
      }),
    );
  };

  return (
    <button
      onClick={triggerWin}
      className="mt-3 rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-black shadow hover:bg-red-600"
    >
      Dev: Instant Win
    </button>
  );
}
