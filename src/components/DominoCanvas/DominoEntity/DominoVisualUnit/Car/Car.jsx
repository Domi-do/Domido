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

    const { x, y, z, w } = rigidBody.rotation();
    const quatCopy = new Quaternion(x, y, z, w);

    const mass = rigidBody.mass();

    const forward = new Vector3(0, 0, 1).applyQuaternion(quatCopy).normalize();

    const impulse = forward.multiplyScalar(mass * 15);
    rigidBody.applyImpulse({ x: impulse.x, y: impulse.y, z: impulse.z }, true);
    applied.current = true;
  });

  return null;
};

export default Car;
