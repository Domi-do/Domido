import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { TextureLoader } from "three";

const DominoGround = () => {
  const floorTexture = useLoader(TextureLoader, "/public/images/tile/wood_dark.png");

  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(10, 10);

  return (
    <RigidBody type="fixed">
      <mesh
        receiveShadow
        position={[0, -0.5, 0]}
      >
        <boxGeometry args={[20, 1, 20]} />
        <meshStandardMaterial
          map={floorTexture}
          metalness={0.05}
          roughness={0.45}
        />
      </mesh>
    </RigidBody>
  );
};

export default DominoGround;
