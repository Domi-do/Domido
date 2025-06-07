import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Quaternion, Vector3 } from "three";

import useDominoStore from "@/store/useDominoStore";

const Car = ({ rigidBodyRefs }) => {
  const dominos = useDominoStore((state) => state.dominos);
  const applied = useRef(false);

  useFrame(() => {
    if (applied.current || dominos.length === 0) return;

    const lastDomino = dominos[dominos.length - 1];
    const isCar = lastDomino.objectInfo.objectName === "car";
    const rigidBody = rigidBodyRefs.current[dominos.length - 1];

    if (!isCar || !rigidBody || typeof rigidBody.mass !== "function" || rigidBody.mass() <= 0)
      return;

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

    applied.current = true;
  });

  return null;
};

export default Car;
