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
import { daysList, BLIND_MODE } from "../../../res/blindTypes";
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
    tableRow: {
      height: theme.spacing(6),
      textAlign: "center",
      alignItems: "center",
      padding: "0px"
      // display: "grid"
    },
    timeTable: {
      // height: theme.spacing(6),
      borderBottomColor: "rgb(139, 195, 74)", //same here
      tableLayout: "fixed",
      borderSpacing: "0px",
      width: "calc(100% - 8px)",
      minWidth: theme.spacing(3),
      margin: theme.spacing(1)
    },
    fitTables: {
      width: "12.5%"
    },
    ecoClass: {
      verticalAlign: "middle !important",
      background: `${theme.palette.primary.light} !important`,
      color: `${theme.palette.grey[800]} !important`
    },
    lightClass: {
      verticalAlign: "middle !important",
      background: `${theme.palette.info.light} !important`,
      color: `${theme.palette.grey[800]} !important`
    },
    darkClass: {
      verticalAlign: "middle !important",
      background: `${theme.palette.grey[600]} !important`,
      color: `${theme.palette.grey[50]} !important`
    },
    customClass: {
      verticalAlign: "middle !important",
      background: `${theme.palette.secondary.light} !important`,
      color: `${theme.palette.grey[800]} !important`
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

  const modeClasses: { [mode: string]: string } = {
    ECO: classes.ecoClass,
    LIGHT: classes.lightClass,
    DARK: classes.darkClass,
    CUSTOM: classes.customClass
  };

  let gridFromSchedule = (schedule: ISchedule) => {
    let grid: GridElement[][] = [];
    for (let day = 0; day < 7; day++) {
      let dayName = daysList[day];

      for (let time = 0; time < 24 * 4; time++) {
        if (grid[time] === undefined) {
          grid[time] = [];
        }
        grid[time].push({
          value: schedule.defaultMode.type.toLowerCase(),
          className: modeClasses[schedule.defaultMode.type],
          readOnly: true
        });
      }

      schedule[dayName].forEach((timeSlot: ITimeSlot) => {
        const startIdx = mapTimeToIndex(timeSlot.start);
        const endIdx = mapTimeToIndex(timeSlot.end);
        for (let idx = startIdx; idx < endIdx; idx++) {
          grid[idx][day].value = timeSlot.mode.type.toLowerCase();
          grid[idx][day].className = modeClasses[timeSlot.mode.type];
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
      rowRenderer={props => (
        <tr className={classes.tableRow}>{props.children}</tr>
      )}
      // cellRenderer={props => (
      //   <div
      //   // className={props.className}
      //   // onMouseDown={props.onMouseDown}
      //   // onMouseOver={props.onMouseOver}
      //   // onDoubleClick={props.onDoubleClick}
      //   >
      //     {props.children}
      //   </div>
      // )}
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
      rowRenderer={props => (
        <tr className={classes.tableRow}>{props.children}</tr>
      )}
    ></CalendarSheet>
  );

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <div className={classes.weekWrapper}>{weekDays}</div>
        <div className={classes.timeSlotWrapper}>
          <table>
            <tbody>
              <tr>
                <td className={classes.fitTables}>{calendarLegend}</td>
                <td>{calendarGrid}</td>
              </tr>
            </tbody>
          </table>
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
