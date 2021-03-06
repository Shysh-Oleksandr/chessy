import React, { useCallback, useEffect, useRef, useState } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";

interface TimerComponentProps {
  currentPlayer: Player | null;
  whitePlayer: Player | null;
  blackPlayer: Player | null;
  restart: () => void;
  isPaused: boolean;
  isWon: boolean;
  setIsWon: React.Dispatch<React.SetStateAction<boolean>>;
  setIsResign: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const TimerComponent = ({
  currentPlayer,
  restart,
  whitePlayer,
  blackPlayer,
  setIsGameStarted,
  isPaused,
  setIsWon,
  setIsResign,
  isWon,
}: TimerComponentProps) => {
  const [whiteTime, setWhiteTime] = useState<number>(whitePlayer?.time || 300);
  const [blackTime, setBlackTime] = useState<number>(blackPlayer?.time || 300);

  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  const startTimer = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTimer
        : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }, [currentPlayer?.color]);

  useEffect(() => {
    startTimer();
  }, [currentPlayer, startTimer]);

  useEffect(() => {
    if (timer.current) {
      isPaused || isWon ? clearInterval(timer.current) : startTimer();
    }
  }, [isPaused, startTimer, isWon]);

  useEffect(() => {
    if (whiteTime <= 0 || blackTime <= 0) {
      setIsWon(true);
      timer.current && clearInterval(timer.current);
    }
  }, [whiteTime, blackTime, setIsWon]);

  function decrementBlackTimer() {
    setBlackTime((prev) => prev - 1);
  }

  function decrementWhiteTimer() {
    setWhiteTime((prev) => prev - 1);
  }

  function handleRestart() {
    setWhiteTime(whitePlayer?.time || 300);
    setBlackTime(blackPlayer?.time || 300);
    restart();
  }

  return (
    <div className="timerPanel">
      <button onClick={() => setIsGameStarted(false)}>Back to menu</button>
      <button onClick={handleRestart}>Restart Game</button>
      <button
        onClick={() => {
          setIsResign(true);
          setIsWon(true);
        }}
      >
        Resign
      </button>
      <h2>Black - {blackTime}</h2>
      <h2>White - {whiteTime}</h2>
    </div>
  );
};

export default TimerComponent;
