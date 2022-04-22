export type Coordinates = Readonly<{
  x: number;
  y: number;
}>;

export type Key = `${number}|${number}`;

export type Grid = {
  asArray(): Coordinates[];
  has(coordinate: Coordinates): boolean;
  map(fn: (coordinate: Coordinates) => Grid): Grid;
  filter(fn: (coordinate: Coordinates) => boolean): Grid;
  count(): number;
};

export const createGrid = (coordinates: Coordinates[]): Grid => {
  const toKey = ({ x, y }: Coordinates): Key => {
    return `${x}|${y}`;
  };

  const toCoordinates = (key: Key): Coordinates => {
    const [left, right] = key.split("|");
    return {
      x: Number(left),
      y: Number(right),
    };
  };

  const internal = new Set(coordinates.map(toKey));

  const asArray = (): Coordinates[] => {
    return [...internal].map(toCoordinates);
  };

  const has = (coordinate: Coordinates): boolean => {
    return internal.has(toKey(coordinate));
  };

  const map = (fn: (coordinate: Coordinates) => Grid): Grid => {
    return createGrid(
      asArray()
        .map((coordinate) => fn(coordinate).asArray())
        .flat()
    );
  };

  const filter = (fn: (coordinate: Coordinates) => boolean): Grid => {
    return createGrid(asArray().filter(fn));
  };

  const count = (): number => {
    return [...internal].length;
  };

  return {
    asArray,
    has,
    map,
    filter,
    count,
  };
};

type TwoGrids = { first: Grid; second: Grid };

export const merge = ({ first, second }: TwoGrids) =>
  createGrid([...first.asArray(), ...second.asArray()]);
