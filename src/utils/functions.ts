import { Colors } from "../models/Colors";

export function getReverseColor(color: Colors): Colors {
  return color === Colors.BLACK ? Colors.WHITE : Colors.BLACK;
}
