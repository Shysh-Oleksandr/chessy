import React from "react";
import { Colors } from "../../models/Colors";

interface PlayerColorInterface {
  color: Colors;
}

const PlayerColor = ({ color }: PlayerColorInterface) => {
  return (
    <span
      style={{
        backgroundColor: color === Colors.WHITE ? "#fff" : "#000",
      }}
      className="currentPlayer__color"
    ></span>
  );
};

export default PlayerColor;
