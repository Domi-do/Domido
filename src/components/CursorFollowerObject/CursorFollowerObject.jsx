import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";

import ObjectRenderer from "@/components/ObjectRenderer/ObjectRenderer";
import useDominoStore from "@/store/useDominoStore";

const CursorFollowerObject = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const { dominos, setDominos, selectedDomino } = useDominoStore();

  const handlePlaceDomino = (e, objectInfo) => {
    const clickedPosition = e.point;
    const clikedRotated = e.object.rotation;
    const newDomino = {
      id: Date.now(),
      position: [clickedPosition.x, clickedPosition.y, clickedPosition.z],
      rotation: [clikedRotated.x, clikedRotated.y, clikedRotated.z],
      objectInfo,
      opacity: 1,
    };
    const updateDominos = [...dominos, newDomino];
    setDominos(updateDominos);
  };

  useFrame((state) => {
    const { pointer, camera } = state;

    const vector = new THREE.Vector3(pointer.x, pointer.y, 0.5).unproject(camera);
    const direction = vector.clone().sub(camera.position).normalize();

    const newPos = camera.position.clone().add(direction.multiplyScalar(5));

    setPosition({ x: newPos.x, y: newPos.y, z: newPos.z });
  });
  return (
    selectedDomino !== null && (
      <mesh onPointerDown={(e) => handlePlaceDomino(e, selectedDomino)}>
        <ObjectRenderer
          dominoInfo={selectedDomino}
          position={[position.x, position.y, position.z]}
        />
      </mesh>
    )
  );
};

export default CursorFollowerObject;
