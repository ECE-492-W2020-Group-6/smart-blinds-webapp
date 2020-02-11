/**
 * Entity Names:
 *  Header
 *  styles
 * Author(s):
 *  Kevin de Haan
 * Date Created:
 *  Feb 1, 2020
 * Derived From:
 *  create-react-app
 *
 * The Header functional component sits at the top of the application.
 *
 */
import React from "react";
import config from "../../../config";
import { Link } from "react-router-dom";
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Toolbar,
  IconButton,
  AppBar,
  Typography
} from "@material-ui/core";
// import HomeIcon from "@material-ui/icons/Home";
import LineWeightIcon from "@material-ui/icons/LineWeight";

/**
 * 'styles' allows for styling within typscript code.
 * @param theme originates from Material-UI
 */
const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  });

/**
 * @typeparam <typeof styles>
 * @param title title to display in the header
 */
interface Props extends WithStyles<typeof styles> {
  title: string;
}

/**
 * The [[Header]] functional component sits at the top of the application.
 * @param props used to pass in stylings
 * @returns React Element; the application header
 */
const Header: React.FC<Props> = props => {
  const { classes, title } = props;
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            component={Link}
            to={config.root + "/"}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <LineWeightIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default withStyles(styles)(Header);
