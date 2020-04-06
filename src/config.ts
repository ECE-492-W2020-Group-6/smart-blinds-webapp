import { ISchedule, IStats, IBlindMode, ICredentials } from "./res/Interfaces";
import Blind from "../src/res/Classes/Blind";

const defaultBlindMode: IBlindMode = {
  type: "BALANCED",
};

// const onBlindMode: IBlindMode = {
//   type: "LIGHT"
// };

// const offBlindMode: IBlindMode = {
//   type: "DARK"
// };

// const customBlindMode: IBlindMode = {
//   type: "CUSTOM"
// };

const t1 = new Date("2020-03-22T06:00:00Z");
var t2 = new Date(t1);
t2.setHours(4);
var t3 = new Date(t2);
t3.setHours(8);

const defaultSchedule: ISchedule = {
  defaultMode: defaultBlindMode,
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
};
let realTestBlind: Blind = new Blind("Real Blind", {
  address: "http://10.147.17.181:5000",
  password: "",
});

let localServerBlind: Blind = new Blind("Localhost", {
  address: "http://127.0.0.1:5000",
  password: "",
});

// let testBlind: Blind = new Blind("Test Blinds", {
//   address: "localhost",
//   password: "123pass",
// });
// let otherBlind: Blind = new Blind("Other blinds", {
//   address: "1.255.02.3",
//   password: "pass123",
// });
const sampleStats: IStats = {
  indoorTemp: 21,
  // outdoorTemp: 20,
  // cloudCoverage: "Low",
  mode: "DARK",
  motorPosition: 0,
};

const defaultStats: IStats = {
  indoorTemp: 0,
  // outdoorTemp: 0,
  // cloudCoverage: "Low",
  mode: "BALANCED",
  motorPosition: 0,
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
    credentials: ICredentials;
  };
}

const config: IConfig = {
  root: "/smart-blinds-webapp",
  defaultPath: "/",
  mainTitle: "Smart Blinds",
  MOTORMIDPOINT: -30,
  testCases: {
    schedules: [defaultSchedule],
    stats: [sampleStats],
    blinds: [localServerBlind, realTestBlind],
  },
  defaultObjects: {
    schedule: defaultSchedule,
    blindMode: defaultBlindMode,
    stats: defaultStats,
    credentials: { address: "http://10.147.17.181:5000", password: "" },
  },
};

export default config;
