import useDominoStore from "@/store/useDominoStore";

const HUDButton = ({ onClick, className, children }) => {
  const setSelectedDomino = useDominoStore((state) => state.setSelectedDomino);

  return (
    <>
      <button
        onMouseOver={() => setSelectedDomino(null)}
        onClick={onClick}
        className={className}
      >
        {children}
      </button>
    </>
  );
};

export default HUDButton;
