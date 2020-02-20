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
 *
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
import config from "../../../config";
import Footer from "../../Atoms/Footer";

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
      <Paper className={classes.root}></Paper>
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
