import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, TextureLoader } from "three";
import EarthMapJpg from "../assets/earth-realistic-8k.webp";

export const EARTH_RADIUS = 3450;
const EARTH_ROTATION_SPEED = (360 / 86164) * (Math.PI / 180); // Radians per second
export const TILT_ANGLE = 23.5 * (Math.PI / 180);
// export const TILT_ANGLE = 0

export function Earth() {
  const earthRef = useRef<Mesh>(null);

  const colorMap = useLoader(TextureLoader, EarthMapJpg);

  //  useFrame(() => {
  //     if (earthRef.current) {
  //       // Current UTC time
  //       const now = new Date();
  //       const utcMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  //       const secondsSinceMidnightUTC = (now.getTime() - utcMidnight) / 1000;

  //       // Calculate the Earth's rotation angle based on time
  //       const earthRotationAngle = (secondsSinceMidnightUTC * EARTH_ROTATION_SPEED) % (2 * Math.PI);

  //       // Apply the rotation around the Y-axis
  //       earthRef.current.rotation.y = earthRotationAngle;
  //     }
  //   });

  return (
    <group rotation={[TILT_ANGLE, 0, 0]}>
      {/* Apply Earth's tilt */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
    </group>
  );
}
