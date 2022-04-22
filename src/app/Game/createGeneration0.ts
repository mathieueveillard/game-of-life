import { Coordinates, createGrid, Grid } from "../../domain/Grid";

export type Window = Readonly<{
  maxX: number;
  maxY: number;
}>;

export type SpaceParameters = Readonly<{
  numberOfCells: number;
  window: Window;
  cellSizeInPixels: number;
}>;

const generateRandomNumber = (max: number): number => {
  return Math.round(Math.random() * (max - 1));
};

const generateCoordinates = ({ maxX, maxY }: Window): Coordinates => {
  return {
    x: generateRandomNumber(maxX),
    y: generateRandomNumber(maxY),
  };
};

export const createGeneration0 = ({
  numberOfCells,
  window,
}: SpaceParameters): Grid => {
  const coordinates = [...Array(numberOfCells)].map((_) =>
    generateCoordinates(window)
  );
  return createGrid(coordinates);
};
