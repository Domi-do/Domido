import { BiLogOut } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";

import HUDButton from "@/components/DominoHUD/HUDButtonGroup/HUDButton";
import MODE from "@/constants/mode";
import useSimulationStore from "@/store/useSimulationStore";

const HUDButtons = ({ onClickSetting, onClickReset, onClickPlay, onClickClear, onLogout }) => {
  const { simulationMode } = useSimulationStore();

  return (
    <div className="fixed top-[10px] left-[10px] z-50 flex items-center gap-2">
      <HUDButton
        onClick={onClickSetting}
        alt="setting"
        className="w-12 h-12 flex items-center justify-center bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-200"
      >
        <IoSettingsSharp className="text-3xl" />
      </HUDButton>
      {simulationMode === MODE.EDIT && (
        <HUDButton
          onClick={onClickPlay}
          alt="play"
          className="w-12 h-12 flex items-center justify-center bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-200"
        >
          <FaPlay className="text-2xl" />
        </HUDButton>
      )}
      {simulationMode !== MODE.COUNTDOWN && (
        <>
          <HUDButton
            onClick={onClickReset}
            alt="reset"
            className="w-12 h-12 flex items-center justify-center bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-200"
          >
            <RiResetLeftFill className="text-3xl" />
          </HUDButton>
          <HUDButton
            onClick={onClickClear}
            alt="clear"
            className="w-12 h-12 flex items-center justify-center bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-200"
          >
            <FaRegTrashAlt className="text-3xl" />
          </HUDButton>
          <div className="fixed top-4 right-6 z-50">
            <HUDButton
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-sky-300 text-gray-800 text-sm font-semibold rounded-full shadow-md hover:bg-sky-400 transition-all"
            >
              <BiLogOut className="text-lg" />
              로그아웃
            </HUDButton>
          </div>
        </>
      )}
    </div>
  );
};

export default HUDButtons;
