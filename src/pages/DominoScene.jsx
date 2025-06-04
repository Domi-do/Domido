import { RigidBody, CuboidCollider } from "@react-three/rapier";

import { Ground, ObjectRenderer, DominoCanvas, CarController } from "@/components/DominoCanvas";
import DominoHUD from "@/components/DominoHUD/DominoHUD";
import useCannonControls from "@/hooks/useCannonControls";
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
  const { handleCannonTrigger } = useCannonControls();

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
          && dominos.map((domino, index) => {
            return (
              <RigidBody
                type={domino.objectInfo.paths.type}
                colliders={domino.objectInfo.paths.colliders}
                name={domino.objectInfo.objectName}
                key={domino.id}
                restitution={0}
                friction={1}
                linearDamping={0.01}
                angularDamping={0.01}
                position={domino.position}
                rotation={domino.rotation}
                ref={(ref) => (rigidBodyRefs.current[index] = ref)}
              >
                {domino.objectInfo?.objectName === "cannon" && (
                  <>
                    <CuboidCollider
                      args={[0.2, 0.7, 0.2]}
                      position={[0, 0, -1]}
                      sensor
                      onIntersectionEnter={({ other, target }) => {
                        handleCannonTrigger(other, target);
                      }}
                    />
                  </>
                )}

                <ObjectRenderer
                  dominoInfo={domino.objectInfo}
                  onPointerOver={(event) => openGuideToast(event, domino.id)}
                  onPointerOut={closeGuideToast}
                  onClick={(event) => readyDominoSimulation(event, index)}
                  opacity={domino.opacity}
                  color={domino.color}
                />
              </RigidBody>
            );
          })}
        <CarController rigidBodyRefs={rigidBodyRefs} />
        <Ground />
      </DominoCanvas>
    </>
  );
};

export default DominoScene;
