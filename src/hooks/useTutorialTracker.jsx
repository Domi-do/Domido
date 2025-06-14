import { useEffect, useRef } from "react";

import { TUTORIAL_STEPS } from "@/constants/tutorialStep";
import { useTutorialStore } from "@/store/useTutorialStore";

const useTutorialTracker = (shouldClearStep) => {
  const { currentStep, tracker, setTracker } = useTutorialStore.getState();
  const stepTrackerKey = TUTORIAL_STEPS[currentStep - 1]?.trackerKey;

  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (hasTrackedRef.current) return;

    if (!stepTrackerKey || tracker[stepTrackerKey]) return;

    if (shouldClearStep) {
      setTracker(stepTrackerKey, true);
      hasTrackedRef.current = true;
    }
  }, [shouldClearStep]);
};

export default useTutorialTracker;
