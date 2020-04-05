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
 *  React-datasheet
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
  FormControl,
  Select,
  MenuItem,
  Slider,
} from "@material-ui/core";

import Blind from "../../../res/Classes/Blind";
import { Link } from "react-router-dom";
import config from "../../../config";
import Footer from "../../Atoms/Footer";
import { daysList, BLIND_MODE } from "../../../res/blindTypes";
import { ISchedule, ITimeSlot, IBlindMode } from "../../../res/Interfaces";
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
      padding: theme.spacing(0),
    },
    weekWrapper: {
      display: "grid",
      gridTemplateColumns: "repeat(8, minmax(25px, 1fr))",
      gridTemplateRows: "1fr",
      gridAutoFlow: "dense",
      justifyItems: "stretch",
      alignItems: "stretch",
      margin: theme.spacing(1),
    },
    timeSlotWrapper: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "scroll",
      height: "70vh",
    },
    dayHeader: {
      textAlign: "center",
    },
    tableRow: {
      height: theme.spacing(6),
      textAlign: "center",
      alignItems: "center",
      padding: "0px",
      // display: "grid"
    },
    timeTable: {
      // height: theme.spacing(6),
      borderBottomColor: "rgb(139, 195, 74)", //same here
      tableLayout: "fixed",
      borderSpacing: "0px",
      width: "calc(100% - 8px)",
      minWidth: theme.spacing(3),
      margin: theme.spacing(1),
    },
    fitTables: {
      width: "12.5%",
    },
    ecoClass: {
      verticalAlign: "middle !important",
      background: `${theme.palette.primary.dark} !important`,
      color: `${theme.palette.grey[50]} !important`,
    },
    lightClass: {
      verticalAlign: "middle !important",
      background: `${theme.palette.info.light} !important`,
      color: `${theme.palette.grey[800]} !important`,
    },
    darkClass: {
      verticalAlign: "middle !important",
      background: `${theme.palette.grey[600]} !important`,
      color: `${theme.palette.grey[50]} !important`,
    },
    manualClass: {
      verticalAlign: "middle !important",
      background: `${theme.palette.secondary.light} !important`,
      color: `${theme.palette.grey[800]} !important`,
    },
    balancedClass: {
      verticalAlign: "middle !important",
      background: `${theme.palette.primary.light} !important`,
      color: `${theme.palette.grey[800]} !important`,
    },
    typeSelect: {
      // position: "fixed",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      position: "absolute",
      bottom: "60px",
    },
    slider: {
      width: "20%",
    },
  });

interface GridElement extends ReactDataSheet.Cell<GridElement, number> {
  value: string | null;
}

interface TimeGrid extends GridElement {
  mode: IBlindMode;
}

