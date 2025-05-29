import { useEffect, useState } from "react";

const useDominoControls = ({ selectedDominoKey, dominos, onUpdateDominos, onToggleGuideToast }) => {
  const [isOpacity, setIsOpacity] = useState(false);

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
        const updatedDominos = [...dominos];
        updatedDominos.forEach((item) => {
          if (item.index === selectedDominoKey && isOpacity === false) {
            item.opacity = 0.3;
            setIsOpacity(true);
          } else if (item.index === selectedDominoKey && isOpacity === true) {
            item.opacity = 1;
            setIsOpacity(false);
          }
        });
        onUpdateDominos(updatedDominos);
        setTimeout(() => {
          onToggleGuideToast(false);
        }, 100);
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
