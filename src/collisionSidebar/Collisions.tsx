import {
  getCollisions,
  getSatelliteLocations,
  ICollision,
} from "../utils/loadData";
import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { CollisionList } from "./CollisionList";
import { EarthOrbit } from "../earthOrbit/EarthOrbit";
import { EarthOrbitCollision } from "../earthOrbit/EarthOrbitCollision";

export function Collisions() {
  const [selectedCollision, setSelectedCollision] = useState<ICollision | null>(
    null,
  );

  const collisionData = useMemo(() => getCollisions(), []);
  const satelliteData = useMemo(() => getSatelliteLocations(), []);

  const satelliteOne = useMemo(() => {
    if (!satelliteData) {
      return null;
    }

    return (
      satelliteData.find((sat) => sat.OBJECT_ID === selectedCollision?.sat1) ||
      null
    );
  }, [satelliteData, selectedCollision]);

  const satelliteTwo = useMemo(() => {
    if (!satelliteData) {
      return null;
    }

    return (
      satelliteData.find((sat) => sat.OBJECT_ID === selectedCollision?.sat2) ||
      null
    );
  }, [satelliteData, selectedCollision]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "350px",
          borderRight: "1px solid #ccc",
          color: "black",
        }}
      >
        <CollisionList
          selectedCollision={selectedCollision}
          onClickCollision={setSelectedCollision}
          collisionData={collisionData}
        />
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <EarthOrbitCollision
          satelliteOne={satelliteOne}
          satelliteTwo={satelliteTwo}
          // onClickSatellite={setSelectedSatellite}
          // selectedSatellite={selectedSatellite}
          // satelliteData={satelliteData}
        />
      </Box>
    </Box>
  );
}
