/**
 * Entity Names:
 *  DAY_OF_WEEK
 *  daysList
 * Author(s):
 *  Kevin de Haan
 * Date Created:
 *  Mar 3, 2020
 * Derived From:
 *  N/A
 *
 * Type declarations and utilities
 */

export type BLIND_MODE = "ECO" | "LIGHT" | "DARK" | "BALANCED" | "MANUAL";
export type DAY_OF_WEEK =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export const daysList: DAY_OF_WEEK[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];
