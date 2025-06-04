import { RigidBody } from "@react-three/rapier";

import { ObjectRenderer } from "@/components/DominoCanvas";
import DominoVisualUnit from "@/components/DominoCanvas/DominoEntity/DominoVisualUnit/DominoVisualUnit";
import useDominoStore from "@/store/useDominoStore";

const DominoEntity = ({
  openGuideToast,
  closeGuideToast,
  readyDominoSimulation,
  rigidBodyRefs,
}) => {
  const dominos = useDominoStore((state) => state.dominos);

  return (
    <>
      {dominos.length
        && dominos.map((domino, index) => {
          const { position, rotation, color, opacity, id, objectInfo } = domino;
          const { colliders, type } = domino.objectInfo.paths;

          return (
            <RigidBody
              type={type}
              colliders={colliders}
              name={objectInfo.objectName}
              key={id}
              restitution={0}
              friction={1}
              linearDamping={0.01}
              angularDamping={0.01}
              position={position}
              rotation={rotation}
              ref={(ref) => (rigidBodyRefs.current[index] = ref)}
            >
              <DominoVisualUnit
                objectName={objectInfo?.objectName}
                id={id}
                position={position}
                rigidBodyRefs={rigidBodyRefs}
              />
              <ObjectRenderer
                dominoInfo={objectInfo}
                onPointerOver={(event) => openGuideToast(event, id)}
                onPointerOut={closeGuideToast}
                onClick={(event) => readyDominoSimulation(event, index)}
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
