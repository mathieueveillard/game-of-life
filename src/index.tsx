import React from "react";
import ReactDOM from "react-dom/client";
import Game from "./app/Game";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Game
      parameters={{
        space: {
          numberOfCells: 1000,
          window: {
            maxX: 100,
            maxY: 100,
          },
          cellSizeInPixels: 5,
        },
        time: {
          refreshPeriodInMs: 20,
        },
      }}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
