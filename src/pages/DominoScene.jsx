import { RoundedBox, OrbitControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const DominoScene = () => {
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
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <OrbitControls />

      <RoundedBox>
        <meshStandardMaterial color="orange" />
      </RoundedBox>

      <mesh position={[2, 2, 2]}>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
    </Canvas>
  );
};

export default DominoScene;
