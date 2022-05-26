import { Colors } from "../Colors";
import logo from "../../assets/black-king.png";
import { Cell } from "./../Cell";

export enum FigureNames {
  FIGURE = "Figure",
  KING = "King",
  KNIGHT = "Knight",
  PAWN = "Pawn",
  QUEEN = "Queen",
  ROOK = "Rook",
  BISHOP = "Bishop",
}

export class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: FigureNames;
  id: number;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.logo = null;
    this.cell = cell;
    this.cell.figure = this;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
  }

  canMove(target: Cell): boolean {
    if (
      target.figure?.color === this.color ||
      target.figure?.name === FigureNames.KING
    )
      return false;

    return true;
  }

  moveFigure(target: Cell) {}
}
