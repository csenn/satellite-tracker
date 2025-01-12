import { useFrame } from "@react-three/fiber";
import { getSatellitePositionAtCurrentTime } from "../../calcUtils";
import { ISatellite } from "../../getSatelliteLocations";
import { Vector3 } from "three";
import { Line } from "@react-three/drei";
import { useState } from "react";

type SatelliteSightLineProps = {
  selectedSatellite: ISatellite | null;
};

export function SatelliteSightLine({
  selectedSatellite,
}: SatelliteSightLineProps) {
  const [points, setPoints] = useState<Vector3[] | null>(null);

  useFrame(() => {
    if (!selectedSatellite) {
      if (points) {
        setPoints(null);
      }
      return;
    }
    const positionAndVelocity =
      getSatellitePositionAtCurrentTime(selectedSatellite);

    if (!positionAndVelocity) return;
    const { position } = positionAndVelocity;
    const original = new Vector3(position.x, position.y, position.z);
    setPoints([new Vector3(0, 0, 0), original]);
  });

  if (!points) return null;

  return <Line points={points} color={"green"} />;
}
