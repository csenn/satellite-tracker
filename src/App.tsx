import { EarthOrbit } from "./earthOrbit/EarthOrbit";
import "./App.css";
import { getSatelliteLocations, ISatellite } from "./getSatelliteLocations";
import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { SatelliteSidebar } from "./satelliteSidebar/SatelliteSidebar";

function App() {
  const [selectedSatellite, setSelectedSatellite] = useState<ISatellite | null>(
    null,
  );

  const satelliteData = useMemo(() => getSatelliteLocations(), []);

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

        {/* <Box sx={{ padding: "10px" }}>
          {selectedSatellite?.name}
        </Box>
        <Box>
          <pre>
            {JSON.stringify(selectedSatellite?.positionAndVelocity, null, 2)}
          </pre>
        </Box> */}
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

export default App;
