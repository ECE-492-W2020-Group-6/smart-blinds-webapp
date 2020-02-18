/**
 * Entity Names:
 *  CreateSchedule
 *  props
 *  styles
 * Author(s):
 *  Kevin de Haan
 * Date Created:
 *  Feb 18, 2020
 * Derived From:
 *  @remotelock/react-week-scheduler
 *
 * Schedule builder UI
 */
import React, { useState, useEffect } from "react";
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Paper,
  Typography,
  Button
} from "@material-ui/core";

import Blind from "../../../res/Classes/Blind";
import { Link } from "react-router-dom";
// import { IStats } from "../../../res/Interfaces";
import config from "../../../config";
import Footer from "../../Atoms/Footer";

import "resize-observer-polyfill/dist/ResizeObserver.global";
import {
  TimeGridScheduler,
  classes as schedulerClasses
} from "@remotelock/react-week-scheduler";
import "@remotelock/react-week-scheduler/index.css";

/**
 * 'styles' allows for styling within typescript code.
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
    },
    list: {
      padding: theme.spacing(0)
    }
  });
/**
 * @typeparam <typeof styles>
 * @param blind the blind in question
 */
interface Props extends WithStyles<typeof styles> {
  blind: Blind;
}

/**
 * The [[CreateSchedule]] functional component acts as the
 * UI for creating and setting scheduless
 * @param props used to pass in stylings and the blind object
 * @returns React Element; the BlindMenu component
 */
const CreateSchedule: React.FC<Props> = props => {
  const { classes, blind } = props;
  const [schedule, setSchedule] = useState(config.defaultObjects.schedule);

  const rangeStrings = [
    ["2019-03-04 00:15", "2019-03-04 01:45"],
    ["2019-03-05 09:00", "2019-03-05 10:30"],
    ["2019-03-06 22:00", "2019-03-06 22:30"],
    ["2019-03-07 01:30", "2019-03-07 03:00"],
    ["2019-03-07 05:30", "2019-03-07 10:00"],
    ["2019-03-08 12:30", "2019-03-08 01:30"],
    ["2019-03-09 22:00", "2019-03-09 23:59"]
  ];

  const defaultSchedule: any = rangeStrings.map(range =>
    range.map(dateString => new Date(dateString))
  );

  const [displayedSchedule, setDisplayedSchedule] = useState(defaultSchedule);

  useEffect(() => {
    if (blind === undefined) {
      return;
    }
    blind.getSchedule().then(scheduleResponse => {
      setSchedule(scheduleResponse);
    });
  }, [blind]);

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <TimeGridScheduler classes={schedulerClasses} {...otherProps} />
      </Paper>
      <Footer
        buttons={[
          <Button
            // onClick={() => {
            //   switchSchedule(schedule);
            // }}
            component={Link}
            to={config.root + "/blind"}
            color="inherit"
          >
            Save
          </Button>,
          <Button component={Link} to={config.root + "/blind"} color="inherit">
            Cancel
          </Button>
        ]}
      />
    </React.Fragment>
  );
};

export default withStyles(styles)(CreateSchedule);
