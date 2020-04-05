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
import config from "../../../config";
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
      defaultMode: { type: responseJSON.default_mode },
      monday: responseJSON.schedule.monday,
      tuesday: responseJSON.schedule.tuesday,
      wednesday: responseJSON.schedule.wednesday,
      thursday: responseJSON.schedule.thursday,
      friday: responseJSON.schedule.friday,
      saturday: responseJSON.schedule.saturday,
      sunday: responseJSON.schedule.sunday,
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
    this.BlindAPI.createFetch("/schedule", "POST", JSON.stringify(schedule));
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
}

export default Blind;
