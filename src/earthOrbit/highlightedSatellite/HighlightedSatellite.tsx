import { ISatellite } from "../../utils/loadData";
import { Satellite } from "./Satellite";
import { SatelliteOrbit } from "./SatelliteOrbit";
import { SatelliteSightLine } from "./SatelliteSightLine";

type HighlightedSatelliteProps = {
  satellite: ISatellite | null;
  color?: string;
  specificTime?: Date;
};

export function HighlightedSatellite({
  satellite,
  color = "green",
  specificTime,
}: HighlightedSatelliteProps) {
  return (
    <>
      <SatelliteOrbit
        selectedSatellite={satellite}
        color={color}
        specificTime={specificTime}
      />
      <Satellite
        selectedSatellite={satellite}
        color={color}
        specificTime={specificTime}
      />
      <SatelliteSightLine
        selectedSatellite={satellite}
        color={color}
        specificTime={specificTime}
      />
    </>
  );
}
