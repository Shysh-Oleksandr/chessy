import React, { useEffect, useState } from "react";
import "./App.scss";
import BoardComponent from "./components/BoardComponent";
import LostFigures from "./components/LostFigures";
import TimerComponent from "./components/TimerComponent";
import WelcomeComponent from "./components/WelcomeComponent";
import { Board } from "./models/Board";
import { Colors } from "./models/Colors";
import { Player } from "./models/Player";

const App = () => {
  const [board, setBoard] = useState<Board>(new Board());
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [isResign, setIsResign] = useState<boolean>(false);

  useEffect(() => {
    restart();
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    newBoard.selectedCell = null;
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
    setIsWon(false);
    setIsPaused(false);
    setIsResign(false);
  }

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }

  if (isGameStarted)
    return (
      <div className="app">
        <div className="wrapper">
          <TimerComponent
            setIsGameStarted={setIsGameStarted}
            whitePlayer={whitePlayer}
            blackPlayer={blackPlayer}
            currentPlayer={currentPlayer}
            restart={restart}
            isPaused={isPaused}
            setIsWon={setIsWon}
            setIsResign={setIsResign}
            isWon={isWon}
          />
          <BoardComponent
            board={board}
            setBoard={setBoard}
            swapPlayer={swapPlayer}
            currentPlayer={currentPlayer}
            whitePlayer={whitePlayer}
            blackPlayer={blackPlayer}
            isPaused={isPaused}
            isWon={isWon}
            isResign={isResign}
            setIsPaused={setIsPaused}
            setIsWon={setIsWon}
          />
          <div className="lost__container">
            <LostFigures
              title="Black Figures: "
              figures={board.lostBlackFigures}
            />
            <LostFigures
              title="White Figures: "
              figures={board.lostWhiteFigures}
            />
          </div>
        </div>
      </div>
    );

  return (
    <div className="app app-welcome">
      <WelcomeComponent
        setBlackPlayer={setBlackPlayer}
        setWhitePlayer={setWhitePlayer}
        setIsGameStarted={setIsGameStarted}
        restart={restart}
      />
    </div>
  );
};

export default App;
