import { ISchedule, IStats, IBlindMode } from "./res/Interfaces";
import Blind from "../src/res/Classes/Blind";

const defaultBlindMode: IBlindMode = {
  type: "ECO"
};

const onBlindMode: IBlindMode = {
  type: "LIGHT"
};

const date = new Date("2020-03-22T06:00:00Z");
var end = new Date(date);
end.setHours(4);

const defaultSchedule: ISchedule = {
  defaultMode: defaultBlindMode,
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [{ mode: onBlindMode, start: date, end: end }]
};
let realTestBlind: Blind = new Blind("Physical Test", {
  address: "http://10.147.17.181:5000/api/v1",
  password: ""
});

let localServerBlind: Blind = new Blind("Local Test", {
  address: "http://127.0.0.1:5000/api/v1",
  password: ""
});

let testBlind: Blind = new Blind("Test Blinds", {
  address: "localhost",
  password: "123pass"
});
let otherBlind: Blind = new Blind("Other blinds", {
  address: "1.255.02.3",
  password: "pass123"
});
const sampleStats: IStats = {
  indoorTemp: 21,
  outdoorTemp: 20,
  cloudCoverage: "Low",
  motorPosition: 0
};

const defaultStats: IStats = {
  indoorTemp: 0,
  outdoorTemp: 0,
  cloudCoverage: "Low",
  motorPosition: 0
};

interface IConfig {
  root: string;
  defaultPath: string;
  mainTitle: string;
  MOTORMIDPOINT: number;
  testCases: {
    schedules: ISchedule[];
    stats: IStats[];
    blinds: Blind[];
  };
  defaultObjects: {
    schedule: ISchedule;
    blindMode: IBlindMode;
    stats: IStats;
  };
}

const config: IConfig = {
  root: "/smart-blinds-webapp",
  defaultPath: "/",
  mainTitle: "Smart Blinds",
  MOTORMIDPOINT: 50,
  testCases: {
    schedules: [defaultSchedule],
    stats: [sampleStats],
    blinds: [localServerBlind, realTestBlind, testBlind, otherBlind]
  },
  defaultObjects: {
    schedule: defaultSchedule,
    blindMode: defaultBlindMode,
    stats: defaultStats
  }
};

export default config;
