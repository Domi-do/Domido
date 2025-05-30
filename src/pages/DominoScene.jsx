import { RigidBody } from "@react-three/rapier";
import { useState } from "react";

import DominoCanvas from "@/components/DominoCanvas/DominoCanvas";
import DominoHUD from "@/components/DominoHUD/DominoHUD";
import Ground from "@/components/Ground/Ground";
import ObjectRenderer from "@/components/ObjectRenderer/ObjectRenderer";
import useDominoControls from "@/hooks/useDominoControls";
import useDominoSimulation from "@/hooks/useDominoSimulation";
import useToastControls from "@/hooks/useToastControls";
import useDominoStore from "@/store/useDominoStore";

const DominoScene = () => {
  const [rotationSensitivity, setRotationSensitivity] = useState(1);
  const dominos = useDominoStore((state) => state.dominos);

  const { isOpenGuideToastVisible, openGuideToast, closeGuideToast, setIsGuideToastVisible } =
    useToastControls();

  useDominoControls({ onToggleGuideToast: (visible) => setIsGuideToastVisible(visible) });

  const handleRotationSensitivity = (e) => {
    setRotationSensitivity(e.target.value);
  };

  const changeResetKey = () => {
    setResetKey((prev) => prev + 1);
  };

  const { dominoRefs, updateSimulationState, readyDominoSimulation } =
    useDominoSimulation(changeResetKey);

  const [resetKey, setResetKey] = useState(0);

  return (
    <>
      <DominoHUD
        updateSimulationState={updateSimulationState}
        rotationSensitivity={rotationSensitivity}
        onChangeSensitivity={handleRotationSensitivity}
        isOpenGuideToastVisible={isOpenGuideToastVisible}
      />
      <DominoCanvas rotationSensitivity={rotationSensitivity}>
        {dominos.length
          && dominos.map((domino, index) => (
            <RigidBody
              key={`${resetKey}-${domino.id}`}
              restitution={0}
              friction={1}
              linearDamping={0.01}
              angularDamping={0.01}
              rotation={[0, 0, 0]}
              ref={(ref) => (dominoRefs.current[index] = ref)}
            >
              <ObjectRenderer
                dominoInfo={domino.objectInfo}
                position={domino.position}
                key={domino.id}
                onPointerOver={() => openGuideToast(domino.id)}
                onPointerOut={closeGuideToast}
                onClick={(event) => readyDominoSimulation(event, index)}
                opacity={domino.opacity}
              />
            </RigidBody>
          ))}
        <Ground type="wood_dark" />
      </DominoCanvas>
    </>
  );
};

export default DominoScene;
