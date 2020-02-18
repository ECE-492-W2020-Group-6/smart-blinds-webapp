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
import Footer from "./Footer";
import { Button } from "@material-ui/core";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Footer buttons={[<Button color="inherit">Set Schedule</Button>]} />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
