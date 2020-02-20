/**
 * Entity Names:
 *  ScheduleBuilder
 *  props
 *  styles
 * Author(s):
 *  Kevin de Haan
 * Date Created:
 *  Feb 20, 2020
 * Derived From:
 *  material-ui
 *
 * Sub component that allows users to view and create schedules
 *
 */
import React from "react";
import { Theme, createStyles, withStyles, WithStyles } from "@material-ui/core";

import { ISchedule } from "../../../res/Interfaces";

/**
 * 'styles' allows for styling within typscript code.
 * @param theme originates from Material-UI
 */
const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(0)
    },
    title: {
      flexGrow: 1,
      padding: theme.spacing(2)
    }
  });

/**
 * @typeparam <typeof styles>
 * @param stats stats to display
 */
interface Props extends WithStyles<typeof styles> {
  schedule: ISchedule;
}

/**
 * The [[StatusPaper]] functional component provides stats in a compact display
 * @param props used to pass in stylings
 * @returns React Element; A material-ui 'paper' component displaying stats
 */
const ScheduleBuilder: React.FC<Props> = props => {
  const { classes, schedule } = props;
  return <React.Fragment></React.Fragment>;
};

export default withStyles(styles)(ScheduleBuilder);
