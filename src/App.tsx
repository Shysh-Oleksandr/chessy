import React, { RefObject, useEffect, useRef, useState } from "react";
import BoardComponent from "./components/BoardComponent";
import "./App.scss";
import { Board } from "./models/Board";
import { Player } from "./models/Player";
import { Colors } from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";
import PlayerColor from "./components/UI/PlayerColor";

const App = () => {
  const [board, setBoard] = useState<Board>(new Board());
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const whitePlayerTimeRef = useRef() as RefObject<HTMLInputElement>;
  const blackPlayerTimeRef = useRef() as RefObject<HTMLInputElement>;
  const whitePlayerNameRef = useRef() as RefObject<HTMLInputElement>;
  const blackPlayerNameRef = useRef() as RefObject<HTMLInputElement>;

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

  if (isGameStarted)
    return (
      <div className="app">
        <Timer
          setIsGameStarted={setIsGameStarted}
          whitePlayer={whitePlayer}
          blackPlayer={blackPlayer}
          currentPlayer={currentPlayer}
          restart={restart}
          isPaused={isPaused}
        />
        <BoardComponent
          board={board}
          setBoard={setBoard}
          swapPlayer={swapPlayer}
          currentPlayer={currentPlayer}
          whitePlayer={whitePlayer}
          blackPlayer={blackPlayer}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
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
                <PlayerColor color={Colors.WHITE} />
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
                Player 2 <PlayerColor color={Colors.BLACK} />
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
