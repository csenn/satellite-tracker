import { Box, Button } from "@mui/material";
import { ICollision, ISatellite } from "../../utils/loadData";
import dayjs from "dayjs";
import { useMemo } from "react";
import { SatelliteSummary } from "./SatelliteSummary";
import { DataLabel } from "../../common/DataLabel";

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
    return satelliteLookup[selectedCollision?.sat2 || ""] || null;
  }, [satelliteLookup, selectedCollision]);

  if (!selectedCollision) {
    return null;
  }

  return (
    <Box sx={{ padding: "10px" }}>
      <Button
        onClick={onClearCollision}
        size="small"
        variant="contained"
        color="primary"
      >
        Back
      </Button>

      <DataLabel
        label="Collision Date"
        value={dayjs(selectedCollision?.collisionDate).format(
          "MM/DD/YYYY HH:mm:ss",
        )}
      />
      <DataLabel
        label="Distance"
        value={`${selectedCollision.distance.toFixed(3)} km`}
      />

      <SatelliteSummary
        label="Satellite One"
        satellite={satelliteOne}
        specificTime={selectedCollision.collisionDate}
      />
      <SatelliteSummary
        label="Satellite Two"
        satellite={satelliteTwo}
        specificTime={selectedCollision.collisionDate}
      />
    </Box>
  );
}
