import React from "react";
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Button
} from "@material-ui/core";
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
 * @param blind the blind in question
 */
interface Props extends WithStyles<typeof styles> {
  blind: Blind;
}

/**
 * The [[BlindInfo]] functional component acts as the
 * primary landing page for the application.
 * @param props used to pass in stylings and the blind object
 * @returns React Element; the BlindInfo component
 */
const BlindInfo: React.FC<Props> = props => {
  const { blind } = props;
  return (
    <React.Fragment>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </React.Fragment>
  );
};

export default withStyles(styles)(BlindInfo);
