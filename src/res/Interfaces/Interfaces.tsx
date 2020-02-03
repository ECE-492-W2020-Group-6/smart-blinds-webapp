export interface IStats {
  indoorTemp: number;
  outdoorTemp: number;
  cloudCoverage: string;
  motorPosition: number;
}

export interface ICredentials {
  address: string;
  password: string;
}

export interface ISchedule {
  days: string;
}
