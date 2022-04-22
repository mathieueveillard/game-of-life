import React from "react";
import { GameParameters } from ".";
import { computeNextGeneration } from "../../domain";
import { Grid } from "../../domain/Grid";
import { createGeneration0 } from "./createGeneration0";

export const useGeneration = ({
  space,
  time,
}: GameParameters): { generation: Grid } => {
  const { refreshPeriodInMs } = time;

  const [grid, setGrid] = React.useState(createGeneration0(space));

  React.useEffect(() => {
    const updateGrid = () => {
      setGrid(computeNextGeneration(grid));
    };
    const id = window.setTimeout(updateGrid, refreshPeriodInMs);
    return () => {
      window.clearTimeout(id);
    };
  }, [grid, refreshPeriodInMs]);

  return {
    generation: grid,
  };
};
