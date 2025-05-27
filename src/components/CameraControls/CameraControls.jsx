import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const CameraControls = () => {
  const { camera } = useThree();
  const speed = 0.1;
  const keys = useRef({});

  useEffect(() => {
    const down = (e) => (keys.current[e.key.toLowerCase()] = true);
    const up = (e) => (keys.current[e.key.toLowerCase()] = false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame(() => {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();

    const right = new THREE.Vector3().crossVectors(direction, camera.up).normalize();

    if (keys.current["w"]) camera.position.addScaledVector(direction, speed);
    if (keys.current["s"]) camera.position.addScaledVector(direction, -speed);
    if (keys.current["a"]) camera.position.addScaledVector(right, -speed);
    if (keys.current["d"]) camera.position.addScaledVector(right, speed);
  });

  return null;
};

export default CameraControls;
