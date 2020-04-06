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
  TextField,
} from "@material-ui/core";
// import { BLIND_MODE } from "../../../res/blindTypes";
import Blind from "../../../res/Classes/Blind";
import { ICredentials } from "../../../res/Interfaces";
import config from "../../../config";

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
    modalDiv: {
      position: "absolute",
      width: "90%",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid",
      borderRadius: "4px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    formControl: {
      margin: theme.spacing(1),
      midWidth: 120,
      maxWidth: 120,
    },
    inputs: {
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
      flexWrap: "wrap",
    },
    slider: {
      width: "20%",
    },
  });

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

/**
 * @typeparam <typeof styles>
 * @param stats stats to display
 */
interface Props extends WithStyles<typeof styles> {
  addBlind: (blind: Blind) => void;
  open: boolean;
  handleClose: () => void;
}

/**
 * The [[StatusPaper]] functional component provides stats in a compact display
 * @param props used to pass in stylings
 * @returns React Element; A material-ui 'paper' component displaying stats
 */
const AddModal: React.FC<Props> = (props) => {
  const { classes, open, handleClose, addBlind } = props;
  const [modalStyle] = useState(getModalStyle);
  const [name, setName] = useState<string>("blinds");
  const [creds, setCreds] = useState<ICredentials>(
    config.defaultObjects.credentials
  );

  const handleName = (event: React.ChangeEvent<{ value: unknown }>) => {
    setName(event.target.value as string);
  };

  const handlePassword = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCreds({
      address: creds.address,
      password: event.target.value as string,
    });
  };

  const handleAddress = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCreds({
      address: event.target.value as string,
      password: creds.password,
    });
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
          <h2 id="simple-modal-title">New Connection</h2>
          <p id="simple-modal-description">Add Smart Blinds</p>
          <div className={classes.inputs}>
            <FormControl className={classes.formControl}>
              <TextField
                required
                onChange={handleName}
                id="standard-required"
                label="Name"
                defaultValue={name}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                onChange={handleAddress}
                required
                id="standard-required"
                label="IP"
                defaultValue={creds.address}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                onChange={handlePassword}
                id="standard-password-input"
                required
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </FormControl>

            <Button
              onClick={() => {
                addBlind(new Blind(name, creds));
                handleClose();
              }}
            >
              Add Blinds
            </Button>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default withStyles(styles)(AddModal);
