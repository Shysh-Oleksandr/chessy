import React from "react";
import { Colors } from "../models/Colors";
import PlayerColor from "./UI/PlayerColor";

interface PlayerInfoProps {
  playerNameRef: React.RefObject<HTMLInputElement>;
  playerTimeRef: React.RefObject<HTMLInputElement>;
  whitePlayer: boolean;
}

const PlayerInfo = ({
  playerNameRef,
  playerTimeRef,
  whitePlayer,
}: PlayerInfoProps) => {
  function getPlayerNumber() {
    return whitePlayer ? 1 : 2;
  }
  return (
    <div className="players__item">
      <label
        htmlFor={`player${getPlayerNumber()}-name`}
        className="players__label players__name"
      >
        Player {getPlayerNumber()}
        <PlayerColor color={Colors.WHITE} />
      </label>
      <input
        ref={playerNameRef}
        id={`player${getPlayerNumber()}-name`}
        placeholder="Name"
        type="text"
      />
      <div className="players__time-container">
        <label
          htmlFor={`player${getPlayerNumber()}-time`}
          className="players__label players__time-label"
        >
          Time:
        </label>
        <input
          ref={playerTimeRef}
          id={`player${getPlayerNumber()}-time`}
          className="players__time"
          defaultValue={300}
          type="number"
        />
      </div>
    </div>
  );
};

export default PlayerInfo;
