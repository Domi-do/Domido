import useDominoStore from "@/store/useDominoStore";

const HUDButton = ({ onClick, children }) => {
  const setSelectedDomino = useDominoStore((state) => state.setSelectedDomino);

  return (
    <>
      <button
        onMouseOver={() => setSelectedDomino(null)}
        onClick={onClick}
        className="w-12 h-12 flex items-center justify-center bg-white text-gray-700 rounded-full shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-200 cursor-pointer"
      >
        {children}
      </button>
    </>
  );
};

export default HUDButton;
