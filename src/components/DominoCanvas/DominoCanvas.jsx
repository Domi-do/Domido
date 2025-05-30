import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";

import CameraControls from "@/components/CameraControls/CameraControls";
import CursorFollowerObject from "@/components/CursorFollowerObject/CursorFollowerObject";

const DominoCanvas = ({ rotationSensitivity, children }) => {
  return (
    <Canvas camera={{ position: [0, 5, 5], fov: 75 }}>
      <ambientLight
        color="white"
        intensity={1}
      />
      <directionalLight
        castShadow
        intensity={1}
        position={[5, 10, 5]}
      />
      <Environment
        preset="park"
        background
      />
      <CameraControls rotationSensitivity={rotationSensitivity} />
      <Physics>
        <>
          <CursorFollowerObject />
          {children}
        </>
      </Physics>
    </Canvas>
  );
};

export default DominoCanvas;
