import { RigidBody } from "@react-three/rapier";
import { useState } from "react";

import useDominoPlacement from "../hooks/useDominoPlacement";

import DominoCanvas from "@/components/DominoCanvas/DominoCanvas";
import DominoHUD from "@/components/DominoHUD/DominoHUD";
import Ground from "@/components/Ground/Ground";
import ObjectRenderer from "@/components/ObjectRenderer/ObjectRenderer";

const DominoScene = () => {
  const [rotationSensitivity, setRotationSensitivity] = useState(1);
  const { selectedObject, placedDominos, setSelectedObject, handlePlaceDomino } =
    useDominoPlacement();

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
        handlePlaceDomino={handlePlaceDomino}
      >
        <Ground type="wood_dark" />
        {placedDominos.length
          && placedDominos.map((domino) => (
            <RigidBody key={domino.id}>
              <ObjectRenderer
                objectInfo={domino.objectInfo}
                position={domino.position}
              />
            </RigidBody>
          ))}
      </DominoCanvas>
    </>
  );
};

export default DominoScene;
