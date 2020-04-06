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
  ListItemText,
  Button,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import EcoIcon from "@material-ui/icons/Eco";
import BorderAllIcon from "@material-ui/icons/BorderAll";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import Blind from "../../../res/Classes/Blind";
import { Link } from "react-router-dom";
// import { IStats } from "../../../res/Interfaces";
import config from "../../../config";
import Footer from "../../Atoms/Footer";
import CommandModal from "../../Molecules/CommandModal";
import { BLIND_MODE } from "../../../res/blindTypes";
import { IStats } from "../../../res/Interfaces";

const LOADING_MESSAGE = "loading...";

/**
 * 'styles' allows for styling within typescript code.
 * @param theme originates from Material-UI
 */
const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(0),
    },
    title: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    list: {
      padding: theme.spacing(0),
    },
  });
/**
 * @typeparam <typeof styles>
 * @param blind the blind in question
 */
interface Props extends WithStyles<typeof styles> {
  blind: Blind;
}

/**
 * The [[BlindMenu]] functional component acts as the
 * primary landing page for the application.
 * @param props used to pass in stylings and the blind object
 * @returns React Element; the BlindMenu component
 */
const BlindMenu: React.FC<Props> = (props) => {
  const { classes, blind } = props;
  const [stats, setStats] = useState<IStats>(config.defaultObjects.stats);
  // const [schedule, setSchedule] = useState<ISchedule>(
  //   config.defaultObjects.schedule
  // );
  // const [blindMode, setblindMode] = useState(config.defaultObjects.blindMode);

  const [modalOpen, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function updateValues(blind: Blind) {
    // blind.getSchedule().then((scheduleResponse) => {
    //   // setSchedule(scheduleResponse);
    //   setblindMode(blind.GetCurrentBehavior(scheduleResponse));
    // });
    blind.getStatus().then((statsResponse) => {
      setStats(statsResponse);
    });
  }

  useEffect(() => {
    if (blind === undefined) {
      return;
    }
    updateValues(blind);
  }, [blind]);

  const sendCommand = (
    reset: boolean,
    mode: BLIND_MODE,
    duration: number,
    position?: number
  ) => {
    let setPosition: number = 0;

    if (position !== undefined) {
      setPosition = position;
    }
    let callback = (response: any) => {
      updateValues(blind);
    };
    blind.sendCommand(
      reset,
      {
        mode: mode,
        duration: duration,
        position: setPosition,
      },
      callback
    );
  };

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Typography className={classes.title} color="textPrimary">
          Current Status:
        </Typography>
        <List className={classes.root}></List>
        <ListItem>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            secondary="Indoor Temperature"
            primary={
              stats === undefined
                ? LOADING_MESSAGE
                : `${Number(stats.indoorTemp).toFixed(2)}°`
            }
          />
        </ListItem>
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
              stats === undefined
                ? LOADING_MESSAGE
                : `${Number(stats.motorPosition).toFixed(2)}°`
            } //convert
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            {stats === undefined ? (
              <AutorenewIcon />
            ) : stats.mode === "DARK" ? (
              <Brightness3Icon />
            ) : stats.mode === "LIGHT" ? (
              <Brightness5Icon />
            ) : (
              <EcoIcon />
            )}
          </ListItemIcon>
          <ListItemText
            secondary="Behavior"
            primary={stats === undefined ? LOADING_MESSAGE : stats.mode} //convert
          />
        </ListItem>
      </Paper>
      <Footer
        buttons={[
          <Button onClick={handleOpen} color="inherit">
            Manual Control
          </Button>,
          <Button
            component={Link}
            to={config.root + "/blind/createschedule"}
            color="inherit"
          >
            Set Schedule
          </Button>,
        ]}
      />
      <CommandModal
        open={modalOpen}
        handleClose={handleClose}
        sendCommand={sendCommand}
      ></CommandModal>
    </React.Fragment>
  );
};

export default withStyles(styles)(BlindMenu);
