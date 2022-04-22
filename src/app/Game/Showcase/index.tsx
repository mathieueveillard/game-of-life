import * as React from "react";
import { SpaceParameters } from "../createGeneration0";

export interface Props {
  space: SpaceParameters;
  children: React.ReactNode;
}

const Component: React.FunctionComponent<Props> = ({ space, children }) => {
  const {
    window: { maxX, maxY },
    cellSizeInPixels,
  } = space;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: maxX * cellSizeInPixels,
          height: maxY * cellSizeInPixels,
          border: "1px solid black",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Component;
