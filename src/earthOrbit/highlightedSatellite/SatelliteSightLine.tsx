import { useFrame } from "@react-three/fiber";
import {
  convertEciVecToThreeVec,
  getSatelliteLatLonAlt,
  getSatellitePosition,
  getSatellitePositionAtCurrentTime,
} from "../../utils/calcUtils";
import { ISatellite } from "../../utils/loadData";
import { Vector3 } from "three";
import { Line } from "@react-three/drei";
import { useState } from "react";
import { EARTH_RADIUS, TILT_ANGLE } from "../common/Earth";
import { getSimulatedTime } from "../../utils/timeSimulator";

type SatelliteSightLineProps = {
  selectedSatellite: ISatellite | null;
  color: string;
  specificTime?: Date;
};

export function SatelliteSightLine({
  selectedSatellite,
  color,
  specificTime,
}: SatelliteSightLineProps) {
  const [points, setPoints] = useState<Vector3[] | null>(null);

  useFrame(() => {
    if (!selectedSatellite) {
      if (points) {
        setPoints(null);
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
    const satellitePosition = convertEciVecToThreeVec(position);

    // const { latitude, longitude } = getSatelliteLatLonAlt(
    //   selectedSatellite,
    //   specificTime || getSimulatedTime(),
    // );

    // const latitudeRad = latitude * (Math.PI / 180);
    // const longitudeRad = longitude * (Math.PI / 180);

    // const x = EARTH_RADIUS * Math.cos(latitudeRad) * Math.cos(longitudeRad);
    // const y = EARTH_RADIUS * Math.sin(latitudeRad) * Math.cos(TILT_ANGLE);
    // const z = EARTH_RADIUS * Math.cos(latitudeRad) * Math.sin(longitudeRad);

    // const surfaceVector = new Vector3(x, y, z);
    const surfaceVector = new Vector3(0, 0, 0);

    setPoints([surfaceVector, satellitePosition]);
  });

  if (!points) return null;

  return <Line points={points} color={color} />;
}
