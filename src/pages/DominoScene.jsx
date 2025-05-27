import { RoundedBox, Sky, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

import CameraControls from "@/components/CameraControls/CameraControls";

const DominoScene = () => {
  const [rotationSensitivity, setRotationSensitivity] = useState(1);

  const handleRotationSensitivity = (e) => {
    setRotationSensitivity(e.target.value);
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
        onChange={handleRotationSensitivity}
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
        {/* Sky 컴포넌트가 렌더링 성능에 영향을 줘 일시적으로 비활성화함 (최적화 후 재사용 예정) */}
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
