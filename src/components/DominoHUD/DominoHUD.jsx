import GuideToast from "@/components/DominoHUD/GuideToast/GuideToast";
import playButton from "/images/play_button.png";
import stopButton from "/images/stop_button.png";

import SidePanel from "@/components/DominoHUD/SidePanel/SidePanel";

const DominoHUD = ({
  rotationSensitivity,
  onChangeSensitivity,
  simulationMode,
  countdownNumber,
  updateSimulationState,
  selectedObject,
  setSelectedObject,
  isOpenGuideToastVisible,
}) => {
  const isSimulating = simulationMode === "SIMULATING";

  const buttonConfig = {
    icon: isSimulating ? stopButton : playButton,
    nextMode: isSimulating ? "EDIT" : "READY",
  };

  return (
    <>
      <input
        id="sensitivity"
        type="range"
        min={1}
        max={50}
        step={0.01}
        value={rotationSensitivity}
        onChange={onChangeSensitivity}
        className="fixed z-50 bottom-0 w-full"
      />

      <button
        className="fixed z-50 cursor-pointer w-[60px] h-[60px]"
        onClick={() => updateSimulationState(buttonConfig.nextMode)}
      >
        <img
          src={buttonConfig.icon}
          alt={buttonConfig.alt}
          draggable="false"
        />
      </button>

      {simulationMode === "COUNTDOWN" && (
        <span className="fixed z-50 text-[200px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
          {countdownNumber}
        </span>
      )}

      <SidePanel
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
      />
      {isOpenGuideToastVisible && <GuideToast />}
    </>
  );
};

export default DominoHUD;
