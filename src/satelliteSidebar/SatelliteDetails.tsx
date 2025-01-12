import { Box, Tooltip } from "@mui/material";
import { ISatellite } from "../getSatelliteLocations";
import { useSatelliteStore } from "../store";
import { Vector3 } from "three";
import {
  getHoursCircumventEarth,
  getSatellitePositionAtCurrentTime,
} from "../calcUtils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";

type SatelliteDetailsProps = {
  selectedSatellite: ISatellite;
  onClickSatellite: (satellite: ISatellite | null) => void;
};

export function SatelliteDetails({
  selectedSatellite,
  onClickSatellite,
}: SatelliteDetailsProps) {
  const { setPosition } = useSatelliteStore();

  const onClick = () => {
    const positionAndVelocity =
      getSatellitePositionAtCurrentTime(selectedSatellite);
    const pos = positionAndVelocity.position;
    if (!pos) return;
    const original = new Vector3(pos.x, pos.y, pos.z);

    const direction = original.normalize();
    const distance = Math.sqrt(pos.x * pos.x + pos.y * pos.y + pos.z * pos.z);
    const newPosition = direction.multiplyScalar(distance + 1000);
    setPosition(newPosition);
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px",
          borderBottom: "1px solid rgb(230,230,230)",
          
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            onClick={() => onClickSatellite(null)}
            sx={{
              marginRight: "5px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowBackIcon sx={{ fontSize: "18px" }} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {selectedSatellite.OBJECT_NAME}
            <Box
              sx={{
                color: "rgb(100,100,100)",
                fontSize: "12px",
                marginLeft: "5px",
              }}
            >
              ({selectedSatellite.OBJECT_ID})
            </Box>
          </Box>
        </Box>
          <Box onClick={onClick} sx={{ cursor: "pointer", marginTop: "5px" }}>
            <Tooltip title="Zoom To Satellite Reference">
              <CenterFocusWeakIcon sx={{ fontSize: "18px" }} />
            </Tooltip>
          </Box>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "scroll" }}>
        <Box sx={{ display: "flex", alignItems: "center", padding: "5px" }}>
          <Box sx={{ fontSize: "15px", color: "rgb(100,100,100)" }}>
            Orbital Period (Hours):
          </Box>
          <Box>{getHoursCircumventEarth(selectedSatellite).toFixed(1)}</Box>
        </Box>

        <Box>
          <pre>{JSON.stringify(selectedSatellite, null, 2)}</pre>
        </Box>
      </Box>
    </Box>
  );
}
