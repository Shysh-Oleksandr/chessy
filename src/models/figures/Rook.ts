import { Figure, FigureNames } from "./Figure";

import blackLogo from "../../assets/black-rook.png";
import whiteLogo from "../../assets/white-rook.png";
import { Colors } from "../Colors";
import { Cell } from "./../Cell";

export class Rook extends Figure {
  isFirstStep: boolean = true;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.ROOK;
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    if (
      this.cell.isEmptyVertical(target) ||
      this.cell.isEmptyHorizontal(target)
    )
      return true;
    return false;
  }

  moveFigure(target: Cell, test?: boolean): void {
    if (test) return;

    this.isFirstStep = false;
  }
}
