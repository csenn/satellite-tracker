import { Canvas } from "@react-three/fiber";
import { ISatellite } from "../getSatelliteLocations";
import { CameraControls, OrbitControls } from "@react-three/drei";
import { Earth } from "./Earth";
import { EarthCoords } from "./EarthCoords";
import { SatelliteOrbit } from "./SatelliteOrbit";
import { SatellitesPointsCloud } from "./SatellitePointCloud";
import { SatelliteSightLine } from "./SatelliteSightLine";

// function DebugLine () {
//   const { position } = useSatelliteStore();

//   useMemo(() => {
//     console.log('nalala2', position);
//     return null
//   }, [position])

//   if (!position){ return null;}
//   const pointsA = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(position.x, position.y, position.z)];

//   return (
//       <Line points={pointsA} color={"green"} />
//   );
// }

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
    <Canvas
      camera={{ position: [20000, 0, 0], fov: 75, far: 500000 }}
      style={{
        background: "#000000",
        width: "100%",
        height: "100%",
      }}
    >
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Earth />

      {/* {stars} */}
      {/* <Satellites onClickSatellite={onClickSatellite} /> */}
      <SatellitesPointsCloud
        onClickSatellite={onClickSatellite}
        satelliteData={satelliteData}
        selectedSatellite={selectedSatellite}
      />
      <SatelliteOrbit selectedSatellite={selectedSatellite} />
      <EarthCoords />
      <SatelliteSightLine selectedSatellite={selectedSatellite} />
      {/* <DebugLine /> */}

      <OrbitControls />
    </Canvas>
  );
}
