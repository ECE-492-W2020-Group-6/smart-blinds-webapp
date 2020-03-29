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
import { ISchedule, ITimeSlot } from "../../../res/Interfaces";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";

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
      height: "70vh"
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
    timeTable: {
      // height: theme.spacing(6),
      borderBottomColor: "rgb(139, 195, 74)", //same here
      tableLayout: "fixed",
      width: "100%",
      margin: theme.spacing(1)
    },
    title: {
      flexGrow: 1,
      padding: theme.spacing(2)
    },
    list: {
      padding: theme.spacing(0)
    }
  });

interface GridElement extends ReactDataSheet.Cell<GridElement, number> {
  value: string | null;
}

class CalendarSheet extends ReactDataSheet<GridElement, number> {}

//You can also strongly type all the Components or SFCs that you pass into ReactDataSheet.
// let cellRenderer: ReactDataSheet.CellRenderer<GridElement, number> = props => {
//   const backgroundStyle =
//     props.cell.value && props.cell.value < 0 ? { color: "red" } : undefined;
//   return (
//     <td
//       style={backgroundStyle}
//       onMouseDown={props.onMouseDown}
//       onMouseOver={props.onMouseOver}
//       onDoubleClick={props.onDoubleClick}
//       className="cell"
//     >
//       {props.children}
//     </td>
//   );
// };

/**
 * @typeparam <typeof styles>
 * @param blind the blind in question
 */
interface Props extends WithStyles<typeof styles> {
  blind: Blind;
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

  let mapTimeToIndex = (time: Date) => {
    let index = 0;
    index += time.getHours() * 4;
    index += Math.ceil(time.getMinutes() / 15) * 15;
    return index;
  };

  let gridFromSchedule = (schedule: ISchedule) => {
    let grid: GridElement[][] = [];
    for (let day = 0; day < 7; day++) {
      let dayName = daysList[day];

      for (let time = 0; time < 24 * 4; time++) {
        if (grid[time] === undefined) {
          grid[time] = [];
        }
        grid[time].push({ value: schedule.defaultMode.type });
      }
      schedule[dayName].forEach((timeSlot: ITimeSlot) => {
        const startIdx = mapTimeToIndex(timeSlot.start);
        const endIdx = mapTimeToIndex(timeSlot.end);
        for (let idx = startIdx; idx < endIdx; idx++) {
          grid[idx][day] = { value: timeSlot.mode.type };
        }
      });
    }
    //  = [
    //   [{ value: 1 }, { value: 3 }],
    //   [{ value: 2 }, { value: 4 }]
    // ];
    return grid;
  };

  const [grid, setGrid] = useState(gridFromSchedule(schedule));
  const [mode, setMode] = useState(config.defaultObjects.blindMode);

  useEffect(() => {
    if (blind === undefined) {
      return;
    }
    blind.getSchedule().then(scheduleResponse => {
      setSchedule(scheduleResponse);
    });
  }, [blind]);

  let dayTitle = (day: string) => day[0].toLocaleUpperCase() + day.slice(1, 3);
  var weekDays = ["Time", ...daysList.map((day: string) => dayTitle(day))].map(
    (title: string, i: number) => (
      <Typography key={title} className={classes.dayHeader}>
        {title}
      </Typography>
    )
  );

  let timeLegend: GridElement[][] = [];
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
    if (timeLegend[i] === undefined) {
      timeLegend[i] = [];
    }
    timeLegend[i].push({ value: timeString });
  }

  var calendarGrid = (
    <CalendarSheet
      data={grid}
      valueRenderer={cell => cell.value}
      className={classes.timeTable}
      rowRenderer={props => <tr>{props.children}</tr>}
      // onCellsChanged={changes => {
      //   const tempgrid = grid.map(row => [...row]);
      //   changes.forEach(({ cell, row, col }) => {
      //     grid[row][col] = { ...grid[row][col] };
      //   });
      //   setGrid(tempgrid);
      // }}
      // cellRenderer={cellRenderer}
    ></CalendarSheet>
  );

  var calendarLegend = (
    <CalendarSheet
      data={timeLegend}
      valueRenderer={cell => cell.value}
      sheetRenderer={props => (
        <table className={classes.timeTable}>
          <tbody>{props.children}</tbody>
        </table>
      )}
      rowRenderer={props => <tr>{props.children}</tr>}
    ></CalendarSheet>
  );

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <div className={classes.weekWrapper}>{weekDays}</div>
        <div className={classes.timeSlotWrapper}>
          {/* {calendarLegend} */}
          {calendarGrid}
        </div>
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

// function arrayFromSchedule(schedule: ISchedule) {}

// function scheduleFromArray() {}

export default withStyles(styles)(CreateSchedule);
