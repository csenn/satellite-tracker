import { Box } from "@mui/material";
import { getSimulatedTime } from "../utils/timeSimulator";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export function AllSatellitesHeader() {
  const [simulatedTime, setSimulatedTime] = useState(getSimulatedTime());

  // UPdate simulated time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedTime(getSimulatedTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{ padding: "15px", display: "flex", justifyContent: "space-between" }}
    >
      <Box sx={{ fontWeight: "bold" }}>Simulation Time:</Box>

      <Box sx={{ paddingLeft: "10px" }}>
        {dayjs(simulatedTime).format("MM/DD/YYYY HH:mm:ss")}
      </Box>
    </Box>
  );
}
