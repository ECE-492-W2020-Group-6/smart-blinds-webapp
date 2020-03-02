/**
 * Entity Names:
 *  StatusPaper
 * Author(s):
 *  Kevin de Haan
 * Derived From:
 *  create-react-app
 *  Jest
 *
 * Jest test to confirm proper rendering of the component
 */
import React from "react";
import ReactDOM from "react-dom";
import StatusPaper from "./StatusPaper";
import { IStats } from "../../../res/Interfaces";
import config from "../../../config";

config.testCases.stats.forEach((testStats: IStats) => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<StatusPaper stats={testStats} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
