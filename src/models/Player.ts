import { Colors } from "./Colors";

export class Player {
  color: Colors;
  time: number = 300;
  name: string | null = null;

  constructor(color: Colors) {
    this.color = color;
  }
}