class CalendarSheet extends ReactDataSheet<GridElement, number> {}

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
const CreateSchedule: React.FC<Props> = (props) => {
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
    MANUAL: classes.manualClass,
    BALANCED: classes.balancedClass,
  };

  const modeNames: { [mode: string]: string } = {
    ECO: "Eco",
    LIGHT: "Light",
    DARK: "Dark",
    MANUAL: "Set",
    BALANCED: "Auto",
  };

  let gridFromSchedule = (schedule: ISchedule) => {
    let grid: TimeGrid[][] = [];
    for (let day = 0; day < 7; day++) {
      let dayName = daysList[day];

      for (let time = 0; time < 24 * 4; time++) {
        if (grid[time] === undefined) {
          grid[time] = [];
        }
        grid[time].push({
          value: modeNames[schedule.defaultMode.type],
          mode: schedule.defaultMode,
          className: modeClasses[schedule.defaultMode.type],
          readOnly: true,
        });
      }

      schedule[dayName].forEach((timeSlot: ITimeSlot) => {
        const startIdx = mapTimeToIndex(timeSlot.start);
        const endIdx = mapTimeToIndex(timeSlot.end);
        for (let idx = startIdx; idx < endIdx; idx++) {
          grid[idx][day].value = modeNames[timeSlot.mode.type];
          grid[idx][day].mode = timeSlot.mode;
          grid[idx][day].className = modeClasses[timeSlot.mode.type];
        }
      });
    }
    return grid;
  };

  let scheduleFromGrid = (grid: TimeGrid[][]) => {
    let newSchedule: ISchedule = config.defaultObjects.schedule;
    newSchedule.defaultMode = mode;
    let hoursFromIdx = (idx: number) => {
      return padNumber(Math.floor(idx / 4));
    };
    let minsFromIdx = (idx: number) => {
      return padNumber((idx % 4) * 15);
    };
    let padNumber = (val: number) => {
      let str = String(val);
      while (str.length < 2) {
        str = "0" + str;
      }
      return str;
    };
    for (let idx = 0; idx < grid.length; idx++) {
      for (let day = 0; day < grid[idx].length; day++) {
        let block = grid[idx];
        newSchedule[daysList[day]].push({
          start: new Date(
            `2020-03-22T${hoursFromIdx(idx)}:${minsFromIdx(idx)}:00`
          ),
          end: new Date(
            `2020-03-22T${hoursFromIdx(idx + 1)}:${minsFromIdx(idx + 1)}:00`
          ),
          mode: block[day].mode,
        });
      }
    }
    return newSchedule;
  };

  const [grid, setGrid] = useState(gridFromSchedule(schedule));
  const [mode, setMode] = useState<IBlindMode>(config.defaultObjects.blindMode);
  const [percentage, setPercentage] = useState(
    mode.percentage ? mode.percentage : 0
  );
  const [selection, setSelection] = useState<ReactDataSheet.Selection>({
    start: { i: 0, j: 0 },
    end: { i: 0, j: 0 },
  });

  // blind.getSchedule().then((scheduleResponse) => {
  //   setSchedule(scheduleResponse);
  // });

  useEffect(() => {
    if (blind === undefined) {
      return;
    }
    blind.getSchedule().then((scheduleResponse) => {
      setSchedule(scheduleResponse);
    });
  }, [blind]);

  useEffect(() => {
    if (schedule === undefined) {
      return;
    }

    setGrid(gridFromSchedule(schedule));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule]);

  let saveSchedule = () => {
    let newSchedule: ISchedule = scheduleFromGrid(grid);
    console.log("New", newSchedule);
    console.log("from", grid);
    setSchedule(newSchedule);
    blind.setSchedule(newSchedule);
  };

  let discardSchedule = () => {
    setGrid(gridFromSchedule(schedule));
  };

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

  let applySelection = () => {
    const tempgrid = grid.map((row) => [...row]);
    for (let i = selection.start.i; i <= selection.end.i; i++) {
      for (let j = selection.start.j; j <= selection.end.j; j++) {
        tempgrid[i][j].value = modeNames[mode.type];
        tempgrid[i][j].mode = mode;
        tempgrid[i][j].className = modeClasses[mode.type];
      }
    }
    setGrid(tempgrid);
  };

  var calendarGrid = (
    <CalendarSheet
      data={grid}
      valueRenderer={(cell) => cell.value}
      className={classes.timeTable}
      rowRenderer={(props) => (
        <tr className={classes.tableRow}>{props.children}</tr>
      )}
      onSelect={(selection: ReactDataSheet.Selection) => {
        setSelection(selection);
      }}
    ></CalendarSheet>
  );

  var calendarLegend = (
    <CalendarSheet
      data={timeLegend}
      valueRenderer={(cell) => cell.value}
      sheetRenderer={(props) => (
        <table className={classes.timeTable}>
          <tbody>{props.children}</tbody>
        </table>
      )}
      rowRenderer={(props) => (
        <tr className={classes.tableRow}>{props.children}</tr>
      )}
    ></CalendarSheet>
  );

  const handleMode = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMode({ type: event.target.value as BLIND_MODE, percentage: percentage });
  };
  const handlePercentage = (
    event: React.ChangeEvent<{}>,
    value: number | number[]
  ) => {
    if (Array.isArray(value)) {
      return;
    }
    setPercentage(value);
  };

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
        <Paper className={classes.typeSelect}>
          <Typography>Set Mode</Typography>
          <FormControl>
            {/* <InputLabel>Type</InputLabel> */}
            <Select value={mode.type} onChange={handleMode}>
              <MenuItem value={"ECO"}>Eco</MenuItem>
              <MenuItem value={"BALANCED"}>Balanced (Auto)</MenuItem>
              <MenuItem value={"LIGHT"}>Light</MenuItem>
              <MenuItem value={"DARK"}>Dark</MenuItem>
              <MenuItem value={"MANUAL"}>Custom</MenuItem>
            </Select>
          </FormControl>
          {mode.type === "MANUAL" ? (
            <Slider
              className={classes.slider}
              min={-100}
              max={100}
              step={10}
              value={percentage}
              onChange={handlePercentage}
              aria-labelledby="continuous-slider"
            ></Slider>
          ) : (
            ""
          )}
          {mode.type === "MANUAL" ? (
            <Typography>{percentage + "°"}</Typography>
          ) : (
            ""
          )}

          <Button
            onClick={() => {
              applySelection();
            }}
          >
            Apply
          </Button>
        </Paper>
      </Paper>
      <Footer
        buttons={[
          <Button
            onClick={() => {
              saveSchedule();
            }}
            component={Link}
            to={config.root + "/blind"}
            color="inherit"
          >
            Save
          </Button>,
          <Button
            onClick={() => {
              discardSchedule();
            }}
            component={Link}
            to={config.root + "/blind"}
            color="inherit"
          >
            Cancel
          </Button>,
        ]}
      />
    </React.Fragment>
  );
};

// function arrayFromSchedule(schedule: ISchedule) {}

// function scheduleFromArray() {}

export default withStyles(styles)(CreateSchedule);
