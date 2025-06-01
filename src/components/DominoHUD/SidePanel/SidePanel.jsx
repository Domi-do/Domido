import { useState } from "react";

import DominoColorPalette from "@/components/DominoHUD/SidePanel/DominoColorPalette";
import ObjectCard from "@/components/DominoHUD/SidePanel/ObjectCard";
import { OBJECT_PATHS } from "@/constants/objectPaths";

const SidePanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-full flex transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-[99%]"
      }`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <aside className="w-100 h-full bg-black/40 shadow-lg p-3 flex flex-col relative gap-6">
        <DominoColorPalette />
        {Object.entries(OBJECT_PATHS).map(([groupName, groupObjects]) => (
          <section
            key={groupName}
            className="flex flex-col gap-2 overflow-y-auto"
          >
            <h2 className="font-bold text-white">{groupName.toLowerCase()}</h2>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(groupObjects).map(([objectName, paths]) => (
                <ObjectCard
                  key={objectName}
                  objectName={objectName}
                  paths={paths}
                  groupName={groupName}
                />
              ))}
            </div>
          </section>
        ))}
        <button
          className="absolute top-0 left-[-32px] transform
                     text-white h-12 w-8 bg-black/40 rounded-l flex items-center justify-center font-bold"
        >
          {isOpen ? "⟩" : "⟨"}
        </button>
      </aside>
    </div>
  );
};

export default SidePanel;
