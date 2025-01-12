import { PositionAndVelocity, propagate, twoline2satrec } from "satellite.js";
import { ISatellite } from "./getSatelliteLocations";

export const getDistanceFromEarth = (
  positionAndVelocity: PositionAndVelocity,
) => {
  if (!positionAndVelocity?.position) {
    return 0;
  }

  const { x, y, z } = positionAndVelocity.position;
  return Math.sqrt(x * x + y * y + z * z);
};

export const getSatellitePosition = (
  satellite: ISatellite,
  atTime: Date,
): PositionAndVelocity => {
  const satrec = twoline2satrec(satellite.TLE_LINE1, satellite.TLE_LINE2);
  return propagate(satrec, atTime);
};

// Time of satellite reading
export const getSatellitePositionAtEpoch = (
  satellite: ISatellite,
): PositionAndVelocity => {
  const satelliteDate = new Date(satellite.EPOCH);
  return getSatellitePosition(satellite, satelliteDate);
};

// Current time
export const getSatellitePositionAtCurrentTime = (
  satellite: ISatellite,
): PositionAndVelocity => {
  const satelliteDate = new Date();
  return getSatellitePosition(satellite, satelliteDate);
};

export const getHoursCircumventEarth = (satellite: ISatellite) => {
  const satrec = twoline2satrec(satellite.TLE_LINE1, satellite.TLE_LINE2);
  const meanMotion = (satrec.no * 1440) / (2 * Math.PI); // Convert rad/min to rev/day
  return 24 / meanMotion; // seconds
};
