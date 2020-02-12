import React, { useState, useEffect } from "react";
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import EcoIcon from "@material-ui/icons/Eco";
import BorderAllIcon from "@material-ui/icons/BorderAll";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import Blind from "../../../res/Classes/Blind";
// import { IStats } from "../../../res/Interfaces";
import config from "../../../config";

const LOADING_MESSAGE = "loading...";

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
 * The [[BlindInfo]] functional component acts as the
 * primary landing page for the application.
 * @param props used to pass in stylings and the blind object
 * @returns React Element; the BlindInfo component
 */
const BlindInfo: React.FC<Props> = props => {
  const { classes, blind } = props;
  const [stats, setStats] = useState();
  const [schedule, setSchedule] = useState();

  useEffect(() => {
    if (blind === undefined) {
      return;
    }
    blind.getSchedule().then(scheduleResponse => {
      setSchedule(scheduleResponse);
    });
    blind.getStatus().then(statsResponse => {
      setStats(statsResponse);
    });
  }, [blind]);

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Typography className={classes.title} color="textPrimary">
          Current Status:
        </Typography>
        <List className={classes.root}></List>
        <ListItem>
          <ListItemIcon>
            {stats === undefined ? (
              <AutorenewIcon />
            ) : stats.motorPosition > config.MOTORMIDPOINT ? (
              <BorderAllIcon />
            ) : (
              <FormatAlignJustifyIcon />
            )}
          </ListItemIcon>
          <ListItemText
            secondary="Motor Position"
            primary={
              stats === undefined ? LOADING_MESSAGE : stats.motorPosition
            } //convert
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            {schedule === undefined ? (
              <AutorenewIcon />
            ) : schedule.days === "Auto" ? (
              <EcoIcon />
            ) : schedule.days === "Light" ? (
              <Brightness5Icon />
            ) : (
              <Brightness3Icon />
            )}
          </ListItemIcon>
          <ListItemText
            secondary="Behavior"
            primary={schedule === undefined ? LOADING_MESSAGE : schedule.days} //convert
          />
        </ListItem>
      </Paper>
    </React.Fragment>
  );
};

export default withStyles(styles)(BlindInfo);
