import CannonAutoPlacer from "@/components/DominoCanvas/DominoEntity/TutorialStepHandler/CannonAutoPlacer/CannonAutoPlacer";
import TutorialTargetPlace from "@/components/DominoCanvas/DominoEntity/TutorialStepHandler/TutorialTargetPlace/TutorialTargetPlace";
import { TUTORIAL_STEPS } from "@/constants/tutorialStep";
import { useTutorialStore } from "@/store/useTutorialStore";

const TutorialStepHandler = () => {
  const currentStep = useTutorialStore((state) => state.currentStep);
  const tutorialStepData = TUTORIAL_STEPS[currentStep - 1];

  if (!tutorialStepData) return null;

  return (
    <>
      {tutorialStepData.isShowTargetPlaceholder && (
        <TutorialTargetPlace positions={tutorialStepData.targetPositions} />
      )}

      {tutorialStepData.isCannonPlacementStep && <CannonAutoPlacer />}
    </>
  );
};

export default TutorialStepHandler;
