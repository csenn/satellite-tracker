import {
  degreesLat,
  degreesLong,
  eciToGeodetic,
  EciVec3,
  gstime,
  propagate,
  SatRec,
  twoline2satrec,
} from "satellite.js";
import { ISatellite } from "./loadData";
import { Vector3 } from "three";
import { getSimulatedTime } from "./timeSimulator";

export interface IPositionAndVelocity {
  position: EciVec3<number>;
  velocity: EciVec3<number>;
}

export const convertEciVecToThreeVec = (eciVec: EciVec3<number>): Vector3 => {
  return new Vector3(eciVec.x, eciVec.y, eciVec.z);
};

export const convertCoordEciToThree = (
  coords: EciVec3<number>,
): EciVec3<number> => {
  // return {
  //   x: coords.x,
  //   y: coords.z,
  //   z: -coords.y,
  // };

  return {
    x: coords.y, // ECI Y to three.js X
    y: coords.z, // ECI Z to three.js Y
    z: coords.x, // ECI X to three.js Z
  };
};

export const getDistanceFromEarth = (
  positionAndVelocity: IPositionAndVelocity | null,
) => {
  if (!positionAndVelocity) {
    return 0;
  }

  const { x, y, z } = positionAndVelocity.position;
  return Math.sqrt(x * x + y * y + z * z);
};

export const getSatRecPosition = (
  satrec: SatRec,
  atTime: Date,
): IPositionAndVelocity | null => {
  const posAndVel = propagate(satrec, atTime);
  if (!posAndVel) {
    return null;
  }

  const { position, velocity } = posAndVel;

  if (typeof position !== "object" || typeof velocity !== "object") return null;

  // return {
  //   position: {
  //     x: position.x as number,
  //     y: position.y as number,
  //     z: position.z as number,
  //   },
  //   velocity: {
  //     x: velocity.x as number,
  //     y: velocity.y as number,
  //     z: velocity.z as number,
  //   },
  // };

  return {
    position: convertCoordEciToThree(position),
    velocity: convertCoordEciToThree(velocity),
  };
};

export const getSatellitePosition = (
  satellite: ISatellite,
  atTime: Date,
): IPositionAndVelocity | null => {
  const satrec = twoline2satrec(satellite.TLE_LINE1, satellite.TLE_LINE2);
  return getSatRecPosition(satrec, atTime);
};

// Time of satellite reading
export const getSatellitePositionAtEpoch = (
  satellite: ISatellite,
): IPositionAndVelocity | null => {
  const satelliteDate = new Date(satellite.EPOCH);
  return getSatellitePosition(satellite, satelliteDate);
};

// Current time
export const getSatellitePositionAtCurrentTime = (
  satellite: ISatellite,
): IPositionAndVelocity | null => {
  const simulatedTime = getSimulatedTime();
  return getSatellitePosition(satellite, simulatedTime);
  // const satelliteDate = new Date();
  // return getSatellitePosition(satellite, satelliteDate);
};

export const getHoursCircumventEarth = (satellite: ISatellite) => {
  const satrec = twoline2satrec(satellite.TLE_LINE1, satellite.TLE_LINE2);
  const meanMotion = (satrec.no * 1440) / (2 * Math.PI); // Convert rad/min to rev/day
  return 24 / meanMotion; // seconds
};

export const scaleVector = (vector: Vector3, amount: number = 1.5): Vector3 => {
  const direction = vector.clone().normalize();
  const distance = Math.sqrt(
    vector.x * vector.x + vector.y * vector.y + vector.z * vector.z,
  );
  return direction.multiplyScalar(distance * amount);
};

export function getSatelliteLatLonAlt(satellite: ISatellite, time: Date) {
  // Parse the TLE data into a satellite record
  const satrec = twoline2satrec(satellite.TLE_LINE1, satellite.TLE_LINE2);

  // Get the satellite's position and velocity at the given time
  const positionAndVelocity = propagate(satrec, time);

  // Extract the position (ECI)
  const positionEci = positionAndVelocity.position;

  if (typeof positionEci !== "object") {
    throw new Error("Unable to calculate satellite position.");
  }

  // Get GMST (Greenwich Mean Sidereal Time) for the given time
  const gmst = gstime(time);

  // Convert ECI to ECEF
  // const positionEcf = eciToEcf(positionEci, gmst);

  // Convert ECEF to Geodetic Coordinates (lat, lon, alt)
  const geodetic = eciToGeodetic(positionEci, gmst);

  // Convert latitude and longitude from radians to degrees
  const latitude = degreesLat(geodetic.latitude);
  const longitude = degreesLong(geodetic.longitude);
  const altitude = geodetic.height; // Convert km to meters if needed

  return { latitude, longitude, altitude };
}
