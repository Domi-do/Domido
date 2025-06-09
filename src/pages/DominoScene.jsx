import { useState } from "react";
import { useParams } from "react-router-dom";

import WithDominoKeyboard from "@/components/Common/WithDominoKeyboard";
import { DominoCanvas } from "@/components/DominoCanvas";
import DominoHUD from "@/components/DominoHUD/DominoHUD";
import ProjectListModal from "@/components/DominoHUD/ProjectListModal/ProjectListModal";
import useDominoSimulation from "@/hooks/useDominoSimulation";
import useToastControls from "@/hooks/useToastControls";
import { SocketProvider } from "@/store/SocketContext";

const DominoScene = () => {
  const { projectId } = useParams();
  const [isProjectListModal, setProjectListModal] = useState(!projectId);

  const { isOpenGuideToastVisible, openGuideToast, closeGuideToast, setIsGuideToastVisible } =
    useToastControls();
  const { rigidBodyRefs, readyDominoSimulation, switchToReadyMode } = useDominoSimulation();

  return (
    <SocketProvider>
      {isProjectListModal && <ProjectListModal closeModal={() => setProjectListModal(false)} />}
      <WithDominoKeyboard setIsGuideToastVisible={setIsGuideToastVisible}>
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
      </WithDominoKeyboard>
    </SocketProvider>
  );
};

export default DominoScene;
