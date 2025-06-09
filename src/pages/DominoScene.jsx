import { useState } from "react";
import { useParams } from "react-router-dom";

import { DominoCanvas } from "@/components/DominoCanvas";
import DominoHUD from "@/components/DominoHUD/DominoHUD";
import ProjectListModal from "@/components/DominoHUD/ProjectListModal/ProjectListModal";
import useDominoKeyboardControls from "@/hooks/useDominoKeyboardControls";
import useDominoSimulation from "@/hooks/useDominoSimulation";
import useToastControls from "@/hooks/useToastControls";
import { SocketProvider } from "@/store/SocketContext";

const DominoScene = () => {
  const { projectId } = useParams();

  const [isProjectListModal, setProjectListModal] = useState(!projectId);
  const { isOpenGuideToastVisible, openGuideToast, closeGuideToast, setIsGuideToastVisible } =
    useToastControls();

  const { rigidBodyRefs, readyDominoSimulation, switchToReadyMode } = useDominoSimulation();

  useDominoKeyboardControls(setIsGuideToastVisible);

  return (
    <>
      {isProjectListModal && <ProjectListModal closeModal={() => setProjectListModal(false)} />}

      {projectId && (
        <SocketProvider>
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
        </SocketProvider>
      )}
    </>
  );
};

export default DominoScene;
