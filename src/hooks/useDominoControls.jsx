import { useEffect } from "react";

const useDominoControls = ({ selectedDominoKey, dominos, onUpdateDominos, onToggleGuideToast }) => {
  useEffect(() => {
    const pressX = (e) => {
      if (e.key.toLowerCase() === "x") {
        onUpdateDominos((prev) => prev.filter((dominos) => dominos.index !== selectedDominoKey));
        setTimeout(() => {
          onToggleGuideToast(false);
        }, 100);
      }
    };

    const pressH = (e) => {
      if (e.key.toLowerCase() === "h") {
        const updatedDominos = dominos.map((item) => {
          if (item.index === selectedDominoKey) {
            const isTransparent = item.opacity < 1;
            return { ...item, opacity: isTransparent ? 1 : 0.3 };
          }
          return item;
        });

        onUpdateDominos(updatedDominos);
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
