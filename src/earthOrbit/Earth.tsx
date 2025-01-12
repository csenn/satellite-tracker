import { useLoader } from "@react-three/fiber";
import EarthMapJpg from "../assets/earth-realistic-8k.webp";
import { TextureLoader } from "three";

// Earth is 7,900 miles in diameter
export function Earth() {
  const colorMap = useLoader(TextureLoader, EarthMapJpg);
  return (
    <mesh>
      <sphereGeometry args={[3450, 3450, 3450]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}
