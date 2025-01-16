import { sortBy } from "lodash";
import { getSatellitePosition } from "./calcUtils";
import { ISatellite } from "./loadData";
import { getSimulatedTime } from "./timeSimulator";

const COLLISION_DISTANCE = 5;
const BOX_SIZE = COLLISION_DISTANCE * 3;

interface ISatellitePosition {
  id: string;
  satellite: ISatellite;
  x: number;
  y: number;
  z: number;
}

function getNumKey(x: number, y: number, z: number): string {
  return `${x},${y},${z}`;
}

function getClusterKey(x: number, y: number, z: number): string {
  const xIndex = Math.floor(x / BOX_SIZE);
  const yIndex = Math.floor(y / BOX_SIZE);
  const zIndex = Math.floor(z / BOX_SIZE);
  return getNumKey(xIndex, yIndex, zIndex);
}

const buildId = (id1: string, id2: string) => {
  const sorted = sortBy([id1, id2]);
  return `${sorted[0]}*^*${sorted[1]}`;
};

const parseId = (id: string) => id.split("*^*");

function setIntersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  return new Set([...setA].filter((item) => setB.has(item)));
}

function getDistance(sat1: ISatellitePosition, sat2: ISatellitePosition) {
  return Math.sqrt(
    Math.pow(sat1.x - sat2.x, 2) +
      Math.pow(sat1.y - sat2.y, 2) +
      Math.pow(sat1.z - sat2.z, 2),
  );
}

function _getDimensionPairs(
  positions: ISatellitePosition[],
  getVal: (pos: ISatellitePosition) => number,
  stats: IStats,
) {
  const values = positions.map((pos) => {
    return {
      position: pos,
      value: getVal(pos),
    };
  });

  const sorted = sortBy(values, (val) => val.value);

  const pairs = new Set<string>();

  for (let i = 0; i < sorted.length - 1; i++) {
    const val = sorted[i];

    for (let j = i + 1; j < sorted.length; j++) {
      stats.loopCount++;
      const nextVal = sorted[j];
      if (nextVal.value - val.value <= COLLISION_DISTANCE) {
        pairs.add(buildId(val.position.id, nextVal.position.id));
      } else {
        break;
      }
    }
  }

  return pairs;
}

function _getClusterPairs(
  satellites: ISatellitePosition[],
  stats: IStats,
): Set<string> {
  const x_pairs = _getDimensionPairs(satellites, (pos) => pos.x, stats);
  const y_pairs = _getDimensionPairs(satellites, (pos) => pos.y, stats);
  const z_pairs = _getDimensionPairs(satellites, (pos) => pos.z, stats);

  return setIntersection(setIntersection(x_pairs, y_pairs), z_pairs);
}

function cleanSatelliteData(satellites: ISatellite[]) {
  return satellites.filter((sat) => {
    if (sat.OBJECT_ID === "UNKNOWN") return false;
    return true;
  });
}

interface IStats {
  loopCount: number;
}

function buildClusters(satellites: ISatellite[], atTime: Date) {
  const satelliteIdLookup = new Map<string, ISatellitePosition>();

  const clusters: Record<string, ISatellitePosition[]> = {};

  satellites.forEach((sat) => {
    // const positionAndVelocity = getSatellitePositionAtEpoch(sat);
    const positionAndVelocity = getSatellitePosition(sat, atTime);
    if (!positionAndVelocity) {
      return null;
    }

    const satPos: ISatellitePosition = {
      id: sat.OBJECT_ID,
      satellite: sat,
      x: positionAndVelocity.position.x,
      y: positionAndVelocity.position.y,
      z: positionAndVelocity.position.z,
    };

    const clusterKey = getClusterKey(
      positionAndVelocity.position.x,
      positionAndVelocity.position.y,
      positionAndVelocity.position.z,
    );

    satelliteIdLookup.set(sat.OBJECT_ID, satPos);

    if (!clusters[clusterKey]) {
      clusters[clusterKey] = [];
    }

    clusters[clusterKey].push(satPos);
  });

  return {
    clusters,
    satelliteIdLookup,
  };
}

function _getPairs(
  clusters: Record<string, ISatellitePosition[]>,
  stats: IStats,
) {
  const finalPairs = new Set<string>();

  Object.keys(clusters).forEach((clusterKey) => {
    const [xIndex, yIndex, zIndex] = clusterKey.split(",").map(Number);

    const neighbors = [
      [xIndex, yIndex, zIndex],
      [xIndex + 1, yIndex, zIndex],
      [xIndex - 1, yIndex, zIndex],
      [xIndex, yIndex + 1, zIndex],
      [xIndex, yIndex - 1, zIndex],
      [xIndex, yIndex, zIndex + 1],
      [xIndex, yIndex, zIndex - 1],
    ];

    const allSatellites: ISatellitePosition[] = [];

    neighbors.forEach(([x, y, z]) => {
      const key = getNumKey(x, y, z);
      if (clusters[key]) {
        allSatellites.push(...clusters[key]);
      }
    });

    const pairs = _getClusterPairs(allSatellites, stats);

    pairs.forEach((pair) => {
      finalPairs.add(pair);
    });
  });

  return finalPairs;
}

interface ICollision {
  key: string;
  id1: string;
  id2: string;
  distance: number;
  time: Date;
}

function _getCollisionsAtTime(
  satellites: ISatellite[],
  time: Date,
  stats: IStats,
) {
  const { clusters, satelliteIdLookup } = buildClusters(
    cleanSatelliteData(satellites),
    time,
  );

  const result: ICollision[] = [];
  const finalPairs = _getPairs(clusters, stats);

  for (const pair of finalPairs) {
    const [id1, id2] = parseId(pair);

    const sat1 = satelliteIdLookup.get(id1);
    const sat2 = satelliteIdLookup.get(id2);

    if (sat1 && sat2) {
      const distance = getDistance(sat1, sat2);
      if (distance > 0) {
        result.push({
          key: pair,
          id1: id1,
          id2: id2,
          distance: distance,
          time: time,
        });
      }
    }
  }

  return result;
}

export function detectCollisions(satellites: ISatellite[]) {
  const start = performance.now();

  const stats: IStats = { loopCount: 0 };

  const startTime = getSimulatedTime();

  // const allResults: ICollision[] = [];
  const allResult: Record<string, ICollision> = {};

  for (let i = 0; i < 100; i++) {
    const nextTime = new Date(startTime.getTime() + i * 1000 * 60 * 3);

    const collisions = _getCollisionsAtTime(satellites, nextTime, stats);

    collisions.forEach((collision) => {
      if (
        allResult[collision.key] &&
        allResult[collision.key].distance < collision.distance
      ) {
        return;
      }

      allResult[collision.key] = collision;
    });
  }

  const sortedResults = sortBy(
    Object.values(allResult),
    (result) => result.distance,
  );

  console.log("SORTED RESULTS", sortedResults);

  // console.log("FINAL COUNT", finalCount);
  console.log("STATS", stats);
  console.log("TIME:", performance.now() - start);

  // console.log('FINAL PAIRS', final_pairs);

  // console.log('ALL KEYS', all_keys.size);

  // 1,2962,64 with 10 time 1141.09
  // 688,401 with 5 time  564.19
  // 201,088 with 1 tine 242.79

  return [];
}
