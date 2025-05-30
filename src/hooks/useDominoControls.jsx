import { useEffect } from "react";

import useDominoStore from "@/store/useDominoStore";

const useDominoControls = ({ onToggleGuideToast }) => {
  const { dominos, setDominos, selectedDominoKey } = useDominoStore();

  useEffect(() => {
    const pressX = (e) => {
      if (e.key.toLowerCase() === "x") {
        const updateDominos = [...dominos];
        setDominos(updateDominos.filter((dominos) => dominos.id !== selectedDominoKey));
        setTimeout(() => {
          onToggleGuideToast(false);
        }, 100);
      }
    };

    const pressH = (e) => {
      if (e.key.toLowerCase() === "h") {
        const updatedDominos = dominos.map((item) => {
          const currentDominoIds = item.id;
          if (currentDominoIds === selectedDominoKey) {
            const isTransparent = item.opacity < 1;
            return { ...item, opacity: isTransparent ? 1 : 0.3 };
          }
          return item;
        });

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
  }, [selectedDominoKey]);
};

export default useDominoControls;
