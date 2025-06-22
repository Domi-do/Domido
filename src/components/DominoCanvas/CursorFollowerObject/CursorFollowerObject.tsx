import { useFrame, useThree } from "@react-three/fiber";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { DominoType } from "@/types/domino";
import { v4 as uuidv4 } from "uuid";

import {
  CheckFirstDominoAchievement,
  CheckHundredDominoAchievement,
} from "@/achievments/CheckDominoAchievement";
import { ObjectRenderer } from "@/components/DominoCanvas";
import { useDominoMutations } from "@/hooks/Queries/useDominoMutations";
import { useSocket } from "@/store/SocketContext";
import { useToast } from "@/store/ToastContext";
import useDominoStore from "@/store/useDominoStore";
import useSettingStore from "@/store/useSettingStore";
import useUserStore from "@/store/useUserStore";
import AudioController from "@/utils/AudioController";
import { dominoHistory } from "@/types/dominoHistory";

interface CursorFollowerObjectProps {
  historyRef: dominoHistory;
}

const DEFAULT_OPACITY = 1;
const BLOCKED_MOUSE_BUTTONS = [1, 2];
const OBJECT_NAMES = [
  "defaultObject",
  "slide",
  "stairsClosedShort",
  "lightbulb",
  "bumper",
  "beachBall",
  "steelBall",
  "soccerFootball",
  "cannon",
  "car",
  "rainbowSlide",
];

const CursorFollowerObject = ({ historyRef }: CursorFollowerObjectProps) => {
  const queryClient = useQueryClient();
  const { selectedDomino, rotationY, selectedColor } = useDominoStore();
  const objectVolume = useSettingStore((state) => state.objectVolume);
  const { camera, pointer, scene } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const audioController = useRef(new AudioController());
  const { projectId, socket } = useSocket();
  const { mutate } = useDominoMutations();
  const { showToast } = useToast();
  const lastPlacedTime = useRef(0);

  const userId = useUserStore((state) => state.userInfo?.userID);

  const playDominoDropSound = () => {
    if (!selectedDomino) return;

    audioController.current.play(selectedDomino.sound);
  };

  const handlePlaceDomino = (e: MouseEvent) => {
    e.stopPropagation();

    const nowTime = Date.now();
    if (nowTime - lastPlacedTime.current < 300) {
      showToast({ message: "너무 빠르게 놓으셨네요. 잠시만요!", placement: "bottomRight" });
      return;
    }
    lastPlacedTime.current = nowTime;
    const isBlockedClick = BLOCKED_MOUSE_BUTTONS.includes(e.button);
    const cannotPlaceDomino = isBlockedClick || !selectedDomino || !meshRef.current;

    if (cannotPlaceDomino) return;

    const currentPosition = meshRef.current?.position;

    const newDomino = {
      _id: uuidv4(),
      position: [currentPosition?.x, currentPosition?.y, currentPosition?.z],
      rotation: [0, rotationY, 0],
      objectInfo: { ...selectedDomino },
      opacity: DEFAULT_OPACITY,
      color: selectedColor,
    };

    const latestDominos = (queryClient.getQueryData(["dominos", projectId]) as DominoType[]) || [];
    const updatedDomino: DominoType[] = [...latestDominos, newDomino] as DominoType[];

    mutate(
      { dominos: updatedDomino },
      {
        onSuccess: (data: DominoType[]) => {
          historyRef.current.push(data);
        },
      },
    );

    playDominoDropSound();
    CheckFirstDominoAchievement({ dominoCount: updatedDomino.length, userId, showToast });
    CheckHundredDominoAchievement({ dominoCount: updatedDomino.length, userId, showToast });
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
