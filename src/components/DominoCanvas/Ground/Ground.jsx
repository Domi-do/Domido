import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { TextureLoader } from "three";

import { GAME_THEME } from "@/constants/gameThema";
import useSettingStore from "@/store/useSettingStore";

const Ground = () => {
  const themaType = useSettingStore((state) => state.themaType);

  const floorTexture = useLoader(TextureLoader, GAME_THEME[themaType].tile);

  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(10, 10);

  return (
    <RigidBody
      type="fixed"
      friction={1}
    >
      <mesh
        name="ground"
        receiveShadow
        position={[0, -1, 0]}
      >
        <boxGeometry args={[40, 1, 40]} />
        <meshStandardMaterial
          map={floorTexture}
          metalness={0.05}
          roughness={0.55}
        />
      </mesh>
    </RigidBody>
  );
};

export default Ground;
