import React from "react";

interface PausedPanelProps {
  setIsPaused: (value: React.SetStateAction<boolean>) => void;
}

const PausedPanel = ({ setIsPaused }: PausedPanelProps) => {
  return (
    <div className="paused" onClick={() => setIsPaused(false)}>
      <h2>Paused</h2>
      <p>Click to continue...</p>
    </div>
  );
};

export default PausedPanel;
