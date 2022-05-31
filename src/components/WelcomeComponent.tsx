import React, { RefObject, useRef } from "react";
import { Player } from "../models/Player";
import PlayerInfo from "./PlayerInfo";

interface WelcomeComponentProps {
  setBlackPlayer: React.Dispatch<React.SetStateAction<Player>>;
  setWhitePlayer: React.Dispatch<React.SetStateAction<Player>>;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  restart: () => void;
}

const WelcomeComponent = ({
  setBlackPlayer,
  setWhitePlayer,
  setIsGameStarted,
  restart,
}: WelcomeComponentProps) => {
  const whitePlayerTimeRef = useRef() as RefObject<HTMLInputElement>;
  const blackPlayerTimeRef = useRef() as RefObject<HTMLInputElement>;
  const whitePlayerNameRef = useRef() as RefObject<HTMLInputElement>;
  const blackPlayerNameRef = useRef() as RefObject<HTMLInputElement>;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsGameStarted(true);
    restart();
    setWhitePlayer((prev) => {
      let whiteTime = Number(whitePlayerTimeRef.current?.value);
      prev.time = whiteTime > 10 ? whiteTime : 10;
      prev.name = whitePlayerNameRef.current?.value || null;
      return prev;
    });
    setBlackPlayer((prev) => {
      let blackTime = Number(blackPlayerTimeRef.current?.value);
      prev.time = blackTime > 10 ? blackTime : 10;
      prev.name = blackPlayerNameRef.current?.value || null;
      return prev;
    });
  }
  return (
    <div className="welcome-screen">
      <h1 className="game-title">Welcome to Chessy</h1>
      <form className="timer-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="players">
          <PlayerInfo
            whitePlayer={true}
            playerNameRef={whitePlayerNameRef}
            playerTimeRef={whitePlayerTimeRef}
          />
          <PlayerInfo
            whitePlayer={false}
            playerNameRef={blackPlayerNameRef}
            playerTimeRef={blackPlayerTimeRef}
          />
        </div>
        <button type="submit" className="start-btn">
          Start
        </button>
      </form>
    </div>
  );
};

export default WelcomeComponent;
