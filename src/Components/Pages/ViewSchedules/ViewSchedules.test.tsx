/**
 * Entity Names:
 *  ViewSchedule
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
import ViewSchedules from "./ViewSchedules";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ViewSchedules />, div);
  ReactDOM.unmountComponentAtNode(div);
});
