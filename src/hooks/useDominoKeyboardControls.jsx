import { useEffect, useRef } from "react";

import MODE from "@/constants/mode";
import useDominoStore from "@/store/useDominoStore";
import useSimulationStore from "@/store/useSimulationStore";

const useDominoKeyboardControls = (onToggleGuideToast) => {
  const { dominos, setDominos, setSelectedDomino, setSelectedDominoKey } = useDominoStore();
  const historys = useRef([]);
  const prevLengthRef = useRef(dominos.length);

  const deleteSelectedDomino = () => {
    const { dominos, selectedDominoKey } = useDominoStore.getState();
    if (!selectedDominoKey) return;

    historys.current.push([...dominos]);
    const updatedDominos = dominos.filter((domino) => domino.id !== selectedDominoKey);
    setDominos(updatedDominos);
    setSelectedDominoKey(null);
    setTimeout(() => onToggleGuideToast(false), 100);
  };

  const toggleSelectedDominoOpacity = () => {
    const { dominos, selectedDominoKey } = useDominoStore.getState();
    if (!selectedDominoKey) return;

    historys.current.push([...dominos]);
    const updatedDominos = dominos.map((item) =>
      item.id === selectedDominoKey ? { ...item, opacity: item.opacity === 1 ? 0.3 : 1 } : item,
    );
    setDominos(updatedDominos);
    onToggleGuideToast(false);
  };

  const undoLastDominoAction = () => {
    if (historys.current.length <= 1) return;

    historys.current.pop();
    setDominos(historys.current[historys.current.length - 1]);
  };

  const closeCurrentMode = () => {
    const { simulationMode, setSimulationMode } = useSimulationStore.getState();

    if (simulationMode === MODE.EDIT) return setSelectedDomino(null);
    if (simulationMode === MODE.READY) return setSimulationMode(MODE.EDIT);
  };

  const keyMap = {
    x: deleteSelectedDomino,
    h: toggleSelectedDominoOpacity,
    u: undoLastDominoAction,
    q: () => console.log("q"),
    e: () => console.log("e"),
    escape: closeCurrentMode,
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
      historys.current.push([...dominos]);
    }
    prevLengthRef.current = dominos.length;
  }, [dominos]);

  return;
};

export default useDominoKeyboardControls;
