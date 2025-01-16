import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { ISatellite } from "../../getSatelliteLocations";
import { getSatellitePosition } from "../../calcUtils";
import { Vector3 } from "three";
import { getSimulatedTime } from "../../timeSimulator";

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

    setSatPosition(new Vector3(position.x, position.y, position.z));
  });

  if (!satPosition) return null;

  return (
    <mesh position={satPosition}>
      <sphereGeometry args={[25, 25, 25]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}
