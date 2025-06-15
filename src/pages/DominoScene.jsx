import { useRef } from "react";

import DominoKeyboardHandler from "@/components/Common/DominoKeyboardHandler";
import { DominoCanvas } from "@/components/DominoCanvas";
import DominoHUD from "@/components/DominoHUD/DominoHUD";
import useGlbPreloader from "@/hooks/useGlbloader";
import useToastControls from "@/hooks/useToastControls";
import { SocketProvider } from "@/store/SocketContext";
import useUIStateStore from "@/store/useUIStateStore";

const MODEL_PATHS = [
  "/objects/beach_ball.glb",
  "/objects/bumper.glb",
  "/objects/cannon.glb",
  "/objects/car.glb",
  "/objects/lightbulb.glb",
  "/objects/rainbowSlide.glb",
  "/objects/slide.glb",
  "/objects/soccer_football.glb",
  "/objects/spiral_stairs.glb",
  "/objects/stairs_closed_short.glb",
  "/objects/stairs_closed.glb",
  "/objects/steel_ball.glb",
];

const DominoScene = () => {
  const { isOpenGuideToastVisible, openGuideToast, closeGuideToast, setIsGuideToastVisible } =
    useToastControls();

  const rigidBodyRefs = useRef([]);
  const isCanvasReady = useUIStateStore((state) => state.isCanvasReady);

  useGlbPreloader(MODEL_PATHS);

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
