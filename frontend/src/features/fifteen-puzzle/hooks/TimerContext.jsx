import React from "react";
import { createContext, useContext, useEffect, useState } from "react";

const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const resetTimer = () => setTime(0);

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <TimerContext.Provider
      value={{ time: `${minutes}:${seconds}`, resetTimer }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  return useContext(TimerContext);
}
