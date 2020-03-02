import { ISchedule, IStats, IBlindMode } from "./res/Interfaces";
import Blind from "../src/res/Classes/Blind";

const defaultBlindMode: IBlindMode = {
  type: "ECO"
};

const defaultSchedule: ISchedule = {
  defaultMode: defaultBlindMode,
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: []
};

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
    blinds: [testBlind, otherBlind]
  },
  defaultObjects: {
    schedule: defaultSchedule,
    blindMode: defaultBlindMode
  }
};

export default config;
