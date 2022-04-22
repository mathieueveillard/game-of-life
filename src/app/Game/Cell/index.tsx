import * as React from "react";

export interface Props {
  x: number;
  y: number;
  cellSizeInPixels: number;
}

const Component: React.FunctionComponent<Props> = ({
  x,
  y,
  cellSizeInPixels,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: cellSizeInPixels,
        height: cellSizeInPixels,
        backgroundColor: "black",
      }}
    />
  );
};

export default Component;
