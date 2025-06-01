import useDominoStore from "@/store/useDominoStore";

const COLORS = [
  { type: "red", hex: "#EF4444" },
  { type: "orange", hex: "#F97316" },
  { type: "yellow", hex: "#EAB308" },
  { type: "green", hex: "#22C55E" },
  { type: "blue", hex: "#3B82F6" },
  { type: "indigo", hex: "#1E4ED8" },
  { type: "purple", hex: "#8B5CF6" },
];

export default function DominoColorPalette() {
  const selectedColor = useDominoStore((state) => state.selectedColor);
  const setSelectedColor = useDominoStore((state) => state.setSelectedColor);

  const handleSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="flex gap-2 p-3 rounded-xl bg-gray-100 shadow-inner w-fit ml-4 opacity-90">
      {COLORS.map((color) => (
        <button
          key={color.type}
          onClick={() => handleSelect(color.hex)}
          className={`w-8 h-8 rounded-full`}
          style={{
            backgroundColor: color.hex,
            border: selectedColor === color.hex ? "3px solid white" : "none",
            boxShadow: selectedColor === color.hex ? "0 0 0 2px black" : "none",
          }}
        />
      ))}
    </div>
  );
}
