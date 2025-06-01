import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import ObjectRenderer from "@/components/ObjectRenderer/ObjectRenderer";
import useDominoStore from "@/store/useDominoStore";

const DOMINO_HEIGHT = 1;
const HALF_DOMINO_HEIGHT = DOMINO_HEIGHT / 2;
const DEFAULT_OPACITY = 1;
const BLOCKED_MOUSE_BUTTONS = [1, 2];

const CursorFollowerObject = () => {
  const { dominos, setDominos, selectedDomino, rotationY } = useDominoStore();
  const { camera, pointer, scene } = useThree();
  const meshRef = useRef();

  const handlePlaceDomino = (e) => {
    e.stopPropagation();

    const isBlockedClick = BLOCKED_MOUSE_BUTTONS.includes(e.button);
    const cannotPlaceDomino = isBlockedClick || !selectedDomino || !meshRef.current;

    if (cannotPlaceDomino) return;

    const currentPosition = meshRef.current.position;

    const newDomino = {
      id: Date.now(),
      position: [currentPosition.x, currentPosition.y, currentPosition.z],
      rotation: [0, rotationY, 0],
      objectInfo: selectedDomino,
      opacity: DEFAULT_OPACITY,
    };
    setDominos([...dominos, newDomino]);
  };

  useFrame(() => {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(pointer, camera);

    const ground = scene.getObjectByName("ground");
    const allDominoes = scene.children.filter((child) => child.name === "domino");

    if (!ground || !meshRef.current) return;

    const intersects = raycaster.intersectObjects([ground, ...allDominoes], true);
    const [firstHit] = intersects;

    if (!firstHit) return;

    const pos = firstHit.point;
    const objectHit = firstHit.object;

    const bbox = new THREE.Box3().setFromObject(objectHit);
    const y = bbox.max.y + HALF_DOMINO_HEIGHT;

    meshRef.current.position.set(pos.x, y, pos.z);
    meshRef.current.rotation.set(0, rotationY, 0);
  });

  return (
    selectedDomino !== null && (
      <mesh
        ref={meshRef}
        onPointerDown={handlePlaceDomino}
      >
        <ObjectRenderer dominoInfo={selectedDomino} />
      </mesh>
    )
  );
};

export default CursorFollowerObject;
