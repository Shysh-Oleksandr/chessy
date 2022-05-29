import React, { FC, useEffect, useState } from "react";
import { Board } from "./../models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "./../models/Cell";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";
import PlayerColor from "./UI/PlayerColor";
import { getReverseColor } from "./../utils/functions";
import { AiOutlinePause } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  swapPlayer: () => void;
  currentPlayer: Player | null;
  whitePlayer: Player | null;
  blackPlayer: Player | null;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  swapPlayer,
  currentPlayer,
  whitePlayer,
  blackPlayer,
  isPaused,
  setIsPaused,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(
    board.selectedCell
  );
  const [isCheck, setIsCheck] = useState(false);
  const [isCheckmate, setIsCheckmate] = useState(false);
  const [isWon, setIsWon] = useState<boolean>(false);

  function checkChess() {
    const currentColor = getReverseColor(currentPlayer?.color!);
    const isKingUnderAttack = board.isKingUnderAttack(currentColor);
    setIsCheck(isKingUnderAttack);
    if (isKingUnderAttack) {
      const isCheckmate = board.isCheckmate(currentColor);
      console.log(isCheckmate);
      setIsCheckmate(isCheckmate);
      setIsWon(isCheckmate);
    }

    return isKingUnderAttack;
  }

  function click(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);

      console.log(checkChess());
      swapPlayer();
      setSelectedCell(null);
    } else if (
      selectedCell !== cell &&
      cell.figure?.color === currentPlayer?.color
    ) {
      setSelectedCell(cell);
    } else {
      setSelectedCell(null);
    }
  }

  useEffect(() => {
    board.selectedCell = selectedCell;
    highlightCells();
  }, [selectedCell]);

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function pauseGame() {}

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  function getWinnerName() {
    const winner =
      currentPlayer?.color === Colors.BLACK ? whitePlayer : blackPlayer;

    return winner?.name || winner?.color.toString();
  }

  return (
    <div>
      <div className="game-status">
        <h3 className="currentPlayer">
          <span>
            Current Player: {currentPlayer?.name || currentPlayer?.color}
          </span>
          <PlayerColor color={currentPlayer!.color} />
        </h3>
        {isCheck && (
          <h3 className="check-label">
            {isCheckmate ? "Checkmate!" : "Check!"}
          </h3>
        )}
        <button className="pause-btn" onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? <BsFillPlayFill /> : <AiOutlinePause />}
        </button>
      </div>

      <div className="board-container">
        {isWon && (
          <div className="victory">
            <h3 className="victory__player">
              <span>{getWinnerName()}</span> won!
            </h3>
            <h2 className="victory__reason">{isCheckmate && "Checkmate!"}</h2>
          </div>
        )}
        {isPaused && (
          <div className="paused" onClick={() => setIsPaused(false)}>
            <h2>Paused</h2>
            <p>Click to continue...</p>
          </div>
        )}
        <ul className="numbers-line">
          {letters.map((letter, index) => {
            return (
              <li key={letter + index} className="numbers-line__item">
                {index + 1}
              </li>
            );
          })}
        </ul>
        <div className="board">
          {board.cells.map((row, index) => {
            return (
              <React.Fragment key={index}>
                {row.map((cell) => (
                  <CellComponent
                    selected={
                      cell.x === selectedCell?.x && cell.y === selectedCell?.y
                    }
                    cell={cell}
                    key={cell.id}
                    click={click}
                  />
                ))}
              </React.Fragment>
            );
          })}
        </div>
        <ul className="letters-line">
          {letters.map((letter, index) => {
            return (
              <li key={letter + index} className="letters-line__item">
                {letter}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default BoardComponent;
