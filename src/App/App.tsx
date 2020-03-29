/**
 * Entity Names:
 *  App
 *  styles
 * Author(s):
 *  Kevin de Haan
 * Date Created:
 *  Feb 1, 2020
 * Derived From:
 *  create-react-app
 *
 * The App object acts as the root of the application.
 * All other components branch out in usage from this functional component.
 * 'styles' allows for styling within typescript code.
 *
 */

import React, { useState, useEffect } from "react";
import config from "../config";
import { Redirect, useLocation } from "react-router";
import { Switch, Route } from "react-router-dom";
import { defaultTheme } from "../res/styles/Themes";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "../Components/Atoms/Header";
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  ThemeProvider
} from "@material-ui/core";
import Splash from "../Components/Pages/Splash";
import ViewSchedules from "../Components/Pages/ViewSchedules";
import BlindMenu from "../Components/Pages/BlindMenu";
import Blind from "../res/Classes/Blind";
// import { IStats } from "../res/Interfaces";
import CreateSchedule from "../Components/Pages/CreateSchedule";

/**
 * 'styles' allows for styling within typescript code.
 * @param theme originates from Material-UI
 */
const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      margin: "0",
      width: "100vw",
      position: "fixed"
    }
  });

/**
 * @typeparam <typeof styles>
 */
interface Props extends WithStyles<typeof styles> {}

/**
 * The [[App]] functional component acts as the root of the application.
 * All other components branch out in usage from this component.
 * @param props used to pass in stylings
 * @returns React Element; the application
 */
const App = (props: Props) => {
  const { classes } = props;

  const testBlinds = config.testCases.blinds;

  const [blinds, setBlinds] = useState(testBlinds);
  const [currentBlind, setBlind] = useState(blinds[0]);
  const [title, setTitle] = useState("Smart Blinds");

  function switchBlind(blind: Blind) {
    setBlind(blind);
    setTitle(blind.getName());
  }

  var location = useLocation();

  useEffect(() => {
    if (location.pathname === config.root + config.defaultPath) {
      setTitle(config.mainTitle);
    }
  }, [location]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ThemeProvider theme={defaultTheme}>
        <Header title={title} />
        <Switch>
          <Route
            exact
            path={config.root + "/"}
            render={props => (
              <Splash {...props} blindList={blinds} switchBlind={switchBlind} />
            )}
          />
          <Route
            exact
            path={config.root + "/blind"}
            render={props => <BlindMenu {...props} blind={currentBlind} />}
          />
          <Route path={config.root + "/schedules"} component={ViewSchedules} />
          <Route
            exact
            path={config.root + "/blind/createSchedule"}
            render={props => <CreateSchedule {...props} blind={currentBlind} />}
          />
          <Redirect to={config.root + config.defaultPath} />
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default withStyles(styles)(App);
