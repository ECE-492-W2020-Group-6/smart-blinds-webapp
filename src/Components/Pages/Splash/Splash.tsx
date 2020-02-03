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
  Paper
} from "@material-ui/core";

import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import StatusPaper from "../../../Components/Molecules/StatusPaper";
import { IStats } from "../../../res/Interfaces";
import Blind from "../../../res/Classes/Blind";

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

interface Props extends WithStyles<typeof styles> {
  stats: IStats;
  blindList: Blind[];
}

const Splash: React.FC<Props> = props => {
  const { stats, blindList, classes } = props;
  return (
    <div className={classes.root}>
      <StatusPaper stats={stats} />
      <Divider />
      <List className={classes.list}>
        {blindList.map((blind: Blind) => (
          <React.Fragment key={blind.getAddress()}>
            <Paper>
              <ListItem>
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
    </div>
  );
};

export default withStyles(styles)(Splash);
