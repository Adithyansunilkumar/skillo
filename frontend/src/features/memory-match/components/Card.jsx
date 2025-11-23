import React from "react";

const icons = [
  "favorite",
  "star",
  "bolt",
  "face",
  "ac_unit",
  "pets",
  "water_drop",
  "eco",
];

const Card = ({ card, isFlipped, isMatched, onClick }) => {
  const iconIndex = parseInt(card.pairId.replace("P", "")) - 1;
  const icon = icons[iconIndex % icons.length];

  return (
    <div
      onClick={onClick}
      className={`flex w-14 aspect-[3/3.2] transform-gpu cursor-pointer items-center justify-center rounded-lg transition-all duration-300 ease-out ${
        isMatched
          ? "scale-75 border-2 border-[#428a79] bg-[#428a79] text-white opacity-70"
          : isFlipped
            ? "rotate-y-180 bg-[#428a79] text-white shadow-md"
            : "bg-[#d8f6f1] hover:-translate-y-0.5 hover:shadow-md"
      } `}
      style={{
        transition: "transform 0.35s ease, box-shadow 0.3s ease",
      }}
    >
      {(isFlipped || isMatched) && (
        <span className="material-symbols-outlined text-3xl! opacity-100 transition-opacity duration-300">
          {icon}
        </span>
      )}
    </div>
  );
};

export default Card;
