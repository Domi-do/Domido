import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";

import DominoEntity from "./DominoEntity/DominoEntity";

import GlobalAudio from "@/components/Common/GlobalAudio";
import Loading from "@/components/Common/Loading";
import { Ground, CameraControls, CursorFollowerObject } from "@/components/DominoCanvas";
import OtherUserDominos from "@/components/DominoCanvas/OtherUserDominos/OtherUserDominos";

const DominoCanvas = ({ openGuideToast, closeGuideToast, rigidBodyRefs }) => {
  return (
    <>
      <Canvas camera={{ position: [0, 5, 5], fov: 75 }}>
        <Suspense fallback={<Loading />}>
          <GlobalAudio />
          <ambientLight
            color="white"
            intensity={1}
          />
          <directionalLight
            castShadow
            intensity={1}
            position={[5, 10, 5]}
          />
          <Environment
            preset="park"
            background
          />
          <CameraControls />
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
