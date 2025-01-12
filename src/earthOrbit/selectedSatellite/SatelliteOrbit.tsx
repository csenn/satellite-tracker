import { Vector3 } from "three";
import { ISatellite } from "../../getSatelliteLocations";
import { Line } from "@react-three/drei";
import { twoline2satrec } from "satellite.js";
import { getSatRecPosition } from "../../calcUtils";

function generateOrbitPoints(satellite: ISatellite): Vector3[] {
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
    const satelliteDate = new Date();
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
}

export function SatelliteOrbit({ selectedSatellite }: OrbitProps) {
  if (!selectedSatellite) {
    return null;
  }

  const points = generateOrbitPoints(selectedSatellite);

  return <Line points={points} color={"green"} />;
}
