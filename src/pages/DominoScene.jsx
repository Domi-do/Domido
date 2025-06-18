import { useRef, useState } from "react";

import AchievementPanel from "@/components/AchievementPanel";
import DominoKeyboardHandler from "@/components/Common/DominoKeyboardHandler";
import { DominoCanvas } from "@/components/DominoCanvas";
import DominoHUD from "@/components/DominoHUD/DominoHUD";
import useGlbPreloader from "@/hooks/useGlbloader";
import useInitAchievements from "@/hooks/useInitAchievements";
import { useStrictNavigationBlock } from "@/hooks/useStrictNavigationBlock";
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
  "/objects/stairs_closed_short.glb",
  "/objects/stairs_closed.glb",
  "/objects/steel_ball.glb",
];

const DominoScene = () => {
  const { isOpenGuideToastVisible, openGuideToast, closeGuideToast, setIsGuideToastVisible } =
    useToastControls();

  const rigidBodyRefs = useRef([]);
  const isCanvasReady = useUIStateStore((state) => state.isCanvasReady);
  const [isAchievementPanelOpen, setIsAchievementPanelOpen] = useState(false);

  useGlbPreloader(MODEL_PATHS);
  useStrictNavigationBlock();
  useInitAchievements();

  return (
    <>
      <SocketProvider>
        <DominoKeyboardHandler setIsGuideToastVisible={setIsGuideToastVisible}>
          {isCanvasReady && <DominoHUD isOpenGuideToastVisible={isOpenGuideToastVisible} />}
          <DominoCanvas
            openGuideToast={openGuideToast}
            closeGuideToast={closeGuideToast}
            rigidBodyRefs={rigidBodyRefs}
          />
        </DominoKeyboardHandler>
      </SocketProvider>

      <button
        onClick={() => setIsAchievementPanelOpen((prev) => !prev)}
        className="absolute top-6 right-6 bg-white/80 hover:bg-white px-4 py-2 rounded-lg text-sm shadow-md transition duration-200 z-50"
      >
        🏆 업적 보기
      </button>
      {isAchievementPanelOpen && <AchievementPanel />}
    </>
  );
};

export default DominoScene;
