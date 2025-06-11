import { BiLogOut } from "react-icons/bi";

import useDominoStore from "@/store/useDominoStore";

const HUDLogoutButton = ({ onClick }) => {
  const setSelectedDomino = useDominoStore((state) => state.setSelectedDomino);

  return (
    <button
      onMouseOver={() => setSelectedDomino(null)}
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-sky-300 text-gray-800 text-sm font-semibold rounded-full shadow-md hover:bg-sky-400 transition-all cursor-pointer"
    >
      <BiLogOut className="text-lg" />
      로그아웃
    </button>
  );
};

export default HUDLogoutButton;
