import { LuLogOut } from "react-icons/lu";

import useDominoStore from "@/store/useDominoStore";

const HUDLogoutButton = ({ onLogout }) => {
  const setSelectedDomino = useDominoStore((state) => state.setSelectedDomino);

  return (
    <button
      onMouseOver={() => setSelectedDomino(null)}
      onClick={onLogout}
      className="flex items-center gap-2 px-4 py-2 bg-[rgba(252,157,22,0.9)] text-white text-[14px] rounded-full cursor-pointer"
    >
      <LuLogOut />
      로그아웃
    </button>
  );
};

export default HUDLogoutButton;
