/**
 * Entity Names:
 *
 * Author(s):
 *  Kevin de Haan
 * Date Created:
 *  Mar 9, 2020
 * Derived From:
 *  material-ui
 *
 * Modal component for sending manual commands to blinds
 */
import React, { useState } from "react";
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Modal
} from "@material-ui/core";

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
    modalDiv: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  });

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

/**
 * @typeparam <typeof styles>
 * @param stats stats to display
 */
interface Props extends WithStyles<typeof styles> {
  sendCommand: () => void;
  open: boolean;
  handleClose: () => void;
}

/**
 * The [[StatusPaper]] functional component provides stats in a compact display
 * @param props used to pass in stylings
 * @returns React Element; A material-ui 'paper' component displaying stats
 */
const CommandModal: React.FC<Props> = props => {
  const { classes, open, handleClose, sendCommand } = props;
  const [modalStyle] = useState(getModalStyle);

  return (
    <React.Fragment>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.modalDiv}>
          Nice
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default withStyles(styles)(CommandModal);
