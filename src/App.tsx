import { Box } from "@mui/material";
import { AllSatellites } from "./allSatellites/AllSatellites";
import "./App.css";
import { useState } from "react";
import { Collisions } from "./collisions/Collisions";

function Tab({label, onClick, selected}: {label: string, onClick: () => void, selected: boolean}) {
  return (
    <Box onClick={onClick} sx={{cursor: 'pointer', padding: '3px 5px', borderBottom: selected ? '2px solid black' : 'none', color: selected ? 'black' : 'gray'}}>
      {label}
    </Box>
  )
}

function App() {
  const [selectedTab, setSelectedTab] = useState<"allData" | "collisions">(
    "allData",
  );

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
          padding: "10px",
          display: 'flex',
          gap: '10px'
        }}
      >
          <Tab label="All Satellite Data" selected={selectedTab === "allData"} onClick={() => setSelectedTab("allData")} />
          <Tab label="Collision Watch" selected={selectedTab === "collisions"} onClick={() => setSelectedTab("collisions")} />


      </Box>
      {selectedTab === "allData" && <AllSatellites />}
      {selectedTab === "collisions" && <Collisions />}
    </Box>
  );
}

export default App;
