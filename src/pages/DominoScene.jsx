import { RigidBody } from "@react-three/rapier";
import { useState } from "react";

import useDominoPlacement from "../hooks/useDominoPlacement";

import DominoCanvas from "@/components/DominoCanvas/DominoCanvas";
import DominoHUD from "@/components/DominoHUD/DominoHUD";
import Ground from "@/components/Ground/Ground";

const DominoScene = () => {
  const [rotationSensitivity, setRotationSensitivity] = useState(1);
  const { selectedObject, placedDominos, setSelectedObject } = useDominoPlacement();

  const handleRotationSensitivity = (e) => {
    setRotationSensitivity(e.target.value);
  };

  return (
    <>
      <DominoHUD
        rotationSensitivity={rotationSensitivity}
        onChangeSensitivity={handleRotationSensitivity}
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
      />
      <DominoCanvas
        rotationSensitivity={rotationSensitivity}
        selectedObject={selectedObject}
      >
        <Ground type="wood_dark" />
        {placedDominos.map((domino) => (
          <RigidBody key={domino.id}>
            <mesh position={domino.position}>
              <boxGeometry args={[0.2, 1, 0.5]} />
              <meshStandardMaterial color="orange" />
            </mesh>
          </RigidBody>
        ))}
      </DominoCanvas>
    </>
  );
};

export default DominoScene;
