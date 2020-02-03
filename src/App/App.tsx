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

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      margin: "0",
      width: "100vw",
      position: "fixed"
    }
  });

interface Props extends WithStyles<typeof styles> {}

const App = (props: Props) => {
  const { classes } = props;
  //dummy for now
  const [currentStats, setStats] = useState({
    indoorTemp: 21,
    outdoorTemp: 0,
    cloudCoverage: "Low",
    motorPosition: 0
  });

  const [blinds, setBlinds] = useState([
    new Blind("Test Blinds", { address: "localhost", password: "123pass" }),
    new Blind("Other blinds", { address: "1.255.02.3", password: "123pass" })
  ]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header title="Smart Blinds" />
      <BrowserRouter>
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
