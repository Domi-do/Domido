import useDominoStore from "@/store/useDominoStore";

const HUDButton = ({ onClick, buttonImage, alt }) => {
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
          alt={alt}
        />
      </button>
    </>
  );
};

export default HUDButton;
