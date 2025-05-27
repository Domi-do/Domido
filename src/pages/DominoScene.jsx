import { useState } from "react";

import DominoCanvas from "@/components/DominoCanvas/DominoCanvas";
import DominoHUD from "@/components/DominoHUD/DominoHUD";

const DominoScene = () => {
  const [rotationSensitivity, setRotationSensitivity] = useState(1);

  const handleRotationSensitivity = (e) => {
    setRotationSensitivity(e.target.value);
  };

  return (
    <>
      <DominoHUD
        rotationSensitivity={rotationSensitivity}
        onChangeSensitivity={handleRotationSensitivity}
      />
      <DominoCanvas rotationSensitivity={rotationSensitivity}>
        <mesh position={[2, 2, 2]}>
          <boxGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </DominoCanvas>
    </>
  );
};

export default DominoScene;
