import { FC } from "react";
import { Colors } from "../models/Colors";
import { Cell } from "./../models/Cell";
import { King } from "./../models/figures/King";
interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
  currentPlayerColor: Colors;
  isCheck: boolean;
}

const CellComponent: FC<CellProps> = ({
  cell,
  selected,
  click,
  currentPlayerColor,
  isCheck,
}) => {
  return (
    <div
      onClick={() => click(cell)}
      className={[
        "cell",
        cell.color,
        selected ? "selected" : "",
        cell.available && cell.figure ? "available-red" : "",
        cell.figure?.color === currentPlayerColor ? "player-color" : "",
        cell.available && !cell.figure ? "available" : "",
        cell.figure instanceof King &&
        isCheck &&
        cell.figure?.color === currentPlayerColor
          ? "check"
          : "",
      ].join(" ")}
    >
      {/* {cell.available && !cell.figure && <div className="available"></div>} */}
      {cell.figure?.logo && <img src={cell.figure.logo} alt="Figure" />}
    </div>
  );
};
export default CellComponent;
