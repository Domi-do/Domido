import { RigidBody } from "@react-three/rapier";
import { useState } from "react";

import useDominoPlacement from "../hooks/useDominoPlacement";

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

  const { selectedObject, placedDominos, setSelectedObject, handlePlaceDomino } =
    useDominoPlacement();

  const { isOpenGuideToastVisible, openGuideToast, closeGuideToast, setIsGuideToastVisible } =
    useToastControls();

  useDominoControls({ onToggleGuideToast: (visible) => setIsGuideToastVisible(visible) });

  const handleRotationSensitivity = (e) => {
    setRotationSensitivity(e.target.value);
  };

  // const count = 30;
  const spacing = 0.6;

  const {
    dominoRefs,
    simulationMode,
    countdownNumber,
    updateSimulationState,
    // readyDominoSimulation,
  } = useDominoSimulation();

  return (
    <>
      <DominoHUD
        simulationMode={simulationMode}
        updateSimulationState={updateSimulationState}
        countdownNumber={countdownNumber}
        rotationSensitivity={rotationSensitivity}
        onChangeSensitivity={handleRotationSensitivity}
        isOpenGuideToastVisible={isOpenGuideToastVisible}
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
      />
      <DominoCanvas
        rotationSensitivity={rotationSensitivity}
        selectedObject={selectedObject}
        handlePlaceDomino={handlePlaceDomino}
      >
        {dominos.map((item) => (
          <RigidBody
            key={item.index}
            restitution={0.1}
            friction={1}
            position={item.position}
          >
            <mesh
              castShadow
              receiveShadow
              onPointerOver={() => openGuideToast(item.index)}
              onPointerOut={closeGuideToast}
              position={item.position}
            >
              <boxGeometry args={[0.2, 1, 0.5]} />
              <meshStandardMaterial
                color="orange"
                transparent={true}
                opacity={item.opacity}
              />
            </mesh>
          </RigidBody>
        ))}
        <Ground type="wood_dark" />
        {placedDominos.length
          && placedDominos.map((domino, i) => (
            <RigidBody
              key={domino.id}
              restitution={0}
              friction={1}
              linearDamping={0.01}
              angularDamping={0.01}
              position={[i * spacing, 0.5, 0]}
              ref={(ref) => (dominoRefs.current[i] = ref)}
            >
              <ObjectRenderer
                objectInfo={domino.objectInfo}
                position={domino.position}
              />
            </RigidBody>
          ))}

        {/* {Array.from({ length: count }, () => "orange").map((item, i) => (
          <RigidBody
            key={i}
            restitution={0}
            friction={1}
            linearDamping={0.01}
            angularDamping={0.01}
            position={[i * spacing, 0.5, 0]}
            ref={(ref) => (dominoRefs.current[i] = ref)}
          >
            <mesh
              castShadow
              receiveShadow
              onClick={(e) => readyDominoSimulation(e, i)}
            >
              <boxGeometry args={[0.2, 1, 0.5]} />
              <meshStandardMaterial
                color="orange"
                transparent={true}
                opacity={item.opacity}
              />
            </mesh>
          </RigidBody>
        ))} */}
      </DominoCanvas>
    </>
  );
};

export default DominoScene;
