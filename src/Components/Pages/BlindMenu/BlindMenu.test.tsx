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
import BlindMenu from "./BlindMenu";
import Blind from "../../../res/Classes/Blind";
import { BrowserRouter } from "react-router-dom";

const testRenderBlind: Blind = new Blind("Other blinds", {
  address: "1.255.02.3",
  password: "pass123"
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <BlindMenu blind={testRenderBlind} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
