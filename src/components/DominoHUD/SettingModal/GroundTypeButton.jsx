export default function GroundTypeButton({ type, image, selected, onClick }) {
  return (
    <button
      onClick={() => onClick(type)}
      className={`w-[60px] h-[60px] rounded-[5px] ${
        selected ? "border-[3px] border-[#fc9d16]" : ""
      } shadow-[0_4px_6px_rgba(0,0,0,0.2)] overflow-hidden cursor-pointer`}
    >
      <img
        src={image}
        className="w-full h-full"
        alt={type}
      />
    </button>
  );
}
