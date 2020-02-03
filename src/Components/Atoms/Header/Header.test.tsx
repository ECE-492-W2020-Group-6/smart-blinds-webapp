/**
 * Entity Names:
 *  Header
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
import Header from "./Header";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Header title="Test Header" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
