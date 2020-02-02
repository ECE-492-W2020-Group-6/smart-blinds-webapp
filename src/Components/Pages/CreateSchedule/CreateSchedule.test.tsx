import React from "react";
import ReactDOM from "react-dom";
import CreateSchedule from "./CreateSchedule";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CreateSchedule />, div);
  ReactDOM.unmountComponentAtNode(div);
});
