import React from "react";
import ReactDOM from "react-dom";
import BlindInfo from "./BlindInfo";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BlindInfo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
