import { useRef, useCallback } from "react";
import * as THREE from "three";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { ISatellite } from "../utils/loadData";
import {
  getSatellitePositionAtCurrentTime,
  scaleVector,
} from "../utils/calcUtils";
import { useSatelliteStore } from "../utils/store";

const POINT_SIZE = 50;

type SatellitesPointsCloudProps = {
  onClickSatellite: (satellite: ISatellite) => void;
  satelliteData: ISatellite[];
  selectedSatellite: ISatellite | null;
};

export function SatellitesPointsCloud({
  onClickSatellite,
  satelliteData,
  selectedSatellite,
}: SatellitesPointsCloudProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const positionsRef = useRef(new Float32Array(satelliteData.length * 3));
  const lastUpdateTime = useRef(0);

  const { setCameraPosition } = useSatelliteStore();
  useFrame(() => {
    const now = Date.now();

    if (now - lastUpdateTime.current < 1000) {
      return;
    }

    lastUpdateTime.current = now;
    // const currentTime = new Date();

    satelliteData.forEach((satellite, i) => {
      if (
        selectedSatellite &&
        satellite.OBJECT_ID === selectedSatellite.OBJECT_ID
      ) {
        positionsRef.current.set([0, 0, 0], i * 3);
        return;
      }

      // const positionAndVelocity = getSatellitePosition(satellite, currentTime);
      // Revert this

      const positionAndVelocity = getSatellitePositionAtCurrentTime(satellite);
      if (positionAndVelocity) {
        const { x, y, z } = positionAndVelocity.position;
        positionsRef.current.set([x, y, z], i * 3);
      }
    });

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const onClickPoint = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (event.index !== undefined) {
      const satellite = satelliteData[event.index];
      onClickSatellite(satelliteData[event.index]);

      const positionAndVelocity = getSatellitePositionAtCurrentTime(satellite);
      if (positionAndVelocity) {
        const { x, y, z } = positionAndVelocity.position;
        const vector = new THREE.Vector3(x, y, z);
        setCameraPosition(scaleVector(vector));
      }
    }
  };

  return (
    <points
      ref={pointsRef}
      onClick={onClickPoint}
      raycast={useCallback(
        (raycaster: THREE.Raycaster, intersects: THREE.Intersection[]) => {
          if (pointsRef.current) {
            const threshold = POINT_SIZE / 2;
            raycaster.params.Points.threshold = threshold;
            THREE.Points.prototype.raycast.call(
              pointsRef.current,
              raycaster,
              intersects,
            );
          }
        },
        [],
      )}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positionsRef.current}
          count={satelliteData.length}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={POINT_SIZE}
        color="white"
        transparent={true}
        opacity={0.8}
        onBeforeCompile={(shader) => {
          shader.fragmentShader = shader.fragmentShader.replace(
            `void main() {`,
            `
            void main() {
              float distanceToCenter = length(gl_PointCoord - vec2(0.5));
              if (distanceToCenter > 0.5) discard;
            `,
          );
        }}
      />
    </points>
  );
}
