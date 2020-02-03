import React from "react";
import ReactDOM from "react-dom";
import Splash from "./Splash";
import { IStats } from "../../../res/Interfaces";
import Blind from "../../../res/Classes/Blind";

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
      blindList={[
        new Blind("Test Blinds", { address: "localhost", password: "123pass" })
      ]}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
