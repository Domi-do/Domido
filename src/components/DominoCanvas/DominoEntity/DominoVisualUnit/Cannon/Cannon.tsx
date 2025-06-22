import { CuboidCollider, RapierRigidBody, RapierCollider } from "@react-three/rapier";

import useCannonControls from "@/hooks/useCannonControls";

type CannonProps = { onAfterTrigger?: () => void };

const CANNON_TARGETS = ["beachBall", "steelBall", "soccerFootball"];

const Cannon = ({ onAfterTrigger }: CannonProps) => {
  const { handleCannonTrigger } = useCannonControls();

  return (
    <CuboidCollider
      args={[0.2, 0.7, 0.2]}
      position={[0, 0, -1]}
      sensor
      onIntersectionEnter={({ other, target }) => {
        const objectName = other.rigidBodyObject?.name;
        const isCannonTarget = CANNON_TARGETS?.includes(objectName as string);

        if (!isCannonTarget) return;

        handleCannonTrigger(other, target);

        if (onAfterTrigger) {
          onAfterTrigger();
        }
      }}
    />
  );
};

export default Cannon;
