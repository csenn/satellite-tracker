import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { EarthOrbitCollision } from "../earthOrbit/EarthOrbitCollision";
import { CollisionSidebar } from "./collisionSidebar/CollisionSidebar";
import {
  getCollisions,
  ICollision,
  ISatellite,
} from "../getSatelliteLocations";

export function Collisions({ satelliteData }: { satelliteData: ISatellite[] }) {
  const [selectedCollision, setSelectedCollision] = useState<ICollision | null>(
    null,
  );

  const satelliteLookup = useMemo(() => {
    if (!satelliteData) {
      return {};
    }
    return satelliteData.reduce(
      (acc, sat) => {
        acc[sat.OBJECT_ID] = sat;
        return acc;
      },
      {} as Record<string, ISatellite>,
    );
  }, [satelliteData]);

  const collisionData = useMemo(() => getCollisions(), []);

  const satelliteOne = useMemo(() => {
    return satelliteLookup[selectedCollision?.sat1 || ""] || null;
  }, [satelliteLookup, selectedCollision]);

  const satelliteTwo = useMemo(() => {
    return satelliteLookup[selectedCollision?.sat1 || ""] || null;
  }, [satelliteLookup, selectedCollision]);

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
        <CollisionSidebar
          selectedCollision={selectedCollision}
          onClickCollision={setSelectedCollision}
          collisionData={collisionData}
          satelliteLookup={satelliteLookup}
        />
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <EarthOrbitCollision
          satelliteOne={satelliteOne}
          satelliteTwo={satelliteTwo}
          specificTime={selectedCollision?.collisionDate}
        />
      </Box>
    </Box>
  );
}
