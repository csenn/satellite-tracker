import { useRef, useMemo, useCallback } from "react";
import * as THREE from "three";

import { useFrame } from "@react-three/fiber";
import { ISatellite } from "../getSatelliteLocations";
import {
  getSatellitePosition,
  getSatellitePositionAtCurrentTime,
} from "../calcUtils";

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
  const pointsRef = useRef();
  const positionsRef = useRef(new Float32Array(satelliteData.length * 3));
  const lastUpdateTime = useRef(0);

  useMemo(() => {
    console.log("selectedSatellitesss", selectedSatellite);
    satelliteData.forEach((satellite, i) => {
      if (selectedSatellite) {
        if (satellite.OBJECT_ID !== selectedSatellite.OBJECT_ID) {
          positionsRef.current.set([0, 0, 0], i * 3);
          return;
        }
      }
      const positionAndVelocity = getSatellitePositionAtCurrentTime(satellite);
      if (!positionAndVelocity.position) return;
      const { x, y, z } = positionAndVelocity.position;
      positionsRef.current.set([x, y, z], i * 3);
    });

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  }, [satelliteData, selectedSatellite]);

  useFrame(() => {
    const now = Date.now();

    if (now - lastUpdateTime.current < 1000) return;

    lastUpdateTime.current = now;
    const currentTime = new Date();

    satelliteData.forEach((satellite, i) => {
      if (selectedSatellite) {
        if (satellite.OBJECT_ID !== selectedSatellite.OBJECT_ID) {
          positionsRef.current.set([0, 0, 0], i * 3);
          return;
        }
      }

      const positionAndVelocity = getSatellitePosition(satellite, currentTime);

      if (!positionAndVelocity.position) return;
      const { x, y, z } = positionAndVelocity.position;
      positionsRef.current.set([x, y, z], i * 3);
    });

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const onClickPoint = (event) => {
    event.stopPropagation();
    if (event.index !== undefined) {
      onClickSatellite(satelliteData[event.index]);
    }
  };

  return (
    <points
      ref={pointsRef}
      onClick={onClickPoint}
      raycast={useCallback((raycaster, intersects) => {
        if (pointsRef.current) {
          const pointSize = 100; // Same as your material size
          const threshold = pointSize / 2;
          raycaster.params.Points.threshold = threshold;
          THREE.Points.prototype.raycast.call(
            pointsRef.current,
            raycaster,
            intersects,
          );
        }
      }, [])}
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
        size={100}
        color="orange"
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
