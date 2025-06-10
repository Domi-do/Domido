import { useState } from "react";

import ModalLayer from "@/components/Common/ModalLayer";
import {
  GuideToast,
  HUDButtonGroup,
  SettingModal,
  SidePanel,
  DominoClearConfirmModal,
} from "@/components/DominoHUD";
import useDominoReset from "@/hooks/useDominoReset";
import fetcher from "@/services/fetcher";
import { HTTPError } from "@/utils/HTTPError";

const DominoHUD = ({ rigidBodyRefs, isOpenGuideToastVisible, openProjectModal }) => {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isClearConfirmModalOpen, setClearConfirmModalOpen] = useState(false);

  const { resetDominoSimulation } = useDominoReset(rigidBodyRefs);

  const handleCloseModal = () => {
    setIsSettingModalOpen(false);
    setClearConfirmModalOpen(false);
  };

  const handleLogout = async () => {
    const kakaoAccessToken = localStorage.getItem("kakaoAccessToken");

    try {
      await fetcher("/auth/logout", { method: "POST", body: { accessToken: kakaoAccessToken } });
    } catch (err) {
      throw new HTTPError(err.status, err.message);
    }

    const logoutURL = `https://kauth.kakao.com/oauth/logout?client_id=${
      import.meta.env.VITE_KAKAO_REST_API_KEY
    }&logout_redirect_uri=${import.meta.env.VITE_KAKAO_LOGOUT_REDIRECT_URI}`;

    window.location.href = logoutURL;
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
      props: { closeModal: handleCloseModal },
    },
  ];
  return (
    <>
      <HUDButtonGroup
        onClickSetting={() => setIsSettingModalOpen(true)}
        onClickReset={resetDominoSimulation}
        onClickClear={() => setClearConfirmModalOpen(true)}
        onLogout={handleLogout}
        openProjectModal={openProjectModal}
      />
      <SidePanel />
      <ModalLayer modals={modals} />
    </>
  );
};

export default DominoHUD;
