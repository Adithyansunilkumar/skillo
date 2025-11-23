import React from "react";

const AnswerInput = ({ options, onSubmit }) => {
  return (
    <div className="mb-4 flex w-full flex-col gap-3">
      {options.map((opt, idx) => (
        <button
          key={idx}
          onClick={(e) => {
            e.preventDefault(); // stop browser active highlight
            e.currentTarget.blur(); // remove focus highlight
            onSubmit(opt);
          }}
          className="h-12 w-full appearance-none rounded-xl bg-[#dd8896] text-lg font-semibold text-white shadow-sm transition focus:ring-0 focus:outline-none active:bg-[#FCE7EC] active:ring-0 active:outline-none"
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default AnswerInput;
