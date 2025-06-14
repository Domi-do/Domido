import { Box } from "@react-three/drei";
import { useEffect, useState } from "react";

import useDominoStore from "@/store/useDominoStore";
import { useTutorialStore } from "@/store/useTutorialStore";

const isDominoAtTarget = (dominoPos, targetPos, threshold = 0.2) => {
  const dx = dominoPos[0] - targetPos[0];
  const dz = dominoPos[2] - targetPos[2];
  const distance = Math.sqrt(dx * dx + dz * dz);
  return distance < threshold;
};

const TargetPlaceholder = ({ position, isCompleted }) => {
  const color = isCompleted ? "#28a745" : "#007BFF";
  return (
    <Box
      position={position}
      args={[0.2, 1, 0.5]}
    >
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.6}
      />
    </Box>
  );
};

const TutorialTargetPlace = ({ positions }) => {
  const dominos = useDominoStore((state) => state.dominos);
  const [completed, setCompleted] = useState(Array(positions.length).fill(false));
  const setTracker = useTutorialStore((state) => state.setTracker);

  useEffect(() => {
    const newCompleted = positions.map((targetPos) =>
      dominos.some((domino) => isDominoAtTarget(domino.position, targetPos)),
    );

    setCompleted(newCompleted);

    const allMatched = newCompleted.every(Boolean);

    if (allMatched) {
      setTracker("placedDominoCount", 1);
    }
  }, [dominos]);

  return (
    <>
      {positions.map((pos, idx) => (
        <TargetPlaceholder
          key={idx}
          position={pos}
          isCompleted={completed[idx]}
        />
      ))}
    </>
  );
};

export default TutorialTargetPlace;
