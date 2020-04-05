/**
 * Entity Names:
 *  Blind
 * Author(s):
 *  Kevin de Haan
 * Date Created:
 *  Feb 1, 2020
 * Derived From:
 *  N/A
 *
 * Object that abstracts blind actions to the rest of the application
 */
import BlindAPI from "../BlindAPI";
import {
  ICredentials,
  IStats,
  ISchedule,
  IBlindMode,
  ITimeSlot,
  IBlindCommand,
} from "../../Interfaces";
// import config from "../../../config";
import { daysList } from "../../blindTypes";

/**
 * Abstracts Smart Blind operation
 */
class Blind {
  private name: string;
  private BlindAPI: BlindAPI;
  private address: string;
  /**
   * @param name Name of blind device
   * @param credentials credential object for access and authentication
   */
  constructor(name: string, credentials: ICredentials) {
    this.BlindAPI = new BlindAPI(credentials);
    this.name = name;
    this.address = credentials.address;
  }

  /**
   * @returns a promise that resolves to an [[IStats]] object
   */
  async getStatus(): Promise<IStats> {
    let response = await this.BlindAPI.createFetch("/status", "GET");
    let responseJSON = await response.clone().json();
    let status: IStats = {
      indoorTemp: responseJSON.temperature,
      motorPosition: responseJSON.position,
      mode: responseJSON.mode,
    };
    const promise = new Promise<IStats>((resolve, reject) => {
      setTimeout(() => {
        resolve(status);
      }, 500);
    });
    return promise;
  }

  /**
   * @returns current behavior mode
   */
  GetCurrentBehavior(schedule: ISchedule): IBlindMode {
    let now: Date = new Date();
    let scheduleDay: ITimeSlot[] = schedule[daysList[now.getUTCDay()]];
    if (scheduleDay.length === 0) {
      return schedule.defaultMode;
    }
    scheduleDay.forEach((timeSlot: ITimeSlot) => {
      if (this.TimeslotIsActive(timeSlot, now)) {
        return timeSlot.mode;
      }
    });
    return schedule.defaultMode;
  }

  /**
   * @returns if specified time is in the specified time slot
   */
  TimeslotIsActive(timeSlot: ITimeSlot, time: Date): boolean {
    function getTimeOfDay(date: Date) {
      return `${date.getUTCHours}${date.getUTCMinutes}${date.getUTCSeconds}`;
    }
    let timeOfDay: string = getTimeOfDay(time);
    if (
      timeOfDay >= getTimeOfDay(timeSlot.start) &&
      timeOfDay < getTimeOfDay(timeSlot.end)
    ) {
      return true;
    }
    return false;
  }

  /**
   * @returns a promise that resolves to an [[ISchedule]] object
   */
  async getSchedule(): Promise<ISchedule> {
    let response = await this.BlindAPI.createFetch("/schedule", "GET");
    let responseJSON = await response.clone().json();
    let schedule: ISchedule = {
      defaultMode: {
        type: responseJSON.default_mode,
        percentage: responseJSON.default_pos,
      },
      monday: responseJSON.schedule.monday.map(this.timeBlockFromjson),
      tuesday: responseJSON.schedule.tuesday.map(this.timeBlockFromjson),
      wednesday: responseJSON.schedule.wednesday.map(this.timeBlockFromjson),
      thursday: responseJSON.schedule.thursday.map(this.timeBlockFromjson),
      friday: responseJSON.schedule.friday.map(this.timeBlockFromjson),
      saturday: responseJSON.schedule.saturday.map(this.timeBlockFromjson),
      sunday: responseJSON.schedule.sunday.map(this.timeBlockFromjson),
    };
    console.log(responseJSON);
    const promise = new Promise<ISchedule>((resolve, reject) => {
      setTimeout(() => {
        resolve(schedule);
      }, 500);
    });

    return promise;
  }

  /**
   * @param schedule sends or configures a new schedule to a device
   */
  async setSchedule(schedule: ISchedule) {
    // let convSchedule = {
    //   default_mode: schedule.defaultMode.type,
    //   default_pos: schedule.defaultMode.percentage,
    //   schedule: {
    //     monday: schedule.monday,
    //     tuesday: schedule.tuesday,
    //     wednesday: schedule.wednesday,
    //     thursday: schedule.thursday,
    //     friday: schedule.friday,
    //     saturday: schedule.saturday,
    //     sunday: schedule.sunday,
    //   },
    //   // timezone: new Date().getTimezoneOffset(),
    //   timezone: "America/Edmonton",
    // };
    let convSchedule = this.scheduleToJson(schedule);

    this.BlindAPI.createFetch(
      "/schedule",
      "POST",
      JSON.stringify(convSchedule)
    );
    // let responseJSON = await response.clone().json();
  }

  /**
   * @param command sends a new command to the device
   */
  async sendCommand(command: IBlindCommand, callback: (response: any) => void) {
    let response = await this.BlindAPI.createFetch(
      "/command",
      "POST",
      JSON.stringify(command)
    );
    let responseJSON = await response.clone().json();
    callback(responseJSON);
  }

  /**
   * @returns name of the blind
   */
  getName(): string {
    return this.name;
  }

  /**
   * @param name sets a new name for the blind
   */
  setName(name: string) {
    this.name = name;
  }

  /**
   * @returns IP address of blind device
   */
  getAddress(): string {
    return this.address;
  }

  /**
   * Custom JSONify for schedule to match server's specifications
   */
  private scheduleToJson(convSched: ISchedule): Object {
    let pos = convSched.defaultMode.percentage;
    if (pos === undefined) {
      pos = null;
    }
    let jsonData = {
      default_mode: convSched.defaultMode.type,
      default_pos: pos,
      timezone: "America/Edmonton",
      schedule: {
        monday: convSched.monday.map(this.timeBlockToJson),
        tuesday: convSched.tuesday.map(this.timeBlockToJson),
        wednesday: convSched.wednesday.map(this.timeBlockToJson),
        thursday: convSched.thursday.map(this.timeBlockToJson),
        friday: convSched.friday.map(this.timeBlockToJson),
        saturday: convSched.saturday.map(this.timeBlockToJson),
        sunday: convSched.sunday.map(this.timeBlockToJson),
      },
    };

    return jsonData;
  }

  /**
   * Custom JSONify for time blocks to match server's specifications
   */
  private timeBlockToJson(block: ITimeSlot): Object {
    let pos = block.mode.percentage;
    if (pos === undefined) {
      pos = null;
    }
    let padNumber = (val: number) => {
      let str = String(val);
      while (str.length < 2) {
        str = "0" + str;
      }
      return str;
    };
    let jsonData = {
      start:
        padNumber(block.start.getHours()) +
        ":" +
        padNumber(block.start.getMinutes()),
      end:
        padNumber(block.end.getHours()) +
        ":" +
        padNumber(block.end.getMinutes()),
      mode: block.mode.type,
      position: pos,
    };

    return jsonData;
  }

  /**
   * Custom deserializer for server formated time blocks
   *
   */
  private timeBlockFromjson(jsonObj: any): ITimeSlot {
    let timeBlock: ITimeSlot = {
      start: new Date("2020-01-01T" + jsonObj.start),
      end: new Date("2020-01-01T" + jsonObj.end),
      mode: { type: jsonObj.mode, percentage: jsonObj.position },
    };

    return timeBlock;
  }
}

export default Blind;
