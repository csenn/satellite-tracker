import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { ISatellite } from "../../utils/loadData";
import {
  convertEciVecToThreeVec,
  getSatellitePosition,
} from "../../utils/calcUtils";
import { Vector3 } from "three";
import { getSimulatedTime } from "../../utils/timeSimulator";

type SatelliteProps = {
  selectedSatellite: ISatellite | null;
  color: string;
  specificTime?: Date;
};

export function Satellite({
  selectedSatellite,
  color,
  specificTime,
}: SatelliteProps) {
  const [satPosition, setSatPosition] = useState<Vector3 | null>(null);

  useFrame(() => {
    if (!selectedSatellite) {
      if (satPosition) {
        setSatPosition(null);
      }
      return;
    }
    const positionAndVelocity = getSatellitePosition(
      selectedSatellite,
      specificTime || getSimulatedTime(),
    );

    if (!positionAndVelocity) {
      return;
    }

    const { position } = positionAndVelocity;

    setSatPosition(convertEciVecToThreeVec(position));
  });

  if (!satPosition) return null;

  const radius = specificTime ? 100 : 25;

  return (
    <mesh position={satPosition}>
      <sphereGeometry args={[radius, 25, 25]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}
