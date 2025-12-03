import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DisclaimerPopup from "../components/DisclaimerPopup";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [openDisclaimer, setOpenDisclaimer] = useState(false);

  useEffect(() => {
    setOpenDisclaimer(true); // AUTO POPUP
  }, []);

  return (
    <div className="relative flex h-svh w-full flex-col overflow-x-hidden bg-purple-50 font-sans sm:h-[820px]">
      {/* Modal */}
      <DisclaimerPopup
        open={openDisclaimer}
        onClose={() => setOpenDisclaimer(false)}
      />

      {/* Main container */}
      <div className="relative z-10 flex h-svh flex-col items-center justify-between p-4 sm:h-[700px]">
        <div className="flex w-full max-w-lg flex-col items-center">
          {/* Header */}
          <div className="mt-8 flex h-72 w-full flex-col items-center justify-center gap-7 rounded-xl border border-white/80 bg-white/40 px-4 pb-0 shadow-sm">
            <h1 className="text-center text-4xl font-bold tracking-tight text-black">
              Skillo Games
            </h1>
            <p className="pt-2 text-center text-base text-gray-700">
              Welcome to Skillo — a skill-based gaming platform where you
              compete in fast, fun mini-games to earn points, climb the
              leaderboard, and win rewards.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mt-6 w-full space-y-4">
            <div className="flex items-center gap-4 rounded-xl border border-white/70 bg-white/60 px-4 py-3 shadow-sm">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <span className="material-symbols-outlined text-2xl">
                  emoji_events
                </span>
              </div>
              <div className="flex flex-col">
                <p className="text-base font-medium text-black">Earn Points</p>
                <p className="text-sm text-gray-700">
                  Score points by completing each mini-game with speed and
                  precision.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-white/70 bg-white/60 px-4 py-3 shadow-sm backdrop-blur-lg">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <span className="material-symbols-outlined text-2xl">
                  leaderboard
                </span>
              </div>
              <div className="flex flex-col">
                <p className="text-base font-medium text-black">
                  Live Leaderboard
                </p>
                <p className="text-sm text-gray-700">
                  Rankings update instantly and freeze when the event ends.
                </p>
              </div>
            </div>
          </div>

          {/* Info box */}
          <div className="mt-6 w-full rounded-xl border border-white/60 bg-white/40 p-4 shadow-sm backdrop-blur-lg">
            <p className="text-center text-sm leading-relaxed text-gray-700">
              Consistency matters more than one perfect run. Play multiple
              rounds to build your total score and climb the leaderboard
              steadily.
            </p>
          </div>

          {/* RULES Button */}
          <button
            onClick={() => setOpenDisclaimer(true)}
            className="mt-4 font-medium text-purple-700 underline"
          >
            View Rules
          </button>
        </div>

        {/* Get Started button */}
        <div className="mt-auto mb-8 w-full max-w-lg pt-8">
          <button
            onClick={() => navigate("/home")}
            className="flex h-12 w-full items-center justify-center rounded-lg bg-purple-600 text-base font-bold text-white shadow-lg transition hover:bg-purple-700"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
