import { Box, Tooltip } from "@mui/material";
import { ISatellite } from "../getSatelliteLocations";
import { useSatelliteStore } from "../store";
import { Vector3 } from "three";
import {
  getHoursCircumventEarth,
  getSatelliteLatLonAlt,
  getSatellitePositionAtCurrentTime,
  scaleVector,
} from "../calcUtils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";

function DataLabel({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", padding: "5px 0 0 5px" }}>
    <Box sx={{ fontSize: "15px", color: "rgb(100,100,100)", marginRight: "5px" }}>
    {label}:
    </Box>
    <Box>{value}</Box>
  </Box>

  );
}

type SatelliteDetailsProps = {
  selectedSatellite: ISatellite;
  onClickSatellite: (satellite: ISatellite | null) => void;
};

export function SatelliteDetails({
  selectedSatellite,
  onClickSatellite,
}: SatelliteDetailsProps) {
  const { setCameraPosition } = useSatelliteStore();

  const onClick = () => {
    const positionAndVelocity =
      getSatellitePositionAtCurrentTime(selectedSatellite);

    if (!positionAndVelocity) return;

    const { position } = positionAndVelocity;
    const original = new Vector3(position.x, position.y, position.z);

    setCameraPosition(scaleVector(original));
  };


  const { latitude, longitude, altitude } = getSatelliteLatLonAlt(selectedSatellite);
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 5px",
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
        <DataLabel label="Orbital Period (Hours)" value={getHoursCircumventEarth(selectedSatellite).toFixed(1)} />
        <DataLabel label="Latitude" value={latitude.toFixed(1)} />
        <DataLabel label="Longitude" value={longitude.toFixed(1)} />
        <DataLabel label="Altitude" value={`${altitude.toFixed(1)} km`} />

          
        <Box>
          <Box sx={{ padding: "10px 0 5px 5px", fontSize: "15px", color: "rgb(100,100,100)" }}>All API Data</Box>
          <pre style={{ whiteSpace: "pre-wrap", backgroundColor: "rgb(240,240,240)", padding: "10px", margin: "0" }}>{JSON.stringify(selectedSatellite, null, 2)}</pre>
        </Box>
      </Box>
    </Box>
  );
}
