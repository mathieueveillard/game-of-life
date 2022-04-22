import { Coordinates } from "../../domain/Grid";
import { Window } from "./createGeneration0";

export const isVisible =
  ({ maxX, maxY }: Window) =>
  ({ x, y }: Coordinates): boolean => {
    return x >= 0 && x < maxX && y >= 0 && y < maxY;
  };
