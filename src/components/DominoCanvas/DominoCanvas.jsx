import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";

import CameraControls from "@/components/CameraControls/CameraControls";
import CursorFollowerObject from "@/components/CursorFollowerObject/CursorFollowerObject";

const DominoCanvas = ({ rotationSensitivity, handlePlaceDomino, children }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight
        color="white"
        intensity={1}
      />
      <directionalLight
        castShadow
        intensity={1}
        position={[5, 10, 5]}
      />
      <CameraControls rotationSensitivity={rotationSensitivity} />
      <Physics>
        <>
          <CursorFollowerObject handlePlaceDomino={handlePlaceDomino} />
          {children}
        </>
      </Physics>
    </Canvas>
  );
};

export default DominoCanvas;
