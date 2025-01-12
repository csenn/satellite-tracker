import { EciVec3, propagate, SatRec, twoline2satrec } from "satellite.js";
import { ISatellite } from "./getSatelliteLocations";
import { Vector3 } from "three";

export interface IPositionAndVelocity {
  position: EciVec3<number>;
  velocity: EciVec3<number>;
}

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

  return {
    position: {
      x: position.x as number,
      y: position.y as number,
      z: position.z as number,
    },
    velocity: {
      x: velocity.x as number,
      y: velocity.y as number,
      z: velocity.z as number,
    },
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
  const satelliteDate = new Date();
  return getSatellitePosition(satellite, satelliteDate);
};

export const getHoursCircumventEarth = (satellite: ISatellite) => {
  const satrec = twoline2satrec(satellite.TLE_LINE1, satellite.TLE_LINE2);
  const meanMotion = (satrec.no * 1440) / (2 * Math.PI); // Convert rad/min to rev/day
  return 24 / meanMotion; // seconds
};

export const scaleVector = (
  vector: Vector3,
  amount: number = 1000,
): Vector3 => {
  const direction = vector.clone().normalize();
  const distance = Math.sqrt(
    vector.x * vector.x + vector.y * vector.y + vector.z * vector.z,
  );
  return direction.multiplyScalar(distance + amount);
};
