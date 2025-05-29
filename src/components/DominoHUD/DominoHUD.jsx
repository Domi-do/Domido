import { useState } from "react";

import GuideToast from "@/components/DominoHUD/GuideToast/GuideToast";

import stopButton from "/images/stop_button.png";
import playButton from "/images/play_button.png";
import resetButton from "/images/reset_button.png";
import settingButton from "/images/setting_button.png";

import SidePanel from "@/components/DominoHUD/SidePanel/SidePanel";
import ModalOverlay from "@/components/ModalOverlay/ModalOverlay";
import Setting from "@/components/Setting/Setting";
import useDominoStore from "@/store/useDominoStore";
import useSimulationStore from "@/store/useSimulationStore";

const DominoHUD = ({
  rotationSensitivity,
  onChangeSensitivity,
  updateSimulationState,
  isOpenGuideToastVisible,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setSelectedDomino = useDominoStore((state) => state.setSelectedDomino);
  const { simulationMode, countdownNumber } = useSimulationStore();
  const isSimulating = simulationMode === "SIMULATING";

  const buttonConfig = {
    icon: isSimulating ? stopButton : playButton,
    nextMode: isSimulating ? "EDIT" : "READY",
  };

  return (
    <>
      <div className="fixed top-[10px] left-[10px] z-50 flex">
        <button
          onClick={() => setIsModalOpen(true)}
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
            onClick={() => updateSimulationState(buttonConfig.nextMode)}
            className="w-[60px] h-[60px] cursor-pointer"
          >
            <img
              src={isSimulating ? resetButton : playButton}
              className="w-full h-full"
              draggable="false"
            />
          </button>
        )}
      </div>

      {simulationMode === "COUNTDOWN" && (
        <span className="fixed z-50 text-[200px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
          {countdownNumber}
        </span>
      )}

      <SidePanel />
      {isOpenGuideToastVisible && <GuideToast />}

      {isModalOpen && (
        <ModalOverlay closeModal={() => setIsModalOpen(false)}>
          <Setting
            rotationSensitivity={rotationSensitivity}
            onChangeSensitivity={onChangeSensitivity}
          />
        </ModalOverlay>
      )}
    </>
  );
};

export default DominoHUD;
