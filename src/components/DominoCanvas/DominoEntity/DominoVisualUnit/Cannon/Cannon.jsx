import { CuboidCollider } from "@react-three/rapier";

import useCannonControls from "@/hooks/useCannonControls";

const Cannon = () => {
  const { handleCannonTrigger } = useCannonControls();

  return (
    <CuboidCollider
      args={[0.2, 0.7, 0.2]}
      position={[0, 0, -1]}
      sensor
      onIntersectionEnter={({ other, target }) => {
        handleCannonTrigger(other, target);
      }}
    />
  );
};

export default Cannon;
