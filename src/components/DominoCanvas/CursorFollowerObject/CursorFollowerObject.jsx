import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

import { ObjectRenderer } from "@/components/DominoCanvas";
import { useDominoMutations } from "@/hooks/Queries/useDominoMutations";
import { useSocket } from "@/store/SocketContext";
import useDominoStore from "@/store/useDominoStore";
import useSettingStore from "@/store/useSettingStore";
import AudioController from "@/utils/AudioController";

const DEFAULT_OPACITY = 1;
const BLOCKED_MOUSE_BUTTONS = [1, 2];
const OBJECT_NAMES = [
  "defaultObject",
  "slide",
  "spiralStairs",
  "staircase",
  "stairsClosedShort",
  "stairsClosed",
  "stairs",
  "lightbulb",
  "beachBall",
  "cannon",
  "pokeball",
  "soccerFootball",
  "car",
  "bumper",
];

const CursorFollowerObject = () => {
  const { dominos, selectedDomino, rotationY, selectedColor } = useDominoStore();
  const objectVolume = useSettingStore((state) => state.objectVolume);
  const { camera, pointer, scene } = useThree();
  const meshRef = useRef();
  const audioController = useRef(new AudioController());
  const { projectId, socket } = useSocket();
  const { mutate } = useDominoMutations();

  const playDominoDropSound = () => {
    audioController.current.play(selectedDomino.sound);
  };

  const handlePlaceDomino = (e) => {
    e.stopPropagation();

    const isBlockedClick = BLOCKED_MOUSE_BUTTONS.includes(e.button);
    const cannotPlaceDomino = isBlockedClick || !selectedDomino || !meshRef.current;

    if (cannotPlaceDomino) return;

    const currentPosition = meshRef.current.position;

    const newDomino = {
      position: [currentPosition.x, currentPosition.y, currentPosition.z],
      rotation: [0, rotationY, 0],
      objectInfo: { ...selectedDomino },
      opacity: DEFAULT_OPACITY,
      color: selectedColor,
    };
    const updatedDomino = [...dominos, newDomino];
    mutate({ dominos: updatedDomino });
    socket.emit("update domino", { projectId, dominos: updatedDomino });
    playDominoDropSound();
  };

  useFrame(() => {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(pointer, camera);

    const ground = scene.getObjectByName("ground");
    const allDominoes = scene.children.filter((child) => OBJECT_NAMES.includes(child.name));

    if (!ground || !meshRef.current) return;

    const intersects = raycaster.intersectObjects([ground, ...allDominoes], true);
    const [firstHit] = intersects;

    if (!firstHit) return;

    const pos = firstHit.point;
    const boundingBox = new THREE.Box3().setFromObject(meshRef.current);
    const height = boundingBox.max.y - boundingBox.min.y;
    const centerY = pos.y + height / 2;

    meshRef.current.position.set(pos.x, centerY, pos.z);
    meshRef.current.rotation.set(0, rotationY, 0);

    socket.emit("update cursor position", {
      projectId,
      objectInfo: selectedDomino,
      position: [pos.x, centerY, pos.z],
      selectedColor,
      rotationY,
    });
  });

  useEffect(() => {
    audioController.current.init(camera, objectVolume, false);

    if (audioController.current) {
      audioController.current.setVolume(objectVolume);
    }
  }, [camera, objectVolume]);

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
