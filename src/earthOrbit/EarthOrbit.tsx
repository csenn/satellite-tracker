import { Canvas } from "@react-three/fiber";
import { ISatellite } from "../getSatelliteLocations";
import { Earth } from "./Earth";
import { EarthCoords } from "./EarthCoords";
import { SatelliteOrbit } from "./selectedSatellite/SatelliteOrbit";
import { SatellitesPointsCloud } from "./SatellitePointCloud";
import { SatelliteSightLine } from "./selectedSatellite/SatelliteSightLine";
import { CameraPanel } from "./CameraPanel";
import { Satellite } from "./selectedSatellite/Satellite";
import { CameraController } from "./CameraController";
import { SatelliteGroup } from "./selectedSatellite/SatelliteGroup";

// https://codesandbox.io/p/sandbox/sew669?file=%2Fsrc%2FApp.js%3A70%2C10-70%2C16

type EarthOrbitProps = {
  selectedSatellite: ISatellite | null;
  onClickSatellite: (satellite: ISatellite | null) => void;
  satelliteData: ISatellite[];
};

export function EarthOrbit({
  selectedSatellite,
  satelliteData,
  onClickSatellite,
}: EarthOrbitProps) {
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
        {/* <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        /> */}
        {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
        <Earth />
        <EarthCoords />

        <SatellitesPointsCloud
          onClickSatellite={onClickSatellite}
          satelliteData={satelliteData}
          selectedSatellite={selectedSatellite}
        />
        <SatelliteGroup satellite={selectedSatellite} />

        <CameraController />
      </Canvas>

      <CameraPanel />
    </>
  );
}
