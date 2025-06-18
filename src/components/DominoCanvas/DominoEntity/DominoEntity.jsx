import { RigidBody } from "@react-three/rapier";
import { useMemo, useRef } from "react";

import { ObjectRenderer } from "@/components/DominoCanvas";
import DominoVisualUnit from "@/components/DominoCanvas/DominoEntity/DominoVisualUnit/DominoVisualUnit";
import TutorialStepHandler from "@/components/DominoCanvas/DominoEntity/TutorialStepHandler/TutorialStepHandler";
import { useDominos } from "@/hooks/Queries/useDominos";
import useUserStore from "@/store/useUserStore";
import { getCollisionGroupMask } from "@/utils/collisionGroups";
import { debounce } from "@/utils/debounce";

const DominoEntity = ({ openGuideToast, closeGuideToast }) => {
  const { data: dominos } = useDominos();
  const isTutorialUser = useUserStore((state) => state.userInfo?.isTutorialUser);
  const rigidBodyRefs = useRef([]);

  const throttledPointerOver = useMemo(() => {
    return debounce((e, id) => {
      e.stopPropagation();
      return openGuideToast(e, id), 200;
    });
  }, [openGuideToast]);

  return (
    <>
      {isTutorialUser && <TutorialStepHandler />}
      {dominos.length
        && dominos.map((domino, index) => {
          const { position, rotation, color, opacity, _id, objectInfo } = domino;
          const { colliders, type, objectName } = objectInfo;

          return (
            <RigidBody
              key={_id || index}
              type={type}
              colliders={colliders ?? false}
              name={objectName}
              restitution={0}
              friction={1}
              linearDamping={0.01}
              angularDamping={0.01}
              position={position}
              rotation={rotation}
              ref={(ref) => (rigidBodyRefs.current[index] = ref)}
              collisionGroups={getCollisionGroupMask(objectName)}
            >
              <DominoVisualUnit
                objectName={objectName}
                id={_id}
                position={position}
                rigidBodyRefs={rigidBodyRefs}
              />
              <ObjectRenderer
                dominoInfo={objectInfo}
                onPointerOver={(e) => throttledPointerOver(e, _id || undefined)}
                onPointerOut={closeGuideToast}
                opacity={opacity}
                color={color}
              />
            </RigidBody>
          );
        })}
    </>
  );
};

export default DominoEntity;
