import React, { RefObject, useEffect, useRef, useState } from "react";
import BoardComponent from "./components/BoardComponent";
import "./App.scss";
import { Board } from "./models/Board";
import { Player } from "./models/Player";
import { Colors } from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

const App = () => {
  const [board, setBoard] = useState<Board>(new Board());
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  const whitePlayerTimeRef = useRef() as RefObject<HTMLInputElement>;
  const blackPlayerTimeRef = useRef() as RefObject<HTMLInputElement>;
  const whitePlayerNameRef = useRef() as RefObject<HTMLInputElement>;
  const blackPlayerNameRef = useRef() as RefObject<HTMLInputElement>;

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  function swapPlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsGameStarted(true);
    setWhitePlayer((prev) => {
      prev.time = Number(whitePlayerTimeRef.current?.value);
      prev.name = whitePlayerNameRef.current?.value || null;
      return prev;
    });
    setBlackPlayer((prev) => {
      prev.time = Number(blackPlayerTimeRef.current?.value);
      prev.name = blackPlayerNameRef.current?.value || null;
      return prev;
    });
  }

  if (isGameStarted)
    return (
      <div className="app">
        <Timer
          whitePlayer={whitePlayer}
          blackPlayer={blackPlayer}
          currentPlayer={currentPlayer}
          restart={restart}
        />
        <BoardComponent
          board={board}
          setBoard={setBoard}
          swapPlayer={swapPlayer}
          currentPlayer={currentPlayer}
        />
        <div>
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
    );

  return (
    <div className="app">
      <div className="welcome-screen">
        <h1 className="game-title">Welcome to Chessy</h1>
        <form className="timer-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="players">
            <div className="players__item">
              <label
                htmlFor="player1-timer"
                className="players__label players__name"
              >
                Player 1
              </label>
              <input
                ref={whitePlayerNameRef}
                id="player1-timer"
                placeholder="Name"
                type="text"
              />
              <div className="players__time-container">
                <label
                  htmlFor="player1-time"
                  className="players__label players__time-label"
                >
                  Time:
                </label>
                <input
                  ref={whitePlayerTimeRef}
                  id="player1-time"
                  className="players__time"
                  defaultValue={300}
                  type="number"
                />
              </div>
            </div>
            <div className="players__item">
              <label
                htmlFor="player2-timer"
                className="players__label players__name"
              >
                Player 2
              </label>
              <input
                ref={blackPlayerNameRef}
                id="player2-timer"
                placeholder="Name"
                type="text"
              />
              <div className="players__time-container">
                <label
                  htmlFor="player2-time"
                  className="players__label players__time-label"
                >
                  Time:
                </label>
                <input
                  ref={blackPlayerTimeRef}
                  id="player2-time"
                  className="players__time"
                  defaultValue={300}
                  type="number"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="start-btn">
            Start
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
