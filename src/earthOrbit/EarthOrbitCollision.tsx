import { Canvas } from "@react-three/fiber";
import { ISatellite } from "../getSatelliteLocations";
import { Earth } from "./common/Earth";
import { EarthCoords } from "./common/EarthCoords";
import { CameraPanel } from "./CameraPanel";

import { CameraController } from "./common/CameraController";
import { HighlightedSatellite } from "./highlightedSatellite/HighlightedSatellite";

// https://codesandbox.io/p/sandbox/sew669?file=%2Fsrc%2FApp.js%3A70%2C10-70%2C16

type EarthOrbitCollisionProps = {
  satelliteOne: ISatellite | null;
  satelliteTwo: ISatellite | null;
  specificTime?: Date;
};

export function EarthOrbitCollision({
  satelliteOne,
  satelliteTwo,
  specificTime,
}: EarthOrbitCollisionProps) {
  return (
    <>
      <Canvas
        camera={{
          position: [0, 0, 20000],
          fov: 75,
          far: 500000,
          // up: [0, 1, 0],
        }}
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
        }}
      >
        <ambientLight intensity={Math.PI / 2} />
        <Earth />
        <EarthCoords />
        <HighlightedSatellite
          satellite={satelliteOne}
          specificTime={specificTime}
        />
        <HighlightedSatellite
          color="orange"
          satellite={satelliteTwo}
          specificTime={specificTime}
        />
        <CameraController />
      </Canvas>

      <CameraPanel />
    </>
  );
}
