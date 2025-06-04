import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useState } from "react";

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
  const [isLightOn, setLightOn] = useState(false);

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
            const { type, position, rotation, color, opacity, id, objectInfo } = domino;
            const { colliders } = domino.objectInfo.paths;
            return (
              <RigidBody
                type={type}
                colliders={colliders}
                name={domino.objectInfo.objectName}
                key={id}
                restitution={0}
                friction={1}
                linearDamping={0.01}
                angularDamping={0.01}
                position={position}
                rotation={rotation}
                ref={(ref) => (rigidBodyRefs.current[index] = ref)}
              >
                {objectInfo?.objectName === "cannon" && (
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

                {objectInfo?.objectName === "lightbulb" && (
                  <>
                    <CuboidCollider
                      args={[0.3, 0.4, 0.4]}
                      position={[1.65, -0.5, 1.25]}
                      sensor
                      onIntersectionEnter={() => {
                        setTimeout(() => {
                          setLightOn(true);
                        }, 300);
                      }}
                    />
                    <mesh position={[0, 0.1, -0.2]}>
                      <boxGeometry args={[1, 0.5, 0.4]} />
                      <meshStandardMaterial
                        color={isLightOn ? "white" : "gray"}
                        emissive={isLightOn ? "rgb(255,255,150)" : "black"}
                        emissiveIntensity={50}
                        metalness={0.1}
                        roughness={0.3}
                        transparent
                        opacity={0}
                      />
                      {isLightOn && (
                        <pointLight
                          position={[0, -0.5, 0]}
                          color="yellow"
                          intensity={30}
                          distance={2}
                          decay={1}
                        />
                      )}
                    </mesh>
                  </>
                )}

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
        <CarController rigidBodyRefs={rigidBodyRefs} />
        <Ground />
      </DominoCanvas>
    </>
  );
};

export default DominoScene;
