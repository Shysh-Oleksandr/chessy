import React, { FC, useEffect, useState } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";
import { Board } from "./../models/Board";
import { Cell } from "./../models/Cell";
import { getReverseColor } from "./../utils/functions";
import BoardNumeration from "./BoardNumeration";
import CellComponent from "./CellComponent";
import GameStatus from "./GameStatus";
import PausedPanel from "./PausedPanel";
import VictoryPanel from "./VictoryPanel";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  swapPlayer: () => void;
  currentPlayer: Player | null;
  whitePlayer: Player | null;
  blackPlayer: Player | null;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  isWon: boolean;
  setIsWon: React.Dispatch<React.SetStateAction<boolean>>;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  swapPlayer,
  currentPlayer,
  whitePlayer,
  blackPlayer,
  isPaused,
  isWon,
  setIsPaused,
  setIsWon,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(
    board.selectedCell
  );
  const [isCheck, setIsCheck] = useState(false);
  const [isCheckmate, setIsCheckmate] = useState(false);

  // Checking the check. :)
  function checkCheck(): boolean {
    const kingsColor = getReverseColor(currentPlayer?.color!);
    const isKingUnderAttack = board.isKingUnderAttack(kingsColor);
    setIsCheck(isKingUnderAttack);

    // If check, check checkmate.
    if (isKingUnderAttack) {
      const isCheckmate = board.isCheckmate(kingsColor);
      setIsCheckmate(isCheckmate);
      setIsWon(isCheckmate);
      isCheckmate && setIsPaused(true);
    }

    return isKingUnderAttack;
  }

  function click(cell: Cell): void {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell) &&
      cell.available
    ) {
      selectedCell.moveFigure(cell);

      swapPlayer();
      checkCheck();
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

  // Everytime we select a cell, show possible moves.
  useEffect(() => {
    board.selectedCell = selectedCell;
    highlightCells();
  }, [selectedCell]);

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  function getWinnerName(): string | undefined {
    const winner =
      currentPlayer?.color === Colors.BLACK ? whitePlayer : blackPlayer;

    return winner?.name || winner?.color.toString();
  }

  function pauseGame() {
    !isWon && setIsPaused(!isPaused);
  }

  return (
    <div>
      <GameStatus
        currentPlayer={currentPlayer}
        isCheck={isCheck}
        isCheckmate={isCheckmate}
        isPaused={isPaused}
        pauseGame={pauseGame}
      />

      <div className="board-container">
        {isWon && (
          <VictoryPanel
            getWinnerName={getWinnerName}
            isCheckmate={isCheckmate}
          />
        )}
        {isPaused && !isWon && <PausedPanel setIsPaused={setIsPaused} />}

        <div className="board">
          {board.cells.map((row, index) => {
            return (
              <React.Fragment key={index}>
                {row.map((cell) => (
                  <CellComponent
                    isCheck={isCheck}
                    currentPlayerColor={currentPlayer?.color!}
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
        <BoardNumeration isNumbers={true} />
        <BoardNumeration isNumbers={false} />
      </div>
    </div>
  );
};
export default BoardComponent;
