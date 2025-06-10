import { useState } from "react";

import ModalLayer from "@/components/Common/ModalLayer";
import {
  GuideToast,
  HUDButtonGroup,
  SettingModal,
  SidePanel,
  DominoClearConfirmModal,
} from "@/components/DominoHUD";
import MODE from "@/constants/mode";
import useDominoReset from "@/hooks/useDominoReset";
import fetcher from "@/services/fetcher";
import useDominoStore from "@/store/useDominoStore";
import useSimulationStore from "@/store/useSimulationStore";
import { HTTPError } from "@/utils/HTTPError";

const DominoHUD = ({ rigidBodyRefs, switchToReadyMode, isOpenGuideToastVisible }) => {
  const { simulationMode, countdownNumber } = useSimulationStore();
  const clearDominos = useDominoStore((state) => state.setClearDominos);

  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isClearConfirmModalOpen, setClearConfirmModalOpen] = useState(false);

  const { resetDominoSimulation } = useDominoReset(rigidBodyRefs);

  const handleCloseModal = () => {
    setIsSettingModalOpen(false);
    setClearConfirmModalOpen(false);
  };

  const handleConfirm = () => {
    clearDominos();
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
      props: { closeModal: handleCloseModal, handleConfirm: handleConfirm },
    },
  ];
  return (
    <>
      <HUDButtonGroup
        onClickSetting={() => setIsSettingModalOpen(true)}
        onClickReset={resetDominoSimulation}
        onClickPlay={switchToReadyMode}
        onClickClear={() => setClearConfirmModalOpen(true)}
        onLogout={handleLogout}
      />
      {simulationMode === MODE.COUNTDOWN && (
        <span className="fixed z-50 text-[200px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
          {countdownNumber}
        </span>
      )}

      <SidePanel />
      <ModalLayer modals={modals} />
    </>
  );
};

export default DominoHUD;
