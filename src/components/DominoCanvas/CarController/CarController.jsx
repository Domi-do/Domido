import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Quaternion, Vector3 } from "three";

import useDominoStore from "@/store/useDominoStore";

const CarController = ({ rigidBodyRefs }) => {
  const dominos = useDominoStore((state) => state.dominos);
  const appliedImpulseIds = useRef(new Set());

  useFrame(() => {
    dominos.forEach((domino, index) => {
      const rigidBody = rigidBodyRefs.current[index];
      const isCar = domino.objectInfo.objectName === "car";
      const isValidRef = rigidBody && typeof rigidBody.mass === "function" && rigidBody.mass() > 0;
      const isNotApplied = !appliedImpulseIds.current.has(domino.id);

      const isCarReady = isValidRef && isCar && isNotApplied;

      if (isCarReady) {
        const localDirection = new Vector3(1, 0, 0);

        const carRotation = new Quaternion(
          rigidBody.rotation().x,
          rigidBody.rotation().y,
          rigidBody.rotation().z,
          rigidBody.rotation().w,
        );

        const worldDirection = localDirection.applyQuaternion(carRotation).normalize();

        rigidBody.applyImpulse(
          { x: worldDirection.x * 5, y: worldDirection.y * 5, z: worldDirection.z * 5 },
          true,
        );

        appliedImpulseIds.current.add(domino.id);
      }
    });
  });

  return null;
};

export default CarController;
