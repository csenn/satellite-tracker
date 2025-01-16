import { Vector3 } from "three";
import { ISatellite } from "../../getSatelliteLocations";
import { Line } from "@react-three/drei";
import { twoline2satrec } from "satellite.js";
import { getSatRecPosition } from "../../calcUtils";
import { getSimulatedTime } from "../../timeSimulator";

function generateOrbitPoints(
  satellite: ISatellite,
  specificTime?: Date,
): Vector3[] {
  const points: Vector3[] = [];

  // Parse satellite TLE into satrec
  const satrec = twoline2satrec(satellite.TLE_LINE1, satellite.TLE_LINE2);

  const meanMotion = (satrec.no * 1440) / (2 * Math.PI); // Convert rad/min to rev/day
  const orbitalPeriod = 86400 / meanMotion; // seconds

  // Divide the orbit into chunks
  const intervalCount = 500;
  const timeStep = orbitalPeriod / intervalCount; // seconds

  // Generate points for each time step
  for (let i = 0; i <= intervalCount; i++) {
    // Revert this when need real time
    // const satelliteDate = new Date();
    const satelliteDate = specificTime || getSimulatedTime();

    const time = new Date(satelliteDate.getTime() + i * timeStep * 1000);
    const positionAndVelocity = getSatRecPosition(satrec, time);

    if (positionAndVelocity) {
      const { position } = positionAndVelocity;
      points.push(new Vector3(position.x, position.y, position.z));
    }
  }

  return points;
}

interface OrbitProps {
  selectedSatellite: ISatellite | null;
  color: string;
  specificTime?: Date;
}

export function SatelliteOrbit({
  selectedSatellite,
  color,
  specificTime,
}: OrbitProps) {
  if (!selectedSatellite) {
    return null;
  }

  const points = generateOrbitPoints(selectedSatellite, specificTime);

  return <Line points={points} color={color} />;
}
