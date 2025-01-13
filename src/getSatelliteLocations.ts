import satelliteData from "./satellites-api.json";

export interface ISatellite {
  OBJECT_NAME: string;
  OBJECT_ID: string;
  EPOCH: string;
  COUNTRY_CODE: string;
  NORAD_CAT_ID: string;
  TLE_LINE1: string;
  TLE_LINE2: string;
}

// TODO: Could do some pre-computation here for satrec
export const getSatelliteLocations = (): ISatellite[] => {
  return satelliteData as ISatellite[];
};
