import { Box, Button } from "@mui/material";
import { ICollision, ISatellite } from "../../getSatelliteLocations";
import dayjs from "dayjs";
import { PositionLabel } from "./PositionLabel";
import { useMemo } from "react";

type CollisionDetailsProps = {
  selectedCollision: ICollision | null;
  onClearCollision: () => void;
  satelliteLookup: Record<string, ISatellite>;
};

export function CollisionDetails({
  selectedCollision,
  onClearCollision,
  satelliteLookup,
}: CollisionDetailsProps) {
  const satelliteOne = useMemo(() => {
    return satelliteLookup[selectedCollision?.sat1 || ""] || null;
  }, [satelliteLookup, selectedCollision]);

  const satelliteTwo = useMemo(() => {
    return satelliteLookup[selectedCollision?.sat1 || ""] || null;
  }, [satelliteLookup, selectedCollision]);

  if (!selectedCollision) {
    return null;
  }

  return (
    <Box sx={{ padding: "10px" }}>
      <Button onClick={onClearCollision}>Clear</Button>
      <Box>
        Date:{" "}
        {dayjs(selectedCollision?.collisionDate).format("MM/DD/YYYY HH:mm:ss")}
      </Box>
      <Box>
        Date2:{" "}
        {dayjs(selectedCollision?.colDateJulian).format("MM/DD/YYYY HH:mm:ss")}
      </Box>

      <Box>Distance: {selectedCollision.distance.toFixed(3)} km</Box>
      <Box>Satellite One: {selectedCollision.sat1}</Box>
      <PositionLabel
        satellite={satelliteOne}
        specificTime={selectedCollision.collisionDate}
      />
      <Box>Satellite Two: {selectedCollision.sat2}</Box>
      <PositionLabel
        satellite={satelliteTwo}
        specificTime={selectedCollision.collisionDate}
      />
    </Box>
  );
}
