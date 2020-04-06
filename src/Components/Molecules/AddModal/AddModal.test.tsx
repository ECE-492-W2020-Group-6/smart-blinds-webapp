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
import AddModal from "./AddModal";
import { IStats } from "../../../res/Interfaces";
import config from "../../../config";
import Blind from "../../../res/Classes/Blind";

const newBlind = new Blind("blind", config.defaultObjects.credentials);

config.testCases.stats.forEach((testStats: IStats) => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <AddModal open={true} addBlind={(newBlind) => 0} handleClose={() => 0} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
