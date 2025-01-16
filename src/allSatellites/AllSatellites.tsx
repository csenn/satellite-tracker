import { EarthOrbit } from "../earthOrbit/EarthOrbit";
import { ISatellite } from "../utils/loadData";
import { Box } from "@mui/material";
import { useState } from "react";
import { SatelliteSidebar } from "./satelliteSidebar/SatelliteSidebar";

export function AllSatellites({
  satelliteData,
}: {
  satelliteData: ISatellite[];
}) {
  const [selectedSatellite, setSelectedSatellite] = useState<ISatellite | null>(
    null,
  );

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "350px",
          borderRight: "1px solid #ccc",
          color: "black",
        }}
      >
        <SatelliteSidebar
          selectedSatellite={selectedSatellite}
          onClickSatellite={setSelectedSatellite}
          satelliteData={satelliteData}
        />
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <EarthOrbit
          onClickSatellite={setSelectedSatellite}
          selectedSatellite={selectedSatellite}
          satelliteData={satelliteData}
        />
      </Box>
    </Box>
  );
}
