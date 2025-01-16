import { Box, Tooltip } from "@mui/material";
import { ISatellite } from "../../utils/loadData";
import { useSatelliteStore } from "../../utils/store";
import {
  convertEciVecToThreeVec,
  getHoursCircumventEarth,
  getSatelliteLatLonAlt,
  getSatellitePositionAtCurrentTime,
  scaleVector,
} from "../../utils/calcUtils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import { getSimulatedTime } from "../../utils/timeSimulator";
import { DataLabel } from "../../common/DataLabel";

function getXYZ(satellite: ISatellite): string {
  const positionAndVelocity = getSatellitePositionAtCurrentTime(satellite);
  if (!positionAndVelocity) return "";
  const { position } = positionAndVelocity;
  return `x: ${position.x.toFixed(2)}, y: ${position.y.toFixed(2)}, z: ${position.z.toFixed(2)}`;
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
    setCameraPosition(scaleVector(convertEciVecToThreeVec(position)));
  };

  const { latitude, longitude, altitude } = getSatelliteLatLonAlt(
    selectedSatellite,
    getSimulatedTime(),
  );
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
        <DataLabel
          label="Orbital Period (Hours)"
          value={getHoursCircumventEarth(selectedSatellite).toFixed(1)}
        />
        <DataLabel label="Latitude" value={latitude.toFixed(1)} />
        <DataLabel label="Longitude" value={longitude.toFixed(1)} />
        <DataLabel label="Altitude" value={`${altitude.toFixed(1)} km`} />

        <DataLabel
          label="Temp"
          value={`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`}
        />

        <DataLabel label="XYZ" value={getXYZ(selectedSatellite)} />

        <Box>
          <Box
            sx={{
              padding: "10px 0 5px 5px",
              fontSize: "15px",
              color: "rgb(100,100,100)",
            }}
          >
            All API Data
          </Box>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              backgroundColor: "rgb(240,240,240)",
              padding: "10px",
              margin: "0",
            }}
          >
            {JSON.stringify(selectedSatellite, null, 2)}
          </pre>
        </Box>
      </Box>
    </Box>
  );
}
