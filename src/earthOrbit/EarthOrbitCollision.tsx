import { Canvas } from "@react-three/fiber";
import { ICollision, ISatellite } from "../getSatelliteLocations";
import { Earth } from "./Earth";
import { EarthCoords } from "./EarthCoords";
import { CameraPanel } from "./CameraPanel";

import { CameraController } from "./CameraController";
import { SatelliteGroup } from "./selectedSatellite/SatelliteGroup";

// https://codesandbox.io/p/sandbox/sew669?file=%2Fsrc%2FApp.js%3A70%2C10-70%2C16

type EarthOrbitCollisionProps = {
  satelliteOne: ISatellite | null;
  satelliteTwo: ISatellite | null;
};

export function EarthOrbitCollision({
  satelliteOne,
  satelliteTwo,
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
        <SatelliteGroup satellite={satelliteOne} />
        <SatelliteGroup satellite={satelliteTwo} />
        <CameraController />
      </Canvas>

      <CameraPanel />
    </>
  );
}
