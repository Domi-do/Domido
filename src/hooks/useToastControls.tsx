import { useState, PointerEvent } from "react";

import useDominoStore from "@/store/useDominoStore";

const useToastControls = () => {
  const [isOpenGuideToastVisible, setIsGuideToastVisible] = useState(false);
  const setSelectedDominoKey = useDominoStore((state) => state.setSelectedDominoKey);

  const openGuideToast = (event: PointerEvent, key: string) => {
    event.stopPropagation();
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
