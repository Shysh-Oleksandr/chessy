import React from "react";
import { Figure } from "../models/figures/Figure";

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

function LostFigures({ title, figures }: LostFiguresProps) {
  return (
    <div className="lost">
      <h3>{title}</h3>
      {figures.map((figure) => {
        return (
          <div key={figure.id} className="lost__figure">
            <h4>{figure.name}</h4>
            <div>
              {figure.logo && <img width={20} height={20} src={figure.logo} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LostFigures;
