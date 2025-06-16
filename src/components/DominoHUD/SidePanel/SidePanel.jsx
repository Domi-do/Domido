import { useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

import DominoColorPalette from "@/components/DominoHUD/SidePanel/DominoColorPalette";
import ObjectCard from "@/components/DominoHUD/SidePanel/ObjectCard";
import { OBJECT_METADATA, OBJECT_GROUP_LABELS } from "@/constants/objectMetaData";
import useTutorialTracker from "@/hooks/useTutorialTracker";
import useDominoStore from "@/store/useDominoStore";

const SidePanel = () => {
  const { selectedDomino } = useDominoStore();
  const [isOpen, setIsOpen] = useState(false);

  useTutorialTracker(isOpen);

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-full flex transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-[99%]"
      }`}
    >
      <aside className="w-100 h-full bg-black/40 shadow-lg p-3 flex flex-col relative gap-6">
        {selectedDomino?.objectName === "defaultObject" && <DominoColorPalette />}
        {Object.entries(OBJECT_METADATA).map(([groupName, groupObjects]) => (
          <section
            key={groupName}
            className="flex flex-col gap-2 overflow-y-auto"
          >
            <h2 className="font-bold text-white">{OBJECT_GROUP_LABELS[groupName] ?? groupName}</h2>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(groupObjects).map(([objectName, objectInfo]) => (
                <ObjectCard
                  key={objectName}
                  objectName={objectName}
                  objectInfo={objectInfo}
                  groupName={groupName}
                />
              ))}
            </div>
          </section>
        ))}
        <button
          className="absolute top-0 left-[-30px] transform text-white text-[22px] h-[60px] w-[30px] bg-black/40 rounded-tl-[8px] rounded-bl-[8px] flex items-center justify-center font-bold cursor-pointer"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          {isOpen ?
            <IoMdArrowDropright />
          : <IoMdArrowDropleft />}
        </button>
      </aside>
    </div>
  );
};

export default SidePanel;
