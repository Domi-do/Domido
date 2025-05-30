import { useFrame, useThree } from "@react-three/fiber";
import { Children, useState } from "react";
import * as THREE from "three";

import ObjectRenderer from "@/components/ObjectRenderer/ObjectRenderer";
import useDominoStore from "@/store/useDominoStore";

const CursorFollowerObject = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const selectedDomino = useDominoStore((state) => state.selectedDomino);
  const { camera, pointer, scene } = useThree();

  useFrame(() => {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(pointer, camera);

    const ground = scene.getObjectByName("ground");
    if (!ground) return;

    const intersects = raycaster.intersectObject(ground);
    const groundHit = intersects[0];

    if (groundHit) {
      const pos = groundHit.point;
      const newPos = { x: pos.x, y: 0, z: pos.z };
      setPosition(newPos);
    }
  });

  return (
    selectedDomino !== null && (
      <mesh position={[position.x, position.y, position.z]}>
        <ObjectRenderer dominoInfo={selectedDomino} />
      </mesh>
    )
  );
};

export default CursorFollowerObject;
