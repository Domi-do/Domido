import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { TextureLoader } from "three";

const Ground = ({ type }) => {
  const floorTexture = useLoader(TextureLoader, `/images/tile/${type}.png`);

  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(10, 10);

  return (
    <RigidBody
      type="fixed"
      friction={1}
    >
      <mesh
        receiveShadow
        position={[0, -1, 0]}
      >
        <boxGeometry args={[40, 1, 40]} />
        <meshStandardMaterial
          map={floorTexture}
          metalness={0.05}
          roughness={0.45}
        />
      </mesh>
    </RigidBody>
  );
};

export default Ground;
