/**
 * Entity Names:
 *  Header
 *  styles
 * Author(s):
 *  Kevin de Haan
 * Date Created:
 *  Feb 11, 2020
 * Derived From:
 *  create-react-app
 *
 * The Footer functional component provides buttons at the bottom of the screen.
 *
 */
import React from "react";
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Toolbar,
  AppBar
} from "@material-ui/core";

/**
 * 'styles' allows for styling within typescript code.
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
    },
    appBar: {
      top: "auto",
      bottom: 0
    },
    toolBar: {
      display: "flex",
      justifyContent: "space-between"
    }
  });

/**
 * @typeparam <typeof styles>
 */
interface Props extends WithStyles<typeof styles> {
  buttons: JSX.Element[];
}

/**
 * The [[Footer]] functional component sits at the bottom of the application.
 * @param props used to pass in stylings
 * @returns React Element; the component footer
 */
const Footer: React.FC<Props> = props => {
  const { buttons, classes } = props;
  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          {buttons.map((button: JSX.Element, index: number) => (
            <React.Fragment key={index}>{button}</React.Fragment>
          ))}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default withStyles(styles)(Footer);
