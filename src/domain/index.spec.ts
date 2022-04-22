// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import {
  computeAdditionalCandidatesToLife,
  computeNeighborhood,
  computeNextGeneration,
  computeNumberOfNeighbours,
  computeStatusOnNextGeneration,
} from ".";
import { Coordinates, createGrid } from "./Grid";

expect.extend(matchers);

describe("Test of computeStatusOnNextGeneration()", function () {
  test("Should not live by default: life is an exception!", function () {
    const actual = computeStatusOnNextGeneration(0)(true);
    expect(actual).toEqual(false);
  });

  test("A cell surrounded by 2 cells should live on next generation", function () {
    const actual = computeStatusOnNextGeneration(2)(true);
    expect(actual).toEqual(true);
  });

  test("A cell surrounded by 3 cells should live on next generation", function () {
    const actual = computeStatusOnNextGeneration(3)(true);
    expect(actual).toEqual(true);
  });

  test("2 cells are not sufficient to create life", function () {
    const actual = computeStatusOnNextGeneration(2)(false);
    expect(actual).toEqual(false);
  });

  test("3 cells should allow life to appear", function () {
    const actual = computeStatusOnNextGeneration(3)(false);
    expect(actual).toEqual(true);
  });
});

describe("Test of computeNeighborhood()", function () {
  test("Neighborhood of origin", function () {
    // GIVEN
    const coordinates: Coordinates = {
      x: 0,
      y: 0,
    };

    // WHEN
    const actual = computeNeighborhood(coordinates);

    // THEN
    const expected: Coordinates[] = [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: -1, y: 1 },
      { x: -1, y: 0 },
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
    ];
    expect(actual.asArray()).toEqual(expected);
  });

  test("Translation on x axis", function () {
    // GIVEN
    const coordinates: Coordinates = {
      x: 10,
      y: 0,
    };

    // WHEN
    const actual = computeNeighborhood(coordinates);

    // THEN
    const expected: Coordinates[] = [
      { x: 10 + 1, y: 0 },
      { x: 10 + 1, y: 1 },
      { x: 10 + 0, y: 1 },
      { x: 10 + -1, y: 1 },
      { x: 10 + -1, y: 0 },
      { x: 10 + -1, y: -1 },
      { x: 10 + 0, y: -1 },
      { x: 10 + 1, y: -1 },
    ];
    expect(actual.asArray()).toEqual(expected);
  });

  test("Translation on y axis", function () {
    // GIVEN
    const coordinates: Coordinates = {
      x: 0,
      y: 10,
    };

    // WHEN
    const actual = computeNeighborhood(coordinates);

    // THEN
    const expected: Coordinates[] = [
      { x: 1, y: 10 + 0 },
      { x: 1, y: 10 + 1 },
      { x: 0, y: 10 + 1 },
      { x: -1, y: 10 + 1 },
      { x: -1, y: 10 + 0 },
      { x: -1, y: 10 + -1 },
      { x: 0, y: 10 + -1 },
      { x: 1, y: 10 + -1 },
    ];
    expect(actual.asArray()).toEqual(expected);
  });
});

describe("Test of computeNumberOfNeighbours()", function () {
  test("Empty grid", function () {
    // GIVEN
    const grid = createGrid([]);
    const coordinates: Coordinates = {
      x: 0,
      y: 0,
    };

    // WHEN
    const actual = computeNumberOfNeighbours(grid)(coordinates);

    // THEN
    const expected: number = 0;
    expect(actual).toEqual(expected);
  });

  test("One or many neighbours around the origin", function () {
    // GIVEN
    const grid = createGrid([
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ]);
    const coordinates: Coordinates = {
      x: 0,
      y: 0,
    };

    // WHEN
    const actual = computeNumberOfNeighbours(grid)(coordinates);

    // THEN
    const expected: number = 2;
    expect(actual).toEqual(expected);
  });
});

describe("Test of computeAdditionalCandidatesToLife()", function () {
  test("Empty grid", function () {
    // GIVEN
    const grid = createGrid([]);

    // WHEN
    const actual = computeAdditionalCandidatesToLife(grid);

    // THEN
    const expected: Coordinates[] = [];
    expect(actual.asArray()).toEqual(expected);
  });

  test("One cell", function () {
    // GIVEN
    const grid = createGrid([{ x: 0, y: 0 }]);

    // WHEN
    const actual = computeAdditionalCandidatesToLife(grid);

    // THEN
    const expected: Coordinates[] = [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: -1, y: 1 },
      { x: -1, y: 0 },
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
    ];
    expect(actual.asArray()).toIncludeAllMembers(expected);
  });

  test("Many cells", function () {
    // GIVEN
    const grid = createGrid([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ]);

    // WHEN
    const actual = computeAdditionalCandidatesToLife(grid);

    // THEN
    const expected: Coordinates[] = [
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: 2, y: -1 },
    ];
    expect(actual.asArray()).toIncludeAllMembers(expected);
  });
});

describe("Test of computeNextGeneration()", function () {
  test("How did life appear?", function () {
    // GIVEN
    const grid = createGrid([]);

    // WHEN
    const actual = computeNextGeneration(grid);

    // THEN
    const expected: Coordinates[] = [];
    expect(actual.asArray()).toEqual(expected);
  });

  test.skip("[Obsolete] Many cells", function () {
    // GIVEN
    const grid = createGrid([
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ]);

    // WHEN
    const actual = computeNextGeneration(grid);

    // THEN
    const expected = [{ x: 0, y: 0 }];
    expect(actual.asArray()).toEqual(expected);
  });

  test("Many cells", function () {
    // GIVEN
    const grid = createGrid([
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ]);

    // WHEN
    const actual = computeNextGeneration(grid);

    // THEN
    const expected: Coordinates[] = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];
    expect(actual.asArray()).toEqual(expected);
  });
});
