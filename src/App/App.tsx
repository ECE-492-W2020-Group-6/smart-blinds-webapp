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

import React, { useState, useEffect } from "react";
import config from "../config";
import { Redirect, useLocation } from "react-router";
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

  let testBlind: Blind = new Blind("Test Blinds", {
    address: "localhost",
    password: "123pass"
  });
  let otherBlind: Blind = new Blind("Other blinds", {
    address: "1.255.02.3",
    password: "pass123"
  });
  const [blinds, setBlinds] = useState([testBlind, otherBlind]);
  const [currentBlind, setBlind] = useState();
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
      <Header title={title} />
      <Switch>
        <Route
          exact
          path={config.root + "/"}
          render={props => (
            <Splash
              {...props}
              stats={currentStats}
              blindList={blinds}
              switchBlind={switchBlind}
            />
          )}
        />
        <Route
          path={config.root + "/blind"}
          render={props => <BlindInfo {...props} blind={currentBlind} />}
        />
        <Route path={config.root + "/schedules"} component={ViewSchedules} />
        <Redirect to={config.root + config.defaultPath} />
      </Switch>
    </div>
  );
};

export default withStyles(styles)(App);
