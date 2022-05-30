import React from "react";

const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

interface BoardNumerationProps {
  isNumbers: boolean;
}

const BoardNumeration = ({ isNumbers }: BoardNumerationProps) => {
  return (
    <ul className={`${isNumbers ? "numbers" : "letters"}-line`}>
      {letters.map((letter, index) => {
        return (
          <li
            key={letter + index}
            className={`${isNumbers ? "numbers" : "letters"}-line__item`}
          >
            {isNumbers ? index + 1 : letter}
          </li>
        );
      })}
    </ul>
  );
};

export default BoardNumeration;
