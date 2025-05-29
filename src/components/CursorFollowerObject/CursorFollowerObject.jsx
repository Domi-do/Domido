import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";

import ObjectRenderer from "@/components/ObjectRenderer/ObjectRenderer";

const CursorFollowerObject = ({ selectedObject, handlePlaceDomino }) => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

  useFrame((state) => {
    const { pointer, camera } = state;

    const vector = new THREE.Vector3(pointer.x, pointer.y, 0.5).unproject(camera);
    const direction = vector.clone().sub(camera.position).normalize();

    const newPos = camera.position.clone().add(direction.multiplyScalar(5));

    setPosition({ x: newPos.x, y: newPos.y, z: newPos.z });
  });
  return (
    selectedObject !== null && (
      <mesh onPointerDown={(e) => handlePlaceDomino(e, selectedObject)}>
        <ObjectRenderer
          objectInfo={selectedObject}
          position={[position.x, position.y, position.z]}
        />
      </mesh>
    )
  );
};

export default CursorFollowerObject;
