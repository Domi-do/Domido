import { FaRegTrashAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { RiResetLeftFill } from "react-icons/ri";

import HUDButton from "@/components/DominoHUD/HUDButtonGroup/HUDButton";
import HUDLogoutButton from "@/components/DominoHUD/HUDButtonGroup/HUDLogoutButton";

const HUDButtons = ({ onClickSetting, onClickReset, onClickClear, openProjectModal }) => {
  return (
    <div className="fixed top-[10px] left-[10px] z-100 flex items-center gap-2">
      <HUDButton
        onClick={onClickSetting}
        title="설정"
      >
        <IoSettingsSharp className="text-[22px]" />
      </HUDButton>
      <HUDButton
        onClick={openProjectModal}
        title="프로젝트 목록"
      >
        <LuClipboardList className="text-[22px]" />
      </HUDButton>
      <HUDButton
        onClick={onClickReset}
        title="초기화"
      >
        <RiResetLeftFill className="text-[24px] font-bold" />
      </HUDButton>
      <HUDButton
        onClick={onClickClear}
        title="전체 삭제"
      >
        <FaRegTrashAlt className="text-[22px]" />
      </HUDButton>
      <div className="fixed bottom-[12px] left-[10px] z-50">
        <HUDLogoutButton />
      </div>
    </div>
  );
};

export default HUDButtons;
