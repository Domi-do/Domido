import { RigidBody, RigidBodyProps, RapierRigidBody } from "@react-three/rapier";
import { useMemo, useRef } from "react";
import type { PointerEvent } from "react";

import { ObjectRenderer } from "@/components/DominoCanvas";
import DominoVisualUnit from "@/components/DominoCanvas/DominoEntity/DominoVisualUnit/DominoVisualUnit";
import TutorialStepHandler from "@/components/DominoCanvas/DominoEntity/TutorialStepHandler/TutorialStepHandler";
import { useDominos } from "@/hooks/Queries/useDominos";
import useUserStore from "@/store/useUserStore";
import { getCollisionGroupMask } from "@/utils/collisionGroups";
import { debounce } from "@/utils/debounce";
import type { DominoType } from "@/types/domino";

import type { visualUnitObjectName } from "@/components/DominoCanvas/DominoEntity/DominoVisualUnit/DominoVisualUnit";

interface DominoEntityProps {
  openGuideToast: (event: PointerEvent, key: string) => void;
  closeGuideToast: () => void;
}

const DominoEntity = ({ openGuideToast, closeGuideToast }: DominoEntityProps) => {
  const { data: dominos = [] } = useDominos();
  const isTutorialUser = useUserStore((state) => state.userInfo?.isTutorialUser);
  const rigidBodyRefs = useRef<RapierRigidBody[]>([]);

  const throttledPointerOver = useMemo(() => {
    return debounce((event: PointerEvent, key: string) => {
      openGuideToast(event, key);
    }, 200);
  }, [openGuideToast]);

  return (
    <>
      {isTutorialUser && <TutorialStepHandler />}
      {dominos.map((domino: DominoType, index: number) => {
        const { position, rotation, color, opacity, _id, objectInfo } = domino;
        const { colliders, type, objectName } = objectInfo;

        if (!_id) return;

        return (
          <RigidBody
            key={_id || index}
            type={type as RigidBodyProps["type"]}
            colliders={colliders ?? false}
            name={objectName}
            restitution={0}
            friction={1}
            linearDamping={0.01}
            angularDamping={0.01}
            position={position}
            rotation={rotation}
            ref={(ref) => {
              if (ref) rigidBodyRefs.current[index] = ref;
            }}
            collisionGroups={getCollisionGroupMask(objectName as visualUnitObjectName)}
          >
            <DominoVisualUnit
              objectName={objectName as visualUnitObjectName}
              id={_id}
              position={position}
              rigidBodyRefs={rigidBodyRefs}
            />
            <ObjectRenderer
              dominoInfo={objectInfo}
              onPointerOver={(e: PointerEvent<Element>) => throttledPointerOver(e, _id)}
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
