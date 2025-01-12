import { Line } from "@react-three/drei";
import { Vector3 } from "three";

export function EarthCoords() {
  const pointsA = [new Vector3(0, 0, 0), new Vector3(10000, 0, 0)];
  const pointsB = [new Vector3(0, 0, 0), new Vector3(0, 10000, 0)];
  const pointsC = [new Vector3(0, 0, 0), new Vector3(0, 0, 10000)];
  return (
    <>
      <Line points={pointsA} color={"red"} />
      <Line points={pointsB} color={"purple"} />
      <Line points={pointsC} color={"blue"} />
    </>
  );
}
