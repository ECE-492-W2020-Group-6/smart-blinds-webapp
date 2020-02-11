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
import { Link } from "react-router-dom";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import config from "../../../config";
import StatusPaper from "../../../Components/Molecules/StatusPaper";
import { IStats } from "../../../res/Interfaces";
import Blind from "../../../res/Classes/Blind";

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
 * @param stats stats to display, passed down to [[StatusPaper]]
 * @param blindList list of blind objects to display
 */
interface Props extends WithStyles<typeof styles> {
  stats: IStats;
  blindList: Blind[];
}

/**
 * The [[Splash]] functional component acts as the
 * primary landing page for the application.
 * @param props used to pass in stylings
 * @returns React Element; the Splash page
 */
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
              <ListItem button component={Link} to={config.root + "/blind"}>
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
