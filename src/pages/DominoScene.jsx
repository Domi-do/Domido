import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import DominoKeyboardHandler from "@/components/Common/DominoKeyboardHandler";
import { DominoCanvas } from "@/components/DominoCanvas";
import DominoHUD from "@/components/DominoHUD/DominoHUD";
import ProjectListModal from "@/components/DominoHUD/ProjectListModal/ProjectListModal";
import useToastControls from "@/hooks/useToastControls";
import { SocketProvider } from "@/store/SocketContext";

const DominoScene = () => {
  const { projectId } = useParams();
  const [isProjectListModal, setProjectListModal] = useState(!projectId);

  const { isOpenGuideToastVisible, openGuideToast, closeGuideToast, setIsGuideToastVisible } =
    useToastControls();

  const rigidBodyRefs = useRef([]);

  return (
    <SocketProvider>
      {isProjectListModal && <ProjectListModal closeModal={() => setProjectListModal(false)} />}
      <DominoKeyboardHandler setIsGuideToastVisible={setIsGuideToastVisible}>
        <DominoHUD
          isOpenGuideToastVisible={isOpenGuideToastVisible}
          rigidBodyRefs={rigidBodyRefs}
          openProjectModal={() => setProjectListModal(true)}
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
