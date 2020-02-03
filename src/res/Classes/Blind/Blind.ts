import BlindAPI from "../BlindAPI";
import { ICredentials, IStats, ISchedule } from "../../Interfaces";

class Blind {
  private name: string;
  private BlindAPI: BlindAPI;
  private address: string;
  constructor(name: string, credentials: ICredentials) {
    this.BlindAPI = new BlindAPI(credentials);
    this.name = name;
    this.address = credentials.address;
  }

  async getStatus(): Promise<IStats> {
    let response = await this.BlindAPI.createFetch("Status");
    let responseJSON = await response.clone().json();
    let status: IStats = responseJSON.status;
    return status;
  }

  async getSchedule(): Promise<ISchedule> {
    let response = await this.BlindAPI.createFetch("Status");
    let responseJSON = await response.clone().json();
    let schedule: ISchedule = responseJSON.status;
    return schedule;
  }

  async setSchedule(schedule: ISchedule) {
    this.BlindAPI.createFetch(JSON.stringify(schedule));
    // let responseJSON = await response.clone().json();
  }

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getAddress(): string {
    return this.address;
  }

  // buildDefaultSchedule(): ISchedule {
  //   return { days: "yes" };
  // }
}

export default Blind;
