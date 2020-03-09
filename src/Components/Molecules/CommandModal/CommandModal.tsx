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
  Modal,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { BLIND_MODE } from "../../../res/blindTypes";

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
      width: "90%",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid",
      borderRadius: "4px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    },
    formControl: {
      margin: theme.spacing(1),
      midWidth: 120
    },
    inputs: {
      display: "flex",
      justifyContent: "left"
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
  sendCommand: (mode: BLIND_MODE, duration: number, amount?: number) => void;
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
  const [duration, setDuration] = useState(30);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDuration(event.target.value as number);
  };
  return (
    <React.Fragment>
      <Modal open={open} onClose={handleClose}>
        <div
          style={modalStyle}
          className={classes.modalDiv}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <h2 id="simple-modal-title">Manual Control</h2>
          <p id="simple-modal-description">Control the blinds directly</p>
          <div className={classes.inputs}>
            <FormControl className={classes.formControl}>
              <InputLabel>Duration</InputLabel>
              <Select value={duration} onChange={handleChange}>
                <MenuItem value={30}>30 Mins</MenuItem>
                <MenuItem value={60}>1 Hour</MenuItem>
                <MenuItem value={240}>4 Hours</MenuItem>
                <MenuItem value={0}>Today</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={() => {
                sendCommand("LIGHT", duration);
                handleClose();
              }}
            >
              Open
            </Button>
            <Button
              onClick={() => {
                sendCommand("DARK", duration);
                handleClose();
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default withStyles(styles)(CommandModal);
