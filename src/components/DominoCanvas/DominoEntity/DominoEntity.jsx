import { RigidBody } from "@react-three/rapier";

import { ObjectRenderer } from "@/components/DominoCanvas";
import DominoVisualUnit from "@/components/DominoCanvas/DominoEntity/DominoVisualUnit/DominoVisualUnit";
import TutorialStepHandler from "@/components/DominoCanvas/DominoEntity/TutorialStepHandler/TutorialStepHandler";
import { useDominos } from "@/hooks/Queries/useDominos";
import useDominoStore from "@/store/useDominoStore";

const DominoEntity = ({ openGuideToast, closeGuideToast, rigidBodyRefs }) => {
  useDominos();
  const dominos = useDominoStore((state) => state.dominos);

  return (
    <>
      <TutorialStepHandler />

      {dominos.map((domino, index) => {
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
          >
            <DominoVisualUnit
              objectName={objectName}
              id={_id}
              position={position}
              rigidBodyRefs={rigidBodyRefs}
            />
            <ObjectRenderer
              dominoInfo={objectInfo}
              onPointerOver={(event) => openGuideToast(event, _id)}
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
