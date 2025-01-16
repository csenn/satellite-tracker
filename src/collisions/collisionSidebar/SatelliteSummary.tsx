import { Box, Tooltip } from "@mui/material";
import { ISatellite } from "../../utils/loadData";
import { PositionLabel } from "./PositionLabel";
import { SatId } from "./SatelliteId";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import {
  convertEciVecToThreeVec,
  getSatellitePosition,
  scaleVector,
} from "../../utils/calcUtils";
import { useSatelliteStore } from "../../utils/store";

type SatelliteSummaryProps = {
  label: string;
  satellite: ISatellite;
  specificTime: Date;
};

export function SatelliteSummary({
  label,
  satellite,
  specificTime,
}: SatelliteSummaryProps) {
  const { setCameraPosition } = useSatelliteStore();

  const onClickZoom = () => {
    const positionAndVelocity = getSatellitePosition(satellite, specificTime);

    if (!positionAndVelocity) return;

    const { position } = positionAndVelocity;

    setCameraPosition(scaleVector(convertEciVecToThreeVec(position)));
  };

  return (
    <Box sx={{ marginTop: "10px" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Box sx={{ fontSize: "14px", fontWeight: "bold" }}>{label}</Box>
        <Box onClick={onClickZoom} sx={{ cursor: "pointer", marginTop: "5px" }}>
          <Tooltip title="Zoom To Satellite Reference">
            <CenterFocusWeakIcon sx={{ fontSize: "18px" }} />
          </Tooltip>
        </Box>
      </Box>

      <SatId name={satellite.OBJECT_NAME} id={satellite.OBJECT_ID} />

      <PositionLabel satellite={satellite} specificTime={specificTime} />
    </Box>
  );
}
