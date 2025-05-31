import { useState } from "react";

import GuideToast from "@/components/DominoHUD/GuideToast/GuideToast";

import playButton from "/images/play_button.png";
import settingButton from "/images/setting_button.png";
import resetButton from "/images/reset_button.png";
import undoButton from "/images/undo_button.png";

import SidePanel from "@/components/DominoHUD/SidePanel/SidePanel";
import SettingModal from "@/components/Setting/SettingModal";
import UndoDisabledModal from "@/components/UndoDisabledModal/UndoDisabledModal";
import MODE from "@/constants/mode";
import useDominoStore from "@/store/useDominoStore";
import useSimulationStore from "@/store/useSimulationStore";

const DominoHUD = ({ updateSimulationState, isOpenGuideToastVisible }) => {
  const { simulationMode, countdownNumber } = useSimulationStore();
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isDisabledModalOpen, setUndoDisabledModalOpen] = useState(false);
  const setSelectedDomino = useDominoStore((state) => state.setSelectedDomino);

  const isSimulating = simulationMode === MODE.SIMULATING;

  const getNextMode = () => {
    const order = [MODE.EDIT, MODE.READY, MODE.COUNTDOWN, MODE.SIMULATING];
    const currentStep = order.indexOf(simulationMode);
    const isLastStep = currentStep >= order.length - 1;

    if (isLastStep) return order[0];

    return order[currentStep + 1];
  };

  const handleCloseModal = () => {
    setIsSettingModalOpen(false);
    setUndoDisabledModalOpen(false);
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

        {simulationMode !== "COUNTDOWN" && (
          <button
            onMouseOver={() => setSelectedDomino(null)}
            onClick={() => updateSimulationState(getNextMode())}
            className="w-[60px] h-[60px] cursor-pointer"
          >
            <img
              src={isSimulating ? resetButton : playButton}
              className="w-full h-full"
              draggable="false"
            />
          </button>
        )}

        <button
          onClick={() => setUndoDisabledModalOpen(true)}
          className="w-[60px] h-[60px] cursor-pointer"
        >
          <img
            src={undoButton}
            alt="되돌리기"
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
      {isDisabledModalOpen && <UndoDisabledModal closeModal={handleCloseModal} />}
    </>
  );
};

export default DominoHUD;
