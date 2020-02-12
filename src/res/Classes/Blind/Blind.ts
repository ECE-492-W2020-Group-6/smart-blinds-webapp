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
import { ICredentials, IStats, ISchedule } from "../../Interfaces";

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
    // let response = await this.BlindAPI.createFetch("Status");
    // let responseJSON = await response.clone().json();
    // let status: IStats = responseJSON.status;
    let status = {
      // temp
      indoorTemp: 22,
      outdoorTemp: -23,
      cloudCoverage: "high",
      motorPosition: 50
    };

    const promise = new Promise<IStats>((resolve, reject) => {
      setTimeout(() => {
        resolve(status);
      }, 500);
    });
    return promise;
  }

  /**
   * @returns a promise that resolves to an [[ISchedule]] object
   */
  async getSchedule(): Promise<ISchedule> {
    // let response = await this.BlindAPI.createFetch("Status");
    // let responseJSON = await response.clone().json();
    // let schedule: ISchedule = responseJSON.status;

    var schedule = { days: "Auto" };
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
    this.BlindAPI.createFetch(JSON.stringify(schedule));
    // let responseJSON = await response.clone().json();
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
