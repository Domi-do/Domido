import { FaPlay } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";

import HUDButton from "@/components/DominoHUD/HUDButtonGroup/HUDButton";
import HUDLogoutButton from "@/components/DominoHUD/HUDButtonGroup/HUDLogoutButton";
import MODE from "@/constants/mode";
import useSimulationStore from "@/store/useSimulationStore";

const HUDButtons = ({ onClickSetting, onClickReset, onClickPlay, onClickClear, onLogout }) => {
  const { simulationMode } = useSimulationStore();

  return (
    <div className="fixed top-[10px] left-[10px] z-100 flex items-center gap-2">
      <HUDButton
        onClick={onClickSetting}
        alt="setting"
      >
        <IoSettingsSharp className="text-[22px]" />
      </HUDButton>
      {simulationMode === MODE.EDIT && (
        <HUDButton
          onClick={onClickPlay}
          alt="play"
        >
          <FaPlay className="text-[20px]" />
        </HUDButton>
      )}
      {simulationMode !== MODE.COUNTDOWN && (
        <>
          <HUDButton
            onClick={onClickReset}
            alt="reset"
          >
            <RiResetLeftFill className="text-[24px] font-bold" />
          </HUDButton>
          <HUDButton
            onClick={onClickClear}
            alt="clear"
          >
            <FaRegTrashAlt className="text-[22px]" />
          </HUDButton>
        </>
      )}
      <div className="fixed top-4 right-6 z-50">
        <HUDLogoutButton onClick={onLogout} />
      </div>
    </div>
  );
};

export default HUDButtons;
