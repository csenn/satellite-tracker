import { useMemo } from "react";
import { ISatellite } from "../../getSatelliteLocations";
import { getSatellitePosition } from "../../calcUtils";
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

  return <Box>{label}</Box>;
}
