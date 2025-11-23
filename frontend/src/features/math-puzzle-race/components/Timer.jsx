import React from "react";

const Timer = ({ timeLeft }) => {
  return (
    <div>
      <strong>Time:</strong> {timeLeft}s
    </div>
  );
};

export default Timer;
