import { Grid, createGrid, Coordinates, merge } from "./Grid";

const ORIGIN_NEIGHBORHOOD: Grid = createGrid([
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: 0 },
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
]);

const translate =
  ({ x: dx, y: dy }: Coordinates) =>
  ({ x, y }: Coordinates): Grid =>
    createGrid([
      {
        x: x + dx,
        y: y + dy,
      },
    ]);

export const computeStatusOnNextGeneration =
  (numberOfNeighbours: number) =>
  (isAlive: boolean): boolean => {
    return (isAlive && numberOfNeighbours === 2) || numberOfNeighbours === 3;
  };

export const computeNeighborhood = (coordinates: Coordinates): Grid => {
  return ORIGIN_NEIGHBORHOOD.map(translate(coordinates));
};

// O(log(n))
export const computeNumberOfNeighbours =
  (grid: Grid) =>
  (coordinates: Coordinates): number => {
    return computeNeighborhood(coordinates).filter(grid.has.bind(grid)).count();
  };

// O(n)
export const computeAdditionalCandidatesToLife = (grid: Grid): Grid => {
  return grid.map(computeNeighborhood);
};

// O(log(n))
const computeNextState =
  (grid: Grid) =>
  (coordinates: Coordinates): boolean => {
    const numberOfNeighbours = computeNumberOfNeighbours(grid)(coordinates);
    const isAlive = grid.has(coordinates);
    return computeStatusOnNextGeneration(numberOfNeighbours)(isAlive);
  };

// O(n x log(n))
export const computeNextGeneration = (grid: Grid): Grid => {
  return merge({
    first: grid,
    second: computeAdditionalCandidatesToLife(grid),
  }).filter(computeNextState(grid));
};