import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";

import GlobalAudio from "@/components/Common/GlobalAudio";
import Loading from "@/components/Common/Loading";
import {
  Ground,
  CameraControls,
  CursorFollowerObject,
  DominoEntity,
} from "@/components/DominoCanvas";
import OtherUserDominos from "@/components/DominoCanvas/OtherUserDominos/OtherUserDominos";
import { GAME_THEME } from "@/constants/gameThema";
import useSettingStore from "@/store/useSettingStore";

const DominoCanvas = ({ openGuideToast, closeGuideToast, rigidBodyRefs }) => {
  const themaType = useSettingStore((state) => state.themaType);
  const currentThema = GAME_THEME[themaType];

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
