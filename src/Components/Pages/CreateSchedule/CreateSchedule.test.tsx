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

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CreateSchedule />, div);
  ReactDOM.unmountComponentAtNode(div);
});
