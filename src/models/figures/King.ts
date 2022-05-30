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

    // Check castling
    if (target.x + 1 < 8 && target.x - 2 >= 0) {
      const leftRookPosition = this.cell.board.getCell(target.x - 2, target.y);
      const rightRookPosition = this.cell.board.getCell(target.x + 1, target.y);

      // Check for short castling.
      const isRightRook =
        rightRookPosition.figure instanceof Rook &&
        rightRookPosition.figure.isFirstStep &&
        this.cell.isEmptyHorizontal(rightRookPosition);

      // Check for long castling.
      const isLeftRook =
        leftRookPosition.figure instanceof Rook &&
        leftRookPosition.figure.isFirstStep &&
        this.cell.isEmptyHorizontal(leftRookPosition);

      if (
        (isRightRook || isLeftRook) &&
        this.isFirstStep &&
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
      const isLongCastling = target.x < this.cell.x;
      const rookPosition = isLongCastling
        ? this.cell.board.getCell(target.x - 2, target.y)
        : this.cell.board.getCell(target.x + 1, target.y);
      const targetRookPositionX = isLongCastling ? target.x + 1 : target.x - 1;
      const targetRookPosition = this.cell.board.getCell(
        targetRookPositionX,
        target.y
      );
      rookPosition.moveFigure(targetRookPosition);
    }

    this.isFirstStep = false;
  }
}
