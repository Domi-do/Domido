import { Canvas } from "@react-three/fiber";

import CameraControls from "@/components/CameraControls/CameraControls";

const DominoCanvas = ({ rotationSensitivity, children }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight
        intensity={0.5}
        color="white"
      />
      <directionalLight
        castShadow
        position={[5, 10, 5]}
      />
      <CameraControls rotationSensitivity={rotationSensitivity} />
      {children}
    </Canvas>
  );
};

export default DominoCanvas;
