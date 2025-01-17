import { Box } from "@mui/material";
import { AllSatellites } from "./allSatellites/AllSatellites";
import "./App.css";
import { useMemo, useState } from "react";
import { Collisions } from "./collisions/Collisions";
import { getSatelliteLocations } from "./utils/loadData";
import { AllSatellitesHeader } from "./allSatellites/AllSatellitesHeader";
import { CollisionsHeader } from "./collisions/CollisionsHeader";

function Tab({
  label,
  onClick,
  selected,
}: {
  label: string;
  onClick: () => void;
  selected: boolean;
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: "pointer",
        padding: "3px 5px",
        borderBottom: selected ? "2px solid black" : "none",
        borderColor: selected ? "primary.main" : "gray",
        color: selected ? "primary.main" : "gray",
      }}
    >
      {label}
    </Box>
  );
}

function App() {
  const [selectedTab, setSelectedTab] = useState<"allData" | "collisions">(
    "allData",
  );

  const satelliteData = useMemo(() => getSatelliteLocations(), []);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
        color: "black",
      }}
    >
      <Box
        sx={{
          borderBottom: "1px solid rgb(230,230,230)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{ padding: "10px", display: "flex", gap: "10px", width: "330px" }}
        >
          <Tab
            label="All Satellite Data"
            selected={selectedTab === "allData"}
            onClick={() => setSelectedTab("allData")}
          />
          <Tab
            label="Collision Watch"
            selected={selectedTab === "collisions"}
            onClick={() => setSelectedTab("collisions")}
          />
        </Box>

        {selectedTab === "allData" && <AllSatellitesHeader />}
        {selectedTab === "collisions" && <CollisionsHeader />}
      </Box>
      {selectedTab === "allData" && (
        <AllSatellites satelliteData={satelliteData} />
      )}
      {selectedTab === "collisions" && (
        <Collisions satelliteData={satelliteData} />
      )}
    </Box>
  );
}

export default App;
