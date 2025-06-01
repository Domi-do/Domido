import { useEffect, useRef } from "react";

import useDominoStore from "@/store/useDominoStore";
import {
  deleteSelectedDomino,
  toggleSelectedDominoOpacity,
  undoLastDominoAction,
  closeCurrentMode,
} from "@/utils/keyHandlers";

const useDominoKeyboardControls = (onToggleGuideToast) => {
  const dominos = useDominoStore((state) => state.dominos);
  const historyRef = useRef([]);
  const prevLengthRef = useRef(dominos.length);

  const keyMap = {
    x: () => deleteSelectedDomino(historyRef, onToggleGuideToast),
    h: () => toggleSelectedDominoOpacity(historyRef, onToggleGuideToast),
    u: () => undoLastDominoAction(historyRef),
    escape: () => closeCurrentMode(),
    q: () => console.log("q"),
    e: () => console.log("e"),
  };

  const handleKeydown = (event) => {
    event.stopPropagation();

    const key = event.key.toLowerCase();
    const keyboardHandler = keyMap[key];

    if (typeof keyboardHandler === "function") {
      keyboardHandler(event);
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
