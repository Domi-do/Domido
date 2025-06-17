import DominoKeyboardHandler from "@/components/Common/DominoKeyboardHandler";
import { DominoCanvas } from "@/components/DominoCanvas";
import DominoHUD from "@/components/DominoHUD/DominoHUD";
import useInitAchievements from "@/hooks/useInitAchievements";
import { useStrictNavigationBlock } from "@/hooks/useStrictNavigationBlock";
import useToastControls from "@/hooks/useToastControls";
import { SocketProvider } from "@/store/SocketContext";

const DominoScene = () => {
  const { isOpenGuideToastVisible, openGuideToast, closeGuideToast, setIsGuideToastVisible } =
    useToastControls();

  return (
    <SocketProvider>
      <DominoKeyboardHandler setIsGuideToastVisible={setIsGuideToastVisible}>
        <DominoHUD isOpenGuideToastVisible={isOpenGuideToastVisible} />
        <DominoCanvas
          openGuideToast={openGuideToast}
          closeGuideToast={closeGuideToast}
        />
      </DominoKeyboardHandler>
    </SocketProvider>
  );
};

export default DominoScene;
