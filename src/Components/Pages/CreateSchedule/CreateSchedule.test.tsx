/**
 * Entity Names:
 *  CreateSchedule
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
import CreateSchedule from "./CreateSchedule";
import Blind from "../../../res/Classes/Blind";
import { BrowserRouter } from "react-router-dom";
import config from "../../../config";

config.testCases.blinds.forEach((testBlind: Blind) => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <CreateSchedule blind={testBlind} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
