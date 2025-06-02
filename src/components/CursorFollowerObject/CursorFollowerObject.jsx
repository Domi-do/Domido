import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

import ObjectRenderer from "@/components/ObjectRenderer/ObjectRenderer";
import useDominoStore from "@/store/useDominoStore";
import AudioController from "@/utils/AudioController";

const DOMINO_HEIGHT = 1;
const HALF_DOMINO_HEIGHT = DOMINO_HEIGHT / 2;
const DEFAULT_OPACITY = 1;
const BLOCKED_MOUSE_BUTTONS = [1, 2];

const CursorFollowerObject = () => {
  const { dominos, setDominos, selectedDomino, rotationY, selectedColor } = useDominoStore();
  const { camera, pointer, scene } = useThree();
  const meshRef = useRef();
  const audioController = useRef(new AudioController());

  useEffect(() => {
    audioController.current.init(camera, 2, false);
  }, [camera]);

  const playDominoDropSound = () => {
    audioController.current.play(selectedDomino.paths.sound);
  };

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
      color: selectedColor,
    };
    setDominos([...dominos, newDomino]);

    playDominoDropSound();
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
    const bbox = new THREE.Box3().setFromObject(meshRef.current);
    const height = bbox.max.y - bbox.min.y;
    const y = pos.y + height / 2;

    meshRef.current.position.set(pos.x, y, pos.z);
    meshRef.current.rotation.set(0, rotationY, 0);
  });

  return (
    selectedDomino !== null && (
      <mesh
        ref={meshRef}
        onPointerDown={handlePlaceDomino}
      >
        <ObjectRenderer
          dominoInfo={selectedDomino}
          color={selectedColor || "white"}
        />
      </mesh>
    )
  );
};

export default CursorFollowerObject;
