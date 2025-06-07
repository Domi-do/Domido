import playButton from "/images/play_button.png";
import settingButton from "/images/setting_button.png";
import resetButton from "/images/reset_button.png";
import clearButton from "/images/clear_button.png";

import useSimulationStore from "@/store/useSimulationStore";
import HUDButton from "@/components/DominoHUD/HUDButtonGroup/HUDButton";
import MODE from "@/constants/mode";

const HUDButtons = ({ onClickSetting, onClickReset, onClickPlay, onClickClear }) => {
  const { simulationMode } = useSimulationStore();

  return (
    <div className="fixed top-[10px] left-[10px] z-50 flex">
      <HUDButton
        onClick={onClickSetting}
        buttonImage={settingButton}
        alt="setting"
      />
      {simulationMode === MODE.EDIT && (
        <HUDButton
          onClick={onClickPlay}
          buttonImage={playButton}
          alt="play"
        />
      )}
      {simulationMode !== MODE.COUNTDOWN && (
        <>
          <HUDButton
            onClick={onClickReset}
            buttonImage={resetButton}
            alt="reset"
          />
          <HUDButton
            onClick={onClickClear}
            buttonImage={clearButton}
            alt="clear"
          />
        </>
      )}
    </div>
  );
};

export default HUDButtons;
