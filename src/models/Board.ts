import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Bishop } from "./figures/Bishop";
import { Rook } from "./figures/Rook";
import { Figure, FigureNames } from "./figures/Figure";

export class Board {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];
  selectedCell: Cell | null = null;

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

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row: Cell[] = this.cells[i];
      for (let j = 0; j < this.cells.length; j++) {
        const target: Cell = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  getKingCell(kingColor: Colors) {
    for (let i = 0; i < this.cells.length; i++) {
      const row: Cell[] = this.cells[i];
      for (let j = 0; j < this.cells.length; j++) {
        const cell = row[j];
        if (
          cell.figure?.name === FigureNames.KING &&
          cell.figure.color === kingColor
        ) {
          return cell;
        }
      }
    }
  }

  isChess(currentPlayerColor: Colors): boolean {
    const kingCell = this.getKingCell(currentPlayerColor);

    for (let i = 0; i < this.cells.length; i++) {
      const row: Cell[] = this.cells[i];
      for (let j = 0; j < this.cells.length; j++) {
        const target: Cell = row[j];
        if (
          target.figure &&
          kingCell &&
          target.figure.color !== currentPlayerColor &&
          target.figure.canMove(kingCell)
        ) {
          console.log("yep!");

          return true;
        }
      }
    }

    return false;
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
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
