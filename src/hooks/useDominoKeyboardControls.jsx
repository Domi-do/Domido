import { useEffect, useRef } from "react";

import { useDominoMutations } from "@/hooks/Queries/useDominoMutations";
import { useSocket } from "@/store/SocketContext";
import useDominoStore from "@/store/useDominoStore";
import { useTutorialStore } from "@/store/useTutorialStore";
import {
  deleteSelectedDomino,
  toggleSelectedDominoOpacity,
  undoDominoHistory,
  rotateDominoClockwise,
  rotateDominoCounterClockwise,
} from "@/utils/keyHandlers";

const useDominoKeyboardControls = (onToggleGuideToast) => {
  const { dominos, setSelectedDomino } = useDominoStore();
  const historyRef = useRef([]);
  const prevLengthRef = useRef(dominos.length);
  const { mutate } = useDominoMutations();
  const { projectId, socket } = useSocket();
  const { tracker, setTracker } = useTutorialStore.getState();

  const handleDominoUpdate = (updateFn, isShowToast = true) => {
    const updatedDominos =
      isShowToast ? updateFn(historyRef, onToggleGuideToast) : updateFn(historyRef);

    if (Array.isArray(updatedDominos)) {
      mutate({ dominos: updatedDominos });
      socket.emit("update domino", { projectId, dominos: updatedDominos });
    }
  };

  const trackTutorialStep = (trackerKey) => {
    if (!tracker[trackerKey]) {
      setTracker(trackerKey, true);
    }
  };

  const handleRotate = (rotateFn, trackerKey) => {
    rotateFn();
    trackTutorialStep(trackerKey);
  };

  const handleDeleteObject = () => {
    handleDominoUpdate(deleteSelectedDomino);
    trackTutorialStep("hasDeletedDomino");
  };

  const handleOpacityObject = () => handleDominoUpdate(toggleSelectedDominoOpacity);
  const handleUndo = () => handleDominoUpdate(undoDominoHistory, false);
  const handleRotateLeft = () => handleRotate(rotateDominoCounterClockwise, "hasRotatedDominoLeft");
  const handleRotateRight = () => handleRotate(rotateDominoClockwise, "hasRotatedDominoRight");

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

  useEffect(() => {
    if (dominos.length > prevLengthRef.current) {
      historyRef.current.push([...dominos]);
    }
    prevLengthRef.current = dominos.length;
  }, [dominos]);

  return;
};

export default useDominoKeyboardControls;
