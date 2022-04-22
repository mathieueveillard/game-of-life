import * as React from "react";
import { SpaceParameters } from "./createGeneration0";
import { isVisible } from "./isVisible";
import Cell from "./Cell";
import Showcase from "./Showcase";
import { useGeneration } from "./useGeneration";

interface TimeParameters {
  refreshPeriodInMs: number;
}

export interface GameParameters {
  space: SpaceParameters;
  time: TimeParameters;
}

interface Props {
  parameters: GameParameters;
}

const Component: React.FunctionComponent<Props> = ({ parameters }) => {
  const { space } = parameters;
  const { cellSizeInPixels } = space;
  const { generation } = useGeneration(parameters);
  return (
    <Showcase space={space}>
      {generation
        .filter(isVisible(space.window))
        .asArray()
        .map(({ x, y }) => (
          <Cell
            key={`${x}|${y}`}
            x={x * cellSizeInPixels}
            y={y * cellSizeInPixels}
            cellSizeInPixels={cellSizeInPixels}
          />
        ))}
    </Showcase>
  );
};

export default Component;
