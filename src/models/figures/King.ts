import { Figure, FigureNames } from "./Figure";

import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";
import { Colors } from "../Colors";
import { Cell } from "./../Cell";
import { Rook } from "./Rook";
import { getReverseColor } from "../../utils/functions";

export class King extends Figure {
  isFirstStep: boolean = true;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);

    // Check short castling
    if (target.x + 1 < 8 && target.x - 1 >= 0) {
      const rookPosition = this.cell.board.getCell(target.x + 1, target.y);

      if (
        rookPosition.figure instanceof Rook &&
        rookPosition.figure.isFirstStep &&
        this.isFirstStep &&
        this.cell.isEmptyHorizontal(rookPosition) &&
        !this.cell.board.isKingUnderAttack(this.color)
      ) {
        return true;
      }
    }

    return (
      (dx === 0 && dy === 1) || (dx === 1 && dy === 0) || (dx === 1 && dy === 1)
    );
  }

  moveFigure(target: Cell, test?: boolean): void {
    if (test) return;

    // Castling
    const dx = Math.abs(this.cell.x - target.x);
    if (dx === 2) {
      const rookPosition = this.cell.board.getCell(target.x + 1, target.y);
      const targetRookPosition = this.cell.board.getCell(
        target.x - 1,
        target.y
      );
      rookPosition.moveFigure(targetRookPosition);
    }

    this.isFirstStep = false;
  }
}
