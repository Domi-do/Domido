import { useEffect, useRef } from "react";

import useDominoStore from "@/store/useDominoStore";

const useDominoControls = (onToggleGuideToast) => {
  const { dominos, setDominos, selectedDominoKey, setSelectedDominoKey } = useDominoStore();
  const historyRef = useRef([]);
  const prevLengthRef = useRef(dominos.length);

  useEffect(() => {
    const pressX = (e) => {
      if (e.key.toLowerCase() === "x") {
        historyRef.current.push([...dominos]);
        const updateDominos = dominos.filter((domino) => domino.id !== selectedDominoKey);
        setDominos(updateDominos);
        setSelectedDominoKey(null);
        setTimeout(() => onToggleGuideToast(false), 100);
      }
    };

    const pressH = (e) => {
      if (e.key.toLowerCase() === "h") {
        historyRef.current.push([...dominos]);
        const updatedDominos = dominos.map((item) =>
          item.id === selectedDominoKey ? { ...item, opacity: item.opacity < 1 ? 1 : 0.3 } : item,
        );
        setDominos(updatedDominos);
        onToggleGuideToast(false);
      }
    };

    window.addEventListener("keydown", pressX);
    window.addEventListener("keydown", pressH);
    return () => {
      window.removeEventListener("keydown", pressX);
      window.removeEventListener("keydown", pressH);
    };
  }, [selectedDominoKey, dominos]);

  useEffect(() => {
    if (dominos.length > prevLengthRef.current) {
      historyRef.current.push([...dominos]);
    }
    prevLengthRef.current = dominos.length;
  }, [dominos]);

  useEffect(() => {
    const pressU = (e) => {
      if (e.key.toLowerCase() === "u") {
        if (historyRef.current.length > 0) {
          historyRef.current.pop();
          console.log("history", historyRef.current);
          if (historyRef.current.length >= 1) {
            setDominos(historyRef.current[historyRef.current.length - 1]);
          }
        }
      }
    };

    window.addEventListener("keydown", pressU);
    return () => window.removeEventListener("keydown", pressU);
  }, []);
};

export default useDominoControls;
