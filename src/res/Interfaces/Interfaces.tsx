import { BLIND_MODE } from "../blindTypes";

/**
 * Entity Names:
 *  IStats
 *  ICredentials
 *  ISchedule
 * Author(s):
 *  Kevin de Haan
 * Date Created:
 *  Feb 1, 2020
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
  // outdoorTemp: number;
  // cloudCoverage: string;
  motorPosition: number;
  mode: BLIND_MODE;
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
 * @var defaultMode default operating mode
 * @var monday_to_sunday specified non-default behavior times per day
 */
export interface ISchedule {
  defaultMode: IBlindMode;
  monday: ITimeSlot[];
  tuesday: ITimeSlot[];
  wednesday: ITimeSlot[];
  thursday: ITimeSlot[];
  friday: ITimeSlot[];
  saturday: ITimeSlot[];
  sunday: ITimeSlot[];
}

/**
 * Describes a single block of schedule time
 * @var start beginning of block
 * @var end end of block
 * @var mode operating mode
 */
export interface ITimeSlot {
  start: Date;
  end: Date;
  mode: IBlindMode;
}

/**
 * Describes a single block of schedule time
 * @var type operating mode
 * @var percentage operating magnitude
 */
export interface IBlindMode {
  type: BLIND_MODE;
  percentage?: number | null;
}

/**
 * Describes a single manual command
 * @var mode operating mode
 * @var duration duration in minutes
 * @var position tbd
 */
export interface IBlindCommand {
  mode: BLIND_MODE;
  duration: number;
  position: number;
}
