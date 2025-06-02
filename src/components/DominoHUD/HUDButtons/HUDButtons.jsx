import playButton from "/images/play_button.png";
import settingButton from "/images/setting_button.png";
import resetButton from "/images/reset_button.png";
import clearButton from "/images/clear_button.png";

import useSimulationStore from "@/store/useSimulationStore";
import HUDButton from "@/components/DominoHUD/HUDButton/HUDButton";
import MODE from "@/constants/mode";

const HUDButtons = ({ onClickSetting, onClickReset, onClickPlay, onClickClear }) => {
  const { simulationMode } = useSimulationStore();

  return (
    <div className="fixed top-[10px] left-[10px] z-50 flex">
      <HUDButton
        onClick={onClickSetting}
        buttonImage={settingButton}
      />
      {simulationMode === MODE.EDIT && (
        <HUDButton
          onClick={onClickPlay}
          buttonImage={playButton}
        />
      )}
      {simulationMode !== MODE.COUNTDOWN && (
        <>
          <HUDButton
            onClick={onClickReset}
            buttonImage={resetButton}
          />
          <HUDButton
            onClick={onClickClear}
            buttonImage={clearButton}
          />
        </>
      )}
    </div>
  );
};

export default HUDButtons;
