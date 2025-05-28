import { useEffect } from "react";

const useDominoControls = (setDominos, selectedDominoKey, setisGuideToastVisible) => {
  useEffect(() => {
    const pressX = (e) => {
      if (e.key.toLowerCase() === "x") {
        const key = selectedDominoKey;

        setDominos((prev) => prev.filter((dominos) => dominos.index !== key));
        setTimeout(() => {
          setisGuideToastVisible(false);
        }, 100);
      }
    };
    window.addEventListener("keydown", pressX);

    return () => {
      window.removeEventListener("keydown", pressX);
    };
  }, [selectedDominoKey]);
};

export default useDominoControls;
