import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { TextureLoader } from "three";

import useDominoStore from "@/store/useDominoStore";
import useSettingStore from "@/store/useSettingStore";

const Ground = () => {
  const groundType = useSettingStore((state) => state.groundType);
  const { dominos, setDominos, selectedDomino, selectedColor } = useDominoStore();

  const floorTexture = useLoader(TextureLoader, `/images/tile/${groundType}.png`);

  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(10, 10);

  const handlePlaceDomino = (e) => {
    const isNotLeftClick = e.button === 1 || e.button === 2;
    if (isNotLeftClick || !selectedDomino) return;

    const pos = e.point;
    const newDomino = {
      id: Date.now(),
      position: [pos.x, 0, pos.z],
      objectInfo: selectedDomino,
      opacity: 1,
      color: selectedColor,
    };
    setDominos([...dominos, newDomino]);
  };

  return (
    <RigidBody
      type="fixed"
      friction={1}
    >
      <mesh
        name="ground"
        receiveShadow
        position={[0, -1, 0]}
        onPointerDown={handlePlaceDomino}
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
