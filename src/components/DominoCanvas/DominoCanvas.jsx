import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { useEffect } from "react";

import DominoEntity from "./DominoEntity/DominoEntity";

import GlobalAudio from "@/components/Common/GlobalAudio";
import Loading from "@/components/Common/Loading";
import { Ground, CameraControls, CursorFollowerObject } from "@/components/DominoCanvas";
import OtherUserDominos from "@/components/DominoCanvas/OtherUserDominos/OtherUserDominos";
import { GAME_THEME } from "@/constants/gameThema";
import useSettingStore from "@/store/useSettingStore";
import useUIStateStore from "@/store/useUIStateStore";

const DominoCanvas = ({ openGuideToast, closeGuideToast, rigidBodyRefs }) => {
  const themaType = useSettingStore((state) => state.themaType);
  const currentThema = GAME_THEME[themaType];
  const setCanvasReady = useUIStateStore((state) => state.setCanvasReady);

  useEffect(() => {
    setTimeout(() => {
      setCanvasReady(true);
    }, 2000);
  }, []);

  return (
    <>
      <Canvas camera={{ position: currentThema.cameraAngle, fov: 75 }}>
        <Suspense fallback={<Loading />}>
          <GlobalAudio />
          <Environment
            files={currentThema.background}
            background
          />
          <CameraControls cameraAngle={currentThema.cameraAngle} />
          <Physics gravity={[0, -9.81 * 3, 0]}>
            <CursorFollowerObject />
            <OtherUserDominos />
            <DominoEntity
              openGuideToast={openGuideToast}
              closeGuideToast={closeGuideToast}
              rigidBodyRefs={rigidBodyRefs}
            />
            <Ground />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  );
};

export default DominoCanvas;
