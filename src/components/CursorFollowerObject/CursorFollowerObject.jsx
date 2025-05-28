import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";

const CursorFollowerObject = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

  useFrame((state) => {
    const { pointer, camera } = state;

    const vector = new THREE.Vector3(pointer.x, pointer.y, 0.5).unproject(camera);
    const direction = vector.clone().sub(camera.position).normalize();

    const newPos = camera.position.clone().add(direction.multiplyScalar(5));

    setPosition({ x: newPos.x, y: newPos.y, z: newPos.z });
  });
  return (
    <mesh position={[position.x, position.y, position.z]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export default CursorFollowerObject;
