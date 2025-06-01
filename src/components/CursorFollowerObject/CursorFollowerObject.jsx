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
const DOMINO_PLACE_SOUND_PATH = "/sounds/domino_drop.mp3";

const CursorFollowerObject = () => {
  const { dominos, setDominos, selectedDomino } = useDominoStore();
  const { camera, pointer, scene } = useThree();
  const meshRef = useRef();
  const audioRef = useRef(new AudioController());

  useEffect(() => {
    audioRef.current.init(camera, 2, false);
  }, [camera]);

  const playDominoDropSound = () => {
    audioRef.current.play(selectedDomino.paths.sound);
  };

  const handlePlaceDomino = (e) => {
    e.stopPropagation();

    const isBlockedClick = BLOCKED_MOUSE_BUTTONS.includes(e.button);
    if (isBlockedClick || !selectedDomino || !meshRef.current) return;

    const currentPosition = meshRef.current.position;

    const newDomino = {
      id: Date.now(),
      position: [currentPosition.x, currentPosition.y, currentPosition.z],
      objectInfo: selectedDomino,
      opacity: DEFAULT_OPACITY,
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
    const objectHit = firstHit.object;

    const bbox = new THREE.Box3().setFromObject(objectHit);
    const y = bbox.max.y + HALF_DOMINO_HEIGHT;

    meshRef.current.position.set(pos.x, y, pos.z);
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
