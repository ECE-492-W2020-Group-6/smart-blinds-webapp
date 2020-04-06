/**
 * Entity Names:
 *  Splash
 *  IStats
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
import Splash from "./Splash";

import Blind from "../../../res/Classes/Blind";
import { BrowserRouter } from "react-router-dom";

/**
 * Sample object in order to test the render
 */

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Splash
        switchBlind={() => 0}
        addBlind={() => 0}
        removeBlind={() => 0}
        blindList={[
          new Blind("Test Blinds", {
            address: "localhost",
            password: "123pass"
          })
        ]}
      />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
