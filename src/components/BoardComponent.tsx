import React, { FC, useEffect, useState } from "react";
import { Board } from "./../models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "./../models/Cell";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";
import PlayerColor from "./UI/PlayerColor";
interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  swapPlayer: () => void;
  currentPlayer: Player | null;
}

const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  swapPlayer,
  currentPlayer,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(
    board.selectedCell
  );

  function click(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);

      console.log(
        board.isChess(
          currentPlayer?.color === Colors.BLACK ? Colors.WHITE : Colors.BLACK
        )
      );
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
    highlightCells();
  }, [selectedCell]);

  useEffect(() => {}, [currentPlayer]);

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div>
      <h3 className="currentPlayer">
        <span>
          Current Player: {currentPlayer?.name || currentPlayer?.color}
        </span>
        <PlayerColor color={currentPlayer!.color} />
      </h3>
      <div className="board-container">
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
