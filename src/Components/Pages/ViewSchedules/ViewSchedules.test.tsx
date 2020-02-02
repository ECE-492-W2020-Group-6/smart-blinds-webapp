import React from "react";
import ReactDOM from "react-dom";
import ViewSchedules from "./ViewSchedules";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ViewSchedules />, div);
  ReactDOM.unmountComponentAtNode(div);
});
