import { CuboidCollider } from "@react-three/rapier";
import * as THREE from "three";

const Bumper = ({ position }) => {
  return (
    <CuboidCollider
      args={[0.5, 0.3, 0.5]}
      position={[0, 0.1, 0.2]}
      sensor
      onIntersectionEnter={({ other }) => {
        const otherObject = other.rigidBody;
        if (!otherObject) return;

        const dir = new THREE.Vector3()
          .subVectors(otherObject.translation(), new THREE.Vector3(...position))
          .setY(0)
          .normalize()
          .multiplyScalar(5);

        otherObject.applyImpulse({ x: dir.x, y: 0, z: dir.z }, true);
      }}
    />
  );
};

export default Bumper;
