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

  const { selectedObject, setSelectedObject, handlePlaceDomino } = useDominoPlacement();

  const { isOpenGuideToastVisible, openGuideToast, closeGuideToast, setIsGuideToastVisible } =
    useToastControls();

  useDominoControls({ onToggleGuideToast: (visible) => setIsGuideToastVisible(visible) });

  const handleRotationSensitivity = (e) => {
    setRotationSensitivity(e.target.value);
  };

  const { dominoRefs, updateSimulationState, readyDominoSimulation } = useDominoSimulation();

  return (
    <>
      <DominoHUD
        updateSimulationState={updateSimulationState}
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
        {dominos.map((item, index) => (
          <RigidBody
            key={item.index}
            restitution={0}
            friction={1}
            linearDamping={0.01}
            angularDamping={0.01}
            position={item.position}
            ref={(ref) => (dominoRefs.current[index] = ref)}
          >
            <mesh
              castShadow
              receiveShadow
              onPointerOver={() => openGuideToast(item.index)}
              onPointerOut={closeGuideToast}
              position={item.position}
              onClick={(event) => readyDominoSimulation(event, index)}
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
        {/* {placedDominos.length
          && placedDominos.map((domino) => (
            <RigidBody
              key={domino.id}
              restitution={0}
              friction={1}
              linearDamping={0.01}
              angularDamping={0.01}
            >
              <ObjectRenderer
                objectInfo={domino.objectInfo}
                position={domino.position}
              />
            </RigidBody>
          ))} */}
      </DominoCanvas>
    </>
  );
};

export default DominoScene;
