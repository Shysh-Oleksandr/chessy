import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Bishop } from "./figures/Bishop";
import { Rook } from "./figures/Rook";
import { Figure, FigureNames } from "./figures/Figure";
import { Player } from "./Player";
import { getReverseColor } from "../utils/functions";

export class Board {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];
  selectedCell: Cell | null = null;
  name: string = "first board";

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null));
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null));
        }
      }
      this.cells.push(row);
    }
  }

  // Find all posible cells to move from the selected cell.
  // Returns number of possible cells.
  public highlightCells(selectedCell: Cell | null) {
    let possibleCells = 0;
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells.length; j++) {
        const target: Cell = this.cells[i][j];

        // Check if a figure can move to the target cell.
        if (selectedCell?.figure?.canMove(target)) {
          // Move to it and if it has a figure, get it, else get null.
          const figureToReturn = selectedCell.moveFigure(target, true);

          // Check whether it is the check.
          if (this.isKingUnderAttack(target.figure!.color)) {
            // Then figure cannot move to this cell.
            target.available = false;
          } else {
            // Otherwise, it can.
            possibleCells++;
            target.available = true;
          }
          // Move a figure back to initial position and if there was a figure eaten, return it back.
          target.moveFigure(selectedCell, true, figureToReturn);
        } else {
          target.available = false;
        }
      }
    }
    return possibleCells;
  }

  getKingCell(kingColor: Colors) {
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells.length; j++) {
        const cell = this.cells[i][j];
        if (
          cell.figure?.name === FigureNames.KING &&
          cell.figure.color === kingColor
        ) {
          return cell;
        }
      }
    }
  }

  isKingUnderAttack(currentPlayerColor: Colors): boolean {
    const kingCell = this.getKingCell(currentPlayerColor);

    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells.length; j++) {
        const target: Cell = this.cells[i][j];
        // If any figure can move to king's cell, then it's the check.
        if (
          kingCell &&
          target.figure &&
          target.figure.color !== currentPlayerColor &&
          target.figure.canMove(kingCell)
        ) {
          return true;
        }
      }
    }

    return false;
  }

  areTherePossibleMoves(currentPlayerColor: Colors): boolean {
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells.length; j++) {
        const target: Cell = this.cells[i][j];
        // If any figure can move to king's cell, then it's the check.
        if (
          target.figure &&
          target.figure.color !== currentPlayerColor &&
          this.highlightCells(target) > 0
        )
          return true;
      }
    }
    return false;
  }

  public isCheckmate(currentPlayerColor: Colors) {
    if (
      this.isKingUnderAttack(currentPlayerColor) &&
      !this.areTherePossibleMoves(getReverseColor(currentPlayerColor))
    ) {
      console.log("Checkmate!");
      return true;
    }
    return false;
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    const newSelectedCell = this.selectedCell;
    if (newSelectedCell) {
      newSelectedCell.board = newBoard;
      newBoard.selectedCell = newSelectedCell;
    }
    return newBoard;
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  private addKings() {
    new King(Colors.BLACK, this.getCell(4, 0));
    new King(Colors.WHITE, this.getCell(4, 7));
  }

  private addKnights() {
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.BLACK, this.getCell(6, 0));
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.WHITE, this.getCell(6, 7));
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1));
      new Pawn(Colors.WHITE, this.getCell(i, 6));
    }
  }

  private addQueens() {
    new Queen(Colors.BLACK, this.getCell(3, 0));
    new Queen(Colors.WHITE, this.getCell(3, 7));
  }

  private addRooks() {
    new Rook(Colors.BLACK, this.getCell(0, 0));
    new Rook(Colors.BLACK, this.getCell(7, 0));
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.WHITE, this.getCell(7, 7));
  }

  private addBishops() {
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
  }

  public addFigures() {
    this.addKings();
    this.addKnights();
    this.addPawns();
    this.addQueens();
    this.addRooks();
    this.addBishops();
  }
}
