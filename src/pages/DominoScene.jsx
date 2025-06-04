import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useState } from "react";
import * as THREE from "three";

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
  const [lightOnMap, setlightOnMap] = useState({});
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
                      onIntersectionEnter={(other) => {
                        if (other.rigidBodyObject.name === "defaultObject") {
                          setTimeout(() => {
                            setlightOnMap((prev) => ({ ...prev, [id]: true }));
                          }, 300);
                        }
                      }}
                    />
                    <mesh position={[0, 0.1, -0.2]}>
                      <boxGeometry args={[1, 0.5, 0.4]} />
                      <meshStandardMaterial
                        color={lightOnMap[id] ? "white" : "gray"}
                        emissive={lightOnMap[id] ? "rgb(255,255,150)" : "black"}
                        emissiveIntensity={50}
                        metalness={0.1}
                        roughness={0.3}
                        transparent
                        opacity={0}
                      />
                      {lightOnMap[id] && (
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
                {objectInfo?.objectName === "bumper" && (
                  <>
                    <CuboidCollider
                      args={[0.5, 0.3, 0.5]}
                      position={[0, 0.1, 0.2]}
                      sensor
                      onIntersectionEnter={({ other }) => {
                        const otherObject = other.rigidBody;
                        if (!otherObject) return;

                        const dir = new THREE.Vector3()
                          .subVectors(otherObject.translation(), new THREE.Vector3(...position))
                          .setY(0)
                          .normalize()
                          .multiplyScalar(5);

                        otherObject.applyImpulse({ x: dir.x, y: 0, z: dir.z }, true);
                      }}
                    />
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
