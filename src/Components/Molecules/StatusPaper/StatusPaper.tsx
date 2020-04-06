/**
 * Entity Names:
 *  StatusPaper
 *  props
 *  styles
 * Author(s):
 *  Kevin de Haan
 * Date Created:
 *  Feb 1, 2020
 * Derived From:
 *  material-ui
 *
 * Sub component that provides received stats in a compact display.
 * Based on a material-ui 'Paper' component
 */
import React from "react";
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
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
// import AcUnitIcon from "@material-ui/icons/AcUnit";
// import WbSunnyIcon from "@material-ui/icons/WbSunny";
// import CloudIcon from "@material-ui/icons/Cloud";
import { IStats } from "../../../res/Interfaces";

/**
 * 'styles' allows for styling within typscript code.
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
  });

/**
 * @typeparam <typeof styles>
 * @param stats stats to display
 */
interface Props extends WithStyles<typeof styles> {
  stats: IStats;
}

/**
 * The [[StatusPaper]] functional component provides stats in a compact display
 * @param props used to pass in stylings
 * @returns React Element; A material-ui 'paper' component displaying stats
 */
const StatusPaper: React.FC<Props> = (props) => {
  const { classes, stats } = props;
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
            primary={`${Number(stats.indoorTemp).toFixed(2)}°`}
          />
        </ListItem>
        {/* <ListItem>
          <ListItemIcon>
            {stats.outdoorTemp < 5 ? <AcUnitIcon /> : <WbSunnyIcon />}
          </ListItemIcon>
          <ListItemText
            secondary="Outdoor Temperature"
            primary={`${stats.outdoorTemp}°`}
          />
        </ListItem> */}
        {/* <ListItem>
          <ListItemIcon>
            <CloudIcon />
          </ListItemIcon>
          <ListItemText
            secondary="Cloud Coverage"
            primary={stats.cloudCoverage}
          />
        </ListItem> */}
      </Paper>
    </React.Fragment>
  );
};

export default withStyles(styles)(StatusPaper);
