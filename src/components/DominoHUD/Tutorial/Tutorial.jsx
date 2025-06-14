import Intro from "@/components/DominoHUD/Tutorial/Intro/Intro";
import StepCard from "@/components/DominoHUD/Tutorial/StepCard/StepCard";
import { TUTORIAL_STEPS } from "@/constants/tutorialStep";
import { useTutorialStore } from "@/store/useTutorialStore";

const Tutorial = ({ onTutorialEnd }) => {
  const { currentStep, tracker, nextStep } = useTutorialStore();

  const isIntro = currentStep === 0;
  const totalStep = TUTORIAL_STEPS.length;
  const currentStepData = TUTORIAL_STEPS[currentStep - 1];
  const trackerKey = currentStepData?.trackerKey;

  return (
    <>
      {isIntro ?
        <Intro
          onStart={nextStep}
          onTutorialEnd={onTutorialEnd}
        />
      : <StepCard
          step={currentStep}
          total={totalStep}
          message={currentStepData.message}
          canProceed={tracker[trackerKey]}
          onNext={nextStep}
          colPosition={currentStepData.position}
          onTutorialEnd={onTutorialEnd}
        />
      }
    </>
  );
};

export default Tutorial;
