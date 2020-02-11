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
 * 'styles' allows for styling within typscript code.
 *
 */

import React, { useState } from "react";
import config from "../config";
import { Redirect } from "react-router";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "../Components/Atoms/Header";
import { Theme, createStyles, withStyles, WithStyles } from "@material-ui/core";
import Splash from "../Components/Pages/Splash";
import ViewSchedules from "../Components/Pages/ViewSchedules";
import BlindInfo from "../Components/Pages/BlindInfo";
import Blind from "../res/Classes/Blind";

/**
 * 'styles' allows for styling within typscript code.
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
  // temporary until the webserver is configured
  const [currentStats, setStats] = useState({
    indoorTemp: 21,
    outdoorTemp: 0,
    cloudCoverage: "Low",
    motorPosition: 0
  });

  // temporary
  const [blinds, setBlinds] = useState([
    new Blind("Test Blinds", { address: "localhost", password: "123pass" }),
    new Blind("Other blinds", { address: "1.255.02.3", password: "pass123" })
  ]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <BrowserRouter>
        <Header title="Smart Blinds" />
        <Switch>
          <Route
            exact
            path={config.root + "/"}
            render={props => (
              <Splash {...props} stats={currentStats} blindList={blinds} />
            )}
          />
          <Route path={config.root + "/blind"} component={BlindInfo} />
          <Route path={config.root + "/schedules"} component={ViewSchedules} />
          <Redirect to={config.root + config.defaultPath} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default withStyles(styles)(App);
