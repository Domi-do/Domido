import { useRef } from "react";

import DominoKeyboardHandler from "@/components/Common/DominoKeyboardHandler";
import { DominoCanvas } from "@/components/DominoCanvas";
import DominoHUD from "@/components/DominoHUD/DominoHUD";
import useToastControls from "@/hooks/useToastControls";
import { SocketProvider } from "@/store/SocketContext";

const DominoScene = () => {
  const { isOpenGuideToastVisible, openGuideToast, closeGuideToast, setIsGuideToastVisible } =
    useToastControls();

  const rigidBodyRefs = useRef([]);

  return (
    <SocketProvider>
      <DominoKeyboardHandler setIsGuideToastVisible={setIsGuideToastVisible}>
        <DominoHUD
          isOpenGuideToastVisible={isOpenGuideToastVisible}
          rigidBodyRefs={rigidBodyRefs}
        />
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
