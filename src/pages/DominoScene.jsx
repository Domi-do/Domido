import { useRef } from "react";

import DominoKeyboardHandler from "@/components/Common/DominoKeyboardHandler";
import { DominoCanvas } from "@/components/DominoCanvas";
import DominoHUD from "@/components/DominoHUD/DominoHUD";
import useToastControls from "@/hooks/useToastControls";
import { SocketProvider } from "@/store/SocketContext";
import useUIStateStore from "@/store/useUIStateStore";

const DominoScene = () => {
  const { isOpenGuideToastVisible, openGuideToast, closeGuideToast, setIsGuideToastVisible } =
    useToastControls();

  const rigidBodyRefs = useRef([]);
  const isCanvasReady = useUIStateStore((state) => state.isCanvasReady);

  return (
    <SocketProvider>
      <DominoKeyboardHandler setIsGuideToastVisible={setIsGuideToastVisible}>
        {isCanvasReady && (
          <DominoHUD
            isOpenGuideToastVisible={isOpenGuideToastVisible}
            rigidBodyRefs={rigidBodyRefs}
          />
        )}
        <DominoCanvas
          openGuideToast={openGuideToast}
          closeGuideToast={closeGuideToast}
          rigidBodyRefs={rigidBodyRefs}
        />
      </DominoKeyboardHandler>
    </SocketProvider>
  );
};

export default DominoScene;
