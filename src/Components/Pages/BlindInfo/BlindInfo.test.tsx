/**
 * Entity Names:
 *  BlindInfo
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
import BlindInfo from "./BlindInfo";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BlindInfo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
