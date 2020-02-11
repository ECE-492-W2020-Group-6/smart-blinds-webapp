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
import { IStats } from "../../../res/Interfaces";
import Blind from "../../../res/Classes/Blind";

/**
 * Sample object in order to test the render
 */
const stats: IStats = {
  indoorTemp: 21,
  outdoorTemp: 0,
  cloudCoverage: "Low",
  motorPosition: 0
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Splash
      stats={stats}
      switchBlind={() => 0}
      blindList={[
        new Blind("Test Blinds", { address: "localhost", password: "123pass" })
      ]}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
