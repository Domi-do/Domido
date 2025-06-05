import { CuboidCollider } from "@react-three/rapier";
import { useState } from "react";

const LightBulb = ({ id }) => {
  const [lightOnMap, setLightOnMap] = useState({});

  return (
    <>
      <CuboidCollider
        args={[0.3, 0.4, 0.4]}
        position={[1.65, -0.5, 1.25]}
        sensor
        onIntersectionEnter={(other) => {
          if (other.rigidBodyObject.name === "defaultObject") {
            setTimeout(() => {
              setLightOnMap((prev) => ({ ...prev, [id]: true }));
            }, 300);
          }
        }}
      />
      <mesh position={[0, 0.1, -0.2]}>
        <boxGeometry args={[1, 0.5, 0.4]} />
        <meshStandardMaterial
          color={lightOnMap[id] ? "white" : "gray"}
          emissive={lightOnMap[id] ? "rgb(255,255,150)" : "black"}
          emissiveIntensity={50}
          metalness={0.1}
          roughness={0.3}
          transparent
          opacity={0}
        />
        {lightOnMap[id] && (
          <pointLight
            position={[0, -0.5, 0]}
            color="yellow"
            intensity={30}
            distance={2}
            decay={1}
          />
        )}
      </mesh>
    </>
  );
};

export default LightBulb;
