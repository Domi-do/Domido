import { useEffect, useRef } from "react";

import { useDominoMutations } from "@/hooks/Queries/useDominoMutations";
import { useSocket } from "@/store/SocketContext";
import useDominoStore from "@/store/useDominoStore";
import {
  deleteSelectedDomino,
  toggleSelectedDominoOpacity,
  undoDominoHistory,
  closeCurrentMode,
  rotateDominoClockwise,
  rotateDominoCounterClockwise,
} from "@/utils/keyHandlers";

const useDominoKeyboardControls = (onToggleGuideToast) => {
  const dominos = useDominoStore((state) => state.dominos);
  const historyRef = useRef([]);
  const prevLengthRef = useRef(dominos.length);
  const { mutate } = useDominoMutations();
  const { projectId, socket } = useSocket();

  const handleDominoUpdate = (updateFn, isShowToast = true) => {
    const updatedDominos =
      isShowToast ? updateFn(historyRef, onToggleGuideToast) : updateFn(historyRef);

    if (Array.isArray(updatedDominos)) {
      mutate({ dominos: updatedDominos });
      socket.emit("update domino", { projectId, dominos: updatedDominos });
    }
  };

  const handleDeleteObject = () => handleDominoUpdate(deleteSelectedDomino);
  const handleOpacityObject = () => handleDominoUpdate(toggleSelectedDominoOpacity);
  const handleUndo = () => handleDominoUpdate(undoDominoHistory, false);

  const keyMap = {
    x: handleDeleteObject,
    h: handleOpacityObject,
    u: handleUndo,
    q: rotateDominoCounterClockwise,
    e: rotateDominoClockwise,
    escape: () => closeCurrentMode(),
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
