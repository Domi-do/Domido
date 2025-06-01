import { useState } from "react";

const COLORS = [
  { color: "red", hex: "#EF4444" },
  { color: "orange", hex: "#F97316" },
  { color: "yellow", hex: "#EAB308" },
  { color: "green", hex: "#22C55E" },
  { color: "blue", hex: "#3B82F6" },
  { color: "indigo", hex: "#2563EB" },
  { color: "purple", hex: "#8B5CF6" },
];

export default function DominoColorPalette({ onChange }) {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleSelect = (color) => {
    setSelectedColor(color);
    if (onChange) onChange(color);
  };

  return (
    <div className="flex gap-2 p-3 rounded-xl bg-gray-100 shadow-inner w-fit ml-4 opacity-90">
      {COLORS.map((color) => (
        <button
          key={color.name}
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
