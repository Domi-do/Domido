import { useState } from "react";

import useDominoStore from "../store/useDominoStore";

const useToastControls = () => {
  const [isOpenGuideToastVisible, setIsGuideToastVisible] = useState(false);
  const setSelectedDominoKey = useDominoStore((state) => state.setSelectedDominoKey);
  const openGuideToast = (key) => {
    setIsGuideToastVisible(true);
    setSelectedDominoKey(key);
  };

  const closeGuideToast = () => {
    setIsGuideToastVisible(false);
    setSelectedDominoKey(null);
  };

  return { isOpenGuideToastVisible, openGuideToast, closeGuideToast, setIsGuideToastVisible };
};

export default useToastControls;
