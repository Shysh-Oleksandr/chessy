import React from "react";

interface VictoryPanelProps {
  getWinnerName: () => string | undefined;
  isCheckmate: boolean;
}

const VictoryPanel = ({ getWinnerName, isCheckmate }: VictoryPanelProps) => {
  return (
    <div className="victory">
      <h3 className="victory__player">
        <span>{getWinnerName()}</span> won!
      </h3>
      <h2 className="victory__reason">
        {isCheckmate ? "Checkmate!" : "Out of time!"}
      </h2>
    </div>
  );
};

export default VictoryPanel;
