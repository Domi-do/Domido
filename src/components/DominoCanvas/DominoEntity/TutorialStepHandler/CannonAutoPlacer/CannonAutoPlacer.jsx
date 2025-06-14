import { useEffect, useState } from "react";

import Cannon from "@/components/DominoCanvas/DominoEntity/DominoVisualUnit/Cannon/Cannon";
import { OBJECT_METADATA, OBJECT_GROUP_NAMES } from "@/constants/objectMetaData";
import useTutorialTracker from "@/hooks/useTutorialTracker";
import { useSocket } from "@/store/SocketContext";
import useDominoStore from "@/store/useDominoStore";
import { useTutorialStore } from "@/store/useTutorialStore";

const cannonMetadata = OBJECT_METADATA[OBJECT_GROUP_NAMES.DYNAMIC].cannon;

const CANNON_POSITION = [4, 0, 0];
const CANNON_ROTATION = [0, -1.5, 0];
const TRIGGER_OFFSET = [0, 0, -1.2];
const TRIGGER_SIZE = [0.4, 1.4, 0.5];

const CannonAutoPlacer = () => {
  const { dominos, setDominos } = useDominoStore.getState();
  const { tracker } = useTutorialStore();
  const { projectId, socket } = useSocket();

  const [hasTriggered, setHasTriggered] = useState(false);

  useTutorialTracker(hasTriggered);

  useEffect(() => {
    if (!tracker.placedDominoForKnock) return;

    const newCannon = {
      position: [...CANNON_POSITION],
      rotation: [...CANNON_ROTATION],
      objectInfo: {
        ...cannonMetadata,
        objectName: "cannon",
        groupName: OBJECT_GROUP_NAMES.DYNAMIC,
      },
      opacity: 1,
    };

    const updatedDominos = [...dominos, newCannon];
    setDominos(updatedDominos);
    socket.emit("update domino", { projectId, dominos: updatedDominos });
  }, [tracker.placedDominoForKnock]);

  return (
    <group
      position={CANNON_POSITION}
      rotation={CANNON_ROTATION}
    >
      <mesh position={TRIGGER_OFFSET}>
        <boxGeometry args={TRIGGER_SIZE} />
        <meshStandardMaterial
          color="red"
          transparent
          opacity={0.5}
        />
      </mesh>
      <Cannon onAfterTrigger={() => setHasTriggered(true)} />
    </group>
  );
};

export default CannonAutoPlacer;
