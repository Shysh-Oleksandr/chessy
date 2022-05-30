import React from "react";
import PlayerColor from "./UI/PlayerColor";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlinePause } from "react-icons/ai";
import { Player } from "../models/Player";

interface GameStatusProps {
  currentPlayer: Player | null;
  isCheck: boolean;
  isCheckmate: boolean;
  isPaused: boolean;
  pauseGame: () => void;
}

const GameStatus = ({
  currentPlayer,
  isCheck,
  isCheckmate,
  isPaused,
  pauseGame,
}: GameStatusProps) => {
  return (
    <div className="game-status">
      <h3 className="currentPlayer">
        <span>
          Current Player: {currentPlayer?.name || currentPlayer?.color}
        </span>
        <PlayerColor color={currentPlayer!.color} />
      </h3>
      {isCheck && (
        <h3 className="check-label">{isCheckmate ? "Checkmate!" : "Check!"}</h3>
      )}
      <button className="pause-btn" onClick={pauseGame}>
        {isPaused ? <BsFillPlayFill /> : <AiOutlinePause />}
      </button>
    </div>
  );
};

export default GameStatus;
