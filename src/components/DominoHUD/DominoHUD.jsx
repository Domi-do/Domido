import GuideToast from "@/components/DominoHUD/GuideToast/GuideToast";

import playButton from "/images/play_button.png";
import resetButton from "/images/reset_button.png";

import SidePanel from "@/components/DominoHUD/SidePanel/SidePanel";
import MODE from "@/constants/mode";
import useSimulationStore from "@/store/useSimulationStore";

const DominoHUD = ({
  rotationSensitivity,
  onChangeSensitivity,
  updateSimulationState,
  isOpenGuideToastVisible,
}) => {
  const { simulationMode, countdownNumber } = useSimulationStore();

  const isSimulating = simulationMode === MODE.SIMULATING;

  const getNextMode = () => {
    const order = [MODE.EDIT, MODE.READY, MODE.COUNTDOWN, MODE.SIMULATING];
    const currentStep = order.indexOf(simulationMode);
    const isLastStep = currentStep >= order.length - 1;

    if (isLastStep) return order[0];

    return order[currentStep + 1];
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
      {simulationMode !== MODE.COUNTDOWN && (
        <button
          className="fixed z-50 cursor-pointer w-[60px] h-[60px]"
          onClick={() => updateSimulationState(getNextMode())}
        >
          <img
            src={isSimulating ? resetButton : playButton}
            draggable="false"
          />
        </button>
      )}

      {simulationMode === MODE.COUNTDOWN && (
        <span className="fixed z-50 text-[200px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
          {countdownNumber}
        </span>
      )}

      <SidePanel />
      {isOpenGuideToastVisible && <GuideToast />}
    </>
  );
};

export default DominoHUD;
