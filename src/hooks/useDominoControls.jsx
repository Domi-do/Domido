import { useEffect } from "react";

const useDominoControls = (setDominos, selectedDominoKey, setGuideToastVisible, dominos) => {
  useEffect(() => {
    const pressX = (e) => {
      if (e.key.toLowerCase() === "x") {
        const key = selectedDominoKey;

        setDominos((prev) => prev.filter((dominos) => dominos.index !== key));
        setTimeout(() => {
          setGuideToastVisible(false);
        }, 100);
      }
    };

    const pressH = (e) => {
      if (e.key.toLowerCase() === "h") {
        const key = selectedDominoKey;
        const updatedDominos = [...dominos];
        updatedDominos.forEach((item) => {
          if (item.index === key) {
            item.opacity = 0.3;
          }
        });
        setDominos(updatedDominos);
        setTimeout(() => {
          setGuideToastVisible(false);
        }, 100);
      }
    };

    window.addEventListener("keydown", pressX);
    window.addEventListener("keydown", pressH);

    return () => {
      window.removeEventListener("keydown", pressX);
      window.removeEventListener("keydown", pressH);
    };
  }, [selectedDominoKey, setDominos, setGuideToastVisible]);
};

export default useDominoControls;
