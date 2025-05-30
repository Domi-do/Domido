import { useState } from "react";

import MODE from "@/constants/mode";
import useDominoStore from "@/store/useDominoStore";
import useSimulationStore from "@/store/useSimulationStore";

const useToastControls = () => {
  const [isOpenGuideToastVisible, setIsGuideToastVisible] = useState(false);
  const setSelectedDominoKey = useDominoStore((state) => state.setSelectedDominoKey);
  const simulationMode = useSimulationStore((state) => state.simulationMode);

  const openGuideToast = (event, key) => {
    event.stopPropagation();
    if (simulationMode === MODE.EDIT) {
      setIsGuideToastVisible(true);
      setSelectedDominoKey(key);
    }
  };

  const closeGuideToast = () => {
    setIsGuideToastVisible(false);
    setSelectedDominoKey(null);
  };

  return { isOpenGuideToastVisible, openGuideToast, closeGuideToast, setIsGuideToastVisible };
};

export default useToastControls;
