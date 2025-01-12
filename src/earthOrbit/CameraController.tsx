import { useSatelliteStore } from "../store";
import { CameraControls } from "@react-three/drei";
import { useEffect, useRef } from "react";

export function CameraController() {
  const { cameraPosition } = useSatelliteStore();
  const cameraControlsRef = useRef<CameraControls>(null);

  useEffect(() => {
    if (!cameraPosition) {
      return;
    }
    cameraControlsRef.current?.setLookAt(
      cameraPosition.x,
      cameraPosition.y,
      cameraPosition.z,
      0,
      0,
      0,
      true,
    );
  }, [cameraPosition]);

  return <CameraControls ref={cameraControlsRef} makeDefault />;
}
