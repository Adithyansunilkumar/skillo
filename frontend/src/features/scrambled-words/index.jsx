import React from "react";
import ScrambledWordsGame from "./components/ScrambledWordsGame";

export default function ScrambledWordsFeature() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background-light p-4">
      <ScrambledWordsGame />
    </div>
  );
}
