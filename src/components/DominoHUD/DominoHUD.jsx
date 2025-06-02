import { useState } from "react";

import playButton from "/images/play_button.png";
import settingButton from "/images/setting_button.png";
import resetButton from "/images/reset_button.png";
import clearButton from "/images/clear_button.png";

import DominoClearConfirmModal from "@/components/DominoClearConfirmModal/DominoClearConfirmModal";
import GuideToast from "@/components/DominoHUD/GuideToast/GuideToast";
import SidePanel from "@/components/DominoHUD/SidePanel/SidePanel";
import SettingModal from "@/components/Setting/SettingModal";
import MODE from "@/constants/mode";
import useDominoReset from "@/hooks/useDominoReset";
import useDominoStore from "@/store/useDominoStore";
import useSimulationStore from "@/store/useSimulationStore";

const DominoHUD = ({ rigidBodyRefs, updateSimulationState, isOpenGuideToastVisible }) => {
  const { simulationMode, countdownNumber } = useSimulationStore();
  const setSelectedDomino = useDominoStore((state) => state.setSelectedDomino);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isClearConfirmModalOpen, setClearConfirmModalOpen] = useState(false);

  const { resetDominoSimulation } = useDominoReset(rigidBodyRefs);

  const getNextMode = () => {
    const order = [MODE.EDIT, MODE.READY, MODE.COUNTDOWN, MODE.SIMULATING];
    const currentStep = order.indexOf(simulationMode);
    const isLastStep = currentStep >= order.length - 1;

    if (isLastStep) return order[0];

    return order[currentStep + 1];
  };

  const handleCloseModal = () => {
    setIsSettingModalOpen(false);
    setClearConfirmModalOpen(false);
  };

  return (
    <>
      <div className="fixed top-[10px] left-[10px] z-50 flex">
        <button
          onClick={() => setIsSettingModalOpen(true)}
          className="w-[60px] h-[60px] cursor-pointer"
        >
          <img
            src={settingButton}
            alt="설정"
            className="w-full h-full"
          />
        </button>

        <button
          onMouseOver={() => setSelectedDomino(null)}
          onClick={resetDominoSimulation}
          className="w-[60px] h-[60px] cursor-pointer"
        >
          <img
            src={resetButton}
            className="w-full h-full"
            draggable="false"
            alt="reset"
          />
        </button>

        <button
          onMouseOver={() => setSelectedDomino(null)}
          onClick={() => updateSimulationState(getNextMode())}
          className="w-[60px] h-[60px] cursor-pointer"
        >
          <img
            src={playButton}
            className="w-full h-full"
            draggable="false"
            alt="play"
          />
        </button>

        <button
          onClick={() => setClearConfirmModalOpen(true)}
          className="w-[60px] h-[60px] cursor-pointer"
        >
          <img
            src={clearButton}
            alt="clear"
            className="w-[85%] h-[85%] ml-[10%]"
          />
        </button>
      </div>

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
