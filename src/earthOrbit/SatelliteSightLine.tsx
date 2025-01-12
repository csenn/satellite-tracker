import { useFrame } from "@react-three/fiber";
import { getSatellitePositionAtCurrentTime } from "../calcUtils";
import { ISatellite } from "../getSatelliteLocations";
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
    const pos = positionAndVelocity.position;
    if (!pos) return;
    const original = new Vector3(pos.x, pos.y, pos.z);
    setPoints([new Vector3(0, 0, 0), original]);
  });

  if (!points) return null;

  return <Line points={points} color={"green"} />;
}
