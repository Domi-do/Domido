import { useFrame } from "@react-three/fiber";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { RefObject } from "react";
import { Quaternion, Vector3 } from "three";
import type { RapierRigidBody } from "@react-three/rapier";

import { useSocket } from "@/store/SocketContext";
import type { DominoType } from "@/types/domino";

export type CarProps = { rigidBodyRefs: RefObject<RapierRigidBody[]> };

const Car = ({ rigidBodyRefs }: CarProps) => {
  const queryClient = useQueryClient();
  const applied = useRef(false);
  const timeAccum = useRef(0);
  const { projectId } = useSocket();

  const dominos = (queryClient.getQueryData(["dominos", projectId]) as DominoType[]) || [];

  useFrame((_, delta) => {
    if (timeAccum.current < 0.8) {
      timeAccum.current += delta;
      return;
    }

    if (applied.current || dominos.length === 0) return;

    const lastDomino = dominos[dominos.length - 1];
    const isCar = lastDomino.objectInfo.objectName === "car";
    const rigidBody = rigidBodyRefs.current[dominos.length - 1];

    if (!isCar || !rigidBody || typeof rigidBody.mass !== "function" || rigidBody.mass() <= 0)
      return;

    const { x, y, z, w } = rigidBody.rotation();
    const quatCopy = new Quaternion(x, y, z, w);
    const forward = new Vector3(0, 0, 1).applyQuaternion(quatCopy).normalize();

    const mass = rigidBody.mass();
    const impulse = forward.multiplyScalar(mass * 15);
    rigidBody.applyImpulse({ x: impulse.x, y: impulse.y, z: impulse.z }, true);

    applied.current = true;
  });

  return null;
};

export default Car;
