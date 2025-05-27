import { RoundedBox, Sky, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

import CameraControls from "@/components/CameraControls/CameraControls";

const DominoScene = () => {
  const [rotationSensitivity, setrotationSensitivity] = useState(1);

  const testRotationSensitivity = (e) => {
    setrotationSensitivity(e.target.value);
  };

  return (
    <>
      <input
        id="sensitivity"
        type="range"
        min={1}
        max={50}
        step={0.01}
        value={rotationSensitivity}
        onChange={testRotationSensitivity}
        className="w-full"
      />
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight
          intensity={0.5}
          color="white"
        />
        <directionalLight
          castShadow
          position={[5, 10, 5]}
        />
        {/* <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
        /> */}
        <CameraControls />
        <OrbitControls
          enableZoom={true}
          mouseButtons={{ LEFT: null, MIDDLE: 0, RIGHT: null }}
          rotateSpeed={rotationSensitivity}
        />

        <RoundedBox>
          <meshStandardMaterial color="orange" />
        </RoundedBox>

        <mesh position={[2, 2, 2]}>
          <boxGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </Canvas>
    </>
  );
};

export default DominoScene;
