/**
 * Entity Names:
 *  StatusPaper
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
import ScheduleBuilder from "../ScheduleBuilder";
import { ISchedule } from "../../../res/Interfaces";
import config from "../../../config";

config.testCases.schedules.forEach((testSchedule: ISchedule) => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ScheduleBuilder schedule={testSchedule} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
