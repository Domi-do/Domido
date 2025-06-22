import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TargetPlaceholder from "@/components/DominoCanvas/DominoEntity/TutorialStepHandler/TutorialTargetPlace/TargetPlaceholder/TargetPlaceholder";
import useTutorialTracker from "@/hooks/useTutorialTracker";

interface TutorialTargetPlaceProps {
  positions: [number, number, number];
}

const TutorialTargetPlace = ({ positions }: TutorialTargetPlaceProps) => {
  const { projectId } = useParams();
  const queryClient = useQueryClient();
  const dominos = queryClient.getQueryData(["dominos", projectId]);
  const [completed, setCompleted] = useState(Array(positions.length).fill(false));

  const isDominoPlacedNearTarget = (dominoPosition, targetPosition) => {
    const gapLimit = 0.2;

    const xGap = dominoPosition[0] - targetPosition[0];
    const zGap = dominoPosition[2] - targetPosition[2];
    const gapDistance = Math.sqrt(xGap * xGap + zGap * zGap);

    return gapDistance < gapLimit;
  };

  useEffect(() => {
    const newCompleted = positions.map((targetPos) =>
      dominos.some((domino) => isDominoPlacedNearTarget(domino.position, targetPos)),
    );

    setCompleted(newCompleted);
  }, [dominos, positions]);

  const allTargetsMatched = completed.every(Boolean);

  useTutorialTracker(allTargetsMatched);

  return (
    <>
      {positions.map((position, index) => (
        <TargetPlaceholder
          key={position.join("-")}
          position={position}
          isCompleted={completed[index]}
        />
      ))}
    </>
  );
};

export default TutorialTargetPlace;
