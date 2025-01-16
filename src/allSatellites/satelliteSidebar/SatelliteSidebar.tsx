import { SatelliteList } from "./SatelliteList";
import { SatelliteDetails } from "./SatelliteDetails";
import { ISatellite } from "../../getSatelliteLocations";

type SidebarProps = {
  selectedSatellite: ISatellite | null;
  onClickSatellite: (satellite: ISatellite | null) => void;
  satelliteData: ISatellite[];
};

export function SatelliteSidebar({
  selectedSatellite,
  satelliteData,
  onClickSatellite,
}: SidebarProps) {
  if (!selectedSatellite) {
    return (
      <SatelliteList
        satelliteData={satelliteData}
        onClickSatellite={onClickSatellite}
      />
    );
  }

  return (
    <SatelliteDetails
      selectedSatellite={selectedSatellite}
      onClickSatellite={onClickSatellite}
    />
  );
}
