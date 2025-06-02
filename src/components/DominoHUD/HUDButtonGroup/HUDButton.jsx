import useDominoStore from "@/store/useDominoStore";

const HUDButton = ({ onClick, buttonImage }) => {
  const setSelectedDomino = useDominoStore((state) => state.setSelectedDomino);

  return (
    <>
      <button
        onMouseOver={() => setSelectedDomino(null)}
        onClick={onClick}
        className="w-[60px] h-[60px] cursor-pointer"
      >
        <img
          src={buttonImage}
          draggable="false"
          className="w-full h-full"
        />
      </button>
    </>
  );
};

export default HUDButton;
