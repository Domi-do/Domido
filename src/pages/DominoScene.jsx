import { DominoCanvas } from "@/components/DominoCanvas";
import DominoHUD from "@/components/DominoHUD/DominoHUD";
import useDominoKeyboardControls from "@/hooks/useDominoKeyboardControls";
import useDominoSimulation from "@/hooks/useDominoSimulation";
import useToastControls from "@/hooks/useToastControls";

const DominoScene = () => {
  const { isOpenGuideToastVisible, openGuideToast, closeGuideToast, setIsGuideToastVisible } =
    useToastControls();
  const { rigidBodyRefs, readyDominoSimulation, switchToReadyMode } = useDominoSimulation();

  useDominoKeyboardControls(setIsGuideToastVisible);

  return (
    <>
      <DominoHUD
        isOpenGuideToastVisible={isOpenGuideToastVisible}
        rigidBodyRefs={rigidBodyRefs}
        switchToReadyMode={switchToReadyMode}
      />
      <DominoCanvas
        openGuideToast={openGuideToast}
        closeGuideToast={closeGuideToast}
        readyDominoSimulation={readyDominoSimulation}
        rigidBodyRefs={rigidBodyRefs}
        isOpenGuideToastVisible={isOpenGuideToastVisible}
      />
    </>
  );
};
export default DominoScene;
