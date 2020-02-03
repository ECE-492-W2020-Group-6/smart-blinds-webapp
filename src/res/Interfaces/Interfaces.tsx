/**
 * Entity Names:
 *  IStats
 *  ICredentials
 *  ISchedule
 * Author(s):
 *  Kevin de Haan
 * Date Created:
 *
 * Derived From:
 *  N/A
 *
 * Interface declarations for data structures
 */

/**
 * Condensed structure for storing commonly modified statistics
 * from the blinds
 * @var `indoorTemp` Indoor temperature measured by the smart blinds
 * @var `outdoorTemp` Outdoor temperature reported by the blinds
 * @var `cloudCoverage` Brief description of current cloud coverage
 * @var `motorPosition` Value from 0-100 describing current rotational position
 */
export interface IStats {
  indoorTemp: number;
  outdoorTemp: number;
  cloudCoverage: string;
  motorPosition: number;
}

/**
 * Data required to connect to and authenticate with a smart blind device
 * @var `address` IP address of the blinds web server
 * @var `password` Password required to access the device
 */
export interface ICredentials {
  address: string;
  password: string;
}

/**
 * Describes a schedule for a smart blind device to follow
 * @var `days` placeholder until schedule object is better defined
 */
export interface ISchedule {
  days: string;
}
