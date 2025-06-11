import useDominoStore from "@/store/useDominoStore";

const HUDButton = ({ onClick, children }) => {
  const setSelectedDomino = useDominoStore((state) => state.setSelectedDomino);

  return (
    <>
      <button
        onMouseOver={() => setSelectedDomino(null)}
        onClick={onClick}
        className="w-12 h-12 flex items-center justify-center bg-white/90 rounded-full shadow-md cursor-pointer"
      >
        {children}
      </button>
    </>
  );
};

export default HUDButton;
