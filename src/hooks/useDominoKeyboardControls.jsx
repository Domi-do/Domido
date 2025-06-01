import { useEffect, useRef } from "react";

import useDominoStore from "@/store/useDominoStore";

const useDominoKeyboardControls = (onToggleGuideToast) => {
  const { setDominos, setSelectedDominoKey } = useDominoStore();
  const historys = useRef([]);
  // const prevLengthRef = useRef(dominos.length);

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

  const keyMap = {
    x: deleteSelectedDomino,
    h: toggleSelectedDominoOpacity,
    q: () => console.log("q"),
    e: () => console.log("e"),
    u: () => console.log("u"),
    escape: () => console.log("Escape"),
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

  return;
};

export default useDominoKeyboardControls;
