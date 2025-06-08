import { RigidBody } from "@react-three/rapier";
import { useEffect } from "react";

import { ObjectRenderer } from "@/components/DominoCanvas";
import DominoVisualUnit from "@/components/DominoCanvas/DominoEntity/DominoVisualUnit/DominoVisualUnit";
import { useDominos } from "@/hooks/Queries/useDominos";
import useDominoStore from "@/store/useDominoStore";

const DominoEntity = ({
  openGuideToast,
  closeGuideToast,
  readyDominoSimulation,
  rigidBodyRefs,
}) => {
  const { data: fetchedDominos, isLoading } = useDominos("6840f38a5749f010ab072eeb");
  const { dominos, setDominos } = useDominoStore();

  useEffect(() => {
    if (!isLoading) {
      setDominos(fetchedDominos);
    }
  }, [fetchedDominos, isLoading]);

  return (
    <>
      {dominos.length
        && dominos.map((domino, index) => {
          const { position, rotation, color, opacity, id, objectInfo } = domino;
          const { colliders, type, objectName } = objectInfo;

          return (
            <RigidBody
              type={type}
              colliders={colliders}
              name={objectName}
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
                objectName={objectName}
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
