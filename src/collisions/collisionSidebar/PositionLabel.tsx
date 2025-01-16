import { useMemo } from "react";
import { ISatellite } from "../../utils/loadData";
import { getSatellitePosition } from "../../utils/calcUtils";
import { Box } from "@mui/material";

export function PositionLabel({
  satellite,
  specificTime,
}: {
  satellite: ISatellite | null;
  specificTime: Date;
}) {
  const positionAndVel = useMemo(() => {
    return satellite && getSatellitePosition(satellite, specificTime);
  }, [satellite, specificTime]);

  const label =
    positionAndVel &&
    `X=${positionAndVel?.position.x.toFixed(2)} Y=${positionAndVel?.position.y.toFixed(2)} Z=${positionAndVel?.position.z.toFixed(2)}`;

  return (
    <Box sx={{ fontSize: "14px", color: "rgb(100,100,100)" }}>{label}</Box>
  );
}
