import { useEffect, useRef } from "react";

import useDominoStore from "@/store/useDominoStore";

const useDominoControls = (onToggleGuideToast) => {
  const { dominos, setDominos, selectedDominoKey, setSelectedDominoKey } = useDominoStore();
  const historys = useRef([]);
  const prevLengthRef = useRef(dominos.length);

  useEffect(() => {
    const pressX = (event) => {
      if (event.key.toLowerCase() === "x") {
        historys.current.push([...dominos]);
        const updateDominos = dominos.filter((domino) => domino.id !== selectedDominoKey);
        setDominos(updateDominos);
        setSelectedDominoKey(null);
        setTimeout(() => onToggleGuideToast(false), 100);
      }
    };

    const pressH = (event) => {
      if (event.key.toLowerCase() === "h") {
        historys.current.push([...dominos]);
        const updatedDominos = dominos.map((item) =>
          item.id === selectedDominoKey ? { ...item, opacity: item.opacity === 1 ? 1 : 0.3 } : item,
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
      historys.current.push([...dominos]);
    }
    prevLengthRef.current = dominos.length;
  }, [dominos]);

  useEffect(() => {
    const pressU = (event) => {
      if (historys.current.length < 0) return;
      if (event.key.toLowerCase() === "u") {
        historys.current.pop();
        if (historys.current.length >= 1) {
          setDominos(historys.current[historys.current.length - 1]);
        }
      }
    };

    window.addEventListener("keydown", pressU);
    return () => window.removeEventListener("keydown", pressU);
  }, []);
};

export default useDominoControls;
