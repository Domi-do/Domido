import { useState } from "react";

import {
  GuideToast,
  HUDButtonGroup,
  SettingModal,
  SidePanel,
  DominoClearConfirmModal,
} from "@/components/DominoHUD";
import MODE from "@/constants/mode";
import useDominoReset from "@/hooks/useDominoReset";
import useSimulationStore from "@/store/useSimulationStore";

const DominoHUD = ({ rigidBodyRefs, switchToReadyMode, isOpenGuideToastVisible }) => {
  const { simulationMode, countdownNumber } = useSimulationStore();

  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isClearConfirmModalOpen, setClearConfirmModalOpen] = useState(false);

  const { resetDominoSimulation } = useDominoReset(rigidBodyRefs);

  const handleCloseModal = () => {
    setIsSettingModalOpen(false);
    setClearConfirmModalOpen(false);
  };

  return (
    <>
      <HUDButtonGroup
        onClickSetting={() => setIsSettingModalOpen(true)}
        onClickReset={resetDominoSimulation}
        onClickPlay={switchToReadyMode}
        onClickClear={() => setClearConfirmModalOpen(true)}
      />

      {simulationMode === MODE.COUNTDOWN && (
        <span className="fixed z-50 text-[200px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
          {countdownNumber}
        </span>
      )}

      <SidePanel />
      {isOpenGuideToastVisible && <GuideToast />}

      {isSettingModalOpen && <SettingModal closeModal={handleCloseModal} />}
      {isClearConfirmModalOpen && <DominoClearConfirmModal closeModal={handleCloseModal} />}
    </>
  );
};

export default DominoHUD;
