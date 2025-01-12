import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import EarthMapJpg from "../assets/8k_earth_daymap.jpg";
import { useSatelliteStore } from "../store";
import { TextureLoader } from "three";

// Earth is 7,900 miles in diameter
export function Earth() {
  const { camera } = useThree();
  const colorMap = useLoader(TextureLoader, EarthMapJpg);
  const { position } = useSatelliteStore();
  // const lastPosition = useRef(camera.position.clone());

  // useFrame(() => {
  //   if (!camera.position.equals(lastPosition.current)) {
  //     console.log(`Camera position changed: x=${camera.position.x}, y=${camera.position.y}, z=${camera.position.z}`);
  //     lastPosition.current.copy(camera.position);
  //   }
  // });

  useEffect(() => {
    if (!position) {
      return;
    }
    camera.position.set(position.x, position.y, position.z);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);
  }, [position, camera]);

  return (
    <mesh>
      <sphereGeometry args={[3450, 3450, 3450]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}
