import { Canvas } from "@react-three/fiber";
import { Earth } from "./common/Earth";
import { EarthCoords } from "./common/EarthCoords";
import { SatellitesPointsCloud } from "./SatellitePointCloud";
import { CameraPanel } from "./CameraPanel";
import { CameraController } from "./common/CameraController";
import { HighlightedSatellite } from "./highlightedSatellite/HighlightedSatellite";
import { ISatellite } from "../utils/loadData";

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
        <HighlightedSatellite satellite={selectedSatellite} />

        <CameraController />
      </Canvas>

      <CameraPanel />
    </>
  );
}
