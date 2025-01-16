import satelliteData from "./satellites-api.json";
import collisions from "./collisions.json";
import JulianDate from "julian-date";

export interface ISatellite {
  OBJECT_NAME: string;
  OBJECT_ID: string;
  EPOCH: string;
  COUNTRY_CODE: string;
  NORAD_CAT_ID: string;
  TLE_LINE1: string;
  TLE_LINE2: string;
}

export interface ICollision {
  collisionDate: Date;
  colDateJulian: Date;
  sat1: string;
  sat2: string;
  distance: number;
  julianDate: number;
}

export const APP_DATE_START = new Date("2025-01-12T00:00:00Z");

// TODO: Could do some pre-computation here for satrec
export const getSatelliteLocations = (): ISatellite[] => {
  // const dt = Math.max(...satelliteData.map((sat) => new Date(sat.EPOCH).getTime()))
  // console.log(new Date(dt).toISOString())
  return satelliteData as ISatellite[];
};

export const getCollisions = (): ICollision[] => {
  return collisions.map((collision) => {
    const jdate = new JulianDate().julian(collision[4]);
    return {
      collisionDate: new Date(collision[0]),
      colDateJulian: jdate.getDate(),
      sat1: String(collision[1]),
      sat2: String(collision[2]),
      distance: Number(collision[3]),
      julianDate: Number(collision[4]),
    };
  });
};
