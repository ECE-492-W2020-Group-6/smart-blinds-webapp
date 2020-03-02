/**
 * Entity Names:
 *  CreateSchedule
 *  props
 *  styles
 * Author(s):
 *  Kevin de Haan
 * Date Created:
 *  Feb 18, 2020
 * Derived From:
 *
 *
 * Schedule builder UI
 */
import React, { useState, useEffect } from "react";
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Paper,
  Button,
  Typography,
  GridList,
  GridListTile,
  Box
} from "@material-ui/core";

import Blind from "../../../res/Classes/Blind";
import { Link } from "react-router-dom";
import config from "../../../config";
import Footer from "../../Atoms/Footer";
import { daysList } from "../../../res/blindTypes";
import { ISchedule } from "../../../res/Interfaces";

/**
 * 'styles' allows for styling within typescript code.
 * @param theme originates from Material-UI
 */
const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(0)
    },
    weekWrapper: {
      display: "grid",
      gridTemplateColumns: "repeat(8, minmax(25px, 1fr))",
      gridTemplateRows: "1fr",
      gridAutoFlow: "dense",
      justifyItems: "stretch",
      alignItems: "stretch",
      margin: theme.spacing(1)
    },
    timeSlotWrapper: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "scroll",
      height: "70vh",
      margin: theme.spacing(1)
    },
    dayHeader: {
      textAlign: "center"
    },
    timeLegend: {
      textAlign: "center",
      alignItems: "center",
      display: "grid",
      height: theme.spacing(6),
      borderBottomColor: "rgb(139, 195, 74)" //material ui is currently bugged, so this is required
    },
    timeSlot: {
      height: theme.spacing(6),
      borderBottomColor: "rgb(139, 195, 74)" //same here
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
 * @param title slot title
 * @param colour slot colour
 */
interface ITimeSlotUI {
  title?: string;
  colour?: string;
}

/**
 * The [[CreateSchedule]] functional component acts as the
 * UI for creating and setting schedules
 * @param props used to pass in stylings and the blind object
 * @returns React Element; the BlindMenu component
 */
const CreateSchedule: React.FC<Props> = props => {
  const { classes, blind } = props;
  const [schedule, setSchedule] = useState(config.defaultObjects.schedule);
  const [tempSchedule, setTempSchedule] = useState(schedule);

  useEffect(() => {
    if (blind === undefined) {
      return;
    }
    blind.getSchedule().then(scheduleResponse => {
      setSchedule(scheduleResponse);
    });
  }, [blind]);

  let dayTitle = (day: string) => day[0].toLocaleUpperCase() + day.slice(1, 3);
  var weekDays = [
    "Time",
    ...daysList.map((day: string) => dayTitle(day))
  ].map((title: string, i: number) => (
    <Typography className={classes.dayHeader}>{title}</Typography>
  ));

  const timeLegend: ITimeSlotUI[] = [];
  for (let i = 0; i < 24 * 4; i++) {
    let hour: number = Math.floor(i / 4);
    let period: string = hour > 11 ? "PM" : "AM";
    if (period === "PM" && hour !== 12) {
      hour -= 12;
    } else if (hour === 0) {
      hour += 12;
    }
    let minute: number = (i % 4) * 15;

    let timeString: string = `${hour}:${
      minute === 0 ? "00" : minute
    } ${period} `;
    timeLegend.push({ title: timeString });
  }

  let emptySlot: ITimeSlotUI = { title: "" };
  let emptyArray: ITimeSlotUI[] = [];
  for (let i = 0; i < 7; i++) {
    emptyArray.push(emptySlot);
  }
  let scheduleArray: ITimeSlotUI[] = [];
  timeLegend.forEach((time: ITimeSlotUI) =>
    scheduleArray.push(time, ...emptyArray)
  );

  function makeSlotTile(item: ITimeSlotUI, i: number) {
    let className = classes.timeSlot;
    let borderLeft = 0;
    let borderTop = i < 8 ? 1 : 0;
    let borderBottom = Math.floor(i / 8) % 4 === 3 ? 2 : 1;
    let borderColor = "primary.main";
    if (i % 8 === 0) {
      borderLeft = 1;
      className = classes.timeLegend;
    }
    return (
      <Box
        borderBottom={borderBottom}
        borderColor={borderColor}
        borderTop={borderTop}
        borderLeft={borderLeft}
        border={1}
        className={className}
      >
        {item.title}
      </Box>
    );
  }

  var calendarGrid = (
    <GridList spacing={0} cellHeight="auto" cols={8}>
      {scheduleArray.map((item: ITimeSlotUI, i: number) => (
        <GridListTile key={i} cols={1}>
          {makeSlotTile(item, i)}
        </GridListTile>
      ))}
    </GridList>
  );

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <div className={classes.weekWrapper}>{weekDays}</div>
        <div className={classes.timeSlotWrapper}>{calendarGrid}</div>
      </Paper>
      <Footer
        buttons={[
          <Button
            // onClick={() => {
            //   switchSchedule(schedule);
            // }}
            component={Link}
            to={config.root + "/blind"}
            color="inherit"
          >
            Save
          </Button>,
          <Button component={Link} to={config.root + "/blind"} color="inherit">
            Cancel
          </Button>
        ]}
      />
    </React.Fragment>
  );
};

function arrayFromSchedule(schedule: ISchedule) {}

function scheduleFromArray() {}

export default withStyles(styles)(CreateSchedule);
