import { useState } from "react";

import ModalLayer from "@/components/Common/ModalLayer";
import {
  GuideToast,
  HUDButtonGroup,
  SettingModal,
  SidePanel,
  DominoClearConfirmModal,
  Tutorial,
} from "@/components/DominoHUD";
import ProjectListModal from "@/components/DominoHUD/ProjectListModal/ProjectListModal";
import { useUpdateTutorialStatus } from "@/hooks/Queries/useUpdateTutorialStatus";
import useDominoReset from "@/hooks/useDominoReset";
import useDominoStore from "@/store/useDominoStore";
import useUserStore from "@/store/useUserStore";

interface DominoHUDProps {
  isOpenGuideToastVisible: boolean;
}

const DominoHUD = ({ isOpenGuideToastVisible }: DominoHUDProps) => {
  const clearDominos = useDominoStore((state) => state.setClearDominos);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isClearConfirmModalOpen, setClearConfirmModalOpen] = useState(false);
  const [isProjectListModal, setProjectListModal] = useState(false);
  const isTutorialUser = useUserStore((state) => state.userInfo?.isTutorialUser);

  const { mutate } = useUpdateTutorialStatus();

  const { emitDominoReset } = useDominoReset();

  const handleCloseModal = () => {
    setIsSettingModalOpen(false);
    setClearConfirmModalOpen(false);
    setProjectListModal(false);
  };

  const handleConfirm = () => {
    clearDominos();
    setClearConfirmModalOpen(false);
  };

  const modals = [
    { key: "guideToast", Component: GuideToast, isOpen: isOpenGuideToastVisible, props: {} },
    {
      key: "settingModal",
      Component: SettingModal,
      isOpen: isSettingModalOpen,
      props: { closeModal: handleCloseModal },
    },
    {
      key: "clearConfirmModal",
      Component: DominoClearConfirmModal,
      isOpen: isClearConfirmModalOpen,
      props: { closeModal: handleCloseModal, handleConfirm: handleConfirm },
    },
    {
      key: "ProjectListModal",
      Component: ProjectListModal,
      isOpen: isProjectListModal,
      props: { closeModal: handleCloseModal },
    },
  ];
  return (
    <>
      <HUDButtonGroup
        onClickSetting={() => setIsSettingModalOpen(true)}
        onClickReset={emitDominoReset}
        onClickClear={() => setClearConfirmModalOpen(true)}
        openProjectModal={() => setProjectListModal(true)}
      />
      <SidePanel />
      <ModalLayer modals={modals} />
      {isTutorialUser && <Tutorial onTutorialEnd={() => mutate({ isTutorialUser: false })} />}
    </>
  );
};

export default DominoHUD;
