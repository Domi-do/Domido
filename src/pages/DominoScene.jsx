import { useState } from "react";

import useDominoPlacement from "../hooks/useDominoPlacement";

import DominoCanvas from "@/components/DominoCanvas/DominoCanvas";
import DominoHUD from "@/components/DominoHUD/DominoHUD";
import Ground from "@/components/Ground/Ground";

const DominoScene = () => {
  const [rotationSensitivity, setRotationSensitivity] = useState(1);
  const { selectedObject, setSelectedObject } = useDominoPlacement();

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
      <DominoCanvas rotationSensitivity={rotationSensitivity}>
        <Ground type="wood_dark" />
      </DominoCanvas>
    </>
  );
};

export default DominoScene;
