import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import Cannon from "@/components/DominoCanvas/DominoEntity/DominoVisualUnit/Cannon/Cannon";
import { OBJECT_METADATA, OBJECT_GROUP_NAMES } from "@/constants/objectMetaData";
import { useDominoMutations } from "@/hooks/Queries/useDominoMutations";
import useTutorialTracker from "@/hooks/useTutorialTracker";
import { useSocket } from "@/store/SocketContext";
import { useTutorialStore } from "@/store/useTutorialStore";

const cannonMetadata = OBJECT_METADATA[OBJECT_GROUP_NAMES.DYNAMIC].cannon;

const CANNON_POSITION = [4, 0, 0];
const CANNON_ROTATION = [0, -1.5, 0];
const TRIGGER_OFFSET = [0, 0, -1.2];
const TRIGGER_SIZE = [0.3, 32, 32];

const CannonAutoPlacer = () => {
  const queryClient = useQueryClient();
  const { projectId } = useSocket();
  const dominos = queryClient.getQueryData(["dominos", projectId]);

  const { mutate } = useDominoMutations();
  const { tracker } = useTutorialStore();

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
    mutate({ dominos: updatedDominos });
  }, [tracker.placedDominoForKnock]);

  return (
    <group
      position={CANNON_POSITION}
      rotation={CANNON_ROTATION}
    >
      <mesh position={TRIGGER_OFFSET}>
        <sphereGeometry args={TRIGGER_SIZE} />
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
