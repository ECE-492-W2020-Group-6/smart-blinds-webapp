/**
 * Entity Names:
 *  Splash
 *  props
 *  styles
 * Author(s):
 *  Kevin de Haan
 * Date Created:
 *  Feb 1, 2020
 * Derived From:
 *  N/A
 *
 * Splash page for heads-up stats and access to more of the application
 */
import React from "react";
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Paper,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import config from "../../../config";
import StatusPaper from "../../../Components/Molecules/StatusPaper";
import Footer from "../../../Components/Atoms/Footer";
import AddModal from "../../Molecules/AddModal";
import { IStats } from "../../../res/Interfaces";
import Blind from "../../../res/Classes/Blind";
import { useState, useEffect } from "react";

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
 * @param stats stats to display, passed down to [[StatusPaper]]
 * @param blindList list of blind objects to display
 */
interface Props extends WithStyles<typeof styles> {
  blindList: Blind[];
  switchBlind: (blind: Blind) => void;
  addBlind: (blind: Blind) => void;
  removeBlind: (idx: number) => void;
}

/**
 * The [[Splash]] functional component acts as the
 * primary landing page for the application.
 * @param props used to pass in stylings
 * @returns React Element; the Splash page
 */
const Splash: React.FC<Props> = (props) => {
  const { blindList, switchBlind, classes, addBlind, removeBlind } = props;

  let defaultStats = config.defaultObjects.stats;
  // temporary until the webserver is configured
  const [currentStats, setStats] = useState(defaultStats);

  // set timer to update blinds every 5 seconds
  useEffect(() => {
    blindList[0].getStatus().then((statusResponse: IStats) => {
      setStats(statusResponse);
    });
    // const interval = setInterval(() => {
    //   blindList[0].getStatus().then((statusResponse: IStats) => {
    //     console.log("updated");
    //     setStats(statusResponse);
    //   });
    // }, 1000 * 5);
    // return () => clearInterval(interval);
  }, [blindList]);

  const [modalOpen, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <StatusPaper stats={currentStats} />
      <Divider />
      <List className={classes.list}>
        {blindList.map((blind: Blind) => (
          <React.Fragment key={blind.getAddress()}>
            <Paper>
              <ListItem
                button
                onClick={() => {
                  switchBlind(blind);
                }}
                component={Link}
                to={config.root + "/blind"}
              >
                <ListItemIcon>
                  <ArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary={blind.getName()} />
              </ListItem>
            </Paper>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <AddModal
        open={modalOpen}
        handleClose={handleClose}
        addBlind={addBlind}
      ></AddModal>
      <Footer
        buttons={[
          <Button onClick={handleOpen} color="inherit">
            Add a Smart Blind
          </Button>,
        ]}
      />
    </div>
  );
};

export default withStyles(styles)(Splash);
