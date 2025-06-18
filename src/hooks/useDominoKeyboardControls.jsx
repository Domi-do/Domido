import { useEffect } from "react";

import { TUTORIAL_STEPS, TRACKER_KEYS } from "@/constants/tutorialStep";
import { useDominoMutations } from "@/hooks/Queries/useDominoMutations";
import { useKeyHandler } from "@/hooks/useKeyHandler";
import { useSocket } from "@/store/SocketContext";
import useDominoStore from "@/store/useDominoStore";
import { useTutorialStore } from "@/store/useTutorialStore";

const useDominoKeyboardControls = (onToggleGuideToast, historyRef) => {
  const {
    deleteSelectedDomino,
    toggleSelectedDominoOpacity,
    undoDominoHistory,
    rotateDominoClockwise,
    rotateDominoCounterClockwise,
  } = useKeyHandler();

  const { setSelectedDomino } = useDominoStore();
  const setTracker = useTutorialStore((state) => state.setTracker);
  const { mutate } = useDominoMutations();
  const { projectId, socket } = useSocket();

  const getStepTrackerKey = () => {
    const currentStep = useTutorialStore.getState().currentStep;
    return TUTORIAL_STEPS[currentStep - 1]?.trackerKey;
  };

  const handleDominoUpdate = (updateFn, isShowToast = true) => {
    const updatedDominos =
      isShowToast ? updateFn(historyRef, onToggleGuideToast) : updateFn(historyRef, true);

    if (Array.isArray(updatedDominos)) {
      mutate({ dominos: updatedDominos });
    }
  };

  const setTrackerIfMatched = (trackerKey) => {
    if (getStepTrackerKey() === trackerKey) {
      setTracker(trackerKey, true);
    }
  };

  const handleDeleteObject = () => {
    handleDominoUpdate(deleteSelectedDomino);
    setTrackerIfMatched(TRACKER_KEYS.DELETED_DOMINO);
  };

  const handleRotateLeft = () => {
    rotateDominoCounterClockwise();
    setTrackerIfMatched(TRACKER_KEYS.ROTATED_LEFT);
  };

  const handleRotateRight = () => {
    rotateDominoClockwise();
    setTrackerIfMatched(TRACKER_KEYS.ROTATED_RIGHT);
  };

  const handleOpacityObject = () => handleDominoUpdate(toggleSelectedDominoOpacity);
  const handleUndo = () => handleDominoUpdate(undoDominoHistory, false);

  const keyMap = {
    x: handleDeleteObject,
    h: handleOpacityObject,
    u: handleUndo,
    q: handleRotateLeft,
    e: handleRotateRight,
    escape: () => {
      setSelectedDomino(null);
      setTimeout(() => {
        socket.emit("clear cursor", { projectId });
      });
    },
  };

  const handleKeydown = (event) => {
    event.stopPropagation();

    const key = event.key.toLowerCase();
    const keyboardHandler = keyMap[key];

    if (typeof keyboardHandler === "function") {
      keyboardHandler();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  return;
};

export default useDominoKeyboardControls;
