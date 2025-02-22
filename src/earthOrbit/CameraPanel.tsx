import { Box, Button } from "@mui/material";
import { useSatelliteStore } from "../utils/store";
import { Vector3 } from "three";

export function CameraPanel() {
  const { setCameraPosition } = useSatelliteStore();
  const handleMoveCamera = (value: [number, number, number]) => {
    setCameraPosition(new Vector3(...value));
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 10,
        right: 10,
        background: "white",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <Button onClick={() => handleMoveCamera([20000, 0, 0])}>x-axis</Button>
      <Button onClick={() => handleMoveCamera([0, 20000, 0])}>y-axis</Button>
      <Button onClick={() => handleMoveCamera([0, 0, 20000])}>z-axis</Button>
    </Box>
  );
}
