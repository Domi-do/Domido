import { useState } from "react";

import Intro from "@/components/DominoHUD/Tutorial/Intro/Intro";
import StepCard from "@/components/DominoHUD/Tutorial/StepCard/StepCard";

const TUTORIAL_STEPS = [
  { message: <>📂 우측 패널을 열어보세요!</>, position: "top", canProceed: () => true },
  { message: <>🧱 도미노를 선택해보세요!</>, position: "top", canProceed: () => true },
  { message: <>🔄 도미노를 회전시켜보세요!</>, position: "top", canProceed: () => true },
  { message: <>📍 표시된 위치에 도미노를 놓아보세요!</>, position: "top", canProceed: () => true },
  { message: <>🎯 표시된 위치에 대포를 놓아보세요!</>, position: "top", canProceed: () => true },
  { message: <>💣 공을 넣고 대포를 발사해보세요!</>, position: "top", canProceed: () => true },
  {
    message: (
      <>
        🔁 리셋 버튼을 눌러
        <br />
        다이나믹 오브젝트를 초기화하세요!
      </>
    ),
    position: "bottom",
    canProceed: () => true,
  },
  {
    message: (
      <>
        🧹 클리어 버튼을 눌러
        <br />
        모든 오브젝트를 삭제하세요!
      </>
    ),
    position: "bottom",
    canProceed: () => true,
  },
];

const Tutorial = ({ onTutorialEnd }) => {
  const [step, setStep] = useState(0);

  const isIntro = step === 0;
  const totalStep = TUTORIAL_STEPS.length;
  const currentStepData = TUTORIAL_STEPS[step - 1];

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, totalStep));
  };

  return (
    <>
      {isIntro ?
        <Intro
          onStart={handleNext}
          onTutorialEnd={onTutorialEnd}
        />
      : <StepCard
          step={step}
          total={totalStep}
          message={currentStepData.message}
          canProceed={currentStepData.canProceed()}
          onNext={handleNext}
          colPosition={currentStepData.position}
          onTutorialEnd={onTutorialEnd}
        />
      }
    </>
  );
};

export default Tutorial;
