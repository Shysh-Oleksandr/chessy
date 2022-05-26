import { FC } from "react";
import { Cell } from "./../models/Cell";
interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
  return (
    <div
      onClick={() => click(cell)}
      className={[
        "cell",
        cell.color,
        selected ? "selected" : "",
        cell.available && cell.figure ? "green" : "",
      ].join(" ")}
    >
      {cell.available && !cell.figure && <div className="available"></div>}
      {cell.figure?.logo && <img src={cell.figure.logo} />}
    </div>
  );
};
export default CellComponent;
