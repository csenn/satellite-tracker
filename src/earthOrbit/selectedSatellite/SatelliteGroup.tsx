import { ISatellite } from "../../getSatelliteLocations";
import { Satellite } from "./Satellite";
import { SatelliteOrbit } from "./SatelliteOrbit";
import { SatelliteSightLine } from "./SatelliteSightLine";

type SatelliteGroupProps = {
  satellite: ISatellite | null;
};

export function SatelliteGroup({ satellite }: SatelliteGroupProps) {
  return (
    <>
    <SatelliteOrbit selectedSatellite={satellite} />
    <Satellite selectedSatellite={satellite} />
    <SatelliteSightLine selectedSatellite={satellite} />
    </>
  )
}
