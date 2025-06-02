import { RigidBody } from "@react-three/rapier";

import DominoCanvas from "@/components/DominoCanvas/DominoCanvas";
import DominoHUD from "@/components/DominoHUD/DominoHUD";
import Ground from "@/components/Ground/Ground";
import ObjectRenderer from "@/components/ObjectRenderer/ObjectRenderer";
import useDominoKeyboardControls from "@/hooks/useDominoKeyboardControls";
import useDominoSimulation from "@/hooks/useDominoSimulation";
import useToastControls from "@/hooks/useToastControls";
import useDominoStore from "@/store/useDominoStore";
import useSettingStore from "@/store/useSettingStore";

const DominoScene = () => {
  const dominos = useDominoStore((state) => state.dominos);
  const rotationSensitivity = useSettingStore((state) => state.rotationSensitivity);

  const { isOpenGuideToastVisible, openGuideToast, closeGuideToast, setIsGuideToastVisible } =
    useToastControls();

  const { rigidBodyRefs, readyDominoSimulation, switchToReadyMode } = useDominoSimulation();

  useDominoKeyboardControls(setIsGuideToastVisible);

  return (
    <>
      <DominoHUD
        isOpenGuideToastVisible={isOpenGuideToastVisible}
        rigidBodyRefs={rigidBodyRefs}
        switchToReadyMode={switchToReadyMode}
      />
      <DominoCanvas rotationSensitivity={rotationSensitivity}>
        {dominos.length
          && dominos.map((domino, index) => (
            <RigidBody
              name="domino"
              key={domino.id}
              restitution={0}
              friction={1}
              linearDamping={0.01}
              angularDamping={0.01}
              position={domino.position}
              rotation={domino.rotation}
              ref={(ref) => (rigidBodyRefs.current[index] = ref)}
            >
              <ObjectRenderer
                dominoInfo={domino.objectInfo}
                key={domino.id}
                onPointerOver={(event) => openGuideToast(event, domino.id)}
                onPointerOut={closeGuideToast}
                onClick={(event) => readyDominoSimulation(event, index)}
                opacity={domino.opacity}
                color={domino.color}
              />
            </RigidBody>
          ))}
        <Ground />
      </DominoCanvas>
    </>
  );
};

export default DominoScene;
