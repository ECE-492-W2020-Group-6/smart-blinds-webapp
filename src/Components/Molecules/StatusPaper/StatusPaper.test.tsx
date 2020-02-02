import React from "react";
import ReactDOM from "react-dom";
import StatusPaper from "./StatusPaper";
import { IStats } from "../../../res/Interfaces";

const stats: IStats = {
  indoorTemp: 21,
  outdoorTemp: 0,
  cloudCoverage: "Low"
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<StatusPaper stats={stats} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
