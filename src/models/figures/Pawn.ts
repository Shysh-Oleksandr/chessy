import { Figure, FigureNames } from "./Figure";

import blackLogo from "../../assets/black-pawn.png";
import whiteLogo from "../../assets/white-pawn.png";
import { Colors } from "../Colors";
import { Cell } from "./../Cell";
import { Queen } from "./Queen";

export class Pawn extends Figure {
  isFirstStep: boolean = true;
  wasDoubleStep: boolean = false;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.PAWN;
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection =
      this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    // En Passant
    if (
      this.cell.x - 1 >= 0 &&
      this.cell.x + 1 < this.cell.board.cells.length
    ) {
      const possibleLeftPawn: Cell = this.cell.board.getCell(
        this.cell.x - 1,
        this.cell.y
      );
      const possibleRightPawn: Cell = this.cell.board.getCell(
        this.cell.x + 1,
        this.cell.y
      );
      if (
        target.y === this.cell.y + direction &&
        ((target.x === this.cell.x - 1 &&
          possibleLeftPawn.figure instanceof Pawn &&
          possibleLeftPawn.figure.wasDoubleStep) ||
          (target.x === this.cell.x + 1 &&
            possibleRightPawn.figure instanceof Pawn &&
            possibleRightPawn.figure.wasDoubleStep))
      ) {
        return true;
      }
    }

    // Vertical movement.
    if (
      (target.y === this.cell.y + direction ||
        (this.isFirstStep &&
          target.y === this.cell.y + firstStepDirection &&
          this.cell.board
            .getCell(this.cell.x, this.cell.y + direction)
            .isEmpty())) &&
      target.x === this.cell.x &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    )
      return true;

    // Capturing enemies.
    if (
      target.y === this.cell.y + direction &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      this.cell.isEnemy(target)
    )
      return true;

    return false;
  }

  moveFigure(target: Cell, test: boolean = false): void {
    super.moveFigure(target);

    if (test) return;

    // Check if previos move was double step.
    const dy = Math.abs(this.cell.y - target.y);
    if (this.isFirstStep && dy === 2) {
      this.wasDoubleStep = true;
    } else {
      this.wasDoubleStep = false;
    }

    // En Passant
    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
    if (
      target.y === this.cell.y + direction &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      !this.cell.isEnemy(target)
    ) {
      // Capture a pawn.
      const pawnToCapture = this.cell.board.getCell(
        target.x,
        target.y - direction
      );
      pawnToCapture.figure = null;
    }
    // Managing first step.
    this.isFirstStep = false;

    // Turning into queen.
    const boundaryLine = this.cell.figure?.color === Colors.BLACK ? 7 : 0;
    if (target.y === boundaryLine) {
      this.cell.figure = new Queen(this.color, target);
    }
  }
}
